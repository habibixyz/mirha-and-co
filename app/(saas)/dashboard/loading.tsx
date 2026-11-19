export default function DashboardLoading() {
  return (
    <div className="dash-skeleton-wrapper" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <style>{`
        @keyframes dashPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .dash-skel-pulse {
          animation: dashPulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .dash-skel-box {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }
        html.dark .dash-skel-box, .dark .dash-skel-box {
          background: rgba(255, 255, 255, 0.06);
        }
        .dash-skel-card {
          background: var(--dash-surface, #ffffff);
          border: 1px solid var(--dash-border, #e6dcd2);
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }
        html.dark .dash-skel-card, .dark .dash-skel-card {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.08);
        }
        .dash-skel-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .dash-skel-main-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .dash-skel-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dash-skel-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header Skeleton */}
      <div className="dash-skel-card dash-skel-pulse" style={{ padding: "1.85rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="dash-skel-box" style={{ width: "200px", height: "28px" }} />
          <div className="dash-skel-box" style={{ width: "130px", height: "14px" }} />
        </div>
        <div className="dash-skel-box" style={{ width: "110px", height: "36px", borderRadius: "99px" }} />
      </div>

      {/* Stats 4-Card Bar Skeleton */}
      <div className="dash-skel-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="dash-skel-card dash-skel-pulse" style={{ padding: "1.1rem 1.2rem", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div className="dash-skel-box" style={{ width: "65px", height: "11px" }} />
            <div className="dash-skel-box" style={{ width: "45px", height: "22px" }} />
          </div>
        ))}
      </div>

      {/* Main 2-Column Grid Skeleton */}
      <div className="dash-skel-main-grid">
        {/* Left Column: Routine Card */}
        <div className="dash-skel-card dash-skel-pulse" style={{ padding: "1.85rem", display: "flex", flexDirection: "column", gap: "16px", minHeight: "380px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="dash-skel-box" style={{ width: "140px", height: "20px" }} />
            <div className="dash-skel-box" style={{ width: "90px", height: "28px", borderRadius: "99px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="dash-skel-box" style={{ width: "100%", height: "54px", borderRadius: "10px" }} />
            ))}
          </div>
        </div>

        {/* Right Column: Coach & Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="dash-skel-card dash-skel-pulse" style={{ padding: "1.5rem", minHeight: "200px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="dash-skel-box" style={{ width: "120px", height: "16px" }} />
            <div className="dash-skel-box" style={{ width: "100%", height: "60px", borderRadius: "8px" }} />
            <div className="dash-skel-box" style={{ width: "70%", height: "14px" }} />
          </div>
          <div className="dash-skel-card dash-skel-pulse" style={{ padding: "1.5rem", minHeight: "150px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="dash-skel-box" style={{ width: "140px", height: "16px" }} />
            <div className="dash-skel-box" style={{ width: "100%", height: "36px", borderRadius: "8px" }} />
            <div className="dash-skel-box" style={{ width: "100%", height: "36px", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

