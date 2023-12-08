import Link from "next/link"
import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from '@/lib/utils'


const LogoFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100", "200", "300", "400", "500", "600", "700", "800", "900"
    ]
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 items-center gap-x-2 hidden md:flex">
                <Image src="/logo.svg" alt="Logo" height={30} width={30} />
                <p className={cn("text-lg font-bold text-neutral-700", LogoFont.className)}>
                    Taskify
                </p>
            </div>
        </Link>
    )
}