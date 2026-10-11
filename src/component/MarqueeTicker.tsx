"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";

export interface TickerProduct {
  id: string;
  slug?: string;
  nameBn: string;
  categoryIcon?: string;
  unit?: string;
  today?: number;
  change?: {
    dir: "up" | "down" | string;
    pct: number;
  };
}

export default function MarqueeTicker({ news }: { news: TickerProduct[] }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 py-2">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Marquee
          pauseOnHover={true}
          speed={45}
          gradient={false}
          className="flex items-center"
        >
          {news.map((item) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";
            const pct =
              item.change?.pct !== undefined
                ? toBengaliNumber(item.change.pct)
                : null;
            const price = item.today ? toBengaliNumber(item.today) : null;

            return (
              <Link
                key={item.id}
                href={`/product/${item.slug || item.id}`}
                className="flex items-center gap-2 text-gray-800 hover:text-emerald-700 text-xs sm:text-sm font-medium transition-colors mx-4 group whitespace-nowrap border-r border-gray-200 pr-4"
              >
                <span className="text-sm sm:text-base flex-shrink-0">
                  {item.categoryIcon || "⚪"}
                </span>
                <span className="font-semibold text-gray-900 group-hover:underline">
                  {item.nameBn}
                </span>
                {price && (
                  <span className="text-gray-600 font-normal">
                    {price} টাকা/{item.unit || "কেজি"}
                  </span>
                )}

                {pct !== null && (
                  <span
                    className={`inline-flex items-center gap-0.5 font-bold ${
                      isUp
                        ? "text-rose-600"
                        : isDown
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"} {pct}%
                  </span>
                )}
              </Link>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
