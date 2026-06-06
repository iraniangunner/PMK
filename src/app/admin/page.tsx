"use client";

import { useState, useEffect } from "react";
import Header from "../_components/admin/Header";
import {
  brandAPI,
  categoryAPI,
  productAPI,
  damageFormAPI,
  complaintFormAPI,
  surveyFormAPI,
} from "@/lib/api";
import {
  HiTag,
  HiFolder,
  HiCube,
  HiExclamation,
  HiClipboardList,
  HiChartBar,
} from "react-icons/hi";

interface Stats {
  brands: number;
  categories: number;
  products: number;
  damageForms: number;
  complaintForms: number;
  surveyForms: number;
}

const statCards = [
  { key: "brands", label: "برندها", icon: HiTag, color: "bg-blue-500" },
  {
    key: "categories",
    label: "دسته‌بندی‌ها",
    icon: HiFolder,
    color: "bg-purple-500",
  },
  { key: "products", label: "محصولات", icon: HiCube, color: "bg-green-500" },
  {
    key: "damageForms",
    label: "فرم خسارت",
    icon: HiExclamation,
    color: "bg-red-500",
  },
  {
    key: "complaintForms",
    label: "فرم شکایات",
    icon: HiClipboardList,
    color: "bg-orange-500",
  },
  {
    key: "surveyForms",
    label: "نظرسنجی",
    icon: HiChartBar,
    color: "bg-teal-500",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [
        brands,
        categories,
        products,
        damageForms,
        complaintForms,
        surveyForms,
      ] = await Promise.all([
        brandAPI.getAll(),
        categoryAPI.getAll(),
        productAPI.getAll(),
        damageFormAPI.getAll(),
        complaintFormAPI.getAll(),
        surveyFormAPI.getAll(),
      ]);

      setStats({
        brands: brands.data.length,
        categories: categories.data.length,
        products: products.data.length,
        damageForms: damageForms.data.length,
        complaintForms: complaintForms.data.length,
        surveyForms: surveyForms.data.length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      <Header title="داشبورد" />
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">خلاصه آمار</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-0.5">
                  {stats?.[card.key as keyof Stats] ?? 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
