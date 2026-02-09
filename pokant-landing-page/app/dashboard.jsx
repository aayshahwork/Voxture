"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

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

// Dashboard (dashboard.html) KPIs and chart
const DASHBOARD_KPIS = [
  {
    id: "success-rate",
    label: "Success Rate",
    value: "64",
    valueSuffix: "%",
    subtext: "Industry avg: 78%",
    badge: "Below Industry",
    badgeTone: "danger",
  },
  {
    id: "total-calls",
    label: "Total Calls",
    value: "1,247",
    subtext: "Last 30 days",
  },
  {
    id: "revenue-lost",
    label: "Revenue Lost",
    value: "$8,000",
    valuePrefix: "/mo ",
    subtext: "From failed conversions",
    badge: "High Risk",
    badgeTone: "danger",
  },
];

const SUCCESS_RATE_TREND_DATA = [
  { week: "Week 1", rate: 68 },
  { week: "Week 2", rate: 66 },
  { week: "Week 3", rate: 62 },
  { week: "Week 4", rate: 64 },
];

// Single failure pattern from dashboard.html (Customer Changes Mind Mid-Conversation)
const FAILURE_PATTERN = {
  title: "Customer Changes Mind Mid-Conversation",
  badge: "Critical Pattern",
  badgeTone: "danger",
  metric1: "Occurs in 23% of failed calls",
  metric2: "Avg at 4:32 into call",
  transcript: [
    { role: "Bot", text: "Great! I've confirmed your appointment for next Tuesday at 2 PM. Can I help you with anything else today?" },
    { role: "Patient", text: "Actually, you know what, let me think about this and call back later." },
    { role: "Bot", text: "Of course! Is there anything specific you'd like to reconsider?" },
    { role: "Patient", text: "No, I just need to check my schedule again. Thanks.", endNote: "Call ended - Appointment cancelled" },
  ],
};

const OVERVIEW_METRICS = [
  {
    id: "total-calls",
    label: "Total Calls",
    value: "1,247",
    subtext: "Last 30 days",
    sparkline: [18, 19, 20, 20, 22, 25, 26],
  },
  {
    id: "booking-rate",
    label: "Booking Rate",
    value: "78%",
    subtext: "Last 30 days",
    delta: "â†‘ 17% from baseline",
    deltaColor: COLORS.success,
  },
  {
    id: "recovered-revenue",
    label: "Recovered Revenue",
    value: "$14,300/mo",
    subtext: "From deployed prompt wins",
  },
  {
    id: "active-tests",
    label: "Active Tests",
    value: "2",
    subtext: "1 winning, 1 collecting data",
    dot: COLORS.warning,
  },
];

const BOOKING_RATE_DATA = [
  { date: "Jan 6", rate: 62 },
  { date: "Jan 13", rate: 64 },
  { date: "Jan 20", rate: 67 },
  { date: "Jan 27", rate: 71 },
  { date: "Jan 31", rate: 74 },
  { date: "Feb 3", rate: 78 },
];

const FAILURE_CLUSTERS_TABLE = [
  {
    cluster: "Insurance verification missing for procedures",
    callsAffected: "87 (34%)",
    impact: "-$8,200/mo",
    status: "Fix ready",
    statusType: "info",
    action: "View",
  },
  {
    cluster: "After-hours callers not offered callback",
    callsAffected: "43 (17%)",
    impact: "-$3,100/mo",
    status: "Testing",
    statusType: "warning",
  },
  {
    cluster: "Spanish-speaking callers get English-only flow",
    callsAffected: "28 (11%)",
    impact: "-$2,400/mo",
    status: "Detected",
    statusType: "neutral",
  },
];

const CLUSTERS = [
  {
    id: "cluster-1",
    title: "#1 Â· Insurance verification missing for procedures",
    tag: "87 calls Â· 34%",
    tagType: "danger",
    pattern:
      "Caller mentions a specific dental procedure (crown, implant, root canal, extraction, bridge). Agent proceeds to schedule without verifying insurance coverage.",
    impact:
      "62% of these callers don't show up. No-show rate is 3Ã— the baseline. Estimated revenue loss: $8,200/mo.",
    fix: `Add to prompt section 3:\n"When patient mentions a specific procedure (crown, implant, root canal,\nextraction, bridge), ALWAYS ask: 'Do you have dental insurance? I want to\nmake sure we verify your coverage before your visit so there are no surprises.'"`,
    simulated:
      "Tested against 87 historical failures â†’ 71 of 87 (82%) would have continued to booking â†’ Estimated recovery: ",
    recovery: "+$6,700/mo",
    footer: "3 example calls â–¸",
  },
  {
    id: "cluster-2",
    title: "#2 Â· After-hours callers not offered callback",
    tag: "43 calls Â· 17%",
    tagType: "warning",
    summary: "Impact: -$3,100/mo Â· Status: A/B test running (day 3 of 7)",
  },
  {
    id: "cluster-3",
    title: "#3 Â· Spanish-speaking callers get English-only flow",
    tag: "28 calls Â· 11%",
    tagType: "neutral",
    summary: "Impact: -$2,400/mo Â· Status: Analyzing",
  },
];

const AB_TESTS_ACTIVE = [
  {
    id: "test-1",
    name: "Insurance Verification for Procedures",
    badge: "Winning âœ“",
    badgeType: "success",
    meta: "Started Jan 29 Â· Day 5 of 7 Â· 50/50 split Â· Confidence: 94.2%",
    rows: [
      { metric: "Calls", control: "128", variant: "131", delta: "-", positive: false },
      { metric: "Booking rate", control: "61%", variant: "78%", delta: "+17% â†‘", positive: true },
      { metric: "Show-up rate", control: "74%", variant: "89%", delta: "+15% â†‘", positive: true },
      { metric: "Revenue / call", control: "$38", variant: "$54", delta: "+42% â†‘", positive: true },
    ],
    recommendation:
      "Recommendation: Promote variant. Estimated impact: +$6,400/mo revenue.",
    recommendationTone: "info",
    actions: ["Promote Variant", "Continue Testing"],
  },
  {
    id: "test-2",
    name: "After-hours callback offer",
    badge: "Collecting data",
    badgeType: "warning",
    meta: "Started Feb 1 Â· Day 3 of 7 Â· 50/50 split Â· Confidence: 67.8%",
    rows: [
      { metric: "Calls", control: "54", variant: "51", delta: "-", positive: false },
      { metric: "Booking rate", control: "41%", variant: "52%", delta: "+11% â†‘", positive: true },
      { metric: "Revenue / call", control: "$22", variant: "$31", delta: "+41% â†‘", positive: true },
    ],
    recommendation: "Not yet significant. 4 more days of data needed.",
    recommendationTone: "neutral",
    actions: ["Stop Test"],
  },
];

const OUTCOME_METRICS = [
  { label: "Calls Handled", value: "259", subtext: "This week" },
  {
    label: "Appointments Verified",
    value: "198",
    subtext: "Confirmed in PMS",
    checked: true,
  },
  { label: "Patients Showed Up", value: "176", subtext: "88.9% show rate" },
  {
    label: "Revenue Generated",
    value: "$31,680",
    subtext: "â†‘ $7,560 vs last week",
    accent: COLORS.success,
  },
];

const OUTCOMES_FUNNEL = [
  { stage: "Calls", value: 259, label: "259 calls" },
  { stage: "Booked", value: 198, label: "198 booked (76%)", conversion: "76%" },
  { stage: "Showed", value: 176, label: "176 showed up (89% of booked)", conversion: "89%" },
  { stage: "Revenue", value: 168, label: "$31,680 revenue", conversion: "Revenue" },
];

