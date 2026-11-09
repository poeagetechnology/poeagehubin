import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  Check,
  Store,
  Sparkles,
  Zap,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

const categories = [
  {
    name: "Electronics",
    count: "120+ Products",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700",
  },
  {
    name: "Fashion",
    count: "250+ Products",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700",
  },
  {
    name: "Home & Living",
    count: "180+ Products",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
  },
  {
    name: "Beauty",
    count: "90+ Products",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700",
  },
  {
    name: "Accessories",
    count: "150+ Products",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    name: "Footwear",
    count: "100+ Products",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
];

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    name: "Classic Luxury Watch",
    category: "Accessories",
    price: 1899,
    oldPrice: 2999,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Modern Running Sneakers",
    category: "Footwear",
    price: 2199,
    oldPrice: 3499,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    tag: "TRENDING",
  },
  {
    id: 4,
    name: "Minimalist Everyday Bag",
    category: "Fashion",
    price: 1599,
    oldPrice: 2499,
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700",
    tag: "NEW",
  },
  {
    id: 5,
    name: "Premium Skincare Collection",
    category: "Beauty",
    price: 999,
    oldPrice: 1499,
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700",
    tag: "POPULAR",
  },
  {
    id: 6,
    name: "Modern Home Decor",
    category: "Home & Living",
    price: 1299,
    oldPrice: 1999,
    rating: 4.5,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=700",
    tag: "LIMITED",
  },
  {
    id: 7,
    name: "Wireless Smart Speaker",
    category: "Electronics",
    price: 1799,
    oldPrice: 2699,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700",
    tag: "HOT DEAL",
  },
  {
    id: 8,
    name: "Premium Sunglasses",
    category: "Accessories",
    price: 899,
    oldPrice: 1499,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
    tag: "NEW",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const benefits = [
  {
    icon: Truck,
    title: "Delivery across India",
    description: "Convenient delivery options",
  },
  {
    icon: ShieldCheck,
    title: "Secure shopping",
    description: "A clear and simple checkout",
  },
  {
    icon: Headphones,
    title: "Customer support",
    description: "Help when you need it",
  },
  {
    icon: BadgeCheck,
    title: "Curated collections",
    description: "Products across categories",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const { cart, cartCount, wishlist, catalogProducts, addToCart: addProductToCart, toggleWishlist: toggleSavedProduct } = useStore();
  const allProducts = useMemo(
    () => [
      ...products.flatMap((product) => {
        const catalogProduct = catalogProducts.find((item) => item.id === product.id);
        return catalogProduct ? [{ ...product, ...catalogProduct }] : [];
      }),
      ...catalogProducts.filter((product) => String(product.id).startsWith("seller-")),
    ],
    [catalogProducts]
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? allProducts
        : allProducts.filter((product) => product.category === activeCategory),
    [activeCategory, allProducts]
  );

  const addToCart = (product) => {
    addProductToCart(product);
    setNotice(`${product.name} added to your demo cart.`);
  };

  const toggleWishlist = (product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    toggleSavedProduct(product);
    setNotice(
      isSaved
        ? `${product.name} removed from your wishlist.`
        : `${product.name} saved to your wishlist.`
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f3f6fc]">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-20">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
              <Sparkles size={15} />
              DISCOVER THE POEAGE EXPERIENCE
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Shopping made
              <span className="block text-blue-600">extraordinary.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover products across your favourite categories, explore
              curated collections and enjoy a simpler way to shop — all in one
              marketplace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore collection <ArrowRight size={18} />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Browse categories
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-blue-100 pt-7">
              <div>
                <p className="text-2xl font-extrabold">Multiple</p>
                <p className="mt-1 text-xs text-slate-500">Product categories</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">Multi-vendor</p>
                <p className="mt-1 text-xs text-slate-500">Marketplace model</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">COD</p>
                <p className="mt-1 text-xs text-slate-500">Planned payment option</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-blue-300/40 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
              alt="A curated online shopping collection"
              className="relative h-[320px] w-full rounded-[2rem] object-cover shadow-2xl sm:h-[450px]"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:min-w-[260px]">
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-blue-600">
                THE POEAGE EDIT
              </p>
              <h2 className="mt-2 text-xl font-bold">Your style. Your choice.</h2>
              <p className="mt-1 text-xs text-slate-500">
                Find something you will love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-12">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Icon size={21} />
              </div>
              <div>
                <h3 className="text-xs font-bold sm:text-sm">{title}</h3>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="EXPLORE OUR COLLECTION"
          title="Shop by category"
          description="Browse popular departments and discover your next favourite."
          link="/categories"
          linkText="View all categories"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              key={category.name}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
            >
              <div className="overflow-hidden bg-slate-100">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-32 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-40"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold transition group-hover:text-blue-600">
                  {category.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#102b62] px-7 py-10 text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-blue-100">
              <Zap size={14} /> DISCOVER MORE, SHOP SMARTER
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-5xl">
              Great finds.
              <span className="block text-blue-300">A better way to shop.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-blue-100">
              Explore collections across electronics, fashion, home essentials
              and more. Your next great find could be just a click away.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-blue-950 transition hover:bg-blue-50"
            >
              Explore products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending products */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="HANDPICKED FOR YOU"
          title="Trending products"
          description="A sample of products from the Poeage marketplace."
          link="/shop"
          linkText="View all products"
        />

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {["All", ...categories.map((category) => category.name)].map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-slate-50">
                  <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
                    />
                  </Link>
                  <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-white">
                    {product.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    aria-pressed={isWishlisted}
                    className={`absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-md transition hover:scale-105 ${
                      isWishlisted
                        ? "text-rose-500"
                        : "text-slate-500 hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      size={17}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {product.category}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="mt-2 min-h-10 line-clamp-2 text-xs font-bold leading-5 transition hover:text-blue-600 sm:text-sm">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                    <span className="text-xs font-bold">{product.rating}</span>
                    <span className="text-[10px] text-slate-400">
                      ({product.reviews} sample reviews)
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold sm:text-base">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition ${
                      isInCart
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-950 text-white hover:bg-blue-600"
                    }`}
                  >
                    <ShoppingBag size={15} />
                    {isInCart ? "Add another" : "Add to cart"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            No sample products found in this category.
          </p>
        )}

        <p className="mt-5 text-xs text-slate-400">
          Demo catalogue only. Product names, prices, ratings and availability
          must be connected to the live product API before launch.
        </p>
      </section>

      {/* Seller CTA */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#f3f6fc] md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-8 sm:p-12">
            <div className="flex items-center gap-2 text-sm font-extrabold text-blue-600">
              <Store size={19} /> POEAGE SELLER PROGRAM
            </div>
            <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">
              Bring your business to more customers.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
              Create your seller presence, showcase your products and manage
              marketplace orders from one place.
            </p>
            <Link
              to="/seller/register"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Start selling <ArrowRight size={18} />
            </Link>
          </div>
          <div className="min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000"
              alt="Small business owner preparing an online order"
              loading="lazy"
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Demo cart shortcut */}
      {cartCount > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <ShoppingBag size={19} />
          Cart ({cartCount})
          <ArrowRight size={17} />
        </Link>
      )}

      {/* Local interaction feedback */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-5 z-50 flex max-w-[calc(100%-2.5rem)] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-xl sm:max-w-sm"
        >
          <Check size={16} className="shrink-0 text-emerald-600" />
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="ml-2 text-slate-400 hover:text-slate-800"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}

function SectionHeading({ eyebrow, title, description, link, linkText }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-extrabold tracking-[0.2em] text-blue-600 sm:text-xs">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold capitalize sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 transition hover:gap-3 sm:text-sm"
      >
        {linkText} <ChevronRight size={17} />
      </Link>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-slate-950 px-5 py-14 text-white sm:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-blue-400 sm:text-xs">
            STAY CONNECTED
          </p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Get the latest from Poeage.
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Discover new collections and marketplace updates.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="poeage-newsletter-email">
            Email address
          </label>
          <input
            id="poeage-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSubmitted(false);
            }}
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-full border border-slate-700 bg-slate-900 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Subscribe
          </button>
          {submitted && (
            <span className="text-xs text-emerald-400 sm:absolute sm:mt-14">
              Thanks! Newsletter UI submitted. Connect an API to store signups.
            </span>
          )}
        </form>
      </div>
    </section>
  );
}
