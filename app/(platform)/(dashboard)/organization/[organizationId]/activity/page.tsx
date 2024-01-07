import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";
import { Info } from "../_components/info";

const ActivityPage = () => {
    return (
        <div className="w-full">
            <Info/>
            <Separator className="my-2"/>
            <Suspense fallback={<ActivityList.Skeleton/>}>
            <ActivityList/>
            </Suspense>
        </div>
    );
}

export default ActivityPage;