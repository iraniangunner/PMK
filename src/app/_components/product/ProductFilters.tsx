"use client";

import { useState, useMemo } from "react";
import { Product, Brand, Category } from "@/types";
import ProductGrid from "./ProductGrid";
import { HiSearch } from "react-icons/hi";

interface ProductFiltersProps {
  products: Product[];
  brands: Brand[];
  categories: Category[];
}

export default function ProductFilters({ products, brands, categories }: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredCategories = useMemo(() => {
    if (!selectedBrand) return categories;
    return categories.filter((c) => Number(c.brand_id) === Number(selectedBrand));
  }, [selectedBrand, categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.size.toLowerCase().includes(search.toLowerCase());

      const matchBrand = !selectedBrand || Number(p.brand_id) === Number(selectedBrand);
      const matchCategory = !selectedCategory || Number(p.category_id) === Number(selectedCategory);

      return matchSearch && matchBrand && matchCategory;
    });
  }, [products, search, selectedBrand, selectedCategory]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا سایز..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm"
            />
          </div>

          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm"
          >
            <option value="">همه برندها</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          {filteredProducts.length} محصول یافت شد
        </p>
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}

