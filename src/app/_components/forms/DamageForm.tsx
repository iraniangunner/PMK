"use client";

import { useState } from "react";
import { damageFormAPI } from "@/lib/api";
import PersianDatePicker from "@/app/_components/ui/PersianDatePicker";
import toast from "react-hot-toast";

type Step = 1 | 2;

const initialForm = {
  buyer_name: "",
  buyer_mobile: "",
  buyer_phone: "",
  buyer_address: "",
  seller_name: "",
  seller_mobile: "",
  seller_phone: "",
  seller_shop_name: "",
  dot_serial: "",
  tire_size: "",
  tire_code: "",
  warranty_card_serial: "",
  install_date: "",
  purchase_date: "",
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm";

export default function DamageForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await damageFormAPI.submit(formData);
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
          فرم با موفقیت ثبت شد
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          درخواست شما دریافت شد و در اسرع وقت بررسی خواهد شد
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData(initialForm);
            setStep(1);
          }}
          className="bg-red-800 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          ثبت فرم جدید
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? "bg-red-800 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            ۱
          </div>
          <div
            className={`flex-1 h-1 rounded ${
              step >= 2 ? "bg-red-800" : "bg-gray-200"
            }`}
          />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? "bg-red-800 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            ۲
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>مشخصات خریدار و فروشنده</span>
          <span>اطلاعات لاستیک</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            className="space-y-6"
          >
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
                <div className="md:col-span-2">
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

            {/* مشخصات فروشنده */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
                مشخصات فروشنده
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام و نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="seller_name"
                    value={formData.seller_name}
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
                    name="seller_mobile"
                    value={formData.seller_mobile}
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
                    name="seller_phone"
                    value={formData.seller_phone}
                    onChange={handleChange}
                    className={inputClass}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام فروشگاه
                  </label>
                  <input
                    type="text"
                    name="seller_shop_name"
                    value={formData.seller_shop_name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors"
            >
              مرحله بعد ←
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
              اطلاعات لاستیک
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  شماره سریال DOT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="dot_serial"
                  value={formData.dot_serial}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سایز لاستیک <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tire_size"
                  value={formData.tire_size}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  کدهگیری لاستیک <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tire_code"
                  value={formData.tire_code}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  شماره سریال کارت ضمانتنامه{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="warranty_card_serial"
                  value={formData.warranty_card_serial}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ نصب لاستیک <span className="text-red-500">*</span>
                </label>
                <PersianDatePicker
                  value={formData.install_date}
                  onChange={(date) =>
                    setFormData({ ...formData, install_date: date })
                  }
                  placeholder="انتخاب تاریخ نصب"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ خرید لاستیک <span className="text-red-500">*</span>
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

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                → مرحله قبل
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-red-800 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? "در حال ثبت..." : "ثبت درخواست"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
