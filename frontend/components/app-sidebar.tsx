"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
    CommandIcon, 
    ComputerTerminalIcon, 
    BookOpen02Icon, 
    Settings05Icon, 
    UserIcon,
    Shield01Icon,
    LockIcon
} from "@hugeicons/core-free-icons"

export function AppSidebar({ user, ...props }: any) {
  const roleName = user?.role?.name || "";

  const navMain = [
    {
      title: "Imaging PACS",
      url: "/",
      icon: (
        <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={2} />
      ),
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Device Connectivity",
          url: "/devices",
        },
        {
          title: "Study Worklist",
          url: "/worklist",
        },
        {
          title: "SatuSehat Sync",
          url: "/satusehat",
        },
      ],
    },
    // Only show for ROOT and SUPER-ADMIN
    ...((roleName === 'ROOT' || roleName === 'SUPER-ADMIN') ? [{
        title: "User & Roles",
        url: "/admin/users",
        icon: (
          <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
        ),
        items: [
          {
            title: "User Management",
            url: "/admin/users",
          },
          {
            title: "Roles Management",
            url: "/admin/roles",
          },
          {
            title: "Permissions",
            url: "/admin/permissions",
          },
        ],
    }] : []),
    {
      title: "Help & Docs",
      url: "#",
      icon: (
        <HugeiconsIcon icon={BookOpen02Icon} strokeWidth={2} />
      ),
      items: [
        {
          title: "User Guide",
          url: "/docs/orthanc-api",
        },
        {
          title: "Support",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: (
        <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
      ),
      // Hide settings if not ROOT/SUPER-ADMIN
      hidden: !(roleName === 'ROOT' || roleName === 'SUPER-ADMIN'),
      items: [
        {
          title: "Pengaturan",
          url: "/settings",
        },
        {
          title: "Cek Request Resource Pasient by NIK",
          url: "/settings/resource-check",
        },
        {
          title: "Testing Integrasi",
          url: "/settings/testing",
        },
      ],
    },
  ].filter(item => !(item as any).hidden);

  const sidebarData = {
    user: {
      name: user?.name || "User",
      email: user?.email || "",
      avatar: user?.image || "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Quantum PACS",
        logo: (
          <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />
        ),
        plan: roleName,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
