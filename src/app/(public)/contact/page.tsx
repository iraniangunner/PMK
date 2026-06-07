import ContactForm from "@/app/_components/forms/ContactForm";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export const metadata = {
  title: "تماس با ما | پترو ماهان کوشا",
  description: "با ما در تماس باشید",
};

const contactInfo = [
  {
    icon: HiMail,
    label: "ایمیل",
    value: "info@pmk-co.com",
    href: "mailto:info@pmk-co.com",
  },
  {
    icon: HiPhone,
    label: "تلفن",
    value: "021-22252875",
    href: "tel:02122252875",
  },
  {
    icon: HiLocationMarker,
    label: "آدرس",
    value: "تهران، میرداماد، میدان مادر، خیابان سنجابی، کوچه شریفی پلاک 6، واحد 2",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 text-right">
          <h1 className="text-3xl font-bold text-white mb-2">تماس با ما</h1>
          <p className="text-gray-400">با ما در ارتباط باشید</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              اطلاعات تماس
            </h2>
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-red-800" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-gray-800 hover:text-red-800 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-gray-800">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-6">ارسال پیام</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
