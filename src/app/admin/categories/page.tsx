"use client";

import { useState, useEffect } from "react";
import Header from "@/app/_components/admin/Header";
import { categoryAPI, brandAPI } from "@/lib/api";
import { Category, Brand } from "@/types";
import { HiPlus, HiPencil, HiTrash, HiSearch } from "react-icons/hi";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ brand_id: "", name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const result = categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, categories]);

  const loadData = async () => {
    try {
      const [catsRes, brandsRes] = await Promise.all([
        categoryAPI.getAll(),
        brandAPI.getAll(),
      ]);
      setCategories(catsRes.data);
      setFiltered(catsRes.data);
      setBrands(brandsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openCreate = () => {
    setEditingCategory(null);
    setFormData({ brand_id: "", name: "", description: "" });
    setError("");
    setShowModal(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      brand_id: String(category.brand_id),
      name: category.name,
      description: category.description || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory.id, {
          ...formData,
          brand_id: Number(formData.brand_id),
        });
        toast.success("دسته‌بندی با موفقیت ویرایش شد");
      } else {
        await categoryAPI.create({
          ...formData,
          brand_id: Number(formData.brand_id),
        });
        toast.success("دسته‌بندی با موفقیت اضافه شد");
      }
      await loadData();
      setShowModal(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "خطایی رخ داد");
      toast.error("خطایی رخ داد");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    try {
      await categoryAPI.delete(id);
      toast.success("دسته‌بندی با موفقیت حذف شد");
      await loadData();
    } catch (err) {
      toast.error("خطا در حذف دسته‌بندی");
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
      <Header title="دسته‌بندی‌ها" />
      <div className="p-6 space-y-4">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border borde

r-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <HiPlus className="w-5 h-5" />
            افزودن دسته‌بندی
          </button>
        </div>

     
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-right">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">نام دسته‌بندی</th>
                <th className="px-4 py-3 font-medium">برند</th>
                <th className="px-4 py-3 font-medium">توضیحات</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    موردی یافت نشد
                  </td>
                </tr>
              ) : (
                paginated.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-500">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {category.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {category.brand?.name || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {category.description || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {category.is_active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(category)}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

       
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              نمایش {(page - 1) * ITEMS_PER_PAGE + 1} تا{" "}
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)} از{" "}
              {filtered.length} مورد
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="ltr">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md" dir="rtl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-800">
                {editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  برند
                </label>
                <select
                  value={formData.brand_id}
                  onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">انتخاب برند</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام دسته‌بندی
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                >
                  {submitting ? "در حال ذخیره..." : "ذخیره"}
                </button>
                <button
                  type="button"

onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}