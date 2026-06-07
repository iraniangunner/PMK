"use client";

import { useState } from "react";
import { complaintFormAPI } from "@/lib/api";
import PersianDatePicker from "@/app/_components/ui/PersianDatePicker";
import toast from "react-hot-toast";

const initialForm = {
  buyer_name: "",
  buyer_mobile: "",
  buyer_phone: "",
  buyer_address: "",
  representative_name: "",
  representative_mobile: "",
  representative_phone: "",
  purchase_date: "",
  complaint_description: "",
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm";

export default function ComplaintForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await complaintFormAPI.submit(formData);
      setSubmitted(true);
      toast.success("فرم با موفقیت ثبت شد");
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
          شکایت با موفقیت ثبت شد
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          شکایت شما دریافت شد و در اسرع وقت رسیدگی خواهد شد
        </p>
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* مشخصات خریدار */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
            مشخصات خریدار
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام و نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="buyer_name"
                value={formData.buyer_name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره موبایل <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="buyer_mobile"
                value={formData.buyer_mobile}
                onChange={handleChange}
                required
                className={inputClass}
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره تلفن
              </label>
              <input
                type="tel"
                name="buyer_phone"
                value={formData.buyer_phone}
                onChange={handleChange}
                className={inputClass}
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                آدرس <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="buyer_address"
                value={formData.buyer_address}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* مشخصات نمایندگی */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
            مشخصات نمایندگی
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام نمایندگی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="representative_name"
                value={formData.representative_name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره موبایل <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="representative_mobile"
                value={formData.representative_mobile}
                onChange={handleChange}
                required
                className={inputClass}
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره تلفن
              </label>
              <input
                type="tel"
                name="representative_phone"
                value={formData.representative_phone}
                onChange={handleChange}
                className={inputClass}
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ خرید <span className="text-red-500">*</span>
              </label>
              <PersianDatePicker
                value={formData.purchase_date}
                onChange={(date) =>
                  setFormData({ ...formData, purchase_date: date })
                }
                placeholder="انتخاب تاریخ خرید"
                required
              />
            </div>
          </div>
        </div>

        {/* شرح شکایت */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
            شرح شکایت
          </h3>
          <textarea
            name="complaint_description"
            value={formData.complaint_description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="شکایت خود را به طور کامل شرح دهید..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {submitting ? "در حال ثبت..." : "ثبت شکایت"}
        </button>
      </form>
    </div>
  );
}
