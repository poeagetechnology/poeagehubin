import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  Headset,
  PackageCheck,
  Plus,
  ShieldAlert,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { categories, formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

const roleDetails = {
  admin: { title: "Marketplace admin", description: "Marketplace operations and governance", icon: ShieldAlert, tabs: ["Overview", "Sellers", "Delivery", "Orders", "Customers"] },
  seller: { title: "Seller centre", description: "Your catalog, fulfillment and customer relationships", icon: Store, tabs: ["Overview", "Products", "Orders", "CRM"] },
  delivery: { title: "Delivery operations", description: "Dispatch, route handoff and delivery status", icon: Truck, tabs: ["Overview", "Deliveries"] },
  users: { title: "Customer management", description: "Customer accounts, order history and CRM notes", icon: Users, tabs: ["Overview", "Customers", "CRM"] },
};

const sellerStatuses = ["Confirmed", "Packed", "Ready for pickup"];
const deliveryStatuses = ["Picked up", "In transit", "Out for delivery", "Delivered"];
const imageForCategory = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700",
  Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700",
  "Home & Living": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
  Beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700",
  Accessories: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  Footwear: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
};

function Metric({ label, value, detail, icon: Icon }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="flex items-start justify-between"><p className="text-xs font-semibold text-slate-500">{label}</p><span className="rounded-xl bg-blue-50 p-2 text-blue-600"><Icon size={18} /></span></div>
      <p className="mt-4 text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-[11px] text-slate-400">{detail}</p>
    </article>
  );
}

function SectionTitle({ title, description, action }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-extrabold">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action}</div>;
}

function EmptyState({ children }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">{children}</div>;
}

