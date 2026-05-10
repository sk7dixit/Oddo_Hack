import {
  LayoutDashboard,
  Users,
  Map,
  BarChart3,
  Settings,
} from "lucide-react";

export const adminRoutes = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Trips",
    path: "/admin/trips",
    icon: Map,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
