"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 py-3.5 px-4 md:px-8 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0e8248] text-white flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
            🛒
          </div>
          <div className="flex flex-col text-left">
            <span
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-none"
              style={{ fontFamily: "var(--font-nota-serif-bengali), serif" }}
            >
              বাজার দর
            </span>
            <p className="text-xs text-gray-400 font-medium mt-1">{date}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-700">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : "R"}
                    </span>
                  )}
                </div>
                <span>{session.user.name || "Rezwan"}</span>
                <span className="text-xs text-gray-500">▾</span>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <span>👤</span>
                        <span>আমার প্রোফাইল</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <span>↩</span>
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/Login"
                className="text-sm font-semibold text-gray-700 hover:text-emerald-700 px-3.5 py-1.5 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                সাইন ইন
              </Link>
              <Link
                href="/SignUp"
                className="text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
