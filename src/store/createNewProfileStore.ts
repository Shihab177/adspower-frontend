import { create } from "zustand";

type OS = "windows" | "mac" | "linux" | "android" | "ios";
type ProxySetting = "custom" | "saved" | "provider";
type ProxyType    = "no_proxy" |"ssh"| "https" | "http" | "socks5" ;
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
  userAgent: string; // ✅ new
  remark:string;

  proxySetting:  ProxySetting;
  proxyType:     ProxyType;
  proxyHost:     string;
  proxyPort:     string;
  proxyUsername: string;
  proxyPassword: string;
  changeIpUrl:   string;   // ✅ নতুন — Change IP URL
  ipChecker:     string;


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
  setUserAgent: (ua: string) => void; // ✅ new
  generateUserAgent: () => void; // ✅ new
  setRemark: (v: string) => void;


  setProxySetting:  (v: ProxySetting) => void;
  setProxyType:     (v: ProxyType) => void;
  setProxyHost:     (v: string) => void;
  setProxyPort:     (v: string) => void;
  setProxyUsername: (v: string) => void;
  setProxyPassword: (v: string) => void;
  setChangeIpUrl:   (v: string) => void;  // ✅ নতুন
  setIpChecker:     (v: string) => void;



  submitProfile: () => Promise<void>;
};

// ─── Version lists ────────────────────────────────────────────
// UA dropdown এ এই versions দেখাবে
export const SUN_UA_VERSIONS = [146, 145, 144]; // Chrome
export const FLOWER_UA_VERSIONS = [147, 141, 135]; // Firefox

// ─── Helpers ─────────────────────────────────────────────────
const autoChromeVersions = [144, 145, 146];
const autoFirefoxVersions = [135, 141, 147];

const getAutoVersion = (type: "chromium" | "firefox"): number => {
  const list = type === "chromium" ? autoChromeVersions : autoFirefoxVersions;
  return list[Math.floor(Math.random() * list.length)];
};

const getAutoOSVersion = (s: Pick<Store, "os">): string | number => {
  switch (s.os) {
    case "windows": return 11;
    case "mac":     return 26;
    case "linux":   return "ubuntu-24.04";
    case "android": return 15;
    case "ios":     return 26;
    default:        return "";
  }
};

const getSelectedOsVersion = (s: Store): string => {
  switch (s.os) {
    case "windows": return s.windowsVersion;
    case "mac":     return s.macVersion;
    case "linux":   return s.linuxVersion;
    case "android": return s.androidVersion;
    case "ios":     return s.iosVersion;
    default:        return "allVersion";
  }
};

// ─── UA Builder ───────────────────────────────────────────────
// versionStr = "auto" | "sun-146" | "firefox-141"
// uaVersion = specific number (dropdown থেকে select করলে) | undefined (auto)
export const buildUA = (
  browserType: "chromium" | "firefox",
  os: OS,
  versionStr: string,
  uaVersion?: number // dropdown থেকে specific version select হলে এটা use হবে
): string => {
  // version determine করো
  let version: number;
  if (uaVersion !== undefined) {
    // UA dropdown থেকে select করা version
    version = uaVersion;
  } else if (versionStr === "auto" || versionStr === "") {
    // auto → random
    version = getAutoVersion(browserType);
  } else {
    // "sun-146" → 146, "firefox-141" → 141
    const parts = versionStr.split("-");
    version = Number(parts[parts.length - 1]);
  }

  const osStrings: Record<OS, string> = {
    windows: "Windows NT 10.0; Win64; x64",
    mac:     "Macintosh; Intel Mac OS X 10_15_7",
    linux:   "X11; Linux x86_64",
    android: "Linux; Android 14; Pixel 8",
    ios:     "iPhone; CPU iPhone OS 17_4 like Mac OS X",
  };

  const osStr = osStrings[os];

  if (browserType === "chromium") {
    const build = Math.floor(Math.random() * 9000 + 1000);
    const patch = Math.floor(Math.random() * 200);
    const full  = `${version}.0.${build}.${patch}`;

    if (os === "android")
      return `Mozilla/5.0 (${osStr}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${full} Mobile Safari/537.36`;
    if (os === "ios")
      return `Mozilla/5.0 (${osStr}) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${full} Mobile/15E148 Safari/604.1`;
    return `Mozilla/5.0 (${osStr}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${full} Safari/537.36`;
  } else {
    if (os === "android")
      return `Mozilla/5.0 (Android 14; Mobile; rv:${version}.0) Gecko/${version}.0 Firefox/${version}.0`;
    if (os === "ios")
      return `Mozilla/5.0 (${osStr}) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/${version}.0 Mobile/15E148 Safari/604.1`;
    return `Mozilla/5.0 (${osStr}; rv:${version}.0) Gecko/20100101 Firefox/${version}.0`;
  }
};

