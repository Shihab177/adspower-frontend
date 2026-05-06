"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import sunbrowser from "../../../../../public/assets/image/Chromium.png";
import flowerbrowser from "../../../../../public/assets/image/Firefox.png";
import { useProfileStore } from "@/store/createNewProfileStore";
import { ChevronDown, Download } from "lucide-react";
import { ImWindows } from "react-icons/im";
import { Checkbox } from "@/components/ui/checkbox";
import { FaApple } from "react-icons/fa";
import { DiAndroid, DiLinux } from "react-icons/di";
const windowsVersions = [
  { value: "allVersion", label: "All Windows" },
  { value: "11", label: "Windows 11" },
  { value: "10", label: "Windows 10" },
  { value: "9", label: "Windows 9" },
  { value: "8", label: "Windows 8" },
  { value: "7", label: "Windows 7" },
];

const macVersions = [
  { value: "allVersion", label: "All macOS" },
  { value: "26", label: "macOS 26" },
  { value: "15", label: "macOS 15" },
  { value: "14", label: "macOS 14" },
  { value: "13", label: "macOS 13" },
  { value: "12", label: "macOS 12" },
  { value: "11", label: "macOS 11" },
  { value: "10", label: "macOS 10" },
];
const linuxVersions = [{ value: "ubuntu-24.04", label: "All Linux" }];
const androidVersions = [
  { value: "allVersion", label: "All Android" },
  { value: "15", label: "Android 15" },
  { value: "14", label: "Android 14" },
  { value: "13", label: "Android 13" },
  { value: "12", label: "Android 12" },
  { value: "11", label: "Android 11" },
  { value: "10", label: "Android 10" },
  { value: "9", label: "Android 19" },
];
const iosVersions = [
  { value: "allVersion", label: "All iOS" },
  { value: "26", label: "iOS 26" },
  { value: "18", label: "iOS 18" },
  { value: "17", label: "iOS 17" },
  { value: "16", label: "iOS 16" },
  { value: "15", label: "iOS 15" },
  { value: "14", label: "iOS 14" },
  { value: "13", label: "iOS 13" },
];

const OsConfigSelector = () => {
  const [windowsDropdownOpen, setWindowsDropdownOpen] = useState(false);
  const [macDropdownOpen, setMacDropdownOpen] = useState(false);
  const [linuxDropdownOpen, setLinuxDropdownOpen] = useState(false);
  const [androidDropdownOpen, setAndroidDropdownOpen] = useState(false);
  const [iosDropdownOpen, setIosDropdownOpen] = useState(false);

  const windowsRef = useRef<HTMLDivElement>(null);
  const macRef = useRef<HTMLDivElement>(null);
  const linuxRef = useRef<HTMLDivElement>(null);
  const androidRef = useRef<HTMLDivElement>(null);
  const iosRef = useRef<HTMLDivElement>(null);

  const os = useProfileStore((state) => state.os);
  const setOs = useProfileStore((state) => state.setOS);
  const windowsVersion = useProfileStore((state) => state.windowsVersion);
  const setWindowsVersion = useProfileStore((state) => state.setWindowsVersion);
  const macVersion = useProfileStore((state) => state.macVersion);
  const setMacVersion = useProfileStore((state) => state.setMacVersion);
  const linuxVersion = useProfileStore((state) => state.linuxVersion);
  const setLinuxVersion = useProfileStore((state) => state.setLinuxVersion);
  const androidVersion = useProfileStore((state) => state.androidVersion);
  const setAndroidVersion = useProfileStore((state) => state.setAndroidVersion);
  const iosVersion = useProfileStore((state) => state.iosVersion);
  const setIosVersion = useProfileStore((state) => state.setIosVersion);

  const getOsStyles = (osName: string) => {
    const isActive = os === osName;
    return `cursor-pointer h-10 flex items-center rounded-md text-sm font-medium border transition-colors ${
      isActive
        ? "border-blue-600 bg-blue-100/50"
        : "border-gray-300 hover:border-blue-500"
    }`;
  };
  // বাইরে ক্লিক শনাক্ত করার লজিক
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (windowsRef.current && !windowsRef.current.contains(target)) {
        setWindowsDropdownOpen(false);
      }

      if (macRef.current && !macRef.current.contains(target)) {
        setMacDropdownOpen(false);
      }

      if (linuxRef.current && !linuxRef.current.contains(target)) {
        setLinuxDropdownOpen(false);
      }

      if (androidRef.current && !androidRef.current.contains(target)) {
        setAndroidDropdownOpen(false);
      }

      if (iosRef.current && !iosRef.current.contains(target)) {
        setIosDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex gap-4">
      {/* Win */}
      <div className=" relative" ref={windowsRef}>
        <div
          onClick={() => {
            setOs("windows");
            setWindowsVersion("allVersion");
          }}
          className={getOsStyles("windows")}
        >
          <div className="flex items-center gap-2 mx-2.5">
            <Checkbox
              checked={os === "windows"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setOs("windows");
                  setWindowsVersion("allVersion");
                }
              }}
            />
            <ImWindows size={20} className="text-blue-500" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setWindowsDropdownOpen(!windowsDropdownOpen);
              setMacDropdownOpen(false);
              setLinuxDropdownOpen(false);
              setAndroidDropdownOpen(false);
              setIosDropdownOpen(false);
            }}
            className="border-l border-gray-400 h-6.5 flex items-center px-2"
          >
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
        {windowsDropdownOpen && (
          <div className=" absolute z-50  w-36 border border-blue-500 rounded-md p-2 bg-white">
            {windowsVersions.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setWindowsVersion(item.value);
                  setOs("windows");
                  setMacVersion("");
                  setLinuxVersion("");
                  setAndroidVersion("");
                  setIosVersion("");
                  setWindowsDropdownOpen(false);
                }}
                className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                <span
                  className={`${windowsVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* mac */}
      <div className=" relative" ref={macRef}>
        <div
          onClick={() => {
            setOs("mac");
            setMacVersion("allVersion");
          }}
          className={getOsStyles("mac")}
        >
          <div className="flex items-center gap-2 mx-2.5">
            <Checkbox
              checked={os === "mac"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setOs("mac");
                  setMacVersion("allVersion");
                }
              }}
            />
            <FaApple size={26} className="text-blue-500" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setWindowsDropdownOpen(false);
              setMacDropdownOpen(!macDropdownOpen);
              setLinuxDropdownOpen(false);
              setAndroidDropdownOpen(false);
              setIosDropdownOpen(false);
            }}
            className=" border-l border-gray-400 h-6.5 flex items-center px-2"
          >
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
        {macDropdownOpen && (
          <div className="  absolute z-50  w-36 border border-blue-500 rounded-md p-2 bg-white">
            {macVersions.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setMacVersion(item.value);
                  setOs("mac");
                  setWindowsVersion("");
                  setLinuxVersion("");
                  setAndroidVersion("");
                  setIosVersion("");
                  setMacDropdownOpen(false);
                }}
                className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                <span
                  className={`${macVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* linux */}
      <div className=" relative" ref={linuxRef}>
        <div
          onClick={() => {
            setOs("linux");
            setLinuxVersion("allVersion");
          }}
          className={getOsStyles("linux")}
        >
          <div className="flex items-center gap-2 mx-2.5">
            <Checkbox
              checked={os === "linux"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setOs("linux");
                  setLinuxVersion("allVersion");
                }
              }}
            />
            <DiLinux size={26} className="text-blue-500" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setWindowsDropdownOpen(false);
              setMacDropdownOpen(false);
              setLinuxDropdownOpen(!linuxDropdownOpen);
              setAndroidDropdownOpen(false);
              setIosDropdownOpen(false);
            }}
            className=" border-l border-gray-400 h-6.5 flex items-center px-2"
          >
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
        {linuxDropdownOpen && (
          <div className="absolute z-50  w-36 border border-blue-500 rounded-md p-2 bg-white">
            {linuxVersions.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setLinuxVersion(item.value);
                  setOs("linux");
                  setMacVersion("");
                  setWindowsVersion("");
                  setAndroidVersion("");
                  setIosVersion("");
                  setLinuxDropdownOpen(false);
                }}
                className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                <span
                  className={`${linuxVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* android */}
      <div className=" relative" ref={androidRef}>
        <div
          onClick={() => {
            setOs("android");
            setAndroidVersion("allVersion");
          }}
          className={getOsStyles("android")}
        >
          <div className="flex items-center gap-2 mx-2.5">
            <Checkbox
              checked={os === "android"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setOs("android");
                  setAndroidVersion("allVersion");
                }
              }}
            />
            <DiAndroid size={26} className="text-blue-500" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setAndroidDropdownOpen(!androidDropdownOpen);
              setWindowsDropdownOpen(false);
              setMacDropdownOpen(false);
              setLinuxDropdownOpen(false);

              setIosDropdownOpen(false);
            }}
            className=" border-l border-gray-400 h-6.5 flex items-center px-2"
          >
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
        {androidDropdownOpen && (
          <div className="absolute z-50  w-36 border border-blue-500 rounded-md p-2 bg-white">
            {androidVersions.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setAndroidVersion(item.value);
                  setOs("android");
                  setMacVersion("");
                  setWindowsVersion("");
                  setLinuxVersion("");
                  setIosVersion("");
                  setAndroidDropdownOpen(false);
                }}
                className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                <span
                  className={`${androidVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ios */}
      <div className=" relative" ref={iosRef}>
        <div
          onClick={() => {
            setOs("ios");
            setIosVersion("allVersion");
          }}
          className={getOsStyles("ios")}
        >
          <div className="flex items-center gap-2 mx-2.5">
            <Checkbox
              checked={os === "ios"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setOs("ios");
                  setIosVersion("allVersion");
                }
              }}
            />
            <DiAndroid size={26} className="text-blue-500" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setWindowsDropdownOpen(false);
              setMacDropdownOpen(false);
              setLinuxDropdownOpen(false);
              setAndroidDropdownOpen(false);
              setIosDropdownOpen(!iosDropdownOpen);
            }}
            className=" border-l border-gray-400 h-6.5 flex items-center px-2"
          >
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
        {iosDropdownOpen && (
          <div className="absolute z-50  w-36 border border-blue-500 rounded-md p-2 bg-white">
            {iosVersions.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setIosVersion(item.value);
                  setOs("ios");
                  setMacVersion("");
                  setWindowsVersion("");
                  setLinuxVersion("");
                  setAndroidVersion("");
                  setIosDropdownOpen(false);
                }}
                className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                <span
                  className={`${iosVersion === item.value ? "text-blue-500" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OsConfigSelector;
