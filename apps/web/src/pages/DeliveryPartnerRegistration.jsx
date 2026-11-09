import React, { useState } from "react";
import { CheckCircle2, Truck } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function DeliveryPartnerRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const { addPartnerApplication } = useStore();

  const submitApplication = (event) => {
    event.preventDefault();
    addPartnerApplication(Object.fromEntries(new FormData(event.currentTarget).entries()));
    setSubmitted(true);
  };

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 sm:p-9">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold text-blue-700"><Truck size={15} /> DELIVERY PARTNER</div>
        <h1 className="mt-4 text-3xl font-extrabold">Deliver with PoeageHub</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Apply to join a delivery zone and manage order handoffs.</p>
        {submitted ? (
          <div role="status" className="mt-8 rounded-2xl bg-emerald-50 p-6 text-center"><CheckCircle2 size={38} className="mx-auto text-emerald-600" /><h2 className="mt-3 text-xl font-extrabold">Application received</h2><p className="mt-2 text-sm leading-6 text-slate-600">Your demo application is saved for admin review in this browser.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-sm font-bold text-blue-600">Submit another</button></div>
        ) : (
          <form onSubmit={submitApplication} className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-600">Full name<input name="name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
            <label className="text-xs font-bold text-slate-600">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
            <label className="text-xs font-bold text-slate-600">Phone<input name="phone" type="tel" required autoComplete="tel" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
            <label className="text-xs font-bold text-slate-600">Vehicle<select name="vehicle" required defaultValue="" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-900"><option value="" disabled>Select vehicle</option><option>Two-wheeler</option><option>Van</option><option>Truck</option></select></label>
            <label className="text-xs font-bold text-slate-600 sm:col-span-2">Preferred delivery zone<input name="zone" required placeholder="City or service area" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700 sm:col-span-2">Send demo application</button>
            <p className="text-center text-[11px] leading-5 text-slate-400 sm:col-span-2">Demo only: no identity checks, dispatch, or real delivery operations are connected.</p>
          </form>
        )}
      </div>
    </main>
  );
}
