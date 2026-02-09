"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: HomeIcon, dataTooltip: "Home" },
  { href: "/test-runs", label: "Test Runs", icon: ClipboardListIcon, dataTooltip: "Test Runs" },
  { href: "/analytics", label: "Analytics", icon: AnalyticsIcon, dataTooltip: "Analytics" },
  { href: "/dataset", label: "Dataset", icon: DatabaseIcon, dataTooltip: "Dataset" },
  { href: "/settings", label: "Settings", icon: GearIcon, dataTooltip: "Settings" },
];

function HomeIcon() {
  return (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ClipboardListIcon() {
  return (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 h-16">
        <div className="px-6 h-full flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#111827]">
            Pokant
          </Link>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-[#E5E7EB]">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-sm text-[#6B7280]">Voice Bot:</span>
            <span className="text-sm font-medium text-[#111827]">ConstructBot v2</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/settings" className="flex items-center gap-2 text-[#374151] hover:text-[#111827] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link href="/signin" className="flex items-center gap-2 text-[#374151] hover:text-[#111827] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar fixed left-0 top-16 bottom-0 w-[200px] bg-white border-r border-[#E5E7EB] transition-all duration-300 z-40 flex flex-col ${sidebarCollapsed ? "w-16" : ""}`}>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item flex items-center px-4 py-3 text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] transition-all border-l-3 border-transparent ${isActive ? "bg-[#EFF6FF] text-[#3B82F6] border-[#3B82F6]" : ""} ${sidebarCollapsed ? "justify-center px-3" : ""}`}
                title={sidebarCollapsed ? item.dataTooltip : undefined}
              >
                <Icon />
                {!sidebarCollapsed && <span className="text-sm ml-3">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white border border-[#E5E7EB] rounded-md p-2 hover:bg-[#F9FAFB] transition-all"
          onClick={() => setSidebarCollapsed((c) => !c)}
        >
          <svg className={`w-4 h-4 text-[#6B7280] transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <main className={`main-content transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-[200px]"}`} style={{ minHeight: "calc(100vh - 64px)" }}>
        {children}
      </main>

      <style jsx>{`
        .icon {
          width: 20px;
          height: 20px;
          min-width: 20px;
        }
        .nav-item {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
