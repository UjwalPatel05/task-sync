import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
  const isPro = await checkSubscription();

  console.log("In the organization id page");
  

  return (<div className="w-full mb-20">
      <Suspense fallback={<Info.Skeleton/>}>
      <Info isPro={isPro}/>
      </Suspense>
      <Separator className="my-4"/>
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton/>}>
        <BoardList/>
        </Suspense>
      </div>
  </div>);
};

export default OrganizationIdPage;
