import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 min-h-[500px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute left-0 top-0 w-96 h-96 bg-red-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6 text-right">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              پخش و توزیع
              <span className="text-red-400 block mt-1">انواع لاستیک</span>
              با کیفیت برتر
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              ارائه محصولات با کیفیت برند MAXELL برای انواع خودروهای سنگین و سبک با بهترین قیمت
            </p>
            <div className="flex gap-4 justify-end">
              <Link
                href="/products"
                className="bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-red-900/50"
              >
                مشاهده محصولات
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                تماس با ما
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <Image
                src="/images/tire.png"
                alt="PMK Tire"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
