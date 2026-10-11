import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/lib/types";

export const revalidate = 60;

async function getCategoryData(slug: string) {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch("https://api.api-store.workers.dev/api/bazardor/products", {
        next: { revalidate: 60 },
      }),
      fetch("https://api.api-store.workers.dev/api/bazardor/categories", {
        next: { revalidate: 60 },
      }),
    ]);

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    const allProducts: Product[] = Array.isArray(productsData)
      ? productsData
      : productsData?.products || [];

    const allCategories = Array.isArray(categoriesData)
      ? categoriesData
      : categoriesData?.categories || [];

    const category = allCategories.find((c: any) => c.slug === slug || c.id === slug);
    const products = allProducts.filter((p) => p.category === slug || p.category === category?.id);

    return { category, products };
  } catch (err) {
    console.error("Failed to load category data:", err);
    return { category: null, products: [] };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { category, products } = await getCategoryData(slug);

  if (!category && products.length === 0) {
    notFound();
  }

  const title = category?.nameBn || products[0]?.categoryNameBn || slug;
  const icon = category?.icon || products[0]?.categoryIcon || "🛒";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </nav>

    
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <span className="text-4xl p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
            {icon}
          </span>
          <div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
              ক্যাটাগরি
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {title}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              মোট {toBengaliNumber(products.length)}টি পণ্য তালিকাভুক্ত
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>←</span>
          <span>সব পণ্য</span>
        </Link>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => {
          const isUp = p.change?.dir === "up";
          const isDown = p.change?.dir === "down";

          return (
            <Link
              key={p.id}
              href={`/product/${p.slug || p.id}`}
              className="bg-white rounded-xl border border-gray-100 hover:border-emerald-200 p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl p-2 rounded-lg bg-emerald-50/60 border border-emerald-100/60">
                    {p.categoryIcon || icon}
                  </span>
                  <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                    প্রতি {p.unit || "কেজি"}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {p.nameBn}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-end justify-between">
                <div>
                  <span className="text-xs text-gray-400 block font-normal">
                    আজকের দাম
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {toBengaliNumber(p.today)} টাকা
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-md ${
                    isUp
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : isDown
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"} {toBengaliNumber(p.change?.pct)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
