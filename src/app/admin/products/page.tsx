"use client";

import { useState, useEffect } from "react";
import Header from "@/app/_components/admin/Header";
import { productAPI, categoryAPI, brandAPI } from "@/lib/api";
import { Product, Category, Brand } from "@/types";
import { HiPlus, HiPencil, HiTrash, HiSearch, HiEye } from "react-icons/hi";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

const technicalFields = [
  { label: "سایز", key: "size", required: true },
  { label: "PR", key: "pr" },
  { label: "رنج بار", key: "load_range" },
  { label: "ایندکس بار", key: "load_index" },
  { label: "رتبه سرعت", key: "speed_rating" },
  { label: "حداکثر سرعت (mph)", key: "max_speed_mph" },
  { label: "عمق آج (32nds)", key: "tread_depth_32nds" },
  { label: "عمق آج (mm)", key: "tread_depth_mm" },
  { label: "ریم استاندارد", key: "standard_rim" },
];

const singleLoadFields = [
  { label: "پوند (lbs)", key: "single_load_lbs" },
  { label: "فشار (psi)", key: "single_load_psi" },
  { label: "کیلوگرم (kg)", key: "single_load_kg" },
  { label: "کیلوپاسکال (kPa)", key: "single_load_kpa" },
];

const dualLoadFields = [
  { label: "پوند (lbs)", key: "dual_load_lbs" },
  { label: "فشار (psi)", key: "dual_load_psi" },
  { label: "کیلوگرم (kg)", key: "dual_load_kg" },
  { label: "کیلوپاسکال (kPa)", key: "dual_load_kpa" },
];

const initialForm = {
  brand_id: "",
  category_id: "",
  name: "",
  description: "",
  size: "",
  pr: "",
  load_range: "",
  load_index: "",
  speed_rating: "",
  max_speed_mph: "",
  tread_depth_32nds: "",
  tread_depth_mm: "",
  standard_rim: "",
  single_load_lbs: "",
  single_load_psi: "",
  single_load_kg: "",
  single_load_kpa: "",
  dual_load_lbs: "",
  dual_load_psi: "",
  dual_load_kg: "",
  dual_load_kpa: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.size.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, products]);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        productAPI.getAll(),
        categoryAPI.getAll(),
        brandAPI.getAll(),
      ]);
      setProducts(productsRes.data);
      setFiltered(productsRes.data);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  //   useEffect(() => {
  //     if (!formData.brand_id) {
  //       setFilteredCategories(categories);
  //     } else {
  //       setFilteredCategories(
  //         categories.filter((c) => c.brand_id === Number(formData.brand_id))
  //       );
  //     }
  //   }, [formData.brand_id, categories]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const openCreate = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      brand_id: String(product.brand_id),
      category_id: String(product.category_id),
      name: String(product.name || ""),
      description: String(product.description || ""),
      size: String(product.size || ""),
      pr: String(product.pr || ""),
      load_range: String(product.load_range || ""),
      load_index: String(product.load_index || ""),
      speed_rating: String(product.speed_rating || ""),
      max_speed_mph: String(product.max_speed_mph || ""),
      tread_depth_32nds: String(product.tread_depth_32nds || ""),
      tread_depth_mm: String(product.tread_depth_mm || ""),
      standard_rim: String(product.standard_rim || ""),
      single_load_lbs: String(product.single_load_lbs || ""),
      single_load_psi: String(product.single_load_psi || ""),
      single_load_kg: String(product.single_load_kg || ""),
      single_load_kpa: String(product.single_load_kpa || ""),
      dual_load_lbs: String(product.dual_load_lbs || ""),
      dual_load_psi: String(product.dual_load_psi || ""),
      dual_load_kg: String(product.dual_load_kg || ""),
      dual_load_kpa: String(product.dual_load_kpa || ""),
    });
    setImagePreview(
      product.image ? `https://pmk-co.com/storage/${product.image}` : null
    );
    setFilteredCategories(
      categories.filter((c) => c.brand_id === product.brand_id)
    );
    setImageFile(null);
    setError("");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") data.append(key, String(value));
    });
    if (imageFile) data.append("image", imageFile);

    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, data);
        toast.success("محصول با موفقیت ویرایش شد");
      } else {
        await productAPI.create(data);
        toast.success("محصول با موفقیت اضافه شد");
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
      await productAPI.delete(id);
      toast.success("محصول با موفقیت حذف شد");
      await loadData();
    } catch {
      toast.error("خطا در حذف محصول");
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
      <Header title="محصولات" />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا سایز..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <HiPlus className="w-5 h-5" />
            افزودن محصول
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-right">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">تصویر</th>
                <th className="px-4 py-3 font-medium">نام محصول</th>
                <th className="px-4 py-3 font-medium">برند</th>
                <th className="px-4 py-3 font-medium">دسته‌بندی</th>
                <th className="px-4 py-3 font-medium">سایز</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
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
                paginated.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-500">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      {product.image ? (
                        <img
                          src={`https://pmk-co.com/storage/${product.image}`}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          بدون تصویر
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {String(product.name)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {String(product.brand?.name || "-")}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {String(product.category?.name || "-")}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {String(product.size)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.is_active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDetailModal(true);
                          }}
                          className="text-green-500 hover:text-green-700 transition"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openEdit(product)}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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

        {/* Pagination */}
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          dir="ltr"
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-800">
                {editingProduct ? "ویرایش محصول" : "افزودن محصول"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* اطلاعات اصلی */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  اطلاعات اصلی
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      برند
                    </label>
                    <select
                      value={formData.brand_id}
                      onChange={(e) => {
                        const newBrandId = e.target.value;
                        setFormData({
                          ...formData,
                          brand_id: newBrandId,
                          category_id: "",
                        });
                        setFilteredCategories(
                          categories.filter(
                            (c) => c.brand_id === Number(newBrandId)
                          )
                        );
                      }}
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
                      دسته‌بندی
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    >
                      <option value="">انتخاب دسته‌بندی</option>
                      {filteredCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      نام محصول
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      توضیحات
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      rows={3}
                    />
                  </div>

                  {/* تصویر */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      تصویر محصول
                    </label>
                    <div className="flex items-center gap-4">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* مشخصات فنی */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  مشخصات فنی
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {technicalFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required={field.required}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* حداکثر بار تکی */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  حداکثر بار تکی
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {singleLoadFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* حداکثر بار دوتایی */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  حداکثر بار دوتایی
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {dualLoadFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
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

      {/* Detail Modal */}
      {showDetailModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          dir="ltr"
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">
                {String(selectedProduct.name)}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedProduct.image && (
                <img
                  src={`https://pmk-co.com/storage/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-contain rounded-lg border"
                />
              )}

              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  اطلاعات اصلی
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">برند</p>
                    <p className="font-medium">
                      {String(selectedProduct.brand?.name || "-")}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">دسته‌بندی</p>
                    <p className="font-medium">
                      {String(selectedProduct.category?.name || "-")}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                    <p className="text-gray-500 text-xs mb-1">توضیحات</p>
                    <p className="font-medium">
                      {String(selectedProduct.description || "-")}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                  مشخصات فنی
                </h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  {[
                    { label: "سایز", value: selectedProduct.size },
                    { label: "PR", value: selectedProduct.pr },
                    { label: "رنج بار", value: selectedProduct.load_range },
                    { label: "ایندکس بار", value: selectedProduct.load_index },
                    { label: "رتبه سرعت", value: selectedProduct.speed_rating },
                    {
                      label: "حداکثر سرعت",
                      value: selectedProduct.max_speed_mph,
                    },
                    {
                      label: "عمق آج (32nds)",
                      value: selectedProduct.tread_depth_32nds,
                    },
                    {
                      label: "عمق آج (mm)",
                      value: selectedProduct.tread_depth_mm,
                    },
                    {
                      label: "ریم استاندارد",
                      value: selectedProduct.standard_rim,
                    },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                      <p className="font-medium">{String(item.value ?? "-")}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                    حداکثر بار تکی
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      {
                        label: "پوند (lbs)",
                        value: selectedProduct.single_load_lbs,
                      },
                      {
                        label: "فشار (psi)",
                        value: selectedProduct.single_load_psi,
                      },
                      {
                        label: "کیلوگرم (kg)",
                        value: selectedProduct.single_load_kg,
                      },
                      {
                        label: "کیلوپاسکال (kPa)",
                        value: selectedProduct.single_load_kpa,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <p className="text-gray-500 text-xs mb-1">
                          {item.label}
                        </p>
                        <p className="font-medium">
                          {String(item.value ?? "-")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                    حداکثر بار دوتایی
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      {
                        label: "پوند (lbs)",
                        value: selectedProduct.dual_load_lbs,
                      },
                      {
                        label: "فشار (psi)",
                        value: selectedProduct.dual_load_psi,
                      },
                      {
                        label: "کیلوگرم (kg)",
                        value: selectedProduct.dual_load_kg,
                      },
                      {
                        label: "کیلوپاسکال (kPa)",
                        value: selectedProduct.dual_load_kpa,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <p className="text-gray-500 text-xs mb-1">
                          {item.label}
                        </p>
                        <p className="font-medium">
                          {String(item.value ?? "-")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
