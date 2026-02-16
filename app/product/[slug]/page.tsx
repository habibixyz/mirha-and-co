import { products } from "@/app/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">

        {/* Image Section */}
        <div className="w-full aspect-[4/5] bg-[#eae6df]" />

        {/* Info Section */}
        <div className="max-w-md">

          <h1 className="text-3xl tracking-wide mb-6">
            {product.name}
          </h1>

          <p className="text-xl mb-10 tracking-wide">
            ₹{product.price}
          </p>

          <div className="space-y-6 text-[15px] leading-relaxed text-neutral-700">
            <p>{product.description}</p>

            <p>
              Crafted with attention to proportion and presence. 
              Designed to age beautifully over time.
            </p>
          </div>

          <div className="mt-14 space-y-6">

  {/* Stock Display */}
    {product.stock > 0 ? (
  <p className="text-sm text-neutral-700">
    One piece available. This piece will not be restocked.
  </p>
) : (
  <p className="text-sm text-neutral-700">
    This piece has been acquired.
  </p>
)}

  {/* Buy Button */}
  <button
    disabled={product.stock === 0}
    className={`w-full py-4 tracking-widest text-sm transition duration-300
      ${
        product.stock === 0
          ? "bg-neutral-300 text-white cursor-not-allowed"
          : "border border-black hover:bg-black hover:text-white"
      }
    `}
  >
    {product.stock === 0 ? "ACQUIRED" : "ACQUIRE"}
  </button>

  <p className="text-xs text-neutral-500">
    Ships within 3–5 working days.
  </p>

          </div>

        </div>

      </div>

    </main>
  );
}
