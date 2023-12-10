import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { HelpCircleIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async() => {

    const {orgId} = auth();

    if(!orgId){
        redirect("/select-org")
    }

    const boards = await db.board.findMany({
        where: {
            orgId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const availableCount = await getAvailableCount();
    const isPro = await checkSubscription();

    return(
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2Icon className="h-6 w-6 mr-2"/>
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map(board => (
                    <Link
                    key={board.id}
                    href={`/board/${board.id}`}
                    style={{backgroundImage: `url(${board.imageThumbUrl})`}}
                    className="group relative h-full w-full bg-no-repeat bg-center p-2 rounded-sm aspect-video bg-cover bg-sky-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>
                        <p className="text-white font-semibold relative">
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover side="right" sideOffset={10}>
                <div role="button"
                 className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                <p className="text-sm">Create new board</p>
                <span className="text-xs">
                    {isPro ? "Unlimited":`${MAX_FREE_BOARDS - availableCount} remaining`}
                </span>
                <Hint sideOffset={40} description={
                    `Free Workspaces are limited to 5 boards. Upgrade to a paid plan to create more boards.`
                }>
                    <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]"/>
                </Hint>
                </div>
                </FormPopover>
            </div>
        </div>
    )
};

BoardList.Skeleton = function SkeletonBoardList(){
    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
        </div>
    )
}