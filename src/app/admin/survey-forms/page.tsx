"use client";

import { useState, useEffect } from "react";
import Header from "@/app/_components/admin/Header";
import { surveyFormAPI } from "@/lib/api";
import { SurveyForm } from "@/types";
import { HiSearch, HiEye } from "react-icons/hi";

const ITEMS_PER_PAGE = 10;

const ratingLabels: Record<string, string> = {
  excellent: "عالی",
  good: "خوب",
  average: "متوسط",
  weak: "ضعیف",
};

const ratingColors: Record<string, string> = {
  excellent: "bg-green-100 text-green-700",
  good: "bg-blue-100 text-blue-700",
  average: "bg-yellow-100 text-yellow-700",
  weak: "bg-red-100 text-red-700",
};

const ratingFields = [
  { label: "ارزیابی کلی از تایر", key: "tire_overall" },
  { label: "عملکرد جاده بارانی", key: "rainy_performance" },
  { label: "عملکرد جاده خشک", key: "dry_performance" },
  { label: "میزان نرمی", key: "comfort" },
  { label: "فرمان‌پذیری", key: "handling" },
  { label: "ترمزگیری", key: "braking" },
  { label: "خدمات پس از فروش", key: "after_sales_service" },
  { label: "پاسخگویی مسئولین", key: "staff_response" },
];

export default function SurveyFormsPage() {
  const [forms, setForms] = useState<SurveyForm[]>([]);
  const [filtered, setFiltered] = useState<SurveyForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedForm, setSelectedForm] = useState<SurveyForm | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  useEffect(() => {
    const result = forms.filter(
      (f) =>
        f.full_name.toLowerCase().includes(search.toLowerCase()) ||
        f.phone.includes(search) ||
        f.city.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, forms]);

  const loadForms = async () => {
    try {
      const res = await surveyFormAPI.getAll();
      setForms(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Header title="فرم‌های نظرسنجی" />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="relative max-w-sm">
          <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو بر اساس نام، موبایل یا شهر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-right">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">نام و نام خانوادگی</th>
                <th className="px-4 py-3 font-medium">شماره تماس</th>
                <th className="px-4 py-3 font-medium">شهر</th>
                <th className="px-4 py-3 font-medium">استان</th>
                <th className="px-4 py-3 font-medium">مدل لاستیک</th>
                <th className="px-4 py-3 font-medium">ارزیابی کلی</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-400">
                    موردی یافت نشد
                  </td>
                </tr>
              ) : (
                paginated.map((form, index) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-500">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {form.full_name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{form.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{form.city}</td>
                    <td className="px-4 py-3 text-gray-500">{form.province}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {form.tire_model}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ratingColors[form.tire_overall]
                        }`}
                      >
                        {ratingLabels[form.tire_overall]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedForm(form);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <HiEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              صفحه {page} از {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition"
              >
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded border transition ${
                    p === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          dir="ltr"
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">جزئیات نظرسنجی</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* مشخصات */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  مشخصات
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    {
                      label: "نام و نام خانوادگی",
                      value: selectedForm.full_name,
                    },
                    { label: "شماره تماس", value: selectedForm.phone },
                    { label: "شهر", value: selectedForm.city },
                    { label: "استان", value: selectedForm.province },
                    { label: "مدل لاستیک", value: selectedForm.tire_model },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                      <p className="font-medium">{item.value || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ارزیابی‌ها */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  ارزیابی‌ها
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {ratingFields.map((field) => (
                    <div
                      key={field.key}
                      className="bg-gray-50 p-3 rounded-lg flex items-center justify-between"
                    >
                      <p className="text-gray-600 text-xs">{field.label}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ratingColors[
                            selectedForm[
                              field.key as keyof SurveyForm
                            ] as string
                          ]
                        }`}
                      >
                        {
                          ratingLabels[
                            selectedForm[
                              field.key as keyof SurveyForm
                            ] as string
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
