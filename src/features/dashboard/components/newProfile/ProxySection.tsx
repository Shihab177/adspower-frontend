"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Info, RefreshCw, ShoppingBag } from "lucide-react";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useProfileStore } from "@/store/createNewProfileStore";
import api from "@/lib/api";
type ProxySetting = "custom" | "saved" | "provider";
const proxyTabs: { id: ProxySetting; label: string }[] = [
  { id: "custom", label: "Custom" },
  { id: "saved", label: "Saved Proxies" },
  { id: "provider", label: "Proxy Provider" },
];
type proxyType = "no_proxy" | "ssh" | "https" | "http" | "socks5";
const proxyOptions: { value: proxyType; label: string }[] = [
  { value: "no_proxy", label: "No Proxy (Local network)" },
  { value: "ssh", label: "SSH" },
  { value: "https", label: "HTTPS" },
  { value: "http", label: "HTTP" },
  { value: "socks5", label: "Socks5" },
];
const ipCheckers: { value: string; label: string }[] = [
  { value: "ip2location", label: "IP2Location" },
  { value: "ip-api", label: "ip-api" },
  { value: "ipfoxy", label: "IPFoxy" },
];
const ProxySection = () => {
  const [proxyOpen, setProxyOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [selectedProxy, setSelectedProxy] = useState(
    "No Proxy (Local network)",
  );
  const [loading, setLoading] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<{
    ip: string;
    country: string;
  } | null>(null);

  // State যোগ করুন
  const [proxyChecking, setProxyChecking] = useState(false);
  const [proxyResult, setProxyResult] = useState<{
    success: boolean;
    ip?: string;
    country?: string;
    region?: string;
    city?: string;
  } | null>(null);

  const [selectedProvider, setSelectedProvider] = useState("IP2Location");
  const proxyRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<HTMLDivElement>(null);

  const proxySetting = useProfileStore((s) => s.proxySetting);
  const setProxySetting = useProfileStore((s) => s.setProxySetting);
  const proxyType = useProfileStore((s) => s.proxyType);
  const setProxyType = useProfileStore((s) => s.setProxyType);
  const proxyHost = useProfileStore((s) => s.proxyHost);
  const setProxyHost = useProfileStore((s) => s.setProxyHost);
  const proxyPort = useProfileStore((s) => s.proxyPort);
  const setProxyPort = useProfileStore((s) => s.setProxyPort);
  const proxyUsername = useProfileStore((s) => s.proxyUsername);
  const setProxyUsername = useProfileStore((s) => s.setProxyUsername);
  const proxyPassword = useProfileStore((s) => s.proxyPassword);
  const setProxyPassword = useProfileStore((s) => s.setProxyPassword);
  const changeIpUrl = useProfileStore((s) => s.changeIpUrl);
  const setChangeIpUrl = useProfileStore((s) => s.setChangeIpUrl);
  const ipChecker = useProfileStore((s) => s.ipChecker);
  const setIpChecker = useProfileStore((s) => s.setIpChecker);

  const handleCheckNetwork = async () => {
    setLoading(true);
    setNetworkInfo(null);
    try {
      const response = await fetch("http://ip-api.com/json/");
      const data = await response.json();

      if (data.status === "success") {
        setNetworkInfo({
          ip: data.query, // রিয়েল আইপি
          country: data.countryCode.toLowerCase(), // কান্ট্রি কোড (যেমন: bd)
        });
      } else {
        console.error("Network check failed");
      }
    } catch (error) {
      console.error("Error fetching IP info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckProxy = async () => {
    if (!proxyHost || !proxyPort) return;

    setProxyChecking(true);
    setProxyResult(null);

    try {
      const { data } = await api.post("/proxy/check-proxy", {
        type: proxyType,
        host: proxyHost,
        port: Number(proxyPort),
        username: proxyUsername || null,
        password: proxyPassword || null,
      });

      if (data.success) {
        setProxyResult({
          success: true,
          ip: data.ip,
          country: data.country,
          region: data.region,
          city: data.city,
        });
      } else {
        setProxyResult({ success: false });
      }
    } catch {
      setProxyResult({ success: false });
    } finally {
      setProxyChecking(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (proxyRef.current && !proxyRef.current.contains(target)) {
        setProxyOpen(false);
      }

      if (providerRef.current && !providerRef.current.contains(target)) {
        setProviderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-6 ">
      {/* Name */}
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        Proxy setting
      </Label>
      <div className="flex items-center  gap-2">
        <div className="h-10  flex items-center rounded-md  bg-[#F2F2F2] p-1">
          {proxyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setProxySetting(tab.id)}
              className={`h-full px-5 text-sm font-medium transition-all duration-300 rounded-sm  ${
                proxySetting === tab.id
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="flex h-8.5 items-center gap-2 px-2 py-1.5 border border-blue-600 rounded-md text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200">
          <ShoppingBag size={16} strokeWidth={2.5} />
          <span className="text-xs">Buy Proxy</span>
        </button>
      </div>
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        Proxy type
      </Label>
      <div ref={proxyRef} className="flex items-center  gap-3  bg-white ">
        {/* Proxy Dropdown Container */}
        <div className="relative w-80">
          <div
            onClick={() => setProxyOpen(!proxyOpen)}
            className={`flex items-center justify-between px-4 h-10 cursor-pointer border rounded-md transition-all ${
              proxyOpen
                ? "border-blue-500 "
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <span className="text-sm text-slate-700 font-medium">
              {proxyType}
            </span>
            {proxyOpen ? (
              <ChevronUp size={18} className="text-gray-400" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </div>

          {/* Dropdown Menu */}
          {proxyOpen && (
            <div className="absolute z-50 w-full bg-white border-x border-b border-blue-500 rounded-md shadow-lg overflow-hidden">
              {proxyOptions.map((option) => (
                <div
                  key={option.label}
                  onClick={() => {
                    setProxyType(option.value);
                    setProxyOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    proxyType === option.value
                      ? "text-blue-600 bg-blue-50/50 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check Network Button */}

        <div className="relative">
          <button
            onClick={handleCheckNetwork}
            disabled={loading}
            className="h-9 px-4 border border-gray-300 rounded-md text-sm text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            {loading ? "Checking..." : "Check the network"}
          </button>
          {networkInfo && (
            <div
              className="absolute left-0 top-9  text-[12px] font-semibold mt-1 leading-tight"
              style={{ color: "#a5d63f" }}
            >
              <p>IP:{networkInfo.ip}</p>
              <p>Country/Region:{networkInfo.country}</p>
            </div>
          )}
        </div>
      </div>
      <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
        IP checker
      </Label>
      <div ref={providerRef} className="relative w-72">
        <div
          onClick={() => {
            setProviderOpen(!providerOpen);
            setProxyOpen(false);
          }}
          className={`flex items-center justify-between px-3 h-10 cursor-pointer border rounded-md transition-all ${
            providerOpen ? "border-blue-500  " : "border-gray-300"
          }`}
        >
          <span className="text-sm text-slate-700">{ipChecker}</span>
          <div className="flex items-center gap-2">
            <Info size={16} className="text-gray-300" />
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${providerOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {providerOpen && (
          <div className="absolute z-50 w-full bg-white border-x border-b border-blue-500 rounded-md shadow-lg overflow-hidden">
            {ipCheckers.map((p) => (
              <div
                key={p.label}
                onClick={() => {
                  setIpChecker(p.value);
                  setProviderOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-50 ${ipChecker === p.value ? "text-blue-600 bg-blue-50 font-medium" : "text-slate-700"}`}
              >
                {p.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {(proxyType === "http" ||
        proxyType === "https" ||
        proxyType === "socks5" ||
        proxyType === "ssh") && (
        <>
          <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
            Host:Port
          </Label>
          <div className="flex items-center gap-3 ">
            <div className="flex items-center border border-gray-300 rounded-md bg-white focus-within:border-blue-500 transition-colors">
              <input
                type="text"
                value={proxyHost}
                onChange={(e) => setProxyHost(e.target.value)}
                placeholder="Please enter host"
                className="h-10 px-3 text-sm outline-none bg-transparent w-52 placeholder-gray-400"
              />
              <span className="text-gray-400 text-sm px-1">:</span>
              <input
                type="text"
                value={proxyPort}
                onChange={(e) => setProxyPort(e.target.value)}
                placeholder="Port"
                className="h-10 px-2 text-sm outline-none bg-transparent w-16 placeholder-gray-400"
              />
              <div className="border-l border-gray-200 h-6 mx-1" />
              <button className="px-1 pr-2 text-gray-400 hover:text-gray-600">
                <Info size={15} />
              </button>
            </div>

            <div className="flex gap-3 relative">
              {/* Check Proxy Button */}
              <button
                onClick={handleCheckProxy}
                disabled={proxyChecking || !proxyHost || !proxyPort}
                className="h-8.5 px-4 border border-gray-300 rounded-md text-sm text-gray-600 hover:border-blue-400 hover:text-blue-500 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {proxyChecking ? "Checking..." : "Check Proxy"}
              </button>

              {/* Copy button — ছবিতে আছে */}
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <Copy size={16} />
              </button>
              {/* Result — ছবির মতো green text */}
              {proxyResult && (
                <div
                  className="absolute right-0 top-9 text-xs font-semibold leading-5"
                  style={{ color: "#a5d63f" }}
                >
                  {proxyResult.success ? (
                    <>
                      <p>Connection test passed!</p>
                      <p>IP:{proxyResult.ip}</p>
                      <p>Country/Region:{proxyResult.country}</p>
                      <p>Region:{proxyResult.region}</p>
                      <p>City:{proxyResult.city}</p>
                    </>
                  ) : (
                    <p className="text-red-500">Connection test failed!</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
            Proxy
            <br />
            username
          </Label>
          <div className="flex items-center gap-3 ">
            <input
              type="text"
              value={proxyUsername}
              onChange={(e) => setProxyUsername(e.target.value)}
              placeholder="Please enter user name(Optional)"
              className="w-72 h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white"
            />
          </div>
          <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
            Proxy
            <br />
            Password
          </Label>
          <div className="flex items-center gap-3 ">
            <input
              type="text"
              value={proxyPassword}
              onChange={(e) => setProxyPassword(e.target.value)}
              placeholder="Please enter user name(Optional)"
              className="w-72 h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white"
            />
          </div>
        </>
      )}
      {(proxyType === "http" ||
        proxyType === "https" ||
        proxyType === "socks5") && (
        <>
          <Label className="flex justify-end w-28 font-semibold text-sm text-gray-600 ">
            Change IP URL
          </Label>
          <div className="flex items-center gap-3 ">
            <div className="flex items-center border border-gray-300 rounded-md bg-white focus-within:border-blue-500 transition-colors w-72">
              <input
                type="text"
                placeholder="Enter Change IP URL"
                className="flex-1 h-10 px-4 text-sm outline-none bg-transparent placeholder-gray-400"
              />
              <div className="flex items-center gap-1 pr-3">
                <button className="text-blue-400 hover:text-blue-600 transition-colors">
                  <RefreshCw size={15} />
                </button>
                <Info size={15} className="text-gray-400" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProxySection;
