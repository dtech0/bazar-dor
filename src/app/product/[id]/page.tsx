import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/lib/types";

export const revalidate = 60;

async function getProduct(idOrSlug: string): Promise<Product | null> {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const products: Product[] = Array.isArray(data) ? data : data?.products || [];

    const found = products.find(
      (p) => String(p.id) === idOrSlug || p.slug === idOrSlug
    );

    return found || null;
  } catch (err) {
    console.error("Failed to load product:", err);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const diffAmount = Math.abs((product.today || 0) - (product.yesterday || 0));

  const markets = (product as any).markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let minMarketName = "";
  let maxMarketName = "";

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m: any) => m.min));
    maxPrice = Math.max(...markets.map((m: any) => m.max));
    const minM = markets.find((m: any) => m.min === minPrice);
    const maxM = markets.find((m: any) => m.max === maxPrice);
    minMarketName = minM ? `${minM.market}, ${minM.division}` : "";
    maxMarketName = maxM ? `${maxM.market}, ${maxM.division}` : "";
  }

  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-6">
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex-shrink-0">
              {product.categoryIcon || "🛒"}
            </span>
            <div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                প্রতি {product.unit || "কেজি"} · {product.categoryNameBn}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                {product.nameBn}
              </h1>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-400 block">আজকের গড় দাম</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-800">
              {toBengaliNumber(product.today)}{" "}
              <span className="text-lg font-medium text-gray-500">
                টাকা / {product.unit || "কেজি"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg text-xs ${
                isUp
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : isDown
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {toBengaliNumber(product.change?.pct)}%
            </span>
            <span className="text-gray-600">
              {isUp ? "গতকালের তুলনায় আজ দাম বেড়েছে" : isDown ? "গতকালের তুলনায় আজ দাম কমেছে" : "দামে কোনো পরিবর্তন হয়নি"}
              {diffAmount > 0 && ` · ${toBengaliNumber(diffAmount)} টাকা`}
            </span>
          </div>

          <div className="text-xs text-gray-400">
            গতকালের দাম: {toBengaliNumber(product.yesterday)} টাকা
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <span className="text-xs font-medium text-emerald-600 block">
            সর্বনিম্ন দাম
          </span>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {toBengaliNumber(minPrice)} টাকা
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate" title={minMarketName}>
            {minMarketName || "সবচেয়ে কম দামের বাজার"}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <span className="text-xs font-medium text-rose-600 block">
            সর্বাধিক দাম
          </span>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {toBengaliNumber(maxPrice)} টাকা
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate" title={maxMarketName}>
            {maxMarketName || "সবচেয়ে বেশি দামের বাজার"}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <span className="text-xs font-medium text-blue-600 block">গড় দাম</span>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {toBengaliNumber(avgPrice)} টাকা
          </div>
          <p className="text-xs text-gray-400 mt-1">
            প্রতি {product.unit || "কেজি"}-এর হিসাবে
          </p>
        </div>
      </div>

      {markets.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md">
              আপডেট আজকের
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বাধিক</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m: any, idx: number) => {
                  const mAvg = ((m.min + m.max) / 2).toFixed(1);
                  const isDecimal = mAvg.endsWith(".0")
                    ? mAvg.slice(0, -2)
                    : mAvg;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-rose-700 font-medium">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        {toBengaliNumber(isDecimal)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-emerald-700 font-semibold hover:underline"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
