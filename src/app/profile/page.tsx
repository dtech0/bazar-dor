"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  React.useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সাইন আউট সফল হয়েছে");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.message || "সাইন আউট করা যায়নি");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setUpdating(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { error } = await updateUser({
        name: name.trim(),
      });

      if (error) {
        const msg = error.message || "নাম আপডেট করতে সমস্যা হয়েছে।";
        setErrorMsg(msg);
        toast.error(msg);
      } else {
        const msg = "নাম সফলভাবে আপডেট হয়েছে";
        setSuccessMsg(msg);
        toast.success(msg);
        router.refresh();
      }
    } catch (err: any) {
      const msg = err?.message || "কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-gray-100 text-center shadow-xs">
        <span className="text-4xl block mb-3">🔒</span>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          লগইন প্রয়োজন
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          প্রোফাইল দেখতে আপনাকে প্রথমে সাইন ইন করতে হবে।
        </p>
        <Link
          href="/Login"
          className="inline-block px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const userInitial = session.user.name
    ? session.user.name.charAt(0).toUpperCase()
    : (session.user.email ? session.user.email.charAt(0).toUpperCase() : "U");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0 text-xl font-bold text-gray-700 shadow-xs">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-emerald-800">
                {userInitial}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {session.user.name}
            </h2>
            <p className="text-sm text-gray-400">
              {session.user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-rose-200 hover:border-rose-300 bg-white hover:bg-rose-50 text-rose-600 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900">তথ্য</h3>

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-2.5 bg-[#0e8248] hover:bg-emerald-800 text-white font-medium rounded-lg text-sm transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
