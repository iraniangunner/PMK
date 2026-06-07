import jalaali from "jalaali-js";

export function toJalaliDisplay(date: string): string {
  if (!date) return "-";
  const d = new Date(date);
  const { jy, jm, jd } = jalaali.toJalaali(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate()
  );
  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
}