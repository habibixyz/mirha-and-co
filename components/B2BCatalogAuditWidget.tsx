"use client";

import React, { useState } from "react";
import { Sparkles, Layers, RefreshCw } from "lucide-react";

export function B2BCatalogAuditWidget() {
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);

  const handleRunAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/agents/catalog-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setAuditData(data.audit);
    } catch (err) {
      console.error("Audit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#080c16", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.5rem", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles size={16} color="#fc2779" />
          <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>Autonomous B2B Catalog Audit Agent</h3>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={loading}
          style={{
            background: "#fc2779",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.5rem 1rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {loading ? <RefreshCw size={14} className="animate-spin" /> : <Layers size={14} />}
          <span>{loading ? "Auditing Feed..." : "Run Feed Audit"}</span>
        </button>
      </div>

      {auditData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem", background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "10px" }}>
            <div>
              <span style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>Catalog Health Score</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: auditData.catalogHealthScore >= 80 ? "#10b981" : "#f59e0b" }}>
                {auditData.catalogHealthScore} / 100
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: "1rem" }}>
              <span style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>Climate Readiness</span>
              <div style={{ fontSize: "0.85rem", color: "#e2e8f0", marginTop: "0.25rem" }}>
                <div>Hard Water Safe: <strong style={{ color: "#34d399" }}>{auditData.climateSuitability.hardWaterReadyCount} SKUs</strong></div>
                <div>Arid Shield: <strong style={{ color: "#38bdf8" }}>{auditData.climateSuitability.aridDesertReadyCount} SKUs</strong></div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fc2779", margin: "0 0 0.5rem 0", textTransform: "uppercase" }}>Auto-Tagged Catalog Output</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {auditData.taggedSkus.map((sku: any, idx: number) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.03)", padding: "0.6rem 0.8rem", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
                  <span style={{ fontWeight: 600 }}>{sku.name}</span>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    {sku.climateTags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", fontWeight: 700 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
          Click <strong>&quot;Run Feed Audit&quot;</strong> to execute the autonomous catalog tagging &amp; ingredient conflict audit agent on your store feed.
        </p>
      )}
    </div>
  );
}
