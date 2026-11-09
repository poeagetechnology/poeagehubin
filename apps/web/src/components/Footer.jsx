
import React from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      ["All Products", "/shop"],
      ["Categories", "/categories"],
      ["New Arrivals", "/new-arrivals"],
      ["Best Sellers", "/best-sellers"],
      ["Special Offers", "/offers"],
    ],
  },
  {
    title: "Customer Care",
    links: [
      ["My Account", "/login"],
      ["My Cart", "/cart"],
      ["My Wishlist", "/wishlist"],
      ["Track My Order", "/track-order"],
      ["Contact Support", "/contact"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About PoeageHub", "/about"],
      ["Become a Seller", "/seller/register"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms"],
    ],
  },
  {
    title: "Marketplace",
    links: [
      ["Seller Centre", "/seller/dashboard"],
      ["Delivery Partner", "/delivery/dashboard"],
      ["Join Delivery Fleet", "/delivery/register"],
      ["Admin Demo", "/admin/dashboard"],
      ["Customer Management", "/management/users"],
    ],
  },
];

const trustItems = [
  {
    Icon: Truck,
    title: "Delivery Options",
    description: "Convenient delivery across India",
  },
  {
    Icon: ShieldCheck,
    title: "Secure Shopping",
    description: "A safer shopping experience",
  },
  {
    Icon: Headphones,
    title: "Customer Support",
    description: "Help when you need it",
  },
  {
    Icon: CreditCard,
    title: "Cash on Delivery",
    description: "Payment option planned",
  },
];

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map(([label, path]) => (
          <li key={path}>
            <Link
              to={path}
              className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-300"
            >
              <ChevronRight
                size={14}
                className="text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-300"
              />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full overflow-hidden bg-[#071426] text-white">

      {/* Trust Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustItems.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white sm:text-sm">
                  {title}
                </h4>
                <p className="mt-1 text-[10px] leading-4 text-slate-400 sm:text-xs">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Poeage<span className="text-blue-400">Hub</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Discover quality products and enjoy a convenient
            online shopping experience with PoeageHub.
          </p>

          <a
            href="https://poeage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-white"
          >
            Part of Poeage Group
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Navigation Groups */}
        {footerGroups.map((group) => (
          <FooterLinkGroup
            key={group.title}
            title={group.title}
            links={group.links}
          />
        ))}
      </div>

      {/* Seller CTA */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-900/50 to-slate-900/50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Grow Your Business with PoeageHub
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Start your seller journey and reach more customers.
            </p>
          </div>

          <Link
            to="/seller/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Become a Seller
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <p className="text-xs text-slate-500">
            © {year} PoeageHub. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Powered by{" "}
            <a
              href="https://poeage.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-white"
            >
              Poeage Technology
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
