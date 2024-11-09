"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export const SidebarItem = ({ href, title, icon }: {
    href: string;
    title: string;
    icon: React.ReactNode
}) => {
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <Link href={href} passHref>
            <div 
                className={`flex items-center ${selected ? "text-[#6a51a6]" : "text-slate-500"} p-2 pl-8 cursor-pointer`}
            >
                <div className="pr-2">
                    {icon}
                </div>
                <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                    {title}
                </div>
            </div>
        </Link>
    );
};
