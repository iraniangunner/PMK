import { Product } from "@/types";
import ProductDetail from "@/app/_components/product/ProductDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: `${product.name} | پترو ماهان کوشا`,
    description: product.description || `${product.name} - سایز ${product.size} - برند ${product.brand?.name}`,
    openGraph: {
      title: `${product.name} | پترو ماهان کوشا`,
      description: product.description || `${product.name} - سایز ${product.size}`,
      images: product.image
        ? [`https://pmk-co.com/storage/${product.image}`]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a0a0a] py-8">
        <div className="max-w-7xl mx-auto px-4 text-right">
          <p className="text-gray-400 text-sm mb-1">
            <span className="text-red-400">{product.brand?.name}</span>
            {" / "}
            <span>{product.category?.name}</span>
          </p>
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}