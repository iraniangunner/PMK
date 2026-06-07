"use client";

import { useState, useRef, useEffect } from "react";
import jalaali from "jalaali-js";

interface PersianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  required?: boolean;
}

const MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function getTodayJalali() {
  const now = new Date();
  return jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function getFirstDayOfMonth(jy: number, jm: number) {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, 1);
  const date = new Date(gy, gm - 1, gd);
  return (date.getDay() + 1) % 7;
}

export default function PersianDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
  required,
}: PersianDatePickerProps) {
  const today = getTodayJalali();
  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(today.jy);
  const [currentMonth, setCurrentMonth] = useState(today.jm);
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      const { jy, jm, jd } = jalaali.toJalaali(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );
      setDisplayValue(`${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`);
    } else {
      setDisplayValue("");
    }
  }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelectDay = (day: number) => {
    const { gy, gm, gd } = jalaali.toGregorian(currentYear, currentMonth, day);
    onChange(`${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`);
    setIsOpen(false);
  };

  const prevMonth = () => {
    if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const daysInMonth = jalaali.jalaaliMonthLength(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  let selectedJalali: { jy: number; jm: number; jd: number } | null = null;
  if (value) {
    const d = new Date(value);
    selectedJalali = jalaali.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        readOnly
        value={displayValue}
        placeholder={placeholder}
        required={required}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 text-sm cursor-pointer bg-white"
      />

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 w-72" dir="rtl">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={nextMonth}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-lg font-bold">
              ‹
            </button>
            <div className="flex items-center gap-2">
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="text-sm font-semibold text-gray-800 border-none outline-none bg-transparent cursor-pointer"
              >
                {MONTHS.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="text-sm font-semibold text-gray-800 border-none outline-none bg-transparent cursor-pointer"
              >
                {Array.from({ length: 20 }, (_, i) => today.jy - 10 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={prevMonth}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-lg font-bold">
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-gray-400 py-1 font-medium">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const isSelected = selectedJalali &&
                selectedJalali.jy === currentYear &&
                selectedJalali.jm === currentMonth &&
                selectedJalali.jd === day;
              const isToday = today.jy === currentYear &&
                today.jm === currentMonth &&
                today.jd === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`text-center text-sm py-1.5 rounded-lg transition-colors font-medium
                    ${isSelected ? "bg-red-800 text-white" :
                      isToday ? "bg-red-50 text-red-800 border border-red-200" :
                      "hover:bg-gray-100 text-gray-700"}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
