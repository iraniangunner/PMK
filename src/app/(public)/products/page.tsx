import { Product, Brand, Category } from "@/types";
import ProductFilters from "@/app/_components/product/ProductFilters";


export const metadata = {
    title: "محصولات | پترو ماهان کوشا",
    description: "محصولات پترو ماهان کوشا",
  };

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch {
    return [];
  }
}

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

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const [products, brands, categories] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 text-right">
          <h1 className="text-3xl font-bold text-white mb-2">محصولات</h1>
          <p className="text-gray-400">
            مشاهده و انتخاب از بین محصولات با کیفیت ما
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductFilters
          products={products}
          brands={brands}
          categories={categories}
        />
      </div>
    </div>
  );
}
