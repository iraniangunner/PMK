"use client";

import { useState, useEffect } from "react";
import { productAPI, categoryAPI, brandAPI } from "@/lib/api";
import { Product, Category, Brand } from "@/types";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export const initialForm = {
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

export type FormData = typeof initialForm;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
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
  const [formData, setFormData] = useState<FormData>(initialForm);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.size.toLowerCase().includes(search.toLowerCase()),
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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const openCreate = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setFilteredCategories(categories);
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
    setFilteredCategories(
      categories.filter((c) => c.brand_id === product.brand_id),
    );
    setImagePreview(
      product.image ? `https://pmk-co.com/storage/${product.image}` : null,
    );
    setImageFile(null);
    setError("");
    setShowModal(true);
  };

  const openView = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormDataChange = (data: FormData) => {
    if (data.brand_id !== formData.brand_id) {
      setFilteredCategories(
        categories.filter((c) => c.brand_id === Number(data.brand_id)),
      );
    }
    setFormData(data);
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
        data.append("_method", "PUT");
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

  return {
    // state
    products: paginated,
    brands,
    filteredCategories,
    loading,
    search,
    page,
    totalPages,
    showModal,
    showDetailModal,
    editingProduct,
    selectedProduct,
    submitting,
    error,
    imagePreview,
    formData,
    // actions
    setSearch,
    setPage,
    setShowModal,
    setShowDetailModal,
    openCreate,
    openEdit,
    openView,
    handleImageChange,
    handleFormDataChange,
    handleSubmit,
    handleDelete,
  };
}
