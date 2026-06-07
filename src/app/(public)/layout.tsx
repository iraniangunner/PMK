import Navbar from "../_components/layout/Navbar";
import Footer from "../_components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}