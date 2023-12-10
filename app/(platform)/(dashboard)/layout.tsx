import { Navbar } from "./_components/Navbar";

const DashboardLayout = ({ children }:{
    children: React.ReactNode
}) => {
    return(
        <div className="h-full" suppressHydrationWarning={true}>
            <Navbar/>
            {children}
        </div>
    )
};

export default DashboardLayout