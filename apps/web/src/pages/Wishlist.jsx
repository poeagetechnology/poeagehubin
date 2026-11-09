import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function Wishlist() {
  const { wishlist } = useStore();
  return (
    <main className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold tracking-[0.2em] text-blue-600">SAVED FOR LATER</p>
        <h1 className="mt-2 text-3xl font-extrabold">Your wishlist</h1>
        {wishlist.length ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">{wishlist.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><Heart size={34} className="mx-auto text-slate-300" /><h2 className="mt-4 text-xl font-bold">Nothing saved yet</h2><p className="mt-2 text-sm text-slate-500">Tap the heart on a product to keep it here.</p><Link to="/shop" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Browse products</Link></div>
        )}
      </div>
    </main>
  );
}
