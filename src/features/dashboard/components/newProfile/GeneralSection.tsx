"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useProfileStore } from "@/store/createNewProfileStore";
import BrowserConfigSelector from "./BrowserConfigSelector";
import OsConfigSelector from "./OsConfigSelector";


const GeneralSection = () => {
  const name = useProfileStore((state) => state.name);
  const setName = useProfileStore((state) => state.setName);

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-6 p-6">
      {/* Name */}
      <Label className="flex justify-end w-24 font-semibold text-sm text-gray-600 ">
        Name
      </Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-10 w-md border-gray-300"
        placeholder="Optional: profile name"
      />

      {/* Browser */}
      <Label className="flex justify-end w-24 font-semibold text-sm text-gray-600">
        Browser
      </Label>
      <BrowserConfigSelector/>
       <Label className="flex justify-end w-24 font-semibold text-sm text-gray-600">
        Os
      </Label>
       <OsConfigSelector/>
    </div>
  );
};

export default GeneralSection;
