import Link from "next/link";

const services = [
  {
    href: "/after-sales/damage",
    title: "فرم پرداخت خسارت",
    description: "ثبت درخواست پرداخت خسارت برای لاستیک‌های معیوب",
    icon: "⚠️",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    iconBg: "bg-orange-100",
  },
  {
    href: "/after-sales/complaint",
    title: "فرم رسیدگی به شکایات",
    description: "ثبت شکایات و پیگیری آن‌ها به صورت آنلاین",
    icon: "📋",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconBg: "bg-blue-100",
  },
  {
    href: "/after-sales/survey",
    title: "فرم نظرسنجی",
    description: "ارزیابی کیفیت محصولات و خدمات ما",
    icon: "📊",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    iconBg: "bg-green-100",
  },
];

export default function AfterSalesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">خدمات پس از فروش</h2>
          <p className="text-gray-500">پشتیبانی و خدمات پس از فروش برای رضایت شما</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`border-2 rounded-2xl p-6 transition-all group ${service.color}`}
            >
              <div className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-gray-800 font-bold text-lg mb-2 group-hover:text-red-800 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="text-red-700 text-sm font-medium group-hover:text-red-600">
                ثبت درخواست ←
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
