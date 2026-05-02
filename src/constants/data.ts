import {
  PieChart,
  PlusCircle,
  LayoutGrid,
  Folder,
  Globe,
  Puzzle,
  Trash2,
  Smartphone,
  LucideIcon,
} from "lucide-react";

export type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    id: "New profile",
    label: "New Profiles",
    icon: PlusCircle,
    path: "/dashboard/new-profiles",
  },
  {
    id: "profiles",
    label: "Profiles",
    icon: LayoutGrid,
    path: "/dashboard/profiles",
  },
  {
    id: "groups",
    label: "Groups",
    icon: Folder,
    path: "/dashboard/groups",
  },
  {
    id: "proxies",
    label: "Proxies",
    icon: Globe,
    path: "/dashboard/proxies",
  },
  {
    id: "extensions",
    label: "Extensions",
    icon: Puzzle,
    path: "/dashboard/extensions",
  },
  {
    id: "trash",
    label: "Trash",
    icon: Trash2,
    path: "/dashboard/trash",
  },
  {
    id: "cloud-number",
    label: "Cloud Number",
    icon: Smartphone,
    path: "/dashboard/cloud-number",
  },
];

export const newProfileMenuItems = [
  { id: 'general', label: 'General' },
  { id: 'proxy', label: 'Proxy' },
  { id: 'platform', label: 'Platform' },
  { id: 'fingerprint', label: 'Fingerprint' },
  { id: 'advanced', label: 'Advanced' }
];
