import DamageForm from "@/app/_components/forms/DamageForm";

export const metadata = {
  title: "فرم پرداخت خسارت | پترو ماهان کوشا",
  description: "ثبت درخواست پرداخت خسارت برای لاستیک‌های معیوب",
};

export default function DamageFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a0a0a] py-12">
        <div className="max-w-3xl mx-auto px-4 text-right">
          <h1 className="text-3xl font-bold text-white mb-2">فرم پرداخت خسارت</h1>
          <p className="text-gray-400">لطفاً اطلاعات را با دقت وارد کنید</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <DamageForm />
      </div>
    </div>
  );
}
