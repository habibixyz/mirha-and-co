import { products } from "@/app/data/products";
import Link from "next/link";
import Image from "next/image";

export default function ShopPage() {
  return (
    <main className="px-6 py-28 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-2xl tracking-wide mb-4">
          Collected Forms
        </h1>
        <p className="text-sm text-neutral-500 max-w-xl mx-auto">
          A slow collection of sculptural objects, acquired one piece at a time.
        </p>
      </div>

      {/* Product List */}
      <div className="space-y-20">

        {products.map((product) => (
          <Link key={product.slug} href={`/shop/${product.slug}`}>

            <div className="cursor-pointer group">

              <div className="overflow-hidden mb-10">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={700}
                  height={900}
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.01]"
                />
              </div>

              <div className="space-y-2">

                <h2 className="text-xl tracking-wide">
                  {product.name}
                </h2>

                <p className="text-sm text-neutral-700">
                  {"\u20B9"}
                  {product.price.toLocaleString("en-IN")}
                </p>

                {product.stock === 0 ? (
                  <p className="text-sm text-neutral-500">
                    This piece has been acquired.
                  </p>
                ) : (
                  <p className="text-sm text-neutral-600">
                    One piece available.
                  </p>
                )}

              </div>

            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}