const VERIFICATIONS = [
  {
    time: "Today 2:14 PM",
    caller: "(630) ***-**42",
    outcome: "Crown consultation booked",
    verifiedIn: "Open Dental",
    revenue: "$280",
    status: "Verified",
    dot: COLORS.success,
  },
  {
    time: "Today 1:47 PM",
    caller: "(408) ***-**18",
    outcome: "Cleaning + exam booked",
    verifiedIn: "Open Dental",
    revenue: "$180",
    status: "Verified",
    dot: COLORS.success,
  },
  {
    time: "Today 12:33 PM",
    caller: "(510) ***-**91",
    outcome: "Implant consultation booked",
    verifiedIn: "Open Dental",
    revenue: "$350",
    status: "Pending check-in",
    dot: COLORS.warning,
  },
  {
    time: "Today 11:08 AM",
    caller: "(925) ***-**64",
    outcome: "Extraction booked",
    verifiedIn: "Open Dental",
    revenue: "$220",
    status: "Verified",
    dot: COLORS.success,
  },
  {
    time: "Today 9:22 AM",
    caller: "(650) ***-**77",
    outcome: "Failed - caller hung up",
    verifiedIn: "-",
    revenue: "$0",
    status: "No booking",
    dot: COLORS.danger,
  },
];

// Sidebar nav links (same as dashboard.html)
const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: BarChartIcon, dataTooltip: "Home" },
  { href: "/test-runs", label: "Test Runs", icon: ClipboardListIcon, dataTooltip: "Test Runs" },
  { href: "/analytics", label: "Analytics", icon: WarningIcon, dataTooltip: "Analytics" },
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

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M12 4 3 20h18z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function SplitIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <path d="M4 7h8" />
      <path d="M4 17h8" />
      <path d="m10 4 3 3-3 3" />
      <path d="m10 14 3 3-3 3" />
      <path d="M20 4v16" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-icon">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12.5 2.3 2.3 4.8-5" />
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

function Tag({ text, tone = "neutral" }) {
  const styles = {
    neutral: { color: COLORS.secondaryText, background: "rgba(107,114,128,0.08)" },
    info: { color: COLORS.accent, background: "rgba(37,99,235,0.08)" },
    success: { color: COLORS.success, background: "rgba(5,150,105,0.08)" },
    warning: { color: COLORS.warning, background: "rgba(217,119,6,0.08)" },
    danger: { color: COLORS.danger, background: "rgba(220,38,38,0.08)" },
  };

  return (
    <span className="tag" style={styles[tone]}>
      {text}
    </span>
  );
}

function StatusDot({ color }) {
  return <span className="dot" style={{ background: color }} aria-hidden="true" />;
}

function Sparkline({ values }) {
  const points = useMemo(() => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = Math.max(max - min, 1);
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 90 + 5;
        const y = 26 - ((value - min) / range) * 18;
        return `${x},${y}`;
      })
      .join(" ");
  }, [values]);

  return (
    <svg viewBox="0 0 100 30" className="sparkline" role="img" aria-label="Trend sparkline">
      <polyline fill="none" stroke={COLORS.accent} strokeWidth="1.75" points={points} />
    </svg>
  );
}

function MetricCard({ metric }) {
  return (
    <article className="card">
      <div className="metric-label">{metric.label}</div>
      <div className="metric-value-row">
        {metric.dot && <StatusDot color={metric.dot} />}
        <div className="metric-value-lg">{metric.value}</div>
      </div>
      <div className="metric-subtext">{metric.subtext}</div>
      {metric.delta && (
        <div className="metric-subtext" style={{ color: metric.deltaColor || COLORS.secondaryText }}>
          {metric.delta}
        </div>
      )}
      {metric.sparkline && <Sparkline values={metric.sparkline} />}
    </article>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="section-header-row">
      <h2 className="section-header">{title}</h2>
      {action}
    </div>
  );
}

// Dashboard view matching dashboard.html: KPIs, Success Rate Trend chart, one failure pattern
function DashboardKpiCard({ kpi }) {
  const toneStyles = {
    danger: {
      background: "linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)",
      borderColor: "#fecaca",
    },
    warning: {
      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      borderColor: "#fde68a",
    },
    neutral: {
      background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)",
      borderColor: "#bfdbfe",
    },
  };

  const cardTone = toneStyles[kpi.badgeTone || "neutral"];

  return (
    <article className="card" style={cardTone}>
      <div className="metric-header-row">
        <span className="metric-label">{kpi.label}</span>
        {kpi.badge && <Tag text={kpi.badge} tone={kpi.badgeTone || "neutral"} />}
      </div>
      <div className="metric-value-row">
        {kpi.valuePrefix && <span className="metric-value-prefix">{kpi.valuePrefix}</span>}
        <div className="metric-value-lg">{kpi.value}</div>
        {kpi.valueSuffix && <span className="metric-value-suffix">{kpi.valueSuffix}</span>}
      </div>
      <div className="metric-subtext">{kpi.subtext}</div>
    </article>
  );
}

