import type { Metadata } from "next";
import { Noto_Serif_Bengali, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "../component/header";
import Navbar from "../component/navbar";
import Marque from "../component/marque";
import Footer from "../component/footer";
import { Toaster } from "react-hot-toast";

const notaSerifBengali = Noto_Serif_Bengali({
  variable: "--font-nota-serif-bengali",
  subsets: ["latin", "bengali"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বিস্তারিত বাজার দর ও পরিবর্তন।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notaSerifBengali.variable} ${notoSansBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50/30 text-gray-800">
        <Header />
        <Navbar />
        <Marque />    
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
