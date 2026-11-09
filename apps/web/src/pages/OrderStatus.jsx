import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, PackageCheck } from "lucide-react";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function OrderStatus() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return <main className="mx-auto max-w-3xl px-5 py-20 text-center"><PackageCheck size={38} className="mx-auto text-slate-300" /><h1 className="mt-4 text-3xl font-extrabold">Order not found</h1><p className="mt-3 text-slate-500">This order is not saved in this browser.</p><Link to="/shop" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Continue shopping</Link></main>;
  }

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 text-center sm:p-10">
          <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
          <p className="mt-5 text-xs font-extrabold tracking-[0.2em] text-emerald-700">DEMO ORDER PLACED</p>
          <h1 className="mt-2 text-3xl font-extrabold">Thanks, {order.name}!</h1>
          <p className="mt-3 text-sm text-slate-500">Your preview order is saved in this browser. No seller was notified and no payment was taken.</p>
          <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">
            <div className="flex flex-wrap justify-between gap-2 text-sm"><span className="text-slate-500">Order reference</span><strong>{order.id}</strong></div>
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm"><span className="text-slate-500">Date</span><strong>{new Date(order.createdAt).toLocaleDateString("en-IN")}</strong></div>
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm"><span className="text-slate-500">Payment</span><strong>{order.paymentMethod}</strong></div>
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm"><span className="text-slate-500">Total</span><strong>{formatPrice(order.total)}</strong></div>
          </div>
          <div className="mt-6 text-left">
            <h2 className="font-extrabold">Items</h2>
            <ul className="mt-3 divide-y divide-slate-100">{order.items.map((item) => <li key={item.id} className="flex justify-between gap-4 py-3 text-sm"><span>{item.name} × {item.quantity}</span><strong>{formatPrice(item.price * item.quantity)}</strong></li>)}</ul>
          </div>
          <Link to="/shop" className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Continue shopping</Link>
        </section>
      </div>
    </main>
  );
}
