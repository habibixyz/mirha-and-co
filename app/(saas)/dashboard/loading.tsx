export default function DashboardLoading() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <style>{`
        @keyframes dashPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .sk-pulse {
          animation: dashPulse 1.5s ease-in-out infinite;
          background: rgba(150, 150, 150, 0.15);
          border-radius: 12px;
        }
      `}</style>
      
      {/* Header Skeleton */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ width: "240px", height: "32px" }} className="sk-pulse" />
        <div style={{ width: "140px", height: "40px", borderRadius: "20px" }} className="sk-pulse" />
      </div>

      {/* Hero / Overview Cards Grid Skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        <div style={{ height: "120px" }} className="sk-pulse" />
        <div style={{ height: "120px" }} className="sk-pulse" />
        <div style={{ height: "120px" }} className="sk-pulse" />
        <div style={{ height: "120px" }} className="sk-pulse" />
      </div>

      {/* Main Content Card Skeleton */}
      <div style={{ height: "380px" }} className="sk-pulse" />
    </div>
  );
}
