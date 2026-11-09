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
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import Account from "./pages/Account";
import SellerRegistration from "./pages/SellerRegistration";
import TrackOrder from "./pages/TrackOrder";
import DeliveryPartnerRegistration from "./pages/DeliveryPartnerRegistration";
import Management from "./pages/Management";
import { StoreProvider } from "./context/StoreContext";

function NotFound() {
  return <main className="mx-auto min-h-[55vh] max-w-4xl px-5 py-20 text-center"><h1 className="text-3xl font-extrabold">Page not found</h1><p className="mt-3 text-sm text-slate-500">The page you are looking for does not exist.</p><a href="/" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Go home</a></main>;
}

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderStatus />} />
          <Route path="/order/:id" element={<OrderStatus />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Account />} />
          <Route path="/seller/register" element={<SellerRegistration />} />
          <Route path="/delivery/register" element={<DeliveryPartnerRegistration />} />
          <Route path="/management" element={<Management />} />
          <Route path="/management/:role" element={<Management />} />
          <Route path="/admin/dashboard" element={<Management />} />
          <Route path="/admin/customers" element={<Management />} />
          <Route path="/seller/dashboard" element={<Management />} />
          <Route path="/delivery/dashboard" element={<Management />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}
