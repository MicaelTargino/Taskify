const MarketingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full bg-slate-100">
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>
        </div>
    )
}

export default MarketingLayout