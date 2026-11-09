import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, UserRound, Heart } from "lucide-react";
import Logo from "../Asset/2.png";
import { useStore } from "../context/StoreContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "Offers", to: "/offers" },
];

const linkClass = ({ isActive }) =>
  `whitespace-nowrap border-b-2 px-1 py-4 text-sm font-semibold transition ${
    isActive ? "border-blue-600 text-blue-600" : "border-transparent text-slate-600 hover:text-blue-600"
  }`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useStore();

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Poeage home">
          <img src="/logo.png" alt="Poeage" className="h-10 w-auto max-w-[145px] object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <img src={Logo} alt="Poeage" className="h-10 w-auto max-w-[145px] object-contain" />
        </Link>

        <form onSubmit={submitSearch} className="hidden min-w-0 max-w-md flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 md:flex">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, brands and more..." className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
          <button type="submit" className="text-xs font-bold text-blue-600 hover:text-blue-800">Search</button>
        </form>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <Link to="/wishlist" aria-label="Wishlist" className="hidden rounded-full p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 sm:inline-flex"><Heart size={20} /></Link>
          <Link to="/cart" aria-label={`Shopping cart${cartCount ? `, ${cartCount} items` : ""}`} className="relative rounded-full p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600"><ShoppingBag size={20} />{cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">{cartCount}</span>}</Link>
          <Link to="/login" className="hidden items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 sm:inline-flex"><UserRound size={16} /> Account</Link>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav aria-label="Main navigation" className="hidden border-t border-slate-100 md:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-8 px-6">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass}>{item.label}</NavLink>)}
        </div>
      </nav>

      {/* Mobile navigation: horizontally scrollable, with no cramped wrapping */}
      <nav aria-label="Mobile navigation" className="border-t border-slate-100 md:hidden">
        <div className="mobile-nav-scroll flex items-center gap-6 overflow-x-auto px-4">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => `shrink-0 border-b-2 py-3 text-xs font-bold ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-slate-600"}`}>{item.label}</NavLink>)}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <form onSubmit={submitSearch} className="mb-3 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
            <Search size={17} className="text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none" />
            <button type="submit" className="text-xs font-bold text-blue-600">Search</button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={() => setMenuOpen(false)} className={({ isActive }) => `rounded-lg px-3 py-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}>{item.label}</NavLink>)}
          </div>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white"><UserRound size={17} /> Login / Register</Link>
        </div>
      )}
    </header>
  );
}
