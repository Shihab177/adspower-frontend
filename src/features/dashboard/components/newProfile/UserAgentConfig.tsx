"use client";
import React, { useEffect, useRef, useState } from "react";
import { Check, Copy, RefreshCw, ChevronDown } from "lucide-react";
import {
  useProfileStore,
  buildUA,
  SUN_UA_VERSIONS,
  FLOWER_UA_VERSIONS,
} from "@/store/createNewProfileStore";

const UserAgentConfig = () => {
  const browser           = useProfileStore((s) => s.browser);
  const os                = useProfileStore((s) => s.os);
  const sunVersion        = useProfileStore((s) => s.sunVersion);
  const flowerVersion     = useProfileStore((s) => s.flowerVersion);
  const userAgent         = useProfileStore((s) => s.userAgent);
  const setUserAgent      = useProfileStore((s) => s.setUserAgent);
  const generateUserAgent = useProfileStore((s) => s.generateUserAgent);

  const [open, setOpen]     = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ selectedUAVersion এর সাথে browser+os track করো একসাথে
  const [uaSelection, setUaSelection] = useState<{
    version: number | null;
    browser: string;
    os: string;
  }>({ version: null, browser, os });

  const dropRef       = useRef<HTMLDivElement>(null);
  const browserType   = browser === "SunBrowser" ? "chromium" : "firefox";
  const activeVersion = browser === "SunBrowser" ? sunVersion : flowerVersion;
  const uaVersionList = browser === "SunBrowser" ? SUN_UA_VERSIONS : FLOWER_UA_VERSIONS;

  // ✅ browser বা OS বদলালে version null — derived
  const selectedUAVersion =
    uaSelection.browser === browser && uaSelection.os === os
      ? uaSelection.version
      : null;

  // outside click → dropdown বন্ধ
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectVersion = (v: number) => {
    setUaSelection({ version: v, browser, os });
    const ua = buildUA(browserType, os, activeVersion, v);
    setUserAgent(ua);
    setOpen(false);
  };

  const handleSelectAll = () => {
    setUaSelection({ version: null, browser, os });
    generateUserAgent();
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userAgent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const badgeLabel = selectedUAVersion !== null ? `UA ${selectedUAVersion}` : "All";

  return (
    <div className="flex items-center gap-3  ">
      {/* Version Dropdown */}
      <div className="relative" ref={dropRef}>
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 w-34 h-10 px-3 border border-blue-400 bg-blue-50 rounded-md text-sm text-blue-600 font-medium min-w-[110px]"
        >
          <span>{badgeLabel}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 ml-auto transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-50 top-11 left-0 w-40 bg-white border border-blue-400 rounded-md shadow-lg py-1 max-h-60 overflow-y-auto">
            {/* All */}
            <div
              onClick={handleSelectAll}
              className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
            >
              <span className={selectedUAVersion === null ? "text-blue-500 font-medium" : "text-gray-700"}>
                All
              </span>
              {selectedUAVersion === null && <Check size={14} className="text-blue-500" />}
            </div>

            {/* UA version list */}
            {uaVersionList.map((v) => (
              <div
                key={v}
                onClick={() => handleSelectVersion(v)}
                className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                <span className={selectedUAVersion === v ? "text-blue-500 font-medium" : "text-gray-700"}>
                  UA {v}
                </span>
                {selectedUAVersion === v && <Check size={14} className="text-blue-500" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UA Text Input */}
      <div className="relative w-96">
        <input
          type="text"
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          className="w-full  h-10 pl-3 pr-16 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-blue-500 bg-white"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Copy"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button
            onClick={generateUserAgent}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Refresh UA"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAgentConfig;