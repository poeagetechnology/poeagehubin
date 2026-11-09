import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function Checkout() {
  const { cart, cartTotal, placeOrder, customer } = useStore();
  const navigate = useNavigate();

  const submitOrder = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order = placeOrder({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      address: form.get("address"),
      city: form.get("city"),
      postalCode: form.get("postalCode"),
      paymentMethod: "Cash on delivery (demo)",
    });
    navigate(`/order-success/${order.id}`);
  };

  if (!cart.length) {
    return <main className="mx-auto max-w-3xl px-5 py-20 text-center"><h1 className="text-3xl font-extrabold">Your cart is empty</h1><p className="mt-3 text-slate-500">Add products before going to checkout.</p><Link to="/shop" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Browse products</Link></main>;
  }

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft size={16} /> Back to cart</Link>
        <h1 className="mt-4 text-3xl font-extrabold">Checkout</h1>
        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={submitOrder} className="space-y-5 rounded-2xl border border-slate-100 bg-white p-5 sm:p-7">
            <section>
              <h2 className="text-lg font-extrabold">Delivery details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold text-slate-600">Full name<input name="name" required defaultValue={customer?.name || ""} autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
                <label className="text-xs font-bold text-slate-600">Email address<input name="email" type="email" required defaultValue={customer?.email || ""} autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
                <label className="text-xs font-bold text-slate-600">Phone number<input name="phone" type="tel" required autoComplete="tel" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
                <label className="text-xs font-bold text-slate-600 sm:col-span-2">Street address<textarea name="address" required rows="2" autoComplete="street-address" className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
                <label className="text-xs font-bold text-slate-600">City<input name="city" required autoComplete="address-level2" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
                <label className="text-xs font-bold text-slate-600">PIN code<input name="postalCode" inputMode="numeric" pattern="[0-9]{6}" title="Enter a 6-digit PIN code" required autoComplete="postal-code" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
              </div>
            </section>
            <section className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-extrabold">Payment method</h2>
              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4"><input type="radio" name="payment" checked readOnly className="mt-1 accent-blue-600" /><span><strong className="text-sm">Cash on delivery</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Demo selection only — no payment is collected and this order is not sent to a seller.</span></span></label>
            </section>
            <button type="submit" className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700">Place demo order · {formatPrice(cartTotal)}</button>
            <p className="text-center text-[11px] leading-5 text-slate-400">This preview stores order details locally in your browser. Do not enter sensitive personal information.</p>
          </form>
          <aside className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-extrabold">Your order</h2>
            <div className="mt-5 space-y-4">{cart.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 text-sm"><span className="text-slate-600">{item.name} <strong className="text-slate-900">× {item.quantity}</strong></span><strong className="shrink-0">{formatPrice(item.price * item.quantity)}</strong></div>)}</div>
            <div className="my-5 border-t border-slate-100" />
            <div className="flex justify-between text-sm text-slate-600"><span>Delivery</span><span>Free</span></div>
            <div className="mt-3 flex justify-between text-lg font-extrabold"><span>Total</span><span>{formatPrice(cartTotal)}</span></div>
            <p className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600"><ShieldCheck size={17} className="shrink-0 text-emerald-600" /> Demo storefront. Real checkout requires a secure payment and order API.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
