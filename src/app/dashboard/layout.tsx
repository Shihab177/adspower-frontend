"use client";

import Header from "@/features/dashboard/components/Header";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { useAuth } from "@/provider/authProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  // 🔥 prevent flicker
  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#F6F7F8] flex flex-row min-h-screen">
      <div className="bg-white w-[240px] shadow-xs">
        <Sidebar />
      </div>

      <div className="w-[calc(100%-240px)] px-3 pb-6">
        <Header />
        <div className="h-[calc(100%-56px)] mt-3">{children}</div>
      </div>
    </div>
  );
}