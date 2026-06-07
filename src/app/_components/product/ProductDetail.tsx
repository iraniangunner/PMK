"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { HiArrowRight } from "react-icons/hi";

interface ProductDetailProps {
  product: Product;
}

const techSpecs = [
  { label: "سایز", key: "size" },
  { label: "PR", key: "pr" },
  { label: "رنج بار", key: "load_range" },
  { label: "ایندکس بار", key: "load_index" },
  { label: "رتبه سرعت", key: "speed_rating" },
  { label: "حداکثر سرعت (mph)", key: "max_speed_mph" },
  { label: "عمق آج (32nds)", key: "tread_depth_32nds" },
  { label: "عمق آج (mm)", key: "tread_depth_mm" },
  { label: "ریم استاندارد", key: "standard_rim" },
];

const singleLoadSpecs = [
  { label: "پوند (lbs)", key: "single_load_lbs" },
  { label: "فشار (psi)", key: "single_load_psi" },
  { label: "کیلوگرم (kg)", key: "single_load_kg" },
  { label: "کیلوپاسکال (kPa)", key: "single_load_kpa" },
];

const dualLoadSpecs = [
  { label: "پوند (lbs)", key: "dual_load_lbs" },
  { label: "فشار (psi)", key: "dual_load_psi" },
  { label: "کیلوگرم (kg)", key: "dual_load_kg" },
  { label: "کیلوپاسکال (kPa)", key: "dual_load_kpa" },
];

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-800 transition-colors"
      >
        <HiArrowRight className="w-4 h-4" />
        بازگشت به محصولات
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-80 lg:h-auto bg-gray-50 flex items-center justify-center p-8">
            {product.image ? (
              <Image
                src={`https://pmk-co.com/storage/${product.image}`}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain max-h-64"
              />
            ) : (
              <div className="text-8xl text-gray-200">🛞</div>
            )}
          </div>

          {/* Info */}
          <div className="p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full font-medium">
                  {product.brand?.name}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {product.category?.name}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              {product.description && (
                <p className="text-gray-500 leading-relaxed text-sm">
                  {product.description}
                </p>
              )}
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "سایز", value: product.size },
                { label: "رتبه سرعت", value: product.speed_rating },
                { label: "ایندکس بار", value: product.load_index },
                { label: "ریم استاندارد", value: product.standard_rim },
              ].map(
                (spec) =>
                  spec.value && (
                    <div key={spec.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                      <p className="font-bold text-gray-800">
                        {String(spec.value)}
                      </p>
                    </div>
                  )
              )}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="block w-full bg-red-800 hover:bg-red-700 text-white text-center py-3 rounded-xl font-medium transition-colors"
            >
              استعلام قیمت
            </Link>
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6 pb-3 border-b">
          مشخصات فنی کامل
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {techSpecs.map((spec) => {
            const value = product[spec.key as keyof Product];
            if (!value) return null;
            return (
              <div
                key={spec.key}
                className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
              >
                <span className="text-sm text-gray-500">{spec.label}</span>
                <span className="font-semibold text-gray-800">
                  {String(value)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Load Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Single Load */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">
              حداکثر بار تکی
            </h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {singleLoadSpecs.map((spec) => {
                    const value = product[spec.key as keyof Product];
                    return (
                      <tr key={spec.key} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 text-left">
                          {value ? String(value) : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dual Load */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">
              حداکثر بار دوتایی
            </h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {dualLoadSpecs.map((spec) => {
                    const value = product[spec.key as keyof Product];
                    return (
                      <tr key={spec.key} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 text-left">
                          {value ? String(value) : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
