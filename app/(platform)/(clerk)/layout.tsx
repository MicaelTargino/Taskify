const ClerkLayout = ({children}: {children:React.ReactNode}) => {

    return (
        <div className="w-full h-[100vh] overflow-hidden flex items-center justify-center">
        {children}
        </div>
    )

}

export default ClerkLayout