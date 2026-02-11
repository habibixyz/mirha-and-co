export default function Home() {
  return (
    <main className="bg-[#F5F1EA] min-h-screen text-[#4A3F35]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-40 px-6">
        <h1 className="text-5xl md:text-6xl tracking-widest font-serif mb-6">
          MIRHA & CO.
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-xl">
          Timeless objects for modern spaces.
        </p>

        <button className="border border-[#4A3F35] px-8 py-3 text-sm tracking-wide hover:bg-[#4A3F35] hover:text-white transition duration-300">
          Shop Collection
        </button>
      </section>
    </main>
  );
}
