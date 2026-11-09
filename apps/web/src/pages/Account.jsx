import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function Account() {
  const { customer, setCustomer, orders } = useStore();
  const [error, setError] = useState("");

  const signIn = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setCustomer({ name: form.get("name").trim(), email: form.get("email").trim() });
    setError("");
  };

  if (customer) {
    return (
      <main className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6">
            <div className="flex items-center gap-4"><div className="rounded-full bg-blue-50 p-3 text-blue-600"><UserRound size={23} /></div><div><h1 className="text-2xl font-extrabold">Hello, {customer.name}</h1><p className="mt-1 text-sm text-slate-500">{customer.email}</p></div></div>
            <button type="button" onClick={() => setCustomer(null)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"><LogOut size={16} /> Sign out</button>
          </div>
          <section className="mt-7 rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-xl font-extrabold">Your orders</h2>
            {orders.length ? <ul className="mt-4 divide-y divide-slate-100">{orders.map((order) => <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-bold">{order.id}</p><p className="mt-1 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString("en-IN")} · {order.status}</p></div><div className="flex items-center gap-4"><strong>{formatPrice(order.total)}</strong><Link to={`/order/${order.id}`} className="text-sm font-bold text-blue-600">View</Link></div></li>)}</ul> : <p className="mt-3 text-sm text-slate-500">Your browser-saved orders will appear here.</p>}
          </section>
          <p className="mt-4 text-center text-xs text-slate-400">Demo profile stored only on this device. This is not a secure customer account.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] bg-slate-50 px-4 py-12 sm:px-8">
      <form onSubmit={signIn} className="mx-auto max-w-md rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
        <div className="mx-auto w-fit rounded-2xl bg-blue-50 p-3 text-blue-600"><UserRound size={24} /></div>
        <h1 className="mt-4 text-center text-2xl font-extrabold">Welcome to PoeageHub</h1>
        <p className="mt-2 text-center text-sm text-slate-500">Enter your details to create a local demo profile.</p>
        <label className="mt-6 block text-xs font-bold text-slate-600">Your name<input name="name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
        <label className="mt-4 block text-xs font-bold text-slate-600">Email address<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
        {error && <p role="alert" className="mt-3 text-sm text-rose-600">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700">Continue</button>
        <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">Demo only: no password or account is created on a server.</p>
      </form>
    </main>
  );
}
