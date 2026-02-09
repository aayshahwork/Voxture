"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const COLORS = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  sidebar: "#111111",
  sidebarText: "rgba(255,255,255,0.6)",
  sidebarTextActive: "#FFFFFF",
  primaryText: "#111827",
  bodyText: "#374151",
  secondaryText: "#6B7280",
  tertiaryText: "#9CA3AF",
  border: "#E5E7EB",
  divider: "#F3F4F6",
  accent: "#2563EB",
  success: "#059669",
  danger: "#DC2626",
  warning: "#D97706",
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: BarChartIcon, dataTooltip: "Home" },
  { href: "/test-runs", label: "Live Runs", icon: ClipboardListIcon, dataTooltip: "Live Runs" },
  { href: "/analytics", label: "Analytics", icon: AnalyticsBarIcon, dataTooltip: "Analytics" },
  { href: "/dataset", label: "Dataset", icon: DatabaseIcon, dataTooltip: "Dataset" },
  { href: "/settings", label: "Settings", icon: GearIcon, dataTooltip: "Settings" },
];

function BarChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-6" />
      <path d="M22 20h-20" />
    </svg>
  );
}

function ClipboardListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function AnalyticsBarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      <path d="m19 12 2-1-1-3-2 .2-.8-1.4 1.3-1.6-2.3-2.3-1.6 1.3L12 3l-1-2-3 1 .2 2-1.4.8-1.6-1.3L3 5.8l1.3 1.6L3.5 9 1 10l1 3 2-.2.8 1.4-1.3 1.6 2.3 2.3 1.6-1.3 1.4.8-.2 2 3 1 1-2 1.4-.8 1.6 1.3 2.3-2.3-1.3-1.6.8-1.4 2 .2 1-3Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

