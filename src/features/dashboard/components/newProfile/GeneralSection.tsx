"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Download } from "lucide-react";
import Image from "next/image";
// আপনার প্রজেক্ট অনুযায়ী ইমেজের পাথ ঠিক করে নিন
import sunbrowser from "../../../../../public/assets/image/Chromium.png";
import flowerbrowser from "../../../../../public/assets/image/Firefox.png";

const sunVersions = [
  { value: "auto", label: "Auto" },
  { value: "sun-144", label: "Chrome 144" },
  { value: "sun-145", label: "Chrome 145" },
  { value: "sun-146", label: "Chrome 146" },
];

const flowerVersions = [
  { value: "auto", label: "Auto" },
  { value: "firefox-147", label: "Firefox 147" },
  { value: "firefox-141", label: "Firefox 141" },
  { value: "firefox-135", label: "Firefox 135" },
];

const GeneralSection = () => {
  const [selectedBrowser, setSelectedBrowser] = useState("SunBrowser");
  const [sunDropdownOpen, setSunDropdownOpen] = useState(false);
  const [flowerDropdownOpen, setFlowerDropdownOpen] = useState(false);
  const sunRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const [selectedSunVersion, setSelectedSunVersion] = useState("auto");
  const [selectedFlowerVersion, setSelectedFlowerVersion] = useState("auto");
  // বাইরে ক্লিক শনাক্ত করার লজিক
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sunRef.current &&
        !sunRef.current.contains(event.target as Node) &&
        flowerRef.current &&
        !flowerRef.current.contains(event.target as Node)
      ) {
        setSunDropdownOpen(false);
        setFlowerDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getBrowserStyles = (browserName: string) => {
    const isActive = selectedBrowser === browserName;
    return `cursor-pointer h-10 flex items-center rounded-md text-sm font-medium border transition-colors ${
      isActive
        ? "border-blue-600 bg-blue-100/50"
        : "border-gray-300 hover:border-blue-500"
    }`;
  };
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-6 p-6">
      {/* Name */}
      <Label className="flex justify-end w-24 font-semibold text-sm text-gray-600 ">
        Name
      </Label>
      <Input
        className="h-10 w-md border-gray-300"
        placeholder="Optional: profile name"
      />

      {/* Browser */}
      <Label className="flex justify-end w-24 font-semibold text-sm text-gray-600">
        Browser
      </Label>
      <div className="flex gap-4">
        {/* subBrowser */}
        <div className=" relative" ref={sunRef}>
          <div
            onClick={() => setSelectedBrowser("SunBrowser")}
            className={getBrowserStyles("SunBrowser")}
          >
            <div>
              <Image
                src={sunbrowser}
                height={700}
                width={700}
                alt="sunbrowser"
                className="h-6 w-10"
              />
            </div>{" "}
            <div>SunBrowser</div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSunDropdownOpen(!sunDropdownOpen);
                setFlowerDropdownOpen(false)
              }}
              className="ml-8 border-l border-gray-400 h-6.5 flex items-center px-2"
            >
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>
          {sunDropdownOpen && (
            <div className="h-60 absolute z-50  w-full border border-blue-500 rounded-md p-2 bg-white">
              {sunVersions.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setSelectedSunVersion(item.value);
                    setSunDropdownOpen(false);
                  }}
                  className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                >
                  <span
                    className={`${selectedSunVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          {selectedSunVersion !== "auto" && (
            <p className="text-blue-500 text-sm absolute">
            {sunVersions.find(v => v.value === selectedSunVersion)?.label}
            </p>
          )}
        </div>

        {/* flowerbrowser */}
        <div className=" relative" ref={flowerRef}>
          <div
            onClick={() => setSelectedBrowser("FlowerBrowser")}
            className={getBrowserStyles("FlowerBrowser")}
          >
            <div>
              <Image
                src={flowerbrowser}
                height={700}
                width={700}
                alt="flowerbrowser"
                className="h-6 w-6 mx-2"
              />
            </div>{" "}
            <div>FlowerBrowser</div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setFlowerDropdownOpen(!flowerDropdownOpen);
                setSunDropdownOpen(false);
              }}
              className="ml-8 border-l border-gray-400 h-6.5 flex items-center px-2"
            >
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>
          {flowerDropdownOpen && (
            <div className="h-60 absolute z-50  w-full border border-blue-500 rounded-md p-2 bg-white">
              {flowerVersions.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setSelectedFlowerVersion(item.value);
                    setFlowerDropdownOpen(false);
                  }}
                  className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                >
                  <span
                    className={`${selectedFlowerVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          {selectedFlowerVersion !== "auto" && (
            <p className="text-blue-500 text-sm absolute">
            {flowerVersions.find(v => v.value === selectedFlowerVersion)?.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
