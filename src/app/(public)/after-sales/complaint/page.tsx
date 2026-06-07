import ComplaintForm from "@/app/_components/forms/ComplaintForm";

export const metadata = {
  title: "فرم رسیدگی به شکایات | پترو ماهان کوشا",
  description: "ثبت شکایات و پیگیری آنلاین",
};

export default function ComplaintFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a0a0a] py-12">
        <div className="max-w-3xl mx-auto px-4 text-right">
          <h1 className="text-3xl font-bold text-white mb-2">فرم رسیدگی به شکایات</h1>
          <p className="text-gray-400">لطفاً اطلاعات را با دقت وارد کنید</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ComplaintForm />
      </div>
    </div>
  );
}