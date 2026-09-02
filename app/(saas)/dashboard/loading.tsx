export default function DashboardLoading() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Skeleton */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ width: "240px", height: "32px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "12px" }} />
        <div style={{ width: "140px", height: "40px", borderRadius: "20px", background: "rgba(150, 150, 150, 0.15)" }} />
      </div>

      {/* Hero / Overview Cards Grid Skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        <div style={{ height: "120px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "12px" }} />
        <div style={{ height: "120px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "12px" }} />
        <div style={{ height: "120px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "12px" }} />
        <div style={{ height: "120px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "12px" }} />
      </div>

      {/* Main Content Card Skeleton */}
      <div style={{ height: "380px", background: "rgba(150, 150, 150, 0.15)", borderRadius: "12px" }} />
    </div>
  );
}
