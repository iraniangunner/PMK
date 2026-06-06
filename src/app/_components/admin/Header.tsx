"use client";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <h1 className="text-lg font-bold text-gray-700">{title}</h1>
      <span className="text-sm text-gray-400">PMK</span>
    </header>
  );
}
