"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMe, logout } from "@/services/auth.service";
import { useAuth } from "@/provider/authProvider";
import {
  RefreshCw,
  List,
  ChevronRight,
  Settings,
  Bell,
  Star,
  Globe,
  Moon,
  LogOut,
} from "lucide-react";
type User = {
  id: string;
  email: string;
  role: string;
};
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter()
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTitle = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];

    if (!lastPart) return "Dashboard";
    return lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLogout = async () => {
  try {
    await logout(); 
    router.push('/auth')
   
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <div className="flex items-center justify-between h-14">
      <h2 className="text-2xl font-bold text-gray-900 mr-4">
        {formatTitle(pathname) === "New Profiles"
          ? "New Browser Profile"
          : formatTitle(pathname)}
      </h2>

      <div className="flex items-center ">
        <div className="flex items-center gap-2 ">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md bg-white">
            <RefreshCw size={24} />
          </button>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md bg-white">
            <List size={24} />
          </button>
        </div>

        {/* Profile Card */}
        {/* Profile Card Container */}
        <div className="relative ml-2" ref={dropdownRef}>
          {/* Main Card */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white flex items-center gap-3 border rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
              {/* এখানে চাইলে ইমেজ দিতে পারেন যেমন ছবিতে আছে */}
              <span className="text-xs font-bold text-indigo-600">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">
                {user?.email || "User"}
              </span>
              <span className="text-[10px] text-gray-500 capitalize">
                {user?.role || "Owner"}
              </span>
            </div>

            <ChevronRight
              size={16}
              className={`text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
            />
          </div>
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg py-2 z-50">
              <DropdownItem icon={<Settings size={18} />} label="Settings" />
              <DropdownItem icon={<Bell size={18} />} label="Notification" />
              <DropdownItem icon={<Star size={18} />} label="Referral bonus" />
              <DropdownItem
                icon={<Globe size={18} />}
                label="Language"
                hasArrow
              />
              <DropdownItem icon={<Moon size={18} />} label="Themes" hasArrow />
              <hr className="my-1 border-gray-100" />
              <DropdownItem onClick={handleLogout} icon={<LogOut size={18} />} label="Log out" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({
  icon,
  label,
  hasArrow = false,
  onClick, 
}: {
  icon: React.ReactNode;
  label: string;
  hasArrow?: boolean;
  onClick?: () => void; 
}) {
  return (
    <div 
      onClick={onClick} 
      className="flex items-center justify-between px-4 py-2.5 hover:bg-indigo-50 cursor-pointer text-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {hasArrow && <ChevronRight size={14} className="text-gray-300" />}
    </div>
  );
}