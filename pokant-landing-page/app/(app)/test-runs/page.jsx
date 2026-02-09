"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TEST_RUNS = [
  { id: 47, bot: "ConstructBot v2", pattern: "Customer Changes Mind", passRate: 82.3, total: 1000, passed: 823, critical: 7, date: "Feb 4, 2026", time: "2:34 PM", status: "Done" },
  { id: 46, bot: "ConstructBot v2", pattern: "Customer Changes Mind", passRate: 82.0, total: 1000, passed: 820, critical: 9, date: "Feb 3, 2026", time: "10:15 AM", status: "Done" },
  { id: 45, bot: "ConstructBot v2", pattern: "Complex Scheduling", passRate: 83.1, total: 1000, passed: 831, critical: 5, date: "Feb 2, 2026", time: "9:47 AM", status: "Done" },
  { id: 44, bot: "ConstructBot v2", pattern: "Complex Scheduling", passRate: 85.4, total: 1000, passed: 854, critical: 3, date: "Jan 31, 2026", time: "3:22 PM", status: "Done" },
  { id: 43, bot: "ConstructBot v2", pattern: "Unclear Availability", passRate: 81.2, total: 1000, passed: 812, critical: 6, date: "Jan 30, 2026", time: "11:08 AM", status: "Done" },
  { id: 42, bot: "ConstructBot v2", pattern: "Customer Changes Mind", passRate: 79.8, total: 1000, passed: 798, critical: 11, date: "Jan 29, 2026", time: "4:55 PM", status: "Done" },
  { id: 41, bot: "ConstructBot v2", pattern: "Complex Scheduling", passRate: 84.6, total: 1000, passed: 846, critical: 4, date: "Jan 28, 2026", time: "1:20 PM", status: "Done" },
  { id: 40, bot: "ConstructBot v2", pattern: "Unclear Availability", passRate: 78.9, total: 1000, passed: 789, critical: 8, date: "Jan 27, 2026", time: "9:33 AM", status: "Done" },
  { id: 39, bot: "ConstructBot v2", pattern: "Customer Changes Mind", passRate: 77.5, total: 1000, passed: 775, critical: 14, date: "Jan 26, 2026", time: "2:47 PM", status: "Done" },
  { id: 38, bot: "ConstructBot v2", pattern: "Complex Scheduling", passRate: 82.8, total: 1000, passed: 828, critical: 5, date: "Jan 26, 2026", time: "9:12 AM", status: "Done" },
];

/* Original test-runs.html / dashboard-modern.css palette: primary #3B82F6, success #10B981, error #EF4444, warning #F59E0B, text-dark #111827, text-light #6B7280, border #E5E7EB */
function getPatternTone(pattern) {
  if (pattern.includes("Customer Changes Mind")) return "bg-red-50 text-[#EF4444]";
  if (pattern.includes("Complex Scheduling")) return "bg-orange-50 text-[#F59E0B]";
  return "bg-purple-50 text-purple-600";
}

function getRateTone(passRate) {
  return passRate >= 80 ? "text-[#10B981]" : "text-[#F59E0B]";
}

