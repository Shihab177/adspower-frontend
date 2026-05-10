"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useProfileStore } from "@/store/createNewProfileStore";
import BrowserConfigSelector from "./BrowserConfigSelector";
import OsConfigSelector from "./OsConfigSelector";
import UserAgentConfig from "./UserAgentConfig";
import GroupAndTagsConfig from "./GroupAndTagsConfig";
import CookieConfig from "./CookieConfig";
import RemarkInput from "./RemarkInput";

const GeneralSection = () => {
  const name = useProfileStore((state) => state.name);
  const setName = useProfileStore((state) => state.setName);

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-6 ">
      {/* Name */}
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        Name
      </Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-10 w-md border-gray-300"
        placeholder="Optional: profile name"
      />

      {/* Browser */}
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600">
        Browser
      </Label>
      <BrowserConfigSelector />
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600">
        Os
      </Label>
      <OsConfigSelector />
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        User-Agent
      </Label>
      <UserAgentConfig />
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        <span className="text-red-500 mr-0.5">*</span>Group
      </Label>
      <GroupAndTagsConfig />
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        Cookie
      </Label>
      <CookieConfig />
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
       Remark
      </Label>
      <RemarkInput/>
    </div>
  );
};

export default GeneralSection;
