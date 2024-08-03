"use client"

import { CameraAlt, FormatListBulleted, Inventory } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname()
    return(
        <div className="fixed flex top-0 overflow-hidden w-screen p-4 justify-between">
            <h1>Whit's Pantry</h1>
            <div className="flex gap-2">
                <Link href={"/"} className={path == "/" ? "opacity-20" : ""}><FormatListBulleted/></Link>
                <Link href={"/photo-pantry"} className={path == "/photo-pantry" ? "opacity-20" : ""}><Inventory/></Link>
                <Link href={"/upload"} className={path == "/upload" ? "opacity-20" : ""}><CameraAlt/></Link>
            </div>
        </div>
)}