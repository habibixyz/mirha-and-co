import RazorpayButton from "@/app/components/RazorpayButton";
import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <main className="px-6 py-28 max-w-4xl mx-auto">

      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-2xl tracking-wide mb-2">
          {product.name}
        </h1>
        <p className="text-sm text-neutral-500">
          Collected Forms — No. 01
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={product.name}
            width={700}
            height={900}
            className="w-full object-cover"
          />
        ))}
      </div>

      {/* Description Section */}
      <div className="max-w-2xl mx-auto text-[15px] leading-relaxed text-neutral-700 space-y-6">

        <p>
          A one-of-one cast brass sculptural form with natural patina.
        </p>

        <p>
          Solid brass, aged into deep umber tones with subtle highlights along raised contours.
        </p>

        <div className="pt-4 space-y-2 text-neutral-800">

          <p>Material: Solid cast brass</p>
          <p>Weight: Approx. 500g</p>
          <p>Availability: One piece only</p>
          <p>Restock: No</p>

        </div>

        {/* Price */}
        <div className="pt-8 text-lg tracking-wide">
          {"\u20B9"}
          {product.price.toLocaleString("en-IN")}
        </div>

        {/* Availability */}
        {product.stock === 0 ? (
          <p className="text-sm text-neutral-500">
            This piece has been acquired.
          </p>
        ) : (
          <p className="text-sm text-neutral-600">
            One piece available.
          </p>
        )}

        {/* Acquire Button */}
        <div className="pt-6">
          {product.stock === 0 ? (
  <p className="text-sm text-neutral-500">
    This piece has been acquired.
  </p>
) : (
  <RazorpayButton
    amount={product.price}
    productName={product.name}
  />
)}
        </div>

      </div>

    </main>
  );
}
