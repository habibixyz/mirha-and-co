export default function Home() {
  return (
    <main>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-10 py-40 bg-[#eae4dd] text-neutral-900">
        
        <h1 className="text-5xl tracking-wide mb-6">
          MIRHA & CO.
        </h1>

        <p className="text-lg mb-8">
          Timeless objects for modern spaces.
        </p>

        <a
          href="#collected-forms"
          className="border border-neutral-900 px-6 py-3 inline-block"
        >
          View Collection
        </a>

        <p className="mt-16 text-sm text-neutral-600 max-w-xl">
          The inaugural piece from our Collected Forms series has been acquired.
        </p>

      </section>


      {/* Collected Forms Section */}
      <section
        id="collected-forms"
        className="px-10 py-32 bg-white text-neutral-900"
      >
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-2xl tracking-wide mb-4">
            Collected Forms — No. 01
          </h2>

          <p className="mb-10 text-lg">
            The Zola Bust
          </p>

          <div className="mb-10">
            <img
              src="/zola-hero.jpg"
              alt="The Zola Bust - Solid Brass Sculptural Form"
              className="mx-auto w-full max-w-md"
            />
          </div>

          <p className="mb-10 text-sm tracking-wide text-neutral-600">
            Solid brass. Natural patina. One piece only.
          </p>

          <a
            href="/shop/zola-bust"
            className="border border-neutral-900 px-6 py-3 inline-block"
          >
            View Piece
          </a>

        </div>
      </section>

    </main>
  );
}
