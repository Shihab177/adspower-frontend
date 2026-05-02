"use client"; 

import React from "react";
import Link from "next/link"; // Link ইমপোর্ট করলাম
import { usePathname } from "next/navigation"; 
import { sidebarItems } from "@/constants/data"; 
import logo from "../../../../public/assets/logo/logo (7).png"
import Image from "next/image";
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col p-4">
      <div className="mb-8  flex -gap-3 items-center -ml-6">
        <Image src={logo} width={300} height={300} alt="logo" className="w-22 h-12"/>
        <h1 className="text-3xl font-bold text-black">AdsPower</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
                ${isActive 
                  ? "bg-blue-100 text-blue-600 font-semibold" 
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}