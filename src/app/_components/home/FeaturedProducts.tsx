import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.slice(0, 6);
  } catch {
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">محصولات برگزیده</h2>
            <p className="text-gray-500">بهترین محصولات ما برای شما</p>
          </div>
          <Link
            href="/products"
            className="text-red-800 hover:text-red-600 font-medium text-sm border border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-50">
                {product.image ? (
                  <Image
                    src={`https://pmk-co.com/storage/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                    🛞
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                    {product.brand?.name}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {product.category?.name}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500">سایز: {product.size}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
