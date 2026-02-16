import Link from "next/link";
import { products } from "../data/products";

export default function Shop() {
  return (
    <main className="px-10 py-32 bg-white text-neutral-900">

      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-3xl tracking-wide mb-6">
          Collected Forms
        </h1>

        <p className="mb-16 text-neutral-600">
          A slow collection of sculptural objects, acquired one piece at a time.
        </p>

        <div className="mb-10">
          <img
            src="/zola-hero.jpg"
            alt="The Zola Bust - Solid Brass Sculptural Form"
            className="mx-auto w-full max-w-md"
          />
        </div>

        <h2 className="text-xl tracking-wide mb-2">
          Collected Forms — No. 01
        </h2>

        <p className="mb-6">
          The Zola Bust
        </p>

        <p className="mb-10 text-sm text-neutral-600">
          Solid brass. Natural patina. One piece only.
        </p>

        <a
          href="/shop/zola-bust"
          className="border border-neutral-900 px-6 py-3 inline-block"
        >
          View Piece
        </a>

      </div>

    </main>
  );
}
