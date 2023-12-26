import { auth } from "@clerk/nextjs";
import { OrgControl } from "./_components/org-control";

export async function generateMetadata(){
    const {orgSlug} = auth();

    return {
        title: `${orgSlug} | Organization`,
    }
}

const OrganizationIdLayout = ({ children }:{
    children: React.ReactNode
}) => {


    return(
        <>
        <OrgControl />
        {children}
        </>
    )
}

export default OrganizationIdLayout;