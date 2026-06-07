"use client";

import { useState, useEffect } from "react";
import Header from "@/app/_components/admin/Header";
import { complaintFormAPI } from "@/lib/api";
import { ComplaintForm } from "@/types";
import { HiSearch, HiEye } from "react-icons/hi";
import toast from "react-hot-toast";
import { toJalaliDisplay } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

const statusLabels: Record<ComplaintForm["status"], string> = {
  pending: "در انتظار",
  reviewing: "در حال بررسی",
  resolved: "حل شده",
  rejected: "رد شده",
};

const statusColors: Record<ComplaintForm["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewing: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ComplaintFormsPage() {
  const [forms, setForms] = useState<ComplaintForm[]>([]);
  const [filtered, setFiltered] = useState<ComplaintForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedForm, setSelectedForm] = useState<ComplaintForm | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => { loadForms(); }, []);

  useEffect(() => {
    const result = forms.filter((f) =>
      f.buyer_name.toLowerCase().includes(search.toLowerCase()) ||
      f.buyer_mobile.includes(search)
    );
    setFiltered(result);
    setPage(1);
  }, [search, forms]);

  const loadForms = async () => {
    try {
      const res = await complaintFormAPI.getAll();
      setForms(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleUpdateStatus = async (id: number, status: string) => {
    setUpdatingStatus(true);
    try {
      await complaintFormAPI.updateStatus(id, status);
      toast.success("وضعیت با موفقیت تغییر کرد");
      await loadForms();
      setSelectedForm((prev) =>
        prev ? { ...prev, status: status as ComplaintForm["status"] } : null
      );
    } catch {
      toast.error("خطا در تغییر وضعیت");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Header title="فرم‌های شکایات" />
      <div className="p-6 space-y-4">

        {/* Toolbar */}
        <div className="relative max-w-sm">
          <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو بر اساس نام یا موبایل..."
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
                <th className="px-4 py-3 font-medium">نام خریدار</th>
                <th className="px-4 py-3 font-medium">موبایل خریدار</th>
                <th className="px-4 py-3 font-medium">نام نمایندگی</th>
                <th className="px-4 py-3 font-medium">تاریخ خرید</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">موردی یافت نشد</td>
                </tr>
              ) : (
                paginated.map((form, index) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{form.buyer_name}</td>
                    <td className="px-4 py-3 text-gray-500">{form.buyer_mobile}</td>
                    <td className="px-4 py-3 text-gray-500">{form.representative_name}</td>
                    <td className="px-4 py-3 text-gray-500">{toJalaliDisplay(form.purchase_date)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[form.status]}`}>
                        {statusLabels[form.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setSelectedForm(form); setShowDetailModal(true); }}
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
            <span className="text-gray-500">صفحه {page} از {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(page - 1)} disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition">
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded border transition ${p === page ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-50"}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(page + 1)} disabled={page === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition">
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="ltr">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">جزئیات فرم شکایات</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="p-6 space-y-6">
              {/* وضعیت */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedForm.status]}`}>
                  {statusLabels[selectedForm.status]}
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">تغییر وضعیت:</label>
                  <select
                    value={selectedForm.status}
                    onChange={(e) => handleUpdateStatus(selectedForm.id, e.target.value)}
                    disabled={updatingStatus}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">در انتظار</option>
                    <option value="reviewing">در حال بررسی</option>
                    <option value="resolved">حل شده</option>
                    <option value="rejected">رد شده</option>
                  </select>
                </div>
              </div>

              {/* مشخصات خریدار */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">مشخصات خریدار</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "نام و نام خانوادگی", value: selectedForm.buyer_name },
                    { label: "شماره موبایل", value: selectedForm.buyer_mobile },
                    { label: "شماره تلفن", value: selectedForm.buyer_phone },
                    { label: "آدرس", value: selectedForm.buyer_address, full: true },
                  ].map((item) => (
                    <div key={item.label} className={`bg-gray-50 p-3 rounded-lg ${item.full ? "col-span-2" : ""}`}>
                      <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                      <p className="font-medium">{item.value || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* مشخصات نمایندگی */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">مشخصات نمایندگی</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "نام نمایندگی", value: selectedForm.representative_name },
                    { label: "شماره موبایل", value: selectedForm.representative_mobile },
                    { label: "شماره تلفن", value: selectedForm.representative_phone },
                    { label: "تاریخ خرید", value: toJalaliDisplay(selectedForm.purchase_date) },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                      <p className="font-medium">{item.value || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* شرح شکایت */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">شرح شکایت</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="text-gray-700 leading-relaxed">{selectedForm.complaint_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
