"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const { setActive } = useOrganizationList();
  const params = useParams();

  useEffect(() => {
    const setOrganization = async () => {
      try {
        console.log("Calling setActive");
        if (!setActive) return;
        await setActive({
          organization: params.organizationId as string,
        });
        console.log("setActive completed");
      } catch (error) {
        console.error("Error setting organization:", error);
      }
    };

    setOrganization();
  }, [setActive, params.organizationId]);

  return null;
};
