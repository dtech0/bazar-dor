import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-gray-50/40">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl mb-6 shadow-xs">
          🧺
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 tracking-wide uppercase mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          পৃষ্ঠাটি পাওয়া যায়নি
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল দেওয়া হয়েছে।
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0e8248] hover:bg-emerald-800 text-white font-medium text-sm rounded-xl transition-all shadow-xs hover:shadow cursor-pointer"
          >
            <span>🏠</span>
            <span>হোম পেজে ফিরুন</span>
          </Link>
          <Link
            href="/Login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm rounded-xl border border-gray-200 transition-colors cursor-pointer"
          >
            <span>👤</span>
            <span>লগইন করুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