function StatusPill({ children }) {
  const isPositive = ["Active", "Approved", "Delivered", "Confirmed", "In transit", "Out for delivery", "Picked up", "Ready for pickup"].includes(children);
  const isNegative = ["Paused", "Suspended", "Rejected", "Cancelled", "Flagged"].includes(children);
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${isPositive ? "bg-emerald-50 text-emerald-700" : isNegative ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>{children}</span>;
}

function OrderTable({ orders, partners, role, sellerId, selectedPartnerId, onUpdateOrder }) {
  const visibleOrders = role === "seller"
    ? orders.filter((order) => order.items?.some((item) => item.sellerId === sellerId))
    : orders;

  if (!visibleOrders.length) return <EmptyState>New orders will appear here after a customer places an order.</EmptyState>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Items</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status / action</th></tr></thead>
        <tbody className="divide-y divide-slate-100">
          {visibleOrders.map((order) => {
            const assignedPartner = partners.find((partner) => partner.id === order.deliveryPartnerId);
            return (
              <tr key={order.id}>
                <td className="px-4 py-4"><Link to={`/order/${order.id}`} className="font-bold text-blue-700 hover:underline">{order.id}</Link><p className="mt-1 text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p></td>
                <td className="px-4 py-4"><p className="font-semibold">{order.name}</p><p className="text-xs text-slate-500">{order.email}</p><p className="text-xs text-slate-400">{order.city || ""}</p></td>
                <td className="px-4 py-4">{order.items?.length || 0} line items</td>
                <td className="px-4 py-4 font-bold">{formatPrice(order.total)}</td>
                <td className="px-4 py-4">
                  {role === "seller" ? (
                    <div className="flex flex-col items-start gap-2"><StatusPill>{order.status}</StatusPill><select aria-label={`Update status for ${order.id}`} value={order.status} onChange={(event) => onUpdateOrder(order.id, { status: event.target.value })} className="max-w-40 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"><option value={order.status}>{order.status}</option>{sellerStatuses.filter((status) => status !== order.status).map((status) => <option key={status}>{status}</option>)}</select></div>
                  ) : role === "delivery" ? (
                    <div className="flex min-w-48 flex-col items-start gap-2"><StatusPill>{order.status}</StatusPill>{!order.deliveryPartnerId ? order.status === "Ready for pickup" ? <button type="button" onClick={() => onUpdateOrder(order.id, { deliveryPartnerId: selectedPartnerId })} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50" disabled={!selectedPartnerId}>Claim delivery</button> : <span className="text-xs text-slate-500">Waiting for seller pickup</span> : order.deliveryPartnerId !== selectedPartnerId ? <span className="text-xs text-slate-500">Assigned: {assignedPartner?.name || "Partner"}</span> : <select aria-label={`Update delivery status for ${order.id}`} value={order.status} onChange={(event) => onUpdateOrder(order.id, { status: event.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs">{[order.status, ...deliveryStatuses.filter((status) => status !== order.status)].map((status) => <option key={status}>{status}</option>)}</select>}</div>
                  ) : (
                    <div className="flex flex-col items-start gap-2"><StatusPill>{order.status}</StatusPill>{role === "admin" && <select aria-label={`Assign delivery partner for ${order.id}`} value={order.deliveryPartnerId || ""} onChange={(event) => onUpdateOrder(order.id, { deliveryPartnerId: event.target.value || null })} className="max-w-48 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"><option value="">Unassigned</option>{partners.filter((partner) => partner.status === "Active").map((partner) => <option key={partner.id} value={partner.id}>{partner.name}</option>)}</select>}</div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Management() {
  const { role: routeRole } = useParams();
  const location = useLocation();
  const pathRole = location.pathname.startsWith("/seller/") ? "seller"
    : location.pathname.startsWith("/delivery/") ? "delivery"
      : location.pathname === "/admin/customers" ? "users" : "admin";
  const requestedRole = routeRole || pathRole;
  const role = roleDetails[requestedRole] ? requestedRole : "admin";
  const details = roleDetails[role];
  const [activeTab, setActiveTab] = useState(details.tabs[0]);
  const [selectedSellerId, setSelectedSellerId] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState("");
  const [noteText, setNoteText] = useState("");
  const {
    orders, sellers, deliveryPartners, sellerApplications, partnerApplications,
    customerStatuses, customerNotes, inventoryProducts, updateOrder, reviewSellerApplication,
    updateSeller, reviewPartnerApplication, updateDeliveryPartner, updateCustomerStatus,
    addCustomerNote, updateProduct, addProduct, customer,
  } = useStore();

  useEffect(() => {
    setActiveTab(details.tabs[0]);
  }, [details.tabs, role]);
  useEffect(() => {
    if (!selectedSellerId && sellers.length) setSelectedSellerId(sellers[0].id);
  }, [sellers, selectedSellerId]);
  useEffect(() => {
    if (!selectedPartnerId && deliveryPartners.length) setSelectedPartnerId(deliveryPartners[0].id);
  }, [deliveryPartners, selectedPartnerId]);

  const selectedSeller = sellers.find((seller) => seller.id === selectedSellerId);
  const selectedPartner = deliveryPartners.find((partner) => partner.id === selectedPartnerId);
  const sellerProducts = inventoryProducts.filter((product) => product.sellerId === selectedSellerId);
  const sellerOrders = orders.filter((order) => order.items?.some((item) => item.sellerId === selectedSellerId));
  const sellerSales = sellerOrders.reduce((total, order) => total + order.items.reduce((subtotal, item) => subtotal + (item.sellerId === selectedSellerId ? item.price * item.quantity : 0), 0), 0);
  const sellerCustomers = useMemo(() => {
    const records = new Map();
    sellerOrders.forEach((order) => records.set(order.email.toLowerCase(), { name: order.name, email: order.email, orders: (records.get(order.email.toLowerCase())?.orders || 0) + 1, total: (records.get(order.email.toLowerCase())?.total || 0) + order.total }));
    return [...records.values()];
  }, [sellerOrders]);
  const customers = useMemo(() => {
    const records = new Map();
    orders.forEach((order) => {
      const email = order.email.toLowerCase();
      const existing = records.get(email) || { name: order.name, email: order.email, phone: order.phone, orders: 0, spend: 0, lastOrder: order.createdAt };
      existing.orders += 1;
      existing.spend += order.total;
      if (order.createdAt > existing.lastOrder) existing.lastOrder = order.createdAt;
      records.set(email, existing);
    });
    if (customer?.email && !records.has(customer.email.toLowerCase())) {
      records.set(customer.email.toLowerCase(), { name: customer.name, email: customer.email, phone: "", orders: 0, spend: 0, lastOrder: null });
    }
    return [...records.values()];
  }, [orders, customer]);
  const activeOrders = orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status));
  const openApplications = sellerApplications.filter((application) => application.status === "Pending review").length + partnerApplications.filter((application) => application.status === "Pending review").length;
  const roleOrders = role === "seller" ? sellerOrders : orders;
  const roleRevenue = role === "seller" ? sellerSales : orders.reduce((total, order) => total + order.total, 0);
  const roleProducts = role === "seller" ? sellerProducts : inventoryProducts;
  const partnerOrders = orders.filter((order) => order.deliveryPartnerId === selectedPartnerId);
  const availableDeliveries = orders.filter((order) => !order.deliveryPartnerId && order.status === "Ready for pickup");

  const submitProduct = (event) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const category = values.get("category");
    addProduct({
      sellerId: selectedSellerId,
      name: values.get("name").trim(),
      category,
      price: Number(values.get("price")),
      oldPrice: Number(values.get("oldPrice")),
      inventory: Number(values.get("inventory")),
      image: values.get("image") || imageForCategory[category],
    });
    event.currentTarget.reset();
    setShowProductForm(false);
  };

  const submitCustomerNote = (event) => {
    event.preventDefault();
    if (!selectedCustomerEmail || !noteText.trim()) return;
    const selectedCustomer = customers.find((item) => item.email.toLowerCase() === selectedCustomerEmail.toLowerCase());
    addCustomerNote({
      sellerId: role === "seller" ? selectedSellerId : null,
      email: selectedCustomerEmail,
      customerName: selectedCustomer?.name || selectedCustomerEmail,
      author: role === "seller" ? selectedSeller?.name : "Marketplace support",
      text: noteText.trim(),
    });
    setNoteText("");
  };

  const renderOrders = () => (
    <>
      {role === "delivery" && <label className="mb-4 block max-w-sm text-xs font-bold text-slate-600">Active partner identity<select value={selectedPartnerId} onChange={(event) => setSelectedPartnerId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">{deliveryPartners.map((partner) => <option key={partner.id} value={partner.id}>{partner.name} · {partner.zone} · {partner.status}</option>)}</select></label>}
      <OrderTable orders={role === "delivery" ? orders.filter((order) => !order.deliveryPartnerId || order.deliveryPartnerId === selectedPartnerId) : role === "seller" ? sellerOrders : orders} partners={deliveryPartners} role={role} sellerId={selectedSellerId} selectedPartnerId={selectedPartnerId} onUpdateOrder={updateOrder} />
    </>
  );

  const renderCustomers = () => {
    if (!customers.length) return <EmptyState>Customers are added to this view when they place an order or create a demo profile.</EmptyState>;
    return <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Orders</th><th className="px-4 py-3">Lifetime value</th><th className="px-4 py-3">Last order</th><th className="px-4 py-3">Account status</th><th className="px-4 py-3">CRM</th></tr></thead><tbody className="divide-y divide-slate-100">{customers.map((person) => { const status = customerStatuses[person.email.toLowerCase()] || "Active"; return <tr key={person.email}><td className="px-4 py-4"><p className="font-bold">{person.name}</p><p className="text-xs text-slate-500">{person.email}</p><p className="text-xs text-slate-400">{person.phone}</p></td><td className="px-4 py-4">{person.orders}</td><td className="px-4 py-4 font-bold">{formatPrice(person.spend)}</td><td className="px-4 py-4 text-xs text-slate-500">{person.lastOrder ? new Date(person.lastOrder).toLocaleDateString("en-IN") : "No orders"}</td><td className="px-4 py-4">{role === "admin" || role === "users" ? <select aria-label={`Set account status for ${person.email}`} value={status} onChange={(event) => updateCustomerStatus(person.email, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"><option>Active</option><option>Flagged</option><option>Suspended</option></select> : <StatusPill>{status}</StatusPill>}</td><td className="px-4 py-4"><button type="button" onClick={() => { setSelectedCustomerEmail(person.email); if (role === "seller") setActiveTab("CRM"); }} className="text-xs font-bold text-blue-600 hover:underline">Open CRM</button></td></tr>; })}</tbody></table></div>;
  };

  const renderCrm = () => {
    const contacts = role === "seller" ? sellerCustomers : customers;
    const notes = customerNotes.filter((note) => note.email.toLowerCase() === selectedCustomerEmail.toLowerCase() && (role !== "seller" || note.sellerId === selectedSellerId));
    return (
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <section className="rounded-2xl border border-slate-100 bg-white p-4">
          <h3 className="font-extrabold">Customer book</h3>
          <p className="mt-1 text-xs text-slate-500">Customers with marketplace order history</p>
          <div className="mt-4 space-y-2">{contacts.length ? contacts.map((person) => <button key={person.email} type="button" onClick={() => setSelectedCustomerEmail(person.email)} className={`w-full rounded-xl p-3 text-left ${selectedCustomerEmail === person.email ? "bg-blue-50 text-blue-800" : "hover:bg-slate-50"}`}><span className="block text-sm font-bold">{person.name}</span><span className="mt-1 block truncate text-[11px] text-slate-500">{person.email}</span></button>) : <p className="py-6 text-center text-xs text-slate-400">Customer relationships appear after orders.</p>}</div>
        </section>
        <section className="rounded-2xl border border-slate-100 bg-white p-5">
          <h3 className="font-extrabold">{selectedCustomerEmail || "Select a customer"}</h3>
          <p className="mt-1 text-xs text-slate-500">Log follow-ups, support notes and account context. Notes are local demo data.</p>
          {selectedCustomerEmail && <><form onSubmit={submitCustomerNote} className="mt-4"><label className="sr-only" htmlFor="crm-note">CRM note</label><textarea id="crm-note" value={noteText} onChange={(event) => setNoteText(event.target.value)} required rows="3" placeholder="Add a customer interaction or follow-up note..." className="w-full resize-y rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" /><button type="submit" className="mt-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white">Save CRM note</button></form><div className="mt-5 space-y-3">{notes.length ? notes.map((note) => <article key={note.id} className="rounded-xl bg-slate-50 p-4"><p className="text-sm leading-6 text-slate-700">{note.text}</p><p className="mt-2 text-[10px] text-slate-400">{note.author} · {new Date(note.createdAt).toLocaleString("en-IN")}</p></article>) : <p className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-xs text-slate-400">No notes yet. Start the customer conversation log.</p>}</div></>}
        </section>
      </div>
    );
  };

  const renderProducts = () => (
    <>
      <SectionTitle title="Product catalog" description="Manage listings, sale prices and inventory for your seller account." action={<button type="button" onClick={() => setShowProductForm((open) => !open)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white"><Plus size={15} /> Add product</button>} />
      {showProductForm && <form onSubmit={submitProduct} className="mb-5 grid gap-3 rounded-2xl border border-blue-100 bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-xs font-bold text-slate-600">Product name<input name="name" required maxLength="90" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label>
        <label className="text-xs font-bold text-slate-600">Category<select name="category" required className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal">{categories.map((category) => <option key={category.name}>{category.name}</option>)}</select></label>
        <label className="text-xs font-bold text-slate-600">Price (₹)<input name="price" type="number" min="1" step="1" required className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label>
        <label className="text-xs font-bold text-slate-600">Compare-at price (₹)<input name="oldPrice" type="number" min="1" step="1" required className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label>
        <label className="text-xs font-bold text-slate-600">Available inventory<input name="inventory" type="number" min="0" step="1" required className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label>
        <label className="text-xs font-bold text-slate-600">Image URL (optional)<input name="image" type="url" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-3"><button type="submit" className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white">Create demo listing</button><button type="button" onClick={() => setShowProductForm(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold">Cancel</button></div>
      </form>}
      {roleProducts.length ? <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Listing</th>{role === "admin" && <th className="px-4 py-3">Seller</th>}<th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{roleProducts.map((product) => { const seller = sellers.find((item) => item.id === product.sellerId); const status = product.status || "Active"; return <tr key={product.id}><td className="px-4 py-3"><div className="flex items-center gap-3"><img src={product.image} alt="" className="h-11 w-11 rounded-lg object-cover" /><div><p className="max-w-56 truncate font-bold">{product.name}</p><p className="text-[10px] text-slate-400">{product.category}</p></div></div></td>{role === "admin" && <td className="px-4 py-3 text-xs">{seller?.name || "Seller pending"}</td>}<td className="px-4 py-3 font-semibold">{formatPrice(product.price)}</td><td className="px-4 py-3"><label className="flex items-center gap-2"><span className="sr-only">Stock for {product.name}</span><input aria-label={`Stock for ${product.name}`} type="number" min="0" value={product.inventory ?? 0} onChange={(event) => updateProduct(product.id, { inventory: Number(event.target.value) })} className="w-20 rounded-lg border border-slate-200 px-2 py-1.5" /><span className="text-[10px] text-slate-400">units</span></label></td><td className="px-4 py-3"><StatusPill>{status}</StatusPill></td><td className="px-4 py-3"><button type="button" onClick={() => updateProduct(product.id, { status: status === "Paused" ? "Active" : "Paused" })} className="text-xs font-bold text-blue-600 hover:underline">{status === "Paused" ? "Resume listing" : "Pause listing"}</button></td></tr>; })}</tbody></table></div> : <EmptyState>There are no products in this catalog yet. Add your first product listing.</EmptyState>}
    </>
  );

  const renderSellerManagement = () => (
    <div className="space-y-6">
      <section><SectionTitle title="Seller applications" description="Review onboarding and approve or reject seller applications." />{sellerApplications.length ? <div className="space-y-3">{sellerApplications.map((application) => <article key={application.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4"><div><p className="font-bold">{application.businessName} <StatusPill>{application.status}</StatusPill></p><p className="mt-1 text-xs text-slate-500">{application.contactName} · {application.email} · {application.category}</p><p className="mt-1 text-[10px] text-slate-400">Application {application.id} · {new Date(application.createdAt).toLocaleDateString("en-IN")}</p></div>{application.status === "Pending review" && <div className="flex gap-2"><button type="button" onClick={() => reviewSellerApplication(application.id, "Approved")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">Approve</button><button type="button" onClick={() => reviewSellerApplication(application.id, "Rejected")} className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700">Reject</button></div>}</article>)}</div> : <EmptyState>Seller applications submitted from the storefront will appear here.</EmptyState>}</section>
      <section><SectionTitle title="Marketplace sellers" description="Monitor seller status, categories and marketplace commission." />{sellers.length ? <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Seller</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Products</th><th className="px-4 py-3">Commission</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{sellers.map((seller) => <tr key={seller.id}><td className="px-4 py-4"><p className="font-bold">{seller.name}</p><p className="text-xs text-slate-500">{seller.email}</p></td><td className="px-4 py-4 text-xs">{seller.category}</td><td className="px-4 py-4">{inventoryProducts.filter((product) => product.sellerId === seller.id).length}</td><td className="px-4 py-4"><label className="flex items-center gap-1"><input aria-label={`Commission for ${seller.name}`} type="number" min="0" max="50" value={seller.commission} onChange={(event) => updateSeller(seller.id, { commission: Number(event.target.value) })} className="w-16 rounded-lg border border-slate-200 px-2 py-1.5" /><span>%</span></label></td><td className="px-4 py-4"><StatusPill>{seller.status}</StatusPill></td><td className="px-4 py-4"><button type="button" onClick={() => updateSeller(seller.id, { status: seller.status === "Active" ? "Paused" : "Active" })} className="text-xs font-bold text-blue-600 hover:underline">{seller.status === "Active" ? "Pause seller" : "Reactivate"}</button></td></tr>)}</tbody></table></div> : <EmptyState>No seller accounts are active yet.</EmptyState>}</section>
    </div>
  );

  const renderDeliveryManagement = () => (
    <div className="space-y-6">
      <section><SectionTitle title="Partner applications" description="Review delivery partner onboarding and operating zones." />{partnerApplications.length ? <div className="space-y-3">{partnerApplications.map((application) => <article key={application.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4"><div><p className="font-bold">{application.name} <StatusPill>{application.status}</StatusPill></p><p className="mt-1 text-xs text-slate-500">{application.email} · {application.phone} · {application.zone} · {application.vehicle}</p></div>{application.status === "Pending review" && <div className="flex gap-2"><button type="button" onClick={() => reviewPartnerApplication(application.id, "Approved")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">Approve</button><button type="button" onClick={() => reviewPartnerApplication(application.id, "Rejected")} className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700">Reject</button></div>}</article>)}</div> : <EmptyState>Delivery applications submitted from the partner signup page will appear here.</EmptyState>}</section>
      <section><SectionTitle title="Delivery fleet" description="Activate delivery partners and review coverage." />{deliveryPartners.length ? <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Partner</th><th className="px-4 py-3">Zone</th><th className="px-4 py-3">Vehicle</th><th className="px-4 py-3">Active jobs</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{deliveryPartners.map((partner) => <tr key={partner.id}><td className="px-4 py-4"><p className="font-bold">{partner.name}</p><p className="text-xs text-slate-500">{partner.email} · {partner.phone}</p></td><td className="px-4 py-4">{partner.zone}</td><td className="px-4 py-4">{partner.vehicle}</td><td className="px-4 py-4">{orders.filter((order) => order.deliveryPartnerId === partner.id && order.status !== "Delivered").length}</td><td className="px-4 py-4"><StatusPill>{partner.status}</StatusPill></td><td className="px-4 py-4"><button type="button" onClick={() => updateDeliveryPartner(partner.id, { status: partner.status === "Active" ? "Paused" : "Active" })} className="text-xs font-bold text-blue-600 hover:underline">{partner.status === "Active" ? "Pause partner" : "Reactivate"}</button></td></tr>)}</tbody></table></div> : <EmptyState>No delivery partners are registered yet.</EmptyState>}</section>
    </div>
  );

  const renderOverview = () => (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label={role === "users" ? "Customer records" : role === "seller" ? "Your sales" : "Marketplace sales"} value={role === "users" ? customers.length : formatPrice(roleRevenue)} detail={role === "users" ? "Customers with an account or order" : "Demo gross order value"} icon={CircleDollarSign} />
        <Metric label={role === "users" ? "Order history" : role === "seller" ? "Your orders" : "All orders"} value={roleOrders.length} detail={`${activeOrders.length} open across marketplace`} icon={ClipboardList} />
        <Metric label={role === "users" ? "CRM notes" : role === "seller" ? "Your listings" : "Active listings"} value={role === "users" ? customerNotes.length : roleProducts.length} detail={role === "users" ? "Customer support and follow-up log" : `${roleProducts.filter((product) => product.inventory <= 5).length} low-stock products`} icon={role === "users" ? Headset : Boxes} />
        <Metric label={role === "delivery" ? "Ready to claim" : role === "seller" ? "CRM customers" : "Needs attention"} value={role === "delivery" ? availableDeliveries.length : role === "seller" ? sellerCustomers.length : openApplications} detail={role === "delivery" ? `${partnerOrders.length} jobs assigned to you` : role === "seller" ? "Customers with order history" : "Pending partner and seller applications"} icon={role === "seller" ? Headset : role === "delivery" ? PackageCheck : Users} />
      </div>
      {role === "seller" && <div className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-slate-100 bg-white p-5"><label className="block text-xs font-bold text-slate-500">Seller workspace<select value={selectedSellerId} onChange={(event) => setSelectedSellerId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900">{sellers.map((seller) => <option key={seller.id} value={seller.id}>{seller.name} · {seller.status}</option>)}</select></label><p className="mt-4 text-xs text-slate-500">Commission rate <strong className="text-slate-900">{selectedSeller?.commission ?? 0}%</strong> · estimated marketplace fee <strong className="text-slate-900">{formatPrice(sellerSales * (selectedSeller?.commission || 0) / 100)}</strong></p><p className="mt-2 text-[10px] text-slate-400">Sample workspace selector only. Production access must use verified seller membership.</p></article><article className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="text-sm font-extrabold text-blue-950">Seller CRM & fulfillment</p><p className="mt-2 text-xs leading-5 text-blue-900">Manage customer notes, track your catalog and move orders through packing and pickup.</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setActiveTab("Products")} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700">Manage catalog</button><button type="button" onClick={() => setActiveTab("CRM")} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700">Open CRM</button></div></article></div>}
      {role === "delivery" && <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5"><label className="block max-w-md text-xs font-bold text-slate-500">Active partner identity<select value={selectedPartnerId} onChange={(event) => setSelectedPartnerId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900">{deliveryPartners.map((partner) => <option key={partner.id} value={partner.id}>{partner.name} · {partner.zone} · {partner.status}</option>)}</select></label><p className="mt-3 text-xs text-slate-500">Demo dispatch lets this selected partner claim open orders and update delivery milestones.</p></div>}
      <section className="mt-7"><SectionTitle title={role === "seller" ? "Recent seller orders" : role === "delivery" ? "Delivery queue" : "Recent marketplace orders"} description={role === "delivery" ? "Claim unassigned orders or update your delivery progress." : "Latest local demo orders and current fulfillment status."} action={<button type="button" onClick={() => setActiveTab(role === "delivery" ? "Deliveries" : "Orders")} className="text-xs font-bold text-blue-600">View all <ArrowUpRight size={14} className="inline" /></button>} />{renderOrders()}</section>
      {role === "admin" && <section className="mt-7"><SectionTitle title="Marketplace controls" description="Jump to partner approvals, customer support or catalog oversight." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Sellers", Store], ["Delivery", Truck], ["Customers", Users], ["Orders", ClipboardList]].map(([tab, Icon]) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left hover:border-blue-200"><span className="rounded-xl bg-blue-50 p-2.5 text-blue-600"><Icon size={17} /></span><span className="text-sm font-bold">{tab}</span></button>)}</div></section>}
    </>
  );

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-8 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3"><span className="rounded-2xl bg-blue-600 p-3 text-white"><details.icon size={22} /></span><div><h1 className="text-2xl font-extrabold sm:text-3xl">{details.title}</h1><p className="mt-1 text-sm text-slate-500">{details.description}</p></div></div>
          <div className="flex flex-wrap gap-2"><Link to="/seller/register" className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700">Become a seller</Link><Link to="/delivery/register" className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700">Become a delivery partner</Link></div>
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><ShieldAlert size={17} className="mt-0.5 shrink-0" /><p><strong>Demo management workspace.</strong> Data is saved only in this browser. Role switching is not authentication; do not use customer data or real business operations here. Production needs server-side identity, permissions, audit logs and a transactional database.</p></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Management sections" className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-100 bg-white p-2 lg:flex-col lg:self-start">{details.tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 rounded-xl px-3 py-3 text-left text-xs font-bold transition ${activeTab === tab ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}>{tab}</button>)}{role !== "admin" && <Link to="/admin/dashboard" className="shrink-0 rounded-xl px-3 py-3 text-xs font-semibold text-slate-400 hover:bg-slate-50 lg:mt-3">Admin demo portal ↗</Link>}</nav>
          <div className="min-w-0">
            {activeTab === "Overview" && renderOverview()}
            {activeTab === "Products" && renderProducts()}
            {activeTab === "Orders" && <><SectionTitle title={role === "seller" ? "Seller orders" : "Marketplace orders"} description="Update fulfillment and keep order status visible to customers." />{renderOrders()}</>}
            {activeTab === "Deliveries" && <><SectionTitle title="Delivery dispatch" description={`${availableDeliveries.length} unassigned order(s) available · ${partnerOrders.length} assigned to ${selectedPartner?.name || "selected partner"}.`} />{renderOrders()}</>}
            {activeTab === "Sellers" && renderSellerManagement()}
            {activeTab === "Delivery" && renderDeliveryManagement()}
            {activeTab === "Customers" && <><SectionTitle title="Customer directory" description="Review order activity and manage demo account status." />{renderCustomers()}</>}
            {activeTab === "CRM" && <><SectionTitle title={role === "seller" ? "Seller CRM" : "Customer support CRM"} description="Keep customer context and follow-up notes with order history." />{renderCrm()}</>}
            {activeTab === "Orders" && role === "admin" && <div className="mt-5 rounded-xl bg-blue-50 p-4 text-xs text-blue-900"><ChartNoAxesCombined size={16} className="mr-2 inline" />Delivery assignment is for workflow preview only. Rates, shipment labels, tracking events and carrier integrations are not connected.</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
