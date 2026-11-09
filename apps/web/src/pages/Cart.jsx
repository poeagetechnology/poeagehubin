import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useStore();

  return (
    <main className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold tracking-[0.2em] text-blue-600">YOUR BAG</p>
        <h1 className="mt-2 text-3xl font-extrabold">Shopping cart</h1>
        {cart.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <ShoppingBag size={34} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Find something you love and it will appear here.</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Explore products</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-3">
              {cart.map((item) => (
                <article key={item.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4">
                  <Link to={`/product/${item.id}`} className="shrink-0"><img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" /></Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{item.category}</p><Link to={`/product/${item.id}`} className="mt-1 block font-bold hover:text-blue-600">{item.name}</Link><p className="mt-2 font-extrabold">{formatPrice(item.price)}</p></div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="flex items-center rounded-lg border border-slate-200"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2.5"><Minus size={14} /></button><span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2.5"><Plus size={14} /></button></div>
                      <button type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`} className="rounded-lg p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={17} /></button>
                    </div>
                  </div>
                </article>
              ))}
              <Link to="/shop" className="inline-flex items-center gap-2 py-3 text-sm font-bold text-blue-600">Continue shopping <ArrowRight size={16} /></Link>
            </div>
            <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-extrabold">Order summary</h2>
              <div className="mt-5 flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="mt-3 flex justify-between text-sm text-slate-600"><span>Delivery</span><span className="font-semibold text-emerald-700">Free</span></div>
              <div className="my-5 border-t border-slate-100" />
              <div className="flex justify-between font-extrabold"><span>Total</span><span>{formatPrice(cartTotal)}</span></div>
              <Link to="/checkout" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700">Continue to checkout <ArrowRight size={16} /></Link>
              <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">Demo checkout only. No real payment will be collected.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
