import React from "react";
import MarqueeTicker from "./MarqueeTicker";

export default async function Marque() {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const news: any[] = Array.isArray(data) 
      ? data 
      : (data?.response ?? data?.products ?? data?.data ?? []);

    if (!news.length) return null;

    return <MarqueeTicker news={news} />
  } catch (error) {
    return null;
  } 
}
