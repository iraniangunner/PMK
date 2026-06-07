"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
  {
    label: "خدمات پس از فروش",
    children: [
      { href: "/after-sales/damage", label: "فرم پرداخت خسارت" },
      { href: "/after-sales/complaint", label: "فرم رسیدگی به شکایات" },
      { href: "/after-sales/survey", label: "فرم نظرسنجی" },
    ],
  },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  return (
    <header className="bg-[#1a0a0a] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/pmk.png"
              alt="PMK"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10">
                    {item.label}
                    <HiChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-xl w-52 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-white bg-red-900"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white p-2"
          >
            <HiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed top-0 right-0 h-full w-72 bg-[#1a0a0a] z-50 flex flex-col lg:hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <Image
              src="/images/pmk.png"
              alt="PMK"
              width={100}
              height={35}
              className="h-8 w-auto object-contain"
            />
            <button onClick={() => setMobileOpen(false)} className="text-white p-1">
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                    <HiChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="bg-white/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-8 py-2.5 text-sm transition-colors ${
                            pathname === child.href
                              ? "text-white bg-red-900"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname === item.href
                      ? "text-white bg-red-900"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
