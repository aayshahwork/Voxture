"use client";

export default function DatasetPage() {
  return (
    <div className="screen-stack">
      <div className="screen-top">
        <h1 className="page-title">Dataset</h1>
        <p className="summary-line" style={{ color: "#6B7280" }}>Manage your test dataset and coverage quality.</p>
      </div>

      <div className="card" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #ecfdf5 100%)", borderColor: "#bfdbfe" }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h2 className="section-header mb-1">Dataset Workbench</h2>
            <p className="secondary-text">This page is in progress. Next: import controls, labeling queue, and scenario coverage analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
