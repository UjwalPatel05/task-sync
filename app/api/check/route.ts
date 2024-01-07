import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const DAY_IN_MS = 86_400_000;

export async function GET (req: Request, res: Response) {
  const { orgId } = auth();

  if (!orgId) {
    return new NextResponse("Unauthorized", {status: 401})
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });
  
  if (!orgSubscription) {
    return NextResponse.json(false);
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return NextResponse.json(!!isValid);
};
