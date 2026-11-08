
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      
      {/* Website Header */}
      <Header />

      {/* Page Content */}
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      {/* Website Footer */}
      <Footer />

    </div>
  );
}
