import { checkSubscription } from "@/lib/subscription";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/subscription-button";
import { Suspense } from "react";


const BillingPage = async() => {

    const isPro = await checkSubscription();
    console.log("In the billing page");

    return (
        <div className="w-full">
            <Suspense fallback={<Info.Skeleton/>}>
      <Info isPro={isPro}/>
      </Suspense>
            <Separator className="my-2"/>
            <SubscriptionButton isPro={isPro}/>
        </div>
    );
}

export default BillingPage;