import { Navbar } from "./_components/NavBar";
import { PomodoroTriggerButton } from "./board/[boardId]/_components/PomodoroTriggerButton";
const DashboradLayout = ({children}: {children: React.ReactNode})  => {
    return (
        <div className="h-full">
            <Navbar />
            {children}
        </div>
    )
}

export default DashboradLayout;