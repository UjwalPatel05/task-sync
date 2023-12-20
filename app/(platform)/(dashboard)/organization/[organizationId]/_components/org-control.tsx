"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const { setActive } = useOrganizationList();
  const params = useParams();

  useEffect(() => {
    const setOrganization = async () => {
      if (!setActive) return;
      await setActive({
        organization: params.organizationId as string,
      });
    };

    setOrganization();
  }, [setActive, params.organizationId]);

  return null;
};
