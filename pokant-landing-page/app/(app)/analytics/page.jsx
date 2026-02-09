"use client";

import { useState } from "react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TREND_DATA = [
  { date: "Jan 15", rate: 64 },
  { date: "Jan 18", rate: 64.5 },
  { date: "Jan 21", rate: 65 },
  { date: "Jan 24", rate: 66 },
  { date: "Jan 27", rate: 68 },
  { date: "Jan 30", rate: 72 },
  { date: "Feb 2", rate: 76 },
  { date: "Feb 5", rate: 78 },
  { date: "Feb 8", rate: 79.5 },
  { date: "Feb 11", rate: 80.5 },
  { date: "Feb 14", rate: 81.8 },
];

const BASELINE_DATA = Array(11).fill(64);

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 days");

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="page-title mb-1">Analytics</h1>
            <p className="summary-line">Performance insights and trends for ConstructBot v2</p>
          </div>
          <select className="px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-[#374151] focus:outline-none focus:border-[#2563EB] shadow-sm" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>

        <div className="mb-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-sky-50 to-white px-4 py-3">
          <p className="text-sm text-blue-700">
            Analytics highlights: success rate is <span className="font-semibold text-blue-800">trending up</span> while failure clusters continue to shrink.
          </p>
        </div>

        <div className="metrics-grid-4 mb-8">
          <div className="card" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)", borderColor: "#bfdbfe" }}>
            <p className="metric-label">Success Rate</p>
            <p className="metric-value-lg mb-2">81.8%</p>
            <div className="flex items-center gap-1 text-[#10B981] text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="font-medium">+17.8%</span>
              <span className="secondary-text">vs baseline</span>
            </div>
          </div>
          <div className="card" style={{ background: "linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%)", borderColor: "#bae6fd" }}>
            <p className="metric-label">Total Tests</p>
            <p className="metric-value-lg mb-2">47</p>
            <div className="flex items-center gap-1 text-[#10B981] text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="font-medium">+12 tests</span>
              <span className="secondary-text">vs prev</span>
            </div>
          </div>
          <div className="card" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)", borderColor: "#ddd6fe" }}>
            <p className="metric-label">Patterns Fixed</p>
            <p className="metric-value-lg mb-2">3</p>
            <p className="metric-subtext">this month</p>
          </div>
          <div className="card" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #dcfce7 100%)", borderColor: "#bbf7d0" }}>
            <p className="metric-label">Revenue Recovered</p>
            <p className="metric-value-lg mb-2">$26,240</p>
            <div className="flex items-center gap-1 text-[#10B981] text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="font-medium">+$18,240</span>
              <span className="secondary-text">this month</span>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="section-header mb-6">Success Rate Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA.map((d, i) => ({ ...d, baseline: BASELINE_DATA[i] }))} margin={{ top: 12, right: 6, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis domain={[55, 90]} tickCount={8} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6B7280" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip cursor={{ stroke: "#E5E7EB", strokeDasharray: "4 4" }} contentStyle={{ border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 12, color: "#374151", boxShadow: "none" }} formatter={(value) => [`${value}%`, ""]} />
                <Area type="monotone" dataKey="baseline" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
                <Area type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2.5} fill="#2563EB" fillOpacity={0.15} dot={{ fill: "#2563EB", stroke: "#fff", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 1 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="body-text">
              <span className="font-medium">Key insight:</span> +17.8% improvement after fixing "Customer Changes Mind" pattern on Jan 28. The steepest gains came from addressing high-frequency failure scenarios.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="section-header mb-4">Pattern Performance Breakdown</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="section-header mb-0">Fixed Patterns (3)</h3>
              </div>
              <div className="space-y-5">
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium body-text">Customer Changes Mind</span>
                    <span className="text-[#10B981] font-semibold">+22%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm secondary-text mb-2">
                    <span>Before: 64%</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-[#10B981] font-medium">After: 86%</span>
                  </div>
                  <p className="text-xs secondary-text">127 failures → 42 failures</p>
                </div>
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium body-text">Complex Scheduling</span>
                    <span className="text-[#10B981] font-semibold">+14%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm secondary-text mb-2">
                    <span>Before: 71%</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-[#10B981] font-medium">After: 85%</span>
                  </div>
                  <p className="text-xs secondary-text">83 failures → 23 failures</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium body-text">Unclear Availability</span>
                    <span className="text-[#10B981] font-semibold">+11%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm secondary-text mb-2">
                    <span>Before: 68%</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-[#10B981] font-medium">After: 79%</span>
                  </div>
                  <p className="text-xs secondary-text">64 failures → 31 failures</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2563EB] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="section-header mb-0">Currently Optimizing (2)</h3>
              </div>
              <div className="space-y-5">
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium body-text">Appointment Rescheduling</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="secondary-text">Current: 73%</span>
                    <span className="text-[#2563EB] font-medium">A/B testing</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "65%" }} />
                  </div>
                  <p className="text-xs secondary-text mt-2">65% of test complete • Est. 2 days remaining</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium body-text">Insurance Verification</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="secondary-text">Current: 69%</span>
                    <span className="text-[#F59E0B] font-medium">Analyzing</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: "30%" }} />
                  </div>
                  <p className="text-xs secondary-text mt-2">30% of analysis complete • Identifying root cause</p>
                </div>
              </div>
              <Link href="/test-runs" className="link-btn mt-6 inline-flex items-center gap-1">
                View all test runs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="section-header mb-0">Call Success Distribution</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm body-text">Successful Calls</span>
                  <span className="text-sm font-semibold text-[#10B981]">82%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: "82%" }} />
                </div>
                <p className="text-xs secondary-text mt-1">1,023 / 1,247 calls</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm body-text">Failed Calls</span>
                  <span className="text-sm font-semibold text-[#EF4444]">18%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#EF4444] rounded-full" style={{ width: "18%" }} />
                </div>
                <p className="text-xs secondary-text mt-1">224 / 1,247 calls</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-1 text-[#10B981] text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="font-medium">-225 fewer failures/month</span>
                <span className="secondary-text">vs baseline</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="section-header mb-0">Revenue Impact</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#E5E7EB]">
                <span className="text-sm body-text">Baseline monthly loss</span>
                <span className="font-mono text-sm body-text">$34,240</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#E5E7EB]">
                <span className="text-sm body-text">Current monthly loss</span>
                <span className="font-mono text-sm body-text">$8,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#E5E7EB]">
                <span className="text-sm font-medium body-text">Revenue recovered</span>
                <span className="font-mono text-sm font-semibold text-[#10B981]">$26,240</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm body-text">Avg per fixed call</span>
                <span className="font-mono text-sm body-text">$116.62</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-[#10B981] font-medium text-center">ROI: 1,257% vs platform cost</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="section-header mb-0">Key Insights & Recommendations</h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium body-text mb-1">Strong improvement trajectory</p>
                <p className="text-sm secondary-text">Success rate increased from 64% to 81.8% in 30 days (+17.8%). At this pace, you'll reach 90% within 6 weeks.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="font-medium body-text mb-1">Biggest wins from conversation flow fixes</p>
                <p className="text-sm secondary-text">"Customer Changes Mind" pattern alone drove 12% of total improvement. Focus on empathetic responses continues to show strong results.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium body-text mb-1">High-value patterns addressed</p>
                <p className="text-sm secondary-text">The top 3 patterns by revenue impact have been fixed, recovering $26,240 in monthly revenue.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium body-text mb-1">Recommended next step</p>
                <p className="text-sm body-text mb-3">Deploy "Empathetic Confirmation" variant to 100%. A/B test shows 98% confidence, +22% improvement.</p>
                <Link href="/testing" className="link-btn inline-flex items-center gap-1">
                  View Test Results
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
            <button className="btn btn-secondary">Export Full Report</button>
          </div>
        </div>
      </div>
    </main>
  );
}
