import RazorpayButton from "@/app/components/RazorpayButton";
import ImageGallery from "@/app/components/ImageGallery";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) return notFound();

  return (
    <main className="px-6 py-28 max-w-6xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">

    {/* LEFT SIDE — Gallery */}
    <div className="max-w-md">
  <ImageGallery
    images={[
      "/zola-hero.jpg",
      "/zola-front.jpg",
      "/zola-side.jpg",
      "/zola-back.jpg",
    ]}
    alt={product.name}
  />
</div>

    {/* RIGHT SIDE — Info */}
    <div className="max-w-md">

      <h1 className="text-2xl tracking-wide mb-6">
        {product.name}
      </h1>

      <p className="text-lg mb-8">
        {"\u20B9"}
        {product.price.toLocaleString("en-IN")}
      </p>

      <p className="text-sm text-neutral-700 mb-6">
        A one-of-one cast brass sculptural form with natural patina.
      </p>

      <p className="text-sm text-neutral-700 mb-10">
        One piece available.
      </p>

      <RazorpayButton
        productId={product.id}
        productName={product.name}
        amount={product.price}
      />

      <p className="text-xs text-neutral-500 mt-6">
        Ships within 3–5 working days.
      </p>

    </div>

  </div>
</main>
  );
}
