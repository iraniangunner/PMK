import Link from "next/link";

const services = [
  {
    href: "/after-sales/damage",
    title: "فرم پرداخت خسارت",
    description: "ثبت درخواست پرداخت خسارت برای لاستیک‌های معیوب",
    icon: "⚠️",
  },
  {
    href: "/after-sales/complaint",
    title: "فرم رسیدگی به شکایات",
    description: "ثبت شکایات و پیگیری آن‌ها به صورت آنلاین",
    icon: "📋",
  },
  {
    href: "/after-sales/survey",
    title: "فرم نظرسنجی",
    description: "ارزیابی کیفیت محصولات و خدمات ما",
    icon: "📊",
  },
];

export default function AfterSalesSection() {
  return (
    <section className="py-16 bg-[#1a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">خدمات پس از فروش</h2>
          <p className="text-gray-400">پشتیبانی و خدمات پس از فروش برای رضایت شما</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="bg-white/5 border border-white/10 hover:border-red-800/50 hover:bg-white/10 rounded-2xl p-6 transition-all group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 text-red-500 text-sm font-medium group-hover:text-red-400">
                ثبت درخواست ←
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
