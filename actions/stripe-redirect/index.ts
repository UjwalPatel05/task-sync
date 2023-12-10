"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "You must be logged in to copy a list.",
    };
  }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`);

  console.log("settingsUrl", settingsUrl);
  
  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      // if we already have a subscription, redirect to the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data:{
              currency: "USD",
              product_data:{
                name: "TaskSync Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    return{
      error: "Something went wrong. Please try again later.",
    }
  }

  revalidatePath(`/organization/${orgId}`);
  return{
    data: url
  }
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
