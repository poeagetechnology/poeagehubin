import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import { categories } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function CatalogPage({ title, subtitle, mode = "all" }) {
  const { catalogProducts } = useStore();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const shownProducts = useMemo(() => {
    let list = [...catalogProducts];
    if (mode === "new") list = list.filter((p) => p.tag === "NEW" || p.createdAt >= "2026-11-06");
    if (mode === "best") list = list.filter((p) => p.tag === "BEST SELLER" || p.rating >= 4.8);
    if (mode === "offers") list = list.filter((p) => p.oldPrice > p.price);
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query.trim()) list = list.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [mode, category, query, sort, catalogProducts]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#f3f6fc] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs font-extrabold tracking-[0.2em] text-blue-600">POEAGE MARKETPLACE</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
        <div className="mb-6 grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-3">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search this collection..." className="min-w-0 flex-1 text-sm outline-none" />
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500"><SlidersHorizontal size={15} /> Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="max-w-[155px] rounded-lg border border-slate-200 bg-white px-2 py-3 text-xs text-slate-700 outline-none">
              <option>All</option>{categories.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-3 text-xs text-slate-700 outline-none">
              <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">{shownProducts.length} products</p>
          <p className="text-xs text-slate-400">Demo catalogue</p>
        </div>
        {shownProducts.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">{shownProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><p className="font-bold text-slate-700">No products found</p><p className="mt-2 text-sm text-slate-500">Try another search or category.</p><button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-4 text-sm font-bold text-blue-600">Clear filters</button></div>
        )}
        <p className="mt-6 text-xs text-slate-400">Demo catalogue. Connect a product API for live stock, pricing, seller details and order processing.</p>
      </section>
    </main>
  );
}