// ─── Store ────────────────────────────────────────────────────
export const useProfileStore = create<Store>((set, get) => ({
  name:           "",
  browser:        "SunBrowser",
  sunVersion:     "auto",
  flowerVersion:  "auto",
  os:             "windows",
  windowsVersion: "allVersion",
  macVersion:     "allVersion",
  linuxVersion:   "allVersion",
  androidVersion: "allVersion",
  iosVersion:     "allVersion",
  // ✅ page load এ auto generate
  userAgent: buildUA("chromium", "windows", "auto"),
  remark:"",

  proxySetting:  "custom",
proxyType:     "no_proxy",
proxyHost:     "",
proxyPort:     "",
proxyUsername: "",
proxyPassword: "",
changeIpUrl:   "",
ipChecker:     "IP2Location",



  setName: (name) => set({ name }),

  // ✅ browser change → UA regenerate
  setBrowser: (browser) => {
    const state       = get();
    const browserType = browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, state.os, version);
    set({ browser, userAgent: ua });
  },

  // ✅ sunVersion change → UA regenerate
  setSunVersion: (sunVersion) => {
    const state = get();
    if (state.browser === "SunBrowser") {
      const ua = buildUA("chromium", state.os, sunVersion);
      set({ sunVersion, userAgent: ua });
    } else {
      set({ sunVersion });
    }
  },

  // ✅ flowerVersion change → UA regenerate
  setFlowerVersion: (flowerVersion) => {
    const state = get();
    if (state.browser === "FlowerBrowser") {
      const ua = buildUA("firefox", state.os, flowerVersion);
      set({ flowerVersion, userAgent: ua });
    } else {
      set({ flowerVersion });
    }
  },

  // ✅ OS change → UA regenerate
  setOS: (os) => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, os, version);
    set({ os, userAgent: ua });
  },

  // ✅ OS version change → UA regenerate
  setWindowsVersion: (windowsVersion) => {
    const state = get();
    const ua    = buildUA("chromium", "windows", state.sunVersion);
    set({ windowsVersion, ...(state.os === "windows" ? { userAgent: ua } : {}) });
  },

  setMacVersion: (macVersion) => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, "mac", version);
    set({ macVersion, ...(state.os === "mac" ? { userAgent: ua } : {}) });
  },

  setLinuxVersion: (linuxVersion) => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, "linux", version);
    set({ linuxVersion, ...(state.os === "linux" ? { userAgent: ua } : {}) });
  },

  setAndroidVersion: (androidVersion) => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, "android", version);
    set({ androidVersion, ...(state.os === "android" ? { userAgent: ua } : {}) });
  },

  setIosVersion: (iosVersion) => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, "ios", version);
    set({ iosVersion, ...(state.os === "ios" ? { userAgent: ua } : {}) });
  },

  setUserAgent: (userAgent) => set({ userAgent }),
  setRemark:  (remark) => set({ remark }),


  setProxySetting:  (proxySetting)  => set({ proxySetting }),
setProxyType:     (proxyType)     => set({ proxyType }),
setProxyHost:     (proxyHost)     => set({ proxyHost }),
setProxyPort:     (proxyPort)     => set({ proxyPort }),
setProxyUsername: (proxyUsername) => set({ proxyUsername }),
setProxyPassword: (proxyPassword) => set({ proxyPassword }),
setChangeIpUrl:   (changeIpUrl)   => set({ changeIpUrl }),
setIpChecker:     (ipChecker)     => set({ ipChecker }),




  // ✅ refresh button — same settings থেকে নতুন random UA
  generateUserAgent: () => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const version     = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;
    const ua          = buildUA(browserType, state.os, version);
    set({ userAgent: ua });
  },

  submitProfile: async () => {
    const state       = get();
    const browserType = state.browser === "SunBrowser" ? "chromium" : "firefox";
    const selectedVersion = state.browser === "SunBrowser" ? state.sunVersion : state.flowerVersion;

    const finalVersion =
      selectedVersion === "auto"
        ? getAutoVersion(browserType)
        : Number(selectedVersion.split("-")[1]);

    const currentOsVersion = getSelectedOsVersion(state);
    const finalOsVersion =
      currentOsVersion === "allVersion" || currentOsVersion === ""
        ? getAutoOSVersion(state)
        : currentOsVersion;



        const buildProxy = (state: Store) => {
  // No Proxy → null
  if (state.proxySetting === "custom" && state.proxyType === "no_proxy") {
    return null;
  }

  // Saved Proxies
  if (state.proxySetting === "saved") {
    return {
      setting: "saved" as const,
    };
  }

  // Proxy Provider
  if (state.proxySetting === "provider") {
    return {
      setting: "provider" as const,
    };
  }

  // Custom — HTTP / HTTPS / SOCKS4 / SOCKS5
  return {
    setting:     "custom" as const,
    type:        state.proxyType,
    host:        state.proxyHost     || null,
    port:        state.proxyPort     ? Number(state.proxyPort) : null,
    username:    state.proxyUsername || null,
    password:    state.proxyPassword || null,
    changeIpUrl: state.changeIpUrl   || null,  // ✅ Change IP URL
    ipChecker:   state.ipChecker,
  };
};

    const payload = {
      name: state.name,
      os: {
        type:    state.os,
        version: finalOsVersion,
      },
      browser: {
        type:        browserType,
        version:     finalVersion,
        versionMode: selectedVersion === "auto" ? "auto" : "manual",
      },
      userAgent: state.userAgent,
      remark:state.remark,
       proxy:     buildProxy(state),
    };

    console.log("SUBMIT PAYLOAD:", payload);
  },
}));