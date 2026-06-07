import SurveyForm from "@/app/_components/forms/SurveyForm";

export const metadata = {
  title: "فرم نظرسنجی | پترو ماهان کوشا",
  description: "ارزیابی کیفیت محصولات و خدمات PMK",
};

export default function SurveyFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a0a0a] py-12">
        <div className="max-w-3xl mx-auto px-4 text-right">
          <h1 className="text-3xl font-bold text-white mb-2">فرم نظرسنجی</h1>
          <p className="text-gray-400">نظر شما برای ما ارزشمند است</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SurveyForm />
      </div>
    </div>
  );
}
