import { create } from "zustand";
type OS = "windows" | "mac" | "linux" | "android" | "ios";
type Store = {
  name: string;
  browser: "SunBrowser" | "FlowerBrowser";
  os: OS;
  sunVersion: string;
  flowerVersion: string;
  windowsVersion: string;
  macVersion: string;
  linuxVersion: string;
  androidVersion: string;
  iosVersion: string;

  setName: (name: string) => void;
  setBrowser: (b: "SunBrowser" | "FlowerBrowser") => void;
  setSunVersion: (v: string) => void;
  setFlowerVersion: (v: string) => void;
  setOS: (os: OS) => void;
  setWindowsVersion: (v: string) => void;
  setMacVersion: (v: string) => void;
  setLinuxVersion: (v: string) => void;
  setAndroidVersion: (v: string) => void;
  setIosVersion: (v: string) => void;

  submitProfile: () => Promise<void>;
};

const autoChromeVersions = [144, 145, 146];
const autoFirefoxVersions = [135, 141, 147];
const getAutoVersion = (type: "chromium" | "firefox") => {
  const list = type === "chromium" ? autoChromeVersions : autoFirefoxVersions;

  return list[Math.floor(Math.random() * list.length)];
};
const getAutoOSVersion = (s: Store) => {
  switch (s.os) {
    case "windows":
      return 11;
    case "mac":
      return 26;
    case "linux":
      return "ubuntu-24.04";
    case "android":
      return 15;
    case "ios":
      return 26;
    default:
      return "";
  }
};

const getSelectedOsVersion = (s: Store) => {
  switch (s.os) {
    case "windows":
      return s.windowsVersion;
    case "mac":
      return s.macVersion;
    case "linux":
      return s.linuxVersion;
    case "android":
      return s.androidVersion;
    case "ios":
      return s.iosVersion;
    default:
      return "allVersion";
  }
};

export const useProfileStore = create<Store>((set, get) => ({
  name: "",
  browser: "SunBrowser",
  sunVersion: "auto",
  flowerVersion: "auto",
  os: "windows",
  windowsVersion: "allVersion",
  macVersion: "allVersion",
  linuxVersion: "allVersion",
  androidVersion: "allVersion",
  iosVersion: "allVersion",

  setName: (name) => set({ name }),
  setBrowser: (browser) => set({ browser }),
  setSunVersion: (sunVersion) => set({ sunVersion }),
  setFlowerVersion: (flowerVersion) => set({ flowerVersion }),
  setOS: (os) => set({ os }),
  setWindowsVersion: (windowsVersion) => set({ windowsVersion }),
  setMacVersion: (macVersion) => set({ macVersion }),
  setLinuxVersion: (linuxVersion) => set({ linuxVersion }),
  setAndroidVersion: (androidVersion) => set({ androidVersion }),
  setIosVersion: (iosVersion) => set({ iosVersion }),

  submitProfile: async () => {
    const state = get();

    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";

    const selectedVersion =
      state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;

    const finalVersion =
      selectedVersion === "auto"
        ? getAutoVersion(browserType)
        : Number(selectedVersion.split("-")[1]);

    const currentOsVersion = getSelectedOsVersion(state);
    const finalOsVersion =
      currentOsVersion === "allVersion"
        ? getAutoOSVersion(state)
        : currentOsVersion;

    const payload = {
      name: state.name,
      os: {
        type: state.os,
        version: finalOsVersion,
      },
      browser: {
        type: browserType,
        version: finalVersion,
        versionMode: selectedVersion === "auto" ? "auto" : "manual",
      },
    };

    console.log("SUBMIT PAYLOAD:", payload);
  },
}));
