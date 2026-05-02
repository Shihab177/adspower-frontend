"use client";
import NewProfilePageFooter from "@/features/dashboard/components/newProfile/NewProfilePageFooter";
import NewProfilePageHeader from "@/features/dashboard/components/newProfile/NewProfilePageHeader";
import OverviewHeader from "@/features/dashboard/components/newProfile/OverviewHeader";
import OverviewFooter from "@/features/dashboard/components/newProfile/OverviewFooter";
import { useState } from "react";
import OverviewContain from "@/features/dashboard/components/newProfile/OverviewContain";
import GeneralSection from "@/features/dashboard/components/newProfile/GeneralSection";


function NewProfilePage() {
  
  const [activeTab, setActiveTab] = useState("general");
  return (
    <div className="bg-[#FFFFFF] pt-3 rounded-sm h-full grid grid-rows-[auto_1fr_auto]">
      <NewProfilePageHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-row overflow-hidden py-6 -pt-1">
        <div className="overflow-y-auto custom-scrollbar px-3 w-3/4 py-1">
           <GeneralSection/>
           <div></div>
        </div>
        <div className="w-1/4 h-full bg-[#F9F9F9] rounded-md mx-3  p-4 overflow-y-auto custom-scrollbar  grid grid-rows-[auto_1fr_auto]">
          <OverviewHeader />
          <div className="overflow-y-auto custom-scrollbar py-2">
           <OverviewContain/>
          </div>

          <OverviewFooter />
        </div>
      </div>
      <NewProfilePageFooter />
    </div>
  );
}

export default NewProfilePage;
