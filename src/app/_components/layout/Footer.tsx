import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a0a0a] text-gray-400 mt-auto" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="/images/pmk.png"
              alt="PMK"
              width={120}
              height={40}
              className="h-12 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed">
              شرکت پخش و توزیع انواع لاستیک ، ارائه‌دهنده محصولات با کیفیت
              برند MAXELL
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "خانه" },
                { href: "/products", label: "محصولات" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس با ما" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* After Sales */}
          <div>
            <h3 className="text-white font-semibold mb-4">خدمات پس از فروش</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/after-sales/damage", label: "فرم پرداخت خسارت" },
                {
                  href: "/after-sales/complaint",
                  label: "فرم رسیدگی به شکایات",
                },
                { href: "/after-sales/survey", label: "فرم نظرسنجی" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>
            تمامی حقوق محفوظ است ©️ {new Date().getFullYear()} پترو ماهان کوشا
          </p>

          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=6031530&Code=l1TChDjnUtVTYXM8fQTQHHfRjubxk9FC"
          >
            <img
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=6031530&Code=l1TChDjnUtVTYXM8fQTQHHfRjubxk9FC"
              alt="اینماد"
              style={{ cursor: "pointer" }}
              // code="l1TChDjnUtVTYXM8fQTQHHfRjubxk9FC"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