export default function AppShell({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="dashboard-root">
      <aside className={`sidebar ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <div>
          <div className="brand">Pokant</div>
          <div className="sidebar-divider" />
          <nav>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname != null
                  ? pathname === item.href || (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard"))
                  : item.href === "/dashboard";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  title={sidebarCollapsed ? item.dataTooltip : undefined}
                >
                  <Icon />
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              );
            })}
            <div className="sidebar-divider" style={{ marginTop: 14, marginBottom: 14 }} />
            <Link
              href="/signin"
              className="sidebar-item sidebar-item-logout"
              title={sidebarCollapsed ? "Logout" : undefined}
            >
              <LogoutIcon />
              <span className="sidebar-label">Logout</span>
            </Link>
          </nav>
        </div>
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={() => setSidebarCollapsed((c) => !c)}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="sidebar-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="sidebar-footer">
          <div className="sidebar-voice-bot">
            <span className="sidebar-voice-pulse" />
            <span className="sidebar-voice-label">Voice Bot:</span>
            <span className="sidebar-voice-name">ConstructBot v2</span>
          </div>
          <div className="sidebar-version">v0.1 beta</div>
        </div>
      </aside>
      <main className={`main-content ${sidebarCollapsed ? "main-content-collapsed" : ""}`}>
        <div className="content-wrap is-visible">{children}</div>
      </main>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background: ${COLORS.background};
          color: ${COLORS.primaryText};
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .dashboard-root {
          height: 100vh;
          background: ${COLORS.background};
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 220px;
          height: 100vh;
          background: ${COLORS.sidebar};
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 16px;
          transition: width 200ms ease;
        }
        .sidebar.sidebar-collapsed {
          width: 64px;
          padding: 20px 12px;
        }
        .sidebar.sidebar-collapsed .sidebar-label {
          opacity: 0;
          width: 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .sidebar.sidebar-collapsed .sidebar-item {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
        }
        .sidebar-chevron {
          transition: transform 200ms ease;
        }
        .sidebar.sidebar-collapsed .sidebar-chevron {
          transform: rotate(180deg);
        }
        .sidebar-collapse-btn {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: ${COLORS.sidebarText};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-collapse-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .sidebar-label {
          transition: opacity 150ms ease;
        }
        .sidebar-voice-bot {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: ${COLORS.sidebarText};
        }
        .sidebar-voice-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${COLORS.success};
          flex-shrink: 0;
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .sidebar-voice-name {
          font-weight: 500;
          color: ${COLORS.sidebarTextActive};
        }
        .sidebar-item {
          text-decoration: none;
          width: 100%;
          border: 0;
          background: transparent;
          color: ${COLORS.sidebarText};
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          font-size: 13px;
          font-weight: 500;
          padding: 9px 8px;
          border-radius: 6px;
          cursor: pointer;
        }
        .sidebar-item:hover {
          color: ${COLORS.sidebarTextActive};
          background: rgba(255, 255, 255, 0.05);
        }
        .sidebar-item.active {
          color: ${COLORS.sidebarTextActive};
          background: rgba(255, 255, 255, 0.07);
        }
        .sidebar-item-logout {
          margin-top: 4px;
        }
        .brand {
          color: #fff;
          font-size: 18px;
          line-height: 1.2;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 10px;
        }
        .sidebar-icon {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }
        .sidebar-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 12px;
        }
        .main-content {
          margin-left: 220px;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          transition: margin-left 200ms ease;
        }
        .main-content.main-content-collapsed {
          margin-left: 64px;
        }
        .content-wrap {
          max-width: 1100px;
          padding: 32px;
          opacity: 1;
          transition: opacity 150ms ease;
        }
        .content-wrap.is-visible {
          opacity: 1;
        }
        .screen-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .screen-top {
          margin-bottom: 4px;
        }
        .page-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: ${COLORS.primaryText};
          line-height: 1.3;
        }
        .summary-line {
          margin-top: 8px;
          font-size: 14px;
          color: ${COLORS.bodyText};
        }
        .metrics-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .metrics-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .metric-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
        }
        .metric-value-prefix,
        .metric-value-suffix {
          font-size: 28px;
          font-weight: 700;
          color: ${COLORS.primaryText};
        }
        .metric-value-prefix {
          font-size: 18px;
          font-weight: 500;
          color: ${COLORS.secondaryText};
        }
        .header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .transcript-box {
          background: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 16px;
          border: 1px solid ${COLORS.border};
        }
        .transcript-title {
          margin: 0 0 16px;
          font-size: 13px;
          font-weight: 600;
          color: ${COLORS.primaryText};
        }
        .transcript-messages {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .transcript-row {
          display: flex;
          gap: 12px;
        }
        .transcript-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .transcript-avatar.avatar-bot {
          background: ${COLORS.accent};
          color: #fff;
        }
        .transcript-avatar.avatar-patient {
          background: #d1d5db;
          color: #4b5563;
        }
        .transcript-role {
          margin: 0 0 4px;
          font-size: 12px;
          font-weight: 500;
          color: ${COLORS.primaryText};
        }
        .transcript-text {
          margin: 0;
          font-size: 14px;
          color: ${COLORS.bodyText};
          line-height: 1.45;
        }
        .transcript-end-note {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 500;
          color: ${COLORS.danger};
        }
        .failure-pattern-metrics {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 16px;
          font-size: 14px;
          color: ${COLORS.bodyText};
        }
        .failure-pattern-metric {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .card {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: 8px;
          padding: 20px;
        }
        .metric-label {
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 500;
          color: ${COLORS.secondaryText};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .metric-value-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .metric-value-lg {
          font-size: 28px;
          font-weight: 700;
          color: ${COLORS.primaryText};
          line-height: 1.1;
        }
        .metric-subtext {
          margin-top: 6px;
          font-size: 13px;
          color: ${COLORS.secondaryText};
        }
        .sparkline {
          display: block;
          width: 88px;
          height: 28px;
          margin-top: 8px;
        }
        .section-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .section-header {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: ${COLORS.primaryText};
        }
        .chart-wrap {
          width: 100%;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th {
          padding: 10px 8px;
          text-align: left;
          font-size: 12px;
          font-weight: 500;
          color: ${COLORS.secondaryText};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid ${COLORS.border};
        }
        .data-table td {
          padding: 11px 8px;
          font-size: 14px;
          font-weight: 400;
          color: ${COLORS.bodyText};
          border-bottom: 1px solid ${COLORS.divider};
          vertical-align: middle;
        }
        .data-table tbody tr:hover {
          background: #f9fafb;
        }
        .row-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .tag {
          display: inline-flex;
          align-items: center;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          padding: 2px 8px;
          line-height: 1.4;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .link-btn {
          border: 0;
          background: transparent;
          color: ${COLORS.accent};
          cursor: pointer;
          padding: 0;
          font-size: 13px;
          font-weight: 500;
        }
        .card-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .card-title {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: ${COLORS.primaryText};
          line-height: 1.4;
        }
        .cluster-divider {
          margin: 14px 0;
          height: 1px;
          background: ${COLORS.divider};
        }
        .cluster-section {
          margin-bottom: 12px;
        }
        .cluster-label {
          margin-bottom: 6px;
          font-size: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: 500;
          color: ${COLORS.secondaryText};
        }
        .body-text {
          margin: 0;
          font-size: 14px;
          font-weight: 400;
          color: ${COLORS.bodyText};
          line-height: 1.5;
        }
        .secondary-text {
          margin: 0;
          font-size: 13px;
          font-weight: 400;
          color: ${COLORS.secondaryText};
          line-height: 1.45;
        }
        .mono-block {
          margin: 0;
          border: 1px solid ${COLORS.border};
          background: #f9fafb;
          border-radius: 6px;
          padding: 12px;
          white-space: pre-wrap;
          font-family: "SF Mono", "Menlo", "Monaco", monospace;
          font-size: 13px;
          color: ${COLORS.bodyText};
          line-height: 1.45;
        }
        .button-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn {
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-primary {
          border: 1px solid ${COLORS.accent};
          background: ${COLORS.accent};
          color: #fff;
        }
        .btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
        }
        .btn-secondary {
          border: 1px solid #d1d5db;
          background: #fff;
          color: ${COLORS.bodyText};
        }
        .btn-secondary:hover {
          background: #f9fafb;
        }
        .tabs-row {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid ${COLORS.divider};
        }
        .tab-btn {
          border: 0;
          border-bottom: 2px solid transparent;
          background: transparent;
          padding: 0 0 8px;
          font-size: 13px;
          font-weight: 500;
          color: ${COLORS.secondaryText};
          cursor: pointer;
        }
        .tab-btn.active {
          color: ${COLORS.accent};
          border-bottom-color: ${COLORS.accent};
        }
        .test-columns-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 8px;
        }
        .col-head {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: ${COLORS.secondaryText};
        }
        .recommendation {
          margin-top: 14px;
          border-radius: 6px;
          border: 1px solid ${COLORS.border};
          padding: 12px;
        }
        .funnel-labels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 14px;
          margin-top: 8px;
        }
        .funnel-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-size: 13px;
        }
        .verification-source {
          margin-top: 10px;
          font-size: 12px;
          color: ${COLORS.tertiaryText};
        }
        .button-row .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        @media (max-width: 1200px) {
          .metrics-grid-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .metrics-grid-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .metrics-grid-3 {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 980px) {
          .sidebar {
            width: 200px;
          }
          .main-content {
            margin-left: 200px;
          }
          .content-wrap {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
