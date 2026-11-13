export default function DashboardLoading() {
  return (
    <div className="animate-pulse" style={{ padding: "1.25rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Skeleton */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div style={{ width: "200px", maxWidth: "60%", height: "28px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "10px" }} />
        <div style={{ width: "110px", height: "36px", borderRadius: "18px", background: "rgba(150, 150, 150, 0.15)" }} />
      </div>

      {/* Cards Grid Skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ height: "100px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "14px" }} />
        <div style={{ height: "100px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "14px" }} />
        <div style={{ height: "100px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "14px" }} />
      </div>

      {/* Main Content Card Skeleton */}
      <div style={{ height: "320px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "18px" }} />
    </div>
  );
}
