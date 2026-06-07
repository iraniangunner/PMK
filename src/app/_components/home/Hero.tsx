

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#1a0a0a] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #8B1A1A 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, #8B1A1A 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6 text-right">
            <div className="inline-block bg-red-900/30 border border-red-800/50 rounded-full px-4 py-1.5">
              <span className="text-red-300 text-sm font-medium">
                نماینده رسمی MAXELL در ایران
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              پخش و توزیع
              <span className="text-red-500 block mt-1">انواع لاستیک</span>
              با کیفیت برتر
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              ارائه محصولات با کیفیت برند MAXELL برای انواع خودروهای سنگین و سبک
              با بهترین قیمت
            </p>
            <div className="flex gap-4 justify-end">
              <Link
                href="/products"
                className="bg-red-800 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                مشاهده محصولات
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                تماس با ما
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <Image
                src="/images/pmk.png"
                alt="PMK Tire"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
