"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [quickstartExpanded, setQuickstartExpanded] = useState(false);
  const [sampleSize, setSampleSize] = useState(50);
  const [confidence, setConfidence] = useState(95);
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [emailPatterns, setEmailPatterns] = useState(true);
  const [emailDeploy, setEmailDeploy] = useState(true);
  const [emailDaily, setEmailDaily] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  };

  const apiKey = "pk_live_4k7d9m2n8p3q1r5s6t8w0x2y4z6a8b0c3q1r5s6t";
  const apiKeyDisplay = apiKeyVisible ? apiKey : "pk_live_••••••••••••••••••••••••••••3q1r5s6t";

  return (
    <>
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="page-title mb-2">Settings</h1>
            <p className="summary-line">Manage your API integration, connected bots, and account preferences</p>
          </div>

          <div className="mb-6 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-blue-50 to-emerald-50 px-4 py-3">
            <p className="text-sm text-indigo-700">
              System status: <span className="font-semibold text-indigo-900">API connected</span>, optimization monitors active, notifications enabled.
            </p>
          </div>

          {/* API Integration */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold body-text">API Integration</h2>
                <p className="text-sm secondary-text">Connect your voice bot in 5 minutes</p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium body-text">Your API Key</h3>
                <span className="px-3 py-1 text-xs font-medium text-[#10B981] bg-green-50 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  Active
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-3 font-mono text-sm body-text">
                  {apiKeyDisplay}
                </div>
                <button onClick={() => copyToClipboard(apiKey)} className="btn btn-secondary flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
                <button onClick={() => setApiKeyVisible(!apiKeyVisible)} className="btn btn-secondary flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {apiKeyVisible ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                  {apiKeyVisible ? "Hide" : "Reveal"}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="secondary-text">Created:</span>
                  <span className="body-text">Jan 15, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="secondary-text">Last used:</span>
                  <span className="body-text">2 hours ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="secondary-text">Requests:</span>
                  <span className="body-text font-mono">2,847 / 10,000</span>
                </div>
              </div>
              <div className="button-row">
                <button className="btn btn-secondary text-[#DC2626] border-red-200 hover:bg-red-50">Regenerate Key</button>
                <button className="btn btn-secondary">View Usage Logs</button>
              </div>
            </div>

            <div className="card overflow-hidden">
              <button onClick={() => setQuickstartExpanded(!quickstartExpanded)} className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium body-text">Quick Start Guide</h3>
                    <p className="text-sm secondary-text">Get up and running in 4 steps</p>
                  </div>
                </div>
                <svg className={`w-5 h-5 secondary-text transform transition-transform ${quickstartExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {quickstartExpanded && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-4 space-y-6">
                  {[
                    { step: 1, title: "Install the SDK", code: "# Python\npip install pokant\n\n# Node.js\nnpm install @pokant/sdk" },
                    { step: 2, title: "Initialize with your API key", code: '# Python\nfrom pokant import Pokant\n\nclient = Pokant(api_key="pk_live_4k7d9m2n8p3q...")\n\n// Node.js\nconst Pokant = require("@pokant/sdk");\n\nconst client = new Pokant({ apiKey: "pk_live_4k7d9m2n8p3q..." });' },
                    { step: 3, title: "Connect your voice bot", code: '# Python\nbot = client.bots.connect(name="ConstructBot v2", platform="retell", endpoint="https://your-bot.com/api", auth_token="your-bot-token")\n\n// Node.js\nconst bot = await client.bots.connect({ name: "ConstructBot v2", platform: "retell", endpoint: "https://your-bot.com/api", authToken: "your-bot-token" });' },
                    { step: 4, title: "Start optimizing", code: '# Pokant automatically analyzes calls. View results in the dashboard.\nanalysis = client.analyze.get_patterns(bot_id=bot.id)' },
                  ].map((item) => (
                    <div key={item.step}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-[#2563EB] text-white text-xs font-bold rounded-full flex items-center justify-center">{item.step}</span>
                        <span className="text-sm font-medium body-text">{item.title}</span>
                      </div>
                      <div className="mono-block relative">
                        <button onClick={() => copyToClipboard(item.code)} className="absolute top-2 right-2 px-2 py-1 text-xs secondary-text hover:body-text bg-gray-200 hover:bg-gray-300 rounded transition-colors">
                          Copy
                        </button>
                        <pre className="font-mono text-xs overflow-x-auto pr-16"><code>{item.code}</code></pre>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-[#10B981] text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>That&apos;s it! Analysis runs automatically in the background</span>
                  </div>
                  <Link href="#" className="link-btn inline-flex items-center gap-2">
                    View Full Documentation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Connected Bots - abbreviated for length; same structure as original */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold body-text">Connected Bots</h2>
                <p className="text-sm secondary-text">Manage your integrated voice bots</p>
              </div>
            </div>
            <div className="card mb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold body-text">ConstructBot v2</h3>
                    <p className="text-sm secondary-text">Production</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-[#10B981] bg-green-50 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" /> Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div><span className="secondary-text">Platform:</span><span className="body-text ml-2">Retell</span></div>
                <div><span className="secondary-text">Connected:</span><span className="body-text ml-2">Jan 20, 2026</span></div>
                <div><span className="secondary-text">Endpoint:</span><span className="body-text ml-2 font-mono text-xs">https://construct-ai.retellapi.com</span></div>
                <div><span className="secondary-text">Last analyzed:</span><span className="body-text ml-2">2 hours ago</span></div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                <div className="text-sm"><span className="secondary-text">Total calls analyzed:</span><span className="body-text font-semibold ml-2">1,247</span></div>
                <div className="button-row">
                  <Link href="/dashboard" className="btn btn-secondary text-[#2563EB] border-blue-200 hover:bg-blue-50">View Dashboard</Link>
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-secondary text-[#DC2626] border-red-200 hover:bg-red-50">Disconnect</button>
                </div>
              </div>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-[#E5E7EB] rounded-xl body-text hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-2 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Connect New Bot
            </button>
          </section>

          {/* Optimization Settings */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold body-text">Optimization Settings</h2>
                <p className="text-sm secondary-text">Configure how Pokant optimizes your bots</p>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="font-medium body-text mb-1">Automatic deployment</h3>
                  <p className="text-sm secondary-text">Auto-deploy improvements with &gt;95% confidence</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={autoDeploy} onChange={(e) => setAutoDeploy(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
              <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium body-text mb-1">Minimum sample size for A/B tests</h3>
                    <p className="text-sm secondary-text">Number of calls before making decisions</p>
                  </div>
                  <span className="text-lg font-semibold text-[#2563EB]">{sampleSize} calls</span>
                </div>
                <input type="range" min="20" max="200" value={sampleSize} onChange={(e) => setSampleSize(Number(e.target.value))} className="w-full h-1.5 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#2563EB]" />
                <div className="flex justify-between text-xs secondary-text mt-2"><span>20</span><span>200</span></div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium body-text mb-1">Confidence threshold for deployment</h3>
                    <p className="text-sm secondary-text">Required confidence level before deploying</p>
                  </div>
                  <span className="text-lg font-semibold text-[#2563EB]">{confidence}%</span>
                </div>
                <input type="range" min="90" max="99" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className="w-full h-1.5 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#2563EB]" />
                <div className="flex justify-between text-xs secondary-text mt-2"><span>90%</span><span>99%</span></div>
              </div>
              <button className="btn btn-primary">Save Optimization Settings</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold body-text">Notifications</h2>
                <p className="text-sm secondary-text">Configure alerts and reports</p>
              </div>
            </div>
            <div className="card">
              <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E7EB]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]" checked={emailPatterns} onChange={(e) => setEmailPatterns(e.target.checked)} />
                  <span className="body-text">Email me when new patterns are detected</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]" checked={emailDeploy} onChange={(e) => setEmailDeploy(e.target.checked)} />
                  <span className="body-text">Email me when improvements are deployed</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]" checked={emailDaily} onChange={(e) => setEmailDaily(e.target.checked)} />
                  <span className="body-text">Daily summary report</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium body-text mb-2">Webhook URL (optional)</label>
                <input type="url" placeholder="https://your-app.com/webhooks/pokant" className="w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-3 body-text placeholder-secondary-text focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
              </div>
              <button className="btn btn-primary">Save Notification Settings</button>
            </div>
          </section>

          {/* Account & Billing */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold body-text">Account & Billing</h2>
                <p className="text-sm secondary-text">Manage your subscription and usage</p>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="font-semibold body-text text-lg">Team Plan</h3>
                  <p className="text-sm secondary-text">$299/month • Renews Feb 15, 2026</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-[#10B981] bg-green-50 rounded-full">Active</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="body-text">Calls analyzed</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "25%" }} />
                    </div>
                    <span className="text-sm font-mono body-text">1,247 / 5,000</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="body-text">A/B tests run</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "30%" }} />
                    </div>
                    <span className="text-sm font-mono body-text">3 / 10</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="body-text">API calls</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "28%" }} />
                    </div>
                    <span className="text-sm font-mono body-text">2,847 / 10,000</span>
                  </div>
                </div>
              </div>
              <div className="button-row">
                <button className="btn btn-primary">Upgrade Plan</button>
                <button className="btn btn-secondary">View Billing History</button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {toast.show && (
        <div className="fixed bottom-6 right-6 bg-[#111827] rounded-lg px-4 py-3 flex items-center gap-2 z-50">
          <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-white">{toast.message}</span>
        </div>
      )}
    </>
  );
}