export function OverviewScreen() {
  return (
    <div className="screen-stack">
      <header className="screen-top header-row">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="summary-line" style={{ marginTop: 4 }}>
            Voice bot performance, risk patterns, and optimization opportunities in one view.
          </p>
        </div>
        <Link
          href="/testing"
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v16m8-8H4" />
          </svg>
          Run New Test
        </Link>
      </header>

      <div className="metrics-grid-3">
        {DASHBOARD_KPIS.map((kpi) => (
          <DashboardKpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <section
        className="card"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 55%, #f0fdf4 100%)",
          borderColor: "#bfdbfe",
        }}
      >
        <h2 className="section-header" style={{ marginBottom: 16 }}>
          Success Rate Trend (Last 4 Weeks)
        </h2>
        <div className="chart-wrap" style={{ height: 288 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUCCESS_RATE_TREND_DATA} margin={{ top: 12, right: 6, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.divider} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: COLORS.tertiaryText }}
                />
                <YAxis
                  domain={[55, 75]}
                  tickCount={5}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: COLORS.tertiaryText }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  cursor={{ stroke: COLORS.border, strokeDasharray: "4 4" }}
                  contentStyle={{
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 6,
                    fontSize: 12,
                    color: COLORS.bodyText,
                    boxShadow: "none",
                  }}
                  formatter={(value) => [`${value}%`, "Success Rate"]}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke={COLORS.accent}
                  strokeWidth={2}
                  fill={COLORS.accent}
                  fillOpacity={0.1}
                  dot={{ fill: COLORS.accent, stroke: "#fff", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: COLORS.accent, stroke: COLORS.background, strokeWidth: 1 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
      </section>

      <section
        className="card"
        style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #fff 40%, #fef2f2 100%)",
          borderColor: "#fed7aa",
        }}
      >
        <div className="card-header-row">
          <h2 className="section-header" style={{ margin: 0 }}>
            {FAILURE_PATTERN.title}
          </h2>
          <Tag text={FAILURE_PATTERN.badge} tone={FAILURE_PATTERN.badgeTone} />
        </div>

        <div className="failure-pattern-metrics">
          <span className="failure-pattern-metric">{FAILURE_PATTERN.metric1}</span>
          <span className="failure-pattern-metric">{FAILURE_PATTERN.metric2}</span>
        </div>

        <div className="transcript-box">
          <h3 className="transcript-title">Sample Transcript</h3>
          <div className="transcript-messages">
            {FAILURE_PATTERN.transcript.map((msg, i) => (
              <div key={i} className="transcript-row">
                <div className={`transcript-avatar ${msg.role === "Bot" ? "avatar-bot" : "avatar-patient"}`}>
                  {msg.role === "Bot" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="transcript-role">{msg.role}</p>
                  <p className="transcript-text">{msg.text}</p>
                  {msg.endNote && (
                    <div className="transcript-end-note">
                      <span className="dot" style={{ background: COLORS.danger }} />
                      <span>{msg.endNote}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="button-row">
          <button type="button" className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0 }}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Play Call Recording</span>
          </button>
          <Link href="/testing" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Fix This Pattern
          </Link>
        </div>
      </section>
    </div>
  );
}

function FailureClustersScreen() {
  return (
    <div className="screen-stack">
      <header className="screen-top">
        <h1 className="page-title">Failure Clusters</h1>
        <p className="summary-line">
          256 calls analyzed Â· <span style={{ color: COLORS.success }}>158 successful (62%)</span> Â·{" "}
          <span style={{ color: COLORS.danger }}>98 failed (38%)</span> Â· 3 failure clusters identified
        </p>
      </header>

      <section className="card cluster-expanded">
        <div className="card-header-row">
          <h3 className="card-title">{CLUSTERS[0].title}</h3>
          <Tag text={CLUSTERS[0].tag} tone="danger" />
        </div>
        <div className="cluster-divider" />

        <div className="cluster-section">
          <div className="cluster-label">Pattern</div>
          <p className="body-text">{CLUSTERS[0].pattern}</p>
        </div>

        <div className="cluster-section">
          <div className="cluster-label">Impact</div>
          <p className="body-text">{CLUSTERS[0].impact}</p>
        </div>

        <div className="cluster-section">
          <div className="cluster-label">Suggested Fix</div>
          <pre className="mono-block">{CLUSTERS[0].fix}</pre>
        </div>

        <div className="cluster-section">
          <div className="cluster-label">Simulated Results</div>
          <p className="body-text">
            {CLUSTERS[0].simulated}
            <span style={{ color: COLORS.success, fontWeight: 600 }}>{CLUSTERS[0].recovery}</span>
          </p>
        </div>

        <div className="button-row">
          <button type="button" className="btn btn-primary">
            Run A/B Test
          </button>
          <button type="button" className="btn btn-secondary">
            Dismiss
          </button>
        </div>

        <button type="button" className="link-btn" style={{ marginTop: 12 }}>
          {CLUSTERS[0].footer}
        </button>
      </section>

      <section className="card cluster-collapsed">
        <div className="card-header-row">
          <h3 className="card-title">{CLUSTERS[1].title}</h3>
          <Tag text={CLUSTERS[1].tag} tone="warning" />
        </div>
        <p className="secondary-text" style={{ marginTop: 8 }}>
          {CLUSTERS[1].summary}
        </p>
      </section>

      <section className="card cluster-collapsed">
        <div className="card-header-row">
          <h3 className="card-title">{CLUSTERS[2].title}</h3>
          <Tag text={CLUSTERS[2].tag} tone="neutral" />
        </div>
        <p className="secondary-text" style={{ marginTop: 8 }}>
          {CLUSTERS[2].summary}
        </p>
      </section>
    </div>
  );
}

function TestComparisonTable({ rows }) {
  return (
    <div>
      <div className="test-columns-head">
        <div className="col-head">
          <StatusDot color={COLORS.tertiaryText} />
          CONTROL
        </div>
        <div className="col-head" style={{ color: COLORS.accent }}>
          <StatusDot color={COLORS.accent} />
          VARIANT
        </div>
      </div>
      <table className="data-table test-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Control</th>
            <th>Variant</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.metric}>
              <td>{row.metric}</td>
              <td>{row.control}</td>
              <td>{row.variant}</td>
              <td style={{ color: row.positive ? COLORS.success : COLORS.secondaryText, fontWeight: 500 }}>
                {row.delta}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ABTestsScreen() {
  const [tab, setTab] = useState("active");

  return (
    <div className="screen-stack">
      <header className="screen-top">
        <h1 className="page-title">A/B Tests</h1>
        <div className="tabs-row">
          <button
            type="button"
            className={`tab-btn ${tab === "active" ? "active" : ""}`}
            onClick={() => setTab("active")}
          >
            Active (2)
          </button>
          <button
            type="button"
            className={`tab-btn ${tab === "completed" ? "active" : ""}`}
            onClick={() => setTab("completed")}
          >
            Completed (3)
          </button>
        </div>
      </header>

      {tab === "active" ? (
        AB_TESTS_ACTIVE.map((test, index) => (
          <section key={test.id} className="card">
            <div className="card-header-row">
              <h3 className="card-title">{test.name}</h3>
              <Tag text={test.badge} tone={test.badgeType} />
            </div>
            <p className="secondary-text" style={{ marginTop: 8 }}>
              {test.meta}
            </p>

            <div style={{ marginTop: 16 }}>
              <TestComparisonTable rows={test.rows} />
            </div>

            <div
              className="recommendation"
              style={{
                background: test.recommendationTone === "info" ? "#EFF6FF" : "#F9FAFB",
              }}
            >
              <div className="body-text">{test.recommendation}</div>
              <div className="button-row" style={{ marginTop: 12 }}>
                {test.actions.map((action, actionIndex) => (
                  <button
                    key={action}
                    type="button"
                    className={`btn ${index === 0 && actionIndex === 0 ? "btn-primary" : "btn-secondary"}`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="card">
          <h3 className="card-title">Completed Tests</h3>
          <p className="secondary-text" style={{ marginTop: 8 }}>
            3 completed tests are archived. Active tab contains the current experiments for this demo.
          </p>
        </section>
      )}
    </div>
  );
}

function OutcomesScreen() {
  return (
    <div className="screen-stack">
      <header className="screen-top">
        <h1 className="page-title">Outcomes (Verification)</h1>
      </header>

      <div className="metrics-grid-4">
        {OUTCOME_METRICS.map((metric) => (
          <article key={metric.label} className="card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value-row">
              {metric.checked && (
                <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" style={{ color: COLORS.success }}>
                  <circle cx="10" cy="10" r="9" fill="rgba(5,150,105,0.1)" />
                  <path d="m5.5 10.5 3 3 6-6" stroke={COLORS.success} strokeWidth="1.7" fill="none" />
                </svg>
              )}
              <div className="metric-value-lg">{metric.value}</div>
            </div>
            <div className="metric-subtext" style={{ color: metric.accent || COLORS.secondaryText }}>
              {metric.subtext}
            </div>
          </article>
        ))}
      </div>

      <section className="card">
        <SectionHeader title="Verified Outcomes" />
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={OUTCOMES_FUNNEL} layout="vertical" margin={{ top: 6, right: 20, left: 30, bottom: 6 }}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis type="number" hide domain={[0, 259]} />
              <YAxis
                type="category"
                dataKey="stage"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: COLORS.tertiaryText }}
              />
              <Tooltip
                cursor={{ fill: "rgba(37,99,235,0.06)" }}
                contentStyle={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  fontSize: 12,
                  color: COLORS.bodyText,
                  boxShadow: "none",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 4, 4]} fill="#DBEAFE">
                {OUTCOMES_FUNNEL.map((entry) => (
                  <Cell key={entry.stage} fill="#DBEAFE" fillOpacity={0.95} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="funnel-labels">
          {OUTCOMES_FUNNEL.map((item) => (
            <div key={item.stage} className="funnel-line">
              <span style={{ color: COLORS.accent, fontWeight: 500 }}>{item.label}</span>
              {item.conversion && <span className="secondary-text">Conversion: {item.conversion}</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <SectionHeader title="Recent Verifications" />
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Caller</th>
              <th>Outcome</th>
              <th>Verified In</th>
              <th>Revenue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {VERIFICATIONS.map((row) => (
              <tr key={`${row.time}-${row.caller}`}>
                <td>{row.time}</td>
                <td style={{ fontFamily: "'SF Mono', 'Menlo', 'Monaco', monospace", fontSize: 13 }}>{row.caller}</td>
                <td>{row.outcome}</td>
                <td>{row.verifiedIn}</td>
                <td>{row.revenue}</td>
                <td>
                  <div className="row-inline">
                    <StatusDot color={row.dot} />
                    <span>{row.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="verification-source">
          Connected to Open Dental PMS Â· Last synced 3 min ago Â· <span style={{ color: COLORS.success }}>Live</span>
        </div>
      </section>
    </div>
  );
}

export default function PokantDashboardDemo() {
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
              const isActive = pathname != null ? pathname === item.href || (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) : item.href === "/dashboard";
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

            <Link href="/signin" className="sidebar-item sidebar-item-logout" title={sidebarCollapsed ? "Logout" : undefined}>
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
        <div className="content-wrap is-visible">
          <OverviewScreen />
        </div>
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
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .sidebar-voice-name {
          font-weight: 500;
          color: ${COLORS.sidebarTextActive};
        }

        .sidebar-item {
          text-decoration: none;
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

        .sidebar-item {
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

        .sidebar-item.disabled {
          color: rgba(255, 255, 255, 0.35);
          cursor: not-allowed;
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

        .sidebar-agent {
          font-size: 13px;
          font-weight: 400;
          color: ${COLORS.sidebarText};
        }

        .sidebar-connection {
          margin-top: 8px;
          font-size: 12px;
          color: ${COLORS.sidebarText};
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sidebar-version {
          margin-top: 8px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
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

        .content-wrap.is-hidden {
          opacity: 0;
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
