"use client"

import { CameraAlt, FormatListBulleted, Inventory } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname()
    return(
        <div className="fixed top-0 overflow-hidden w-screen">
            <div className="flex w-full pt-4 pb-2 px-5 justify-between bg-black">
                <h1>Whit&apos;s Pantry</h1>
                <div className="flex gap-2">
                    <Link href={"/"} className={path == "/" ? "opacity-20" : ""}><FormatListBulleted/></Link>
                    <Link href={"/photo-pantry"} className={path == "/photo-pantry" ? "opacity-20" : ""}><Inventory/></Link>
                    <Link href={"/upload"} className={path == "/upload" ? "opacity-20" : ""}><CameraAlt/></Link>
                </div>
            </div>
            <div className="bg-gradient-to-b from-black to-transparent w-full h-2"></div>
        </div>
)}