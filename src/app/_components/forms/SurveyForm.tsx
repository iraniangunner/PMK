"use client";

import { useState } from "react";
import { surveyFormAPI } from "@/lib/api";
import toast from "react-hot-toast";

type Rating = "excellent" | "good" | "average" | "weak";

const ratingOptions: { value: Rating; label: string }[] = [
  { value: "excellent", label: "عالی" },
  { value: "good", label: "خوب" },
  { value: "average", label: "متوسط" },
  { value: "weak", label: "ضعیف" },
];

const ratingColors: Record<Rating, string> = {
  excellent: "border-green-500 bg-green-50 text-green-700",
  good: "border-blue-500 bg-blue-50 text-blue-700",
  average: "border-yellow-500 bg-yellow-50 text-yellow-700",
  weak: "border-red-500 bg-red-50 text-red-700",
};

const surveyFields = [
  { key: "tire_overall", label: "ارزیابی شما از تایر" },
  {
    key: "rainy_performance",
    label: "میزان عملکرد کیفی تایر در شرایط جاده بارانی",
  },
  { key: "dry_performance", label: "میزان عملکرد کیفی تایر در شرایط جاده خشک" },
  { key: "comfort", label: "میزان نرمی تایر در شرایط مختلف" },
  { key: "handling", label: "میزان فرمان‌پذیری تایر در شرایط مختلف" },
  { key: "braking", label: "میزان ترمزگیری تایر در شرایط مختلف" },
  { key: "after_sales_service", label: "عملکرد مسئولین خدمات پس از فروش" },
  { key: "staff_response", label: "نحوه پاسخگویی مسئولین شرکت" },
];

const initialForm = {
  full_name: "",
  phone: "",
  city: "",
  province: "",
  tire_model: "",
  tire_overall: "" as Rating | "",
  rainy_performance: "" as Rating | "",
  dry_performance: "" as Rating | "",
  comfort: "" as Rating | "",
  handling: "" as Rating | "",
  braking: "" as Rating | "",
  after_sales_service: "" as Rating | "",
  staff_response: "" as Rating | "",
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm";

export default function SurveyForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (key: string, value: Rating) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await surveyFormAPI.submit(formData);
      setSubmitted(true);
      toast.success("نظرسنجی با موفقیت ثبت شد");
    } catch {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          نظرسنجی با موفقیت ثبت شد
        </h2>
        <p className="text-gray-500 text-sm mb-6">از وقتی که گذاشتید ممنونیم</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData(initialForm);
          }}
          className="bg-red-800 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          ثبت فرم جدید
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* مشخصات */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">مشخصات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام و نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره تماس <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClass}
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* اطلاعات نمایندگی */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
            اطلاعات نمایندگی
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شهر <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                استان <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مدل و نوع لاستیک <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tire_model"
                value={formData.tire_model}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ارزیابی‌ها */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
            ارزیابی‌ها
          </h3>
          <div className="space-y-6">
            {surveyFields.map((field) => (
              <div key={field.key}>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {field.label} <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {ratingOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleRating(field.key, option.value)}
                      className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        formData[field.key as keyof typeof formData] ===
                        option.value
                          ? ratingColors[option.value]
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {submitting ? "در حال ثبت..." : "ثبت نظرسنجی"}
        </button>
      </form>
    </div>
  );
}