export default function TestRunsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [botFilter, setBotFilter] = useState("All Bots");
  const [patternFilter, setPatternFilter] = useState("All Patterns");
  const [dateFilter, setDateFilter] = useState("Last 7 days");

  const filteredRuns = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return TEST_RUNS.filter((run) => {
      if (needle) {
        const idMatch = run.id.toString().includes(needle);
        const botMatch = run.bot.toLowerCase().includes(needle);
        const patternMatch = run.pattern.toLowerCase().includes(needle);
        if (!idMatch && !botMatch && !patternMatch) return false;
      }

      if (botFilter !== "All Bots" && run.bot !== botFilter) return false;
      if (patternFilter !== "All Patterns" && run.pattern !== patternFilter) return false;
      return true;
    });
  }, [search, botFilter, patternFilter, dateFilter]);

  const totalRuns = TEST_RUNS.length;
  const avgPassRate = (TEST_RUNS.reduce((sum, run) => sum + run.passRate, 0) / totalRuns).toFixed(1);
  const totalEdgeCases = TEST_RUNS.reduce((sum, run) => sum + run.total, 0).toLocaleString();

  return (
    <main className="p-8 bg-[#FAFAFA] min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="header-row page-header">
          <div>
            <h1 className="text-2xl font-bold text-[#111827] mb-1">Live Runs</h1>
            <p className="text-[#6B7280] text-sm">Track all optimization tests across your voice bots</p>
          </div>
          <Link
            href="/testing"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Run New Test
          </Link>
        </div>

        <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
          <p className="text-sm text-[#374151]">
            Latest run trend: <span className="font-semibold text-[#3B82F6]">+2.1%</span> pass rate improvement this week.
          </p>
        </div>

        <section className="min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <article className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#6B7280] font-semibold mb-2">Total Live Runs</p>
              <p className="font-mono text-2xl text-[#111827] font-bold">{totalRuns}</p>
              <p className="text-xs text-[#6B7280] mt-1">Last 30 days</p>
            </article>

            <article className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#6B7280] font-semibold mb-2">Average Pass Rate</p>
              <p className="font-mono text-2xl text-[#10B981] font-bold">{avgPassRate}%</p>
              <p className="text-xs text-[#6B7280] mt-1">Across all runs</p>
            </article>

            <article className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#6B7280] font-semibold mb-2">Edge Cases Tested</p>
              <p className="font-mono text-2xl text-[#111827] font-bold">{totalEdgeCases}</p>
              <p className="text-xs text-[#6B7280] mt-1">Simulation volume</p>
            </article>

            <article className="rounded-xl border border-orange-200 bg-orange-50 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-xs uppercase tracking-wider text-[#D97706] font-semibold">Needs Attention</p>
                <span className="inline-flex items-center rounded-full bg-[#F59E0B] px-2 py-0.5 text-[11px] font-semibold text-white">Urgent</span>
              </div>
              <p className="text-sm text-[#111827] font-semibold">Customer Changes Mind</p>
              <p className="text-xs text-[#6B7280] mt-1">Pass rate dropped 2.3% in last 3 runs</p>
              <Link href="/testing" className="inline-flex items-center gap-1 text-xs font-semibold text-[#F59E0B] hover:text-[#D97706] mt-2">
                Investigate
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex-1 min-w-[230px] relative" htmlFor="run-search">
                <input
                  id="run-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by run #, bot name, or pattern..."
                  className="w-full pl-6 pr-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm leading-5 text-[#111827] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                />
              </label>
              <select
                value={botFilter}
                onChange={(e) => setBotFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              >
                <option>All Bots</option>
                <option>ConstructBot v2</option>
                <option>SalesBot v1</option>
              </select>
              <select
                value={patternFilter}
                onChange={(e) => setPatternFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              >
                <option>All Patterns</option>
                <option>Customer Changes Mind</option>
                <option>Complex Scheduling</option>
                <option>Unclear Availability</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#E5E7EB]">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Run #</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Bot</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Pattern</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Pass Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Critical</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Date / Time</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRuns.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6">
                        <div className="border border-dashed border-[#cbd5e1] rounded-lg p-4 bg-[#f8fafc]">
                          <p className="font-semibold text-[#111827] mb-1">No live runs found</p>
                          <p className="text-sm text-[#64748b]">Try adjusting filters or run a new test.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRuns.map((run) => (
                      <tr
                        key={run.id}
                        className="border-b border-[#E5E7EB] last:border-b-0 cursor-pointer hover:bg-[#F9FAFB] min-h-[54px] transition-colors"
                        onClick={() => router.push("/testing")}
                      >
                        <td className="px-6 py-4 align-middle font-mono text-sm font-medium text-[#111827] whitespace-nowrap">#{run.id}</td>
                        <td className="px-4 py-4 align-middle">
                          <p className="text-sm font-medium text-[#111827] leading-5">{run.bot}</p>
                          <p className="text-xs text-[#6B7280] leading-5">Production</p>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getPatternTone(run.pattern)}`}>
                            {run.pattern}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-middle whitespace-nowrap">
                          <span className={`font-mono text-sm font-semibold ${getRateTone(run.passRate)}`}>{run.passRate.toFixed(1)}%</span>
                          <span className="text-xs text-[#6B7280] ml-1">({run.passed}/{run.total})</span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <span className="font-mono text-sm font-medium text-[#EF4444]">{run.critical}</span>
                        </td>
                        <td className="px-4 py-4 align-middle whitespace-nowrap">
                          <p className="text-sm text-[#374151] leading-5">{run.date}</p>
                          <p className="text-xs text-[#6B7280] leading-5">{run.time}</p>
                        </td>
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[#10B981] text-sm font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {run.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-[#E5E7EB] flex items-center justify-between gap-3 flex-wrap">
              <p className="text-sm text-[#6B7280] m-0">Showing {filteredRuns.length} of {totalRuns} live runs</p>
              <div className="flex items-center gap-2">
                <button type="button" className="px-4 py-2 text-sm text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <button type="button" className="px-4 py-2 text-sm text-white bg-[#3B82F6] hover:bg-blue-600 rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
