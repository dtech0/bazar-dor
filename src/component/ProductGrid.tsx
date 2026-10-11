"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";
import { Product, Category } from "@/lib/types";

export default function ProductGrid({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "all" || p.category === selectedCategory;
        const matchesSearch =
          p.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryNameBn.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.today - b.today;
        if (sortBy === "price-desc") return b.today - a.today;
        if (sortBy === "change-desc") return (b.change?.pct || 0) - (a.change?.pct || 0);
        return 0; 
      });
  }, [initialProducts, searchQuery, selectedCategory, sortBy]);

  return (
    <section id="all-products" className="py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্যের নাম লিখুন…"
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              সাজান:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
              <option value="change-desc">দামের পরিবর্তন বেশি</option>
            </select>
          </div>
        </div>
      </div>

    
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap border ${
            selectedCategory === "all"
              ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          সব
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap border ${
              selectedCategory === cat.slug
                ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </button>
        ))}
      </div>

    
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-gray-600 font-medium">কোনো পণ্য খুঁজে পাওয়া যায়নি</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 text-sm text-emerald-700 font-semibold hover:underline"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
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
                      {p.categoryIcon || "🛒"}
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
      )}
    </section>
  );
}
