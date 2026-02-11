export default function Shop() {
  return (
    <main className="px-10 py-20">

      <h2 className="text-3xl tracking-widest mb-16">
        Shop Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Product Placeholder */}
        <div className="group">
          <div className="h-64 bg-gray-200 mb-6"></div>
          <h3 className="text-lg mb-2">Coming Soon</h3>
          <p className="text-sm opacity-70">Launching shortly</p>
        </div>

      </div>

    </main>
  );
}
