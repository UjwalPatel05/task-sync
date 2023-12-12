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
        <div suppressHydrationWarning={true}>
        <OrgControl/>
        {children}
        </div>
    )
}

export default OrganizationIdLayout;