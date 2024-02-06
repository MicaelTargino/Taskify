import { Navbar } from "./_components/NavBar";
const DashboradLayout = ({children}: {children: React.ReactNode})  => {
    return (
        <div className="h-full">
            <Navbar />
            {children}
        </div>
    )
}

export default DashboradLayout;