"use client";

import { useState, useEffect } from "react";
import Header from "@/app/_components/admin/Header";
import { contactAPI } from "@/lib/api";
import { Contact } from "@/types";
import { HiSearch, HiEye, HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filtered, setFiltered] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    const result = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.subject.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, contacts]);

  const loadContacts = async () => {
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    try {
      await contactAPI.delete(id);
      toast.success("پیام با موفقیت حذف شد");
      await loadContacts();
      if (selectedContact?.id === id) setShowDetailModal(false);
    } catch {
      toast.error("خطا در حذف پیام");
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
      <Header title="تماس با ما" />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="relative max-w-sm">
          <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو بر اساس نام، تلفن یا موضوع..."
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
                <th className="px-4 py-3 font-medium">نام</th>
                <th className="px-4 py-3 font-medium">تلفن</th>
                <th className="px-4 py-3 font-medium">ایمیل</th>
                <th className="px-4 py-3 font-medium">موضوع</th>
                <th className="px-4 py-3 font-medium">تاریخ</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    موردی یافت نشد
                  </td>
                </tr>
              ) : (
                paginated.map((contact, index) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-500">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{contact.phone}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {contact.email || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {contact.subject}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
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
      {showDetailModal && selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          dir="ltr"
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">جزئیات پیام</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="text-red-500 hover:text-red-700 transition p-1"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "نام", value: selectedContact.name },
                  { label: "تلفن", value: selectedContact.phone },
                  { label: "ایمیل", value: selectedContact.email || "-" },
                  {
                    label: "تاریخ",
                    value: new Date(
                      selectedContact.created_at
                    ).toLocaleDateString("fa-IR"),
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs mb-1">موضوع</p>
                  <p className="font-medium">{selectedContact.subject}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">
                  پیام
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed">
                  {selectedContact.message}
                </div>
              </div>

              {selectedContact.email && (
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
                >
                  پاسخ از طریق ایمیل
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
