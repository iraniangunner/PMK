import { Brand } from "@/types";
import Image from "next/image";

async function getBrands(): Promise<Brand[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch {
    return [];
  }
}

export default async function BrandsSection() {
  const brands = await getBrands();

  if (!brands.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">برندهای ما</h2>
          <p className="text-gray-500">محصولات با کیفیت از معتبرترین برندهای جهانی</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all w-40"
            >
              {brand.logo ? (
                <Image
                  src={`https://pmk-co.com/storage/${brand.logo}`}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {brand.name[0]}
                  </span>
                </div>
              )}
              <span className="text-sm font-semibold text-gray-700">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
