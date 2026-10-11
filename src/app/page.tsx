import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/component/ProductGrid";
import { Product } from "@/lib/types";
import { toBengaliNumber } from "@/lib/utils";

export const revalidate = 120; 

async function getBazarData() {
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

    const products: Product[] = Array.isArray(productsData)
      ? productsData
      : productsData?.products || [];

    const categories = Array.isArray(categoriesData)
      ? categoriesData
      : categoriesData?.categories || [];

    return { products, categories };
  } catch (error) {
    console.error("Failed to load bazar data:", error);
    return { products: [], categories: [] };
  }
}

export default async function Home() {
  const { products, categories } = await getBazarData();

  const topGainers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  
  const topLosers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-10">
      <section className="bg-gradient-to-r from-emerald-50/90 via-emerald-50/50 to-white rounded-2xl border border-emerald-100/70 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
        <div className="max-w-xl text-left space-y-3.5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-200/50">
            বাজার পর্যবেক্ষণ ও বিশ্লেষণ
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-nota-serif-bengali), serif" }}
          >
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="pt-2">
            <a
              href="#all-products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>সব পণ্য দেখুন</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 relative w-48 sm:w-60 md:w-72 h-44 sm:h-52 md:h-60 flex items-center justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর বাস্কেট"
            fill
            className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </section>

      <div className="space-y-6">
        <section className="bg-white rounded-2xl border border-emerald-100 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-bold text-gray-900">
                ▲ আজ দাম বেড়েছে
              </h2>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-100">
              সর্বোচ্চ বৃদ্ধি
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {topGainers.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug || item.id}`}
                className="p-3.5 rounded-xl border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                    <span className="text-2xl">{item.categoryIcon}</span>
                    <span>প্রতি {item.unit}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 line-clamp-1">
                    {item.nameBn}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-sm font-bold text-gray-900">
                    {toBengaliNumber(item.today)} টাকা
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    ▲ {toBengaliNumber(item.change.pct)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-rose-100 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h2 className="text-lg font-bold text-gray-900">
                ▼ আজ দাম কমেছে
              </h2>
            </div>
            <span className="text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full font-semibold border border-rose-100">
              সর্বোচ্চ হ্রাস
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {topLosers.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug || item.id}`}
                className="p-3.5 rounded-xl border border-gray-100 hover:border-rose-300 hover:bg-rose-50/30 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                    <span className="text-2xl">{item.categoryIcon}</span>
                    <span>প্রতি {item.unit}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-rose-700 line-clamp-1">
                    {item.nameBn}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-sm font-bold text-gray-900">
                    {toBengaliNumber(item.today)} টাকা
                  </span>
                  <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    ▼ {toBengaliNumber(item.change.pct)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <ProductGrid initialProducts={products} categories={categories} />
    </div>
  );
}
