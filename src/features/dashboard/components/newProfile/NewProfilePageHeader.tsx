
import { newProfileMenuItems } from "@/constants/data";
import React, { useState } from "react";
interface NewProfilePageHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const NewProfilePageHeader = ({ activeTab, setActiveTab }: NewProfilePageHeaderProps) => {
  
  return (
    <div className="flex gap-8 border-b border-gray-200 px-3">
      {newProfileMenuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`pb-3 text-md font-semibold transition-all duration-200 border-b-2 ${
            activeTab === item.id
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-blue-600"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
export default NewProfilePageHeader;
