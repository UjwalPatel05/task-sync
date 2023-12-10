import { Suspense } from "react";
import { Sidebar } from "../_components/sidebar"
import { NavItem } from "../_components/nav-item";

const OrganizationLayout = ({ children }:{
    children: React.ReactNode
}) => {

    console.log("In the organization layout");
    
    return(
        <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto" suppressHydrationWarning={true}>
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Suspense fallback={<NavItem.Skeleton/>}>
                    <Sidebar/>
                    </Suspense>
                </div>
                {children}
            </div>
        </main>
    )
}

export default OrganizationLayout