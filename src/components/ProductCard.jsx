import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "../data/products";

export default function ProductCard({ product }) {
  const [saved, setSaved] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-50">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60" />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1.5 text-[9px] font-extrabold tracking-wide text-white">{product.tag}</span>
        <button type="button" aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} onClick={() => setSaved(!saved)} className={`absolute right-3 top-3 rounded-full bg-white p-2.5 shadow ${saved ? "text-rose-500" : "text-slate-500 hover:text-rose-500"}`}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{product.category}</p>
        <Link to={`/product/${product.id}`}><h3 className="mt-2 min-h-10 line-clamp-2 text-xs font-bold leading-5 hover:text-blue-600 sm:text-sm">{product.name}</h3></Link>
        <div className="mt-2 flex items-center gap-1"><Star size={13} fill="currentColor" className="text-amber-400" /><span className="text-xs font-bold">{product.rating}</span><span className="text-[10px] text-slate-400">({product.reviews})</span></div>
        <div className="mt-3 flex flex-wrap items-center gap-2"><span className="text-sm font-extrabold sm:text-base">{formatPrice(product.price)}</span><span className="text-xs text-slate-400 line-through">{formatPrice(product.oldPrice)}</span></div>
        <button type="button" onClick={() => setAdded(true)} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-white transition ${added ? "bg-emerald-600" : "bg-slate-950 hover:bg-blue-600"}`}><ShoppingBag size={15} />{added ? "Added (demo)" : "Add to cart"}</button>
      </div>
    </article>
  );
}
