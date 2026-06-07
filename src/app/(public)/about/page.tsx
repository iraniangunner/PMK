import { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما | پترو ماهان کوشا",
  description: "شرکت پترو ماهان کوشا، نماینده رسمی برند MAXELL در ایران",
};

// const stats = [
//   { value: "۱۰+", label: "سال تجربه" },
//   { value: "۵۰۰۰+", label: "مشتری راضی" },
//   { value: "۱۰۰+", label: "نماینده فعال" },
//   { value: "۲۴/۷", label: "پشتیبانی" },
// ];

const values = [
  {
    icon: "🏆",
    title: "کیفیت برتر",
    description: "ارائه محصولات با بالاترین استانداردهای کیفی از معتبرترین برندهای جهانی",
  },
  {
    icon: "🤝",
    title: "اعتماد و صداقت",
    description: "بنا نهادن روابط بلندمدت با مشتریان بر اساس اعتماد و شفافیت",
  },
  {
    icon: "⚡",
    title: "خدمات سریع",
    description: "توزیع سریع و به موقع محصولات به سراسر کشور",
  },
  {
    icon: "🛡️",
    title: "ضمانت اصالت",
    description: "تضمین اصالت تمامی محصولات با ارائه کارت ضمانتنامه معتبر",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-4 text-right">
          <h1 className="text-4xl font-bold text-white mb-4">درباره پترو ماهان کوشا</h1>
          {/* <p className="text-gray-400 text-lg max-w-2xl">
            نماینده رسمی و انحصاری برند MAXELL در ایران
          </p> */}
        </div>
      </div>

      {/* Stats */}
      {/* <div className="bg-red-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-red-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* About */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 text-right">
            <h2 className="text-3xl font-bold text-gray-900">چه کسانی هستیم؟</h2>
            {/* <p className="text-gray-600 leading-relaxed">
              شرکت پترو ماهان کوشا با بیش از یک دهه تجربه در حوزه پخش و توزیع لاستیک،
              به عنوان نماینده رسمی برند معتبر MAXELL در ایران فعالیت می‌کند.
            </p> */}
            <p className="text-gray-600 leading-relaxed">
              ما با تکیه بر دانش تخصصی و شبکه گسترده توزیع، محصولات با کیفیت را
              به مشتریان سراسر کشور ارائه می‌دهیم. تعهد ما به کیفیت و رضایت مشتری،
              پایه و اساس موفقیت ما در این صنعت بوده است.
            </p>
            <p className="text-gray-600 leading-relaxed">
              برند MAXELL با استفاده از پیشرفته‌ترین فناوری‌های روز دنیا، لاستیک‌هایی
              با عملکرد فوق‌العاده برای انواع خودروهای سنگین تولید می‌کند که در
              شرایط آب‌وهوایی مختلف ایران کارایی بالایی دارند.
            </p>
          </div>

          <div className="bg-[#1a0a0a] rounded-3xl p-10 text-right">
            <h3 className="text-2xl font-bold text-white mb-4">ماموریت ما</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              تامین محصولات با کیفیت و قابل اعتماد برای ناوگان حمل‌ونقل کشور،
              با هدف ارتقای ایمنی جاده‌ای و کاهش هزینه‌های بهره‌برداری مشتریان.
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">چشم‌انداز ما</h3>
            <p className="text-gray-400 leading-relaxed">
              تبدیل شدن به بزرگترین و معتمدترین توزیع‌کننده لاستیک‌های صنعتی
              در منطقه خاورمیانه با ارائه خدمات پس از فروش بی‌نظیر.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-right mb-10">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl border border-gray-100 p-6 text-right hover:border-red-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      {/* <div className="bg-[#1a0a0a] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">آماده همکاری با شما هستیم</h2>
          <p className="text-gray-400 mb-8">
            برای کسب اطلاعات بیشتر یا استعلام قیمت با ما تماس بگیرید
          </p>
          <a
            href="/contact"
            className="inline-block bg-red-800 hover:bg-red-700 text-white px-10 py-3 rounded-xl font-medium transition-colors"
          >
            تماس با ما
          </a>
        </div>
      </div> */}
    </div>
  );
}
