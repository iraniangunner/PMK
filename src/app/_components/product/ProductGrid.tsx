"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛞</div>
        <p className="text-gray-500">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="w-full h-full flex items-center justify-center text-gray-200 text-5xl">
                🛞
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                {product.brand?.name}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {product.category?.name}
              </span>
            </div>
            <h3 className="font-bold text-gray-800 mb-1 text-sm">{product.name}</h3>
            <p className="text-xs text-gray-500">سایز: {product.size}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
