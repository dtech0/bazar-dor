'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      const msg = "পাসওয়ার্ড মিলছে না! আবার চেক করুন।";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const { data: res, error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        const msg = error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। অন্য ইমেইল দিয়ে চেষ্টা করুন।";
        setErrorMessage(msg);
        toast.error(msg);
      } else if (res) {
        toast.success(`স্বাগতম ${name}! অ্যাকাউন্ট তৈরি হয়েছে।`);
        router.push("/Login");
      }
    } catch (err) {
      const msg = "কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/?auth=social",
      });
    } catch (err) {
      const msg = `${provider} লগইন সফল হয়নি। কিগুলো পরীক্ষা করুন।`;
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                নাম
              </label>
              <input
                type="text"
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="আবার লিখুন"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg text-sm transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-gray-400">
              অথবা
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 border border-gray-200 hover:border-gray-300 rounded-lg text-[11px] sm:text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 border border-gray-200 hover:border-gray-300 rounded-lg text-[11px] sm:text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/Login"
                className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 text-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  )
}