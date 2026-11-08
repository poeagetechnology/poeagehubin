import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Compet/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import NewArrivals from "./pages/NewArrivals";
import BestSellers from "./pages/BestSellers";
import Offers from "./pages/Offers";

function Placeholder({ title }) {
  return <main className="mx-auto min-h-[55vh] max-w-4xl px-5 py-20 text-center"><h1 className="text-3xl font-extrabold">{title}</h1><p className="mt-3 text-sm text-slate-500">This module will be implemented in the next development phase.</p></main>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/product/:id" element={<Placeholder title="Product details" />} />
        <Route path="/cart" element={<Placeholder title="Your cart" />} />
        <Route path="/wishlist" element={<Placeholder title="Your wishlist" />} />
        <Route path="/login" element={<Placeholder title="Customer login" />} />
        <Route path="/seller/register" element={<Placeholder title="Seller registration" />} />
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Route>
    </Routes>
  );
}
