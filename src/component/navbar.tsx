import React from 'react'
import Link from 'next/link'

export default async function Navbar() {
  let categories: any[] = []


  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories', {
    cache: 'no-store'
  })
  const data = await res.json()
  categories = Array.isArray(data) ? data : (data.response ?? data.categories ?? [])


  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-4 overflow-x-auto py-2.5 no-scrollbar">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all whitespace-nowrap cursor-pointer"
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}