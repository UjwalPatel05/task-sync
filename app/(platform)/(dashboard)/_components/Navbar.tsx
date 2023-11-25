import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { PlusIcon } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"
import { FormPopover } from "@/components/form/form-popover"

export const Navbar = () => {
    return(
        <nav className="fixed top-0 h-14 w-full px-4 border-b z-50 shadow-sm bg-white flex items-center">
            
            {/* Mobile Navbar */}
            <MobileSidebar/>
           
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo/>
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                    Create
                </Button>
                </FormPopover>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                <Button size="sm" variant="primary" className="rounded-sm block md:hidden">
                    <PlusIcon className="h-4 w-4"/>
                </Button>
                </FormPopover>
            </div>
            <div className="flex gap-x-2 items-center ml-auto">
                <OrganizationSwitcher
                hidePersonal
                afterLeaveOrganizationUrl="/select-org"
                afterSelectOrganizationUrl="/organization/:id"
                afterCreateOrganizationUrl="/organization/:id"
                appearance={{
                    elements: {
                        rootBox:{
                            display: "flex",
                            alignItems: "center",
                            justifyItems: "center",
                        }
                    },
                }}
                />

                <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox:{
                            height:30,
                            width:30,
                        }
                    }
                }}
                />
            </div>
        </nav>
    )
}