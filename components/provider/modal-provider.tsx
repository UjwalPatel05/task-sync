"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/card-modal";

export const ModalProvider = () => {

    // For some reason, this is needed to prevent a hydration mismatch error
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return null;

    return(
        <>
            <CardModal/>
        </>
    )
};