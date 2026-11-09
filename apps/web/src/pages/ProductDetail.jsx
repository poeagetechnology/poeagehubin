import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, catalogProducts } = useStore();
  const product = catalogProducts.find((item) => String(item.id) === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-extrabold">Product not found</h1>
        <p className="mt-3 text-slate-500">This product may no longer be available.</p>
        <Link to="/shop" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Browse products</Link>
      </main>
    );
  }

  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft size={16} /> Back to shop</Link>
        <div className="mt-6 grid gap-8 rounded-3xl border border-slate-100 bg-white p-4 sm:p-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-slate-50">
            <img src={product.image} alt={product.name} className="h-full min-h-[300px] w-full object-cover sm:min-h-[480px]" />
            <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-2 text-[10px] font-extrabold text-white">{product.tag}</span>
          </div>
          <div className="flex flex-col justify-center py-2 sm:py-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">{product.category}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2 text-sm"><Star size={16} fill="currentColor" className="text-amber-400" /><strong>{product.rating}</strong><span className="text-slate-500">({product.reviews} sample reviews)</span></div>
            <div className="mt-6 flex items-baseline gap-3"><span className="text-3xl font-extrabold">{formatPrice(product.price)}</span><span className="text-base text-slate-400 line-through">{formatPrice(product.oldPrice)}</span><span className="text-xs font-bold text-emerald-700">Save {formatPrice(product.oldPrice - product.price)}</span></div>
            <p className="mt-6 leading-7 text-slate-600">A thoughtfully selected {product.category.toLowerCase()} find from the Poeage marketplace. Product descriptions, stock, seller details and ratings are sample content in this storefront preview.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-200">
                <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => value - 1)} className="p-3 text-slate-600 disabled:opacity-40"><Minus size={16} /></button>
                <span className="min-w-10 text-center text-sm font-bold">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="p-3 text-slate-600"><Plus size={16} /></button>
              </div>
              <button type="button" onClick={() => { addToCart(product, quantity); navigate("/cart"); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700"><ShoppingBag size={17} /> Add to cart</button>
              <button type="button" aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={isSaved} onClick={() => toggleWishlist(product)} className={`rounded-xl border p-3.5 ${isSaved ? "border-rose-200 text-rose-500" : "border-slate-200 text-slate-600"}`}><Heart size={18} fill={isSaved ? "currentColor" : "none"} /></button>
            </div>
            <div className="mt-7 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900"><strong>Store preview:</strong> Payments and fulfillment are not connected. Orders placed here are saved only in this browser.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
