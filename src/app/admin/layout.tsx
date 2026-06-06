import Sidebar from "../_components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      <Toaster position="top-center" />
      <Sidebar />
      <main className="flex-1 lg:mr-64 min-w-0">{children}</main>
    </div>
  );
}