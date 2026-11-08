import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data/products";

export default function Categories() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#f3f6fc] px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto max-w-[1440px]"><p className="text-xs font-extrabold tracking-[0.2em] text-blue-600">FIND YOUR FAVOURITES</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Shop by category</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Explore the departments available in the Poeage marketplace.</p></div></section>
      <section className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-5 py-10 sm:grid-cols-3 sm:gap-6 sm:px-8 lg:grid-cols-3 lg:px-12">
        {categories.map((category) => (
          <Link key={category.name} to={`/shop?category=${encodeURIComponent(category.name)}`} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
            <div className="overflow-hidden"><img src={category.image} alt={category.name} loading="lazy" className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56" /></div>
            <div className="flex items-center justify-between p-4 sm:p-5"><div><h2 className="text-sm font-extrabold sm:text-lg">{category.name}</h2><p className="mt-1 text-xs text-slate-500">{category.count}</p></div><ArrowUpRight size={19} className="text-blue-600" /></div>
          </Link>
        ))}
      </section>
    </main>
  );
}
