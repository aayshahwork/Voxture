"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const VARIANTS = [
  { id: "A", name: "Standard Acknowledgment", text: '"I understand. Let me update that for you."', rate: 71, improvement: 7 },
  { id: "B", name: "Explicit Confirmation", text: '"No problem! Just to confirm: you now want Wednesday instead of Tuesday, correct?"', rate: 86, improvement: 22, recommended: true },
  { id: "C", name: "Empathetic Redirect", text: '"I totally understand! Let me change that right away."', rate: 68, improvement: 4 },
  { id: "D", name: "Clarifying Question", text: '"Which day would you prefer instead?"', rate: 79, improvement: 15 },
  { id: "E", name: "Summary Confirmation", text: '"Okay, so Wednesday at 2pm then?"', rate: 73, improvement: 9 },
];

export default function TestingPage() {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [progressBars, setProgressBars] = useState({});

  useEffect(() => {
    VARIANTS.forEach((variant, index) => {
      setTimeout(() => {
        setProgressBars((prev) => ({ ...prev, [variant.id]: variant.rate }));
      }, 100 + index * 100);
    });
  }, []);

  const handleDeploy = () => {
    if (!selectedVariant) return;
    window.location.href = "/testing";
  };

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="page-title mb-2">Choose a variant to deploy</h1>
          <p className="summary-line">Customer Changes Mind pattern - 5 response variants from your last test</p>
        </div>

        <div className="mb-6 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-blue-50 to-emerald-50 px-4 py-3">
          <p className="text-sm text-indigo-700">Variant B is currently leading with the highest projected conversion lift.</p>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm secondary-text">Current performance:</span>
          <span className="text-sm font-semibold body-text">64% success rate</span>
        </div>

        <div className="space-y-4 mb-8">
          {VARIANTS.map((variant) => {
            const isSelected = selectedVariant === variant.id;
            const progress = progressBars[variant.id] || 0;
            const tone =
              variant.rate >= 80
                ? {
                    leftBorder: "border-l-4 border-emerald-500",
                    dot: "bg-emerald-500",
                    chip: "text-emerald-700 bg-emerald-100",
                  }
                : variant.rate >= 70
                  ? {
                      leftBorder: "border-l-4 border-blue-500",
                      dot: "bg-blue-500",
                      chip: "text-blue-700 bg-blue-100",
                    }
                  : {
                      leftBorder: "border-l-4 border-amber-500",
                      dot: "bg-amber-500",
                      chip: "text-amber-700 bg-amber-100",
                    };
            return (
              <div
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`card cursor-pointer transition-all relative ${tone.leftBorder} ${isSelected ? "border-2 border-[#2563EB] bg-[#EFF6FF]" : "hover:border-[#D1D5DB] hover:shadow-md"}`}
                style={{
                  background:
                    variant.rate >= 80
                      ? "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)"
                      : variant.rate >= 70
                        ? "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)"
                        : "linear-gradient(135deg, #fff7ed 0%, #fff 100%)",
                  borderColor: isSelected ? "#2563EB" : variant.rate >= 80 ? "#bbf7d0" : variant.rate >= 70 ? "#bfdbfe" : "#fed7aa",
                }}
              >
                {variant.recommended && (
                  <div className="absolute top-4 right-4">
                    <span className="tag bg-[#F59E0B] text-white">RECOMMENDED</span>
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`inline-flex h-2.5 w-2.5 rounded-full ${tone.dot}`} />
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone.chip}`}>
                        {variant.rate >= 80 ? "High Performer" : variant.rate >= 70 ? "Promising" : "Needs Work"}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold body-text mb-2 flex items-center gap-2">
                      <span>Variant {variant.id}: {variant.name}</span>
                      {variant.recommended && <span className="text-[#F59E0B] text-xl">*</span>}
                    </h3>
                    <p className="text-sm secondary-text line-clamp-2">{variant.text}</p>
                  </div>
                  <div className="text-right flex-shrink-0" style={{ width: "220px", marginTop: variant.recommended ? "28px" : "0" }}>
                    <div className="mb-2">
                      <span className="text-3xl font-bold body-text">{variant.rate}%</span>
                      <span className={`text-sm font-semibold ml-1 ${variant.improvement >= 15 ? "text-[#10B981]" : "secondary-text"}`}>
                        (+{variant.improvement}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full transition-all duration-800 ${variant.rate >= 80 ? "bg-[#10B981]" : variant.rate >= 70 ? "bg-[#2563EB]" : "bg-gray-400"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs secondary-text">Tested against 100 scenarios</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="button-row">
          <Link href="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
          {selectedVariant && (
            <button onClick={handleDeploy} className="btn btn-primary inline-flex items-center gap-2">
              <span>Deploy Variant {selectedVariant}</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
