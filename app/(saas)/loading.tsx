export default function SaasLoading() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-[#F8F6F3] dark:bg-[#080707]"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "var(--dash-bg, #F8F6F3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col items-center gap-3 text-center px-6">
        <span
          className="notranslate text-2xl font-bold tracking-[0.18em] text-[#11100f] dark:text-white uppercase"
          style={{ letterSpacing: "0.18em", fontWeight: 700 }}
        >
          MIRHA &amp; CO.
        </span>
        <div
          className="flex items-center gap-2.5 text-[13px] font-semibold text-[#fc2779]"
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "13px", fontWeight: 600, color: "#fc2779" }}
        >
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-[#fc2779] border-t-transparent"
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2px solid #fc2779",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
          Opening Dashboard...
        </div>
      </div>
    </div>
  );
}
