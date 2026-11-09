import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const findOrder = (event) => {
    event.preventDefault();
    const id = orderId.trim();
    if (id) navigate(`/order/${encodeURIComponent(id)}`);
  };

  return (
    <main className="min-h-[60vh] bg-slate-50 px-4 py-12 sm:px-8">
      <form onSubmit={findOrder} className="mx-auto max-w-xl rounded-3xl border border-slate-100 bg-white p-6 sm:p-9">
        <p className="text-xs font-extrabold tracking-[0.2em] text-blue-600">ORDER SUPPORT</p>
        <h1 className="mt-2 text-3xl font-extrabold">Track your order</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Enter the reference number from your demo order confirmation. Orders are stored only in this browser.</p>
        <label className="mt-6 block text-xs font-bold text-slate-600">Order reference
          <div className="mt-2 flex rounded-xl border border-slate-200 p-1.5 focus-within:border-blue-500"><input value={orderId} onChange={(event) => setOrderId(event.target.value)} required placeholder="e.g. PH12345678" className="min-w-0 flex-1 px-2 text-sm font-normal text-slate-900 outline-none" /><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"><Search size={15} /> Find order</button></div>
        </label>
      </form>
    </main>
  );
}
