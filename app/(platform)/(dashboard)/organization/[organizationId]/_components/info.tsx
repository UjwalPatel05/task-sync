"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
interface InfoProps{
    isPro: boolean;
}

export const Info = ({
    isPro
}:InfoProps) => {



    const {organization, isLoaded} = useOrganization();

         // For some reason, this is needed to prevent a hydration mismatch error
         const [isMounted, setIsMounted] = useState(false);

         useEffect(()=>{
             setIsMounted(true);
         },[])
     
         if(!isMounted) return null;

    if(!isLoaded) {
        return(
            <div>
                <Info.Skeleton/>
            </div>
        )
    }

    return(
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image
                fill
                 src={organization?.imageUrl!}
                 alt="organization logo"
                 className="rounded-md object-cover"
                />
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">{organization?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCardIcon className="h-3 w-3 mr-1"/>
                        {isPro ? "Pro" : "Free"}
                </div>
            </div>
        </div>
    )
};

Info.Skeleton = function SkeletonInfo(){
    return(
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-full h-full absolute"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[200px] h-10"/>
                <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-2"/>
                    <Skeleton className="w-[50px] h-4"/>
                </div>
            </div>
        </div>
    )
}