import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products as baseProducts } from "../data/products";

const StoreContext = createContext(null);

const initialSellers = [
  { id: "seller-electronics", name: "Atlas Electronics", category: "Electronics", email: "ops@atlas-demo.test", status: "Active", commission: 12, joinedAt: "2026-08-12" },
  { id: "seller-accessories", name: "Northstar Accessories", category: "Accessories", email: "hello@northstar-demo.test", status: "Active", commission: 12, joinedAt: "2026-08-18" },
  { id: "seller-fashion", name: "Common Thread", category: "Fashion & Footwear", email: "team@commonthread-demo.test", status: "Active", commission: 14, joinedAt: "2026-09-02" },
  { id: "seller-beauty", name: "Everyday Glow", category: "Beauty", email: "care@glow-demo.test", status: "Active", commission: 10, joinedAt: "2026-09-10" },
  { id: "seller-home", name: "Good Form Living", category: "Home & Living", email: "studio@goodform-demo.test", status: "Active", commission: 11, joinedAt: "2026-09-15" },
];

const initialPartners = [
  { id: "partner-demo-1", name: "Poeage Fleet — North", email: "north@delivery-demo.test", phone: "9000000001", zone: "Delhi NCR", status: "Active", vehicle: "Two-wheeler" },
  { id: "partner-demo-2", name: "Poeage Fleet — West", email: "west@delivery-demo.test", phone: "9000000002", zone: "Mumbai", status: "Active", vehicle: "Van" },
  { id: "partner-demo-3", name: "Poeage Fleet — South", email: "south@delivery-demo.test", phone: "9000000003", zone: "Bengaluru", status: "Active", vehicle: "Two-wheeler" },
];

function readStorage(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("poeage-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("poeage-wishlist", []));
  const [orders, setOrders] = useState(() => readStorage("poeage-orders", []));
  const [customer, setCustomer] = useState(() => readStorage("poeage-customer", null));
  const [sellers, setSellers] = useState(() => readStorage("poeage-sellers", initialSellers));
  const [deliveryPartners, setDeliveryPartners] = useState(() => readStorage("poeage-delivery-partners", initialPartners));
  const [sellerApplications, setSellerApplications] = useState(() => readStorage("poeage-seller-applications", []));
  const [partnerApplications, setPartnerApplications] = useState(() => readStorage("poeage-partner-applications", []));
  const [customerStatuses, setCustomerStatuses] = useState(() => readStorage("poeage-customer-statuses", {}));
  const [customerNotes, setCustomerNotes] = useState(() => readStorage("poeage-customer-notes", []));
  const [managedProducts, setManagedProducts] = useState(() => readStorage("poeage-managed-products", []));
  const [productOverrides, setProductOverrides] = useState(() => readStorage("poeage-product-overrides", {}));

  useEffect(() => {
    window.localStorage.setItem("poeage-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("poeage-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem("poeage-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (customer) window.localStorage.setItem("poeage-customer", JSON.stringify(customer));
    else window.localStorage.removeItem("poeage-customer");
  }, [customer]);

  useEffect(() => {
    window.localStorage.setItem("poeage-sellers", JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    window.localStorage.setItem("poeage-delivery-partners", JSON.stringify(deliveryPartners));
  }, [deliveryPartners]);

  useEffect(() => {
    window.localStorage.setItem("poeage-seller-applications", JSON.stringify(sellerApplications));
  }, [sellerApplications]);

  useEffect(() => {
    window.localStorage.setItem("poeage-partner-applications", JSON.stringify(partnerApplications));
  }, [partnerApplications]);

  useEffect(() => {
    window.localStorage.setItem("poeage-customer-statuses", JSON.stringify(customerStatuses));
  }, [customerStatuses]);

  useEffect(() => {
    window.localStorage.setItem("poeage-customer-notes", JSON.stringify(customerNotes));
  }, [customerNotes]);

  useEffect(() => {
    window.localStorage.setItem("poeage-managed-products", JSON.stringify(managedProducts));
  }, [managedProducts]);

  useEffect(() => {
    window.localStorage.setItem("poeage-product-overrides", JSON.stringify(productOverrides));
  }, [productOverrides]);

  const inventoryProducts = useMemo(() => [
    ...baseProducts.map((product) => ({ ...product, ...productOverrides[product.id] })),
    ...managedProducts,
  ], [managedProducts, productOverrides]);
  const catalogProducts = useMemo(
    () => inventoryProducts.filter((product) => product.status !== "Paused"),
    [inventoryProducts]
  );

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item)
        : [...current, { ...product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setCart((current) => current.filter((item) => item.id !== productId));
      return;
    }
    setCart((current) => current.map((item) => item.id === productId ? { ...item, quantity } : item));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((current) => current.some((item) => item.id === product.id)
      ? current.filter((item) => item.id !== product.id)
      : [...current, product]);
  }, []);

  const placeOrder = useCallback((details) => {
    const order = {
      ...details,
      id: `PH${Date.now().toString().slice(-8)}`,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      createdAt: new Date().toISOString(),
      status: "Order placed",
      deliveryPartnerId: null,
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    return order;
  }, [cart]);

  const updateOrder = useCallback((orderId, changes) => {
    setOrders((current) => current.map((order) => order.id === orderId ? { ...order, ...changes } : order));
  }, []);

  const addSellerApplication = useCallback((application) => {
    setSellerApplications((current) => [{
      ...application,
      id: `SELL${Date.now().toString().slice(-7)}`,
      status: "Pending review",
      createdAt: new Date().toISOString(),
    }, ...current]);
  }, []);

  const reviewSellerApplication = useCallback((applicationId, status) => {
    const application = sellerApplications.find((item) => item.id === applicationId);
    setSellerApplications((current) => current.map((application) => application.id === applicationId
      ? { ...application, status }
      : application));
    if (status === "Approved" && application) {
      const seller = {
        id: `seller-${applicationId.toLowerCase()}`,
        name: application.businessName,
        category: application.category,
        email: application.email,
        status: "Active",
        commission: 12,
        joinedAt: new Date().toISOString().slice(0, 10),
      };
      setSellers((current) => current.some((item) => item.id === seller.id)
        ? current
        : [seller, ...current]);
    }
  }, [sellerApplications]);

  const updateSeller = useCallback((sellerId, changes) => {
    setSellers((current) => current.map((seller) => seller.id === sellerId ? { ...seller, ...changes } : seller));
  }, []);

  const addPartnerApplication = useCallback((application) => {
    setPartnerApplications((current) => [{
      ...application,
      id: `RIDER${Date.now().toString().slice(-7)}`,
      status: "Pending review",
      createdAt: new Date().toISOString(),
    }, ...current]);
  }, []);

  const reviewPartnerApplication = useCallback((applicationId, status) => {
    const application = partnerApplications.find((item) => item.id === applicationId);
    setPartnerApplications((current) => current.map((application) => application.id === applicationId
      ? { ...application, status }
      : application));
    if (status === "Approved" && application) {
      const partner = {
        id: `partner-${applicationId.toLowerCase()}`,
        name: application.name,
        email: application.email,
        phone: application.phone,
        zone: application.zone,
        vehicle: application.vehicle,
        status: "Active",
      };
      setDeliveryPartners((current) => current.some((item) => item.id === partner.id)
        ? current
        : [partner, ...current]);
    }
  }, [partnerApplications]);

  const updateDeliveryPartner = useCallback((partnerId, changes) => {
    setDeliveryPartners((current) => current.map((partner) => partner.id === partnerId ? { ...partner, ...changes } : partner));
  }, []);

  const updateCustomerStatus = useCallback((email, status) => {
    setCustomerStatuses((current) => ({ ...current, [email.toLowerCase()]: status }));
  }, []);

  const addCustomerNote = useCallback((note) => {
    setCustomerNotes((current) => [{
      ...note,
      id: `NOTE${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
    }, ...current]);
  }, []);

  const updateProduct = useCallback((productId, changes) => {
    if (String(productId).startsWith("seller-")) {
      setManagedProducts((current) => current.map((product) => product.id === productId ? { ...product, ...changes } : product));
    } else {
      setProductOverrides((current) => ({
        ...current,
        [productId]: { ...current[productId], ...changes },
      }));
    }
  }, []);

  const addProduct = useCallback((product) => {
    setManagedProducts((current) => [{
      ...product,
      id: `seller-${Date.now()}`,
      rating: 0,
      reviews: 0,
      tag: "NEW",
      createdAt: new Date().toISOString().slice(0, 10),
      status: "Active",
    }, ...current]);
  }, []);

  const value = useMemo(() => ({
    cart,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    wishlist,
    orders,
    customer,
    setCustomer,
    sellers,
    deliveryPartners,
    sellerApplications,
    partnerApplications,
    customerStatuses,
    customerNotes,
    catalogProducts,
    inventoryProducts,
    managedProducts,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    placeOrder,
    updateOrder,
    addSellerApplication,
    reviewSellerApplication,
    updateSeller,
    addPartnerApplication,
    reviewPartnerApplication,
    updateDeliveryPartner,
    updateCustomerStatus,
    addCustomerNote,
    updateProduct,
    addProduct,
  }), [
    cart, wishlist, orders, customer, sellers, deliveryPartners, sellerApplications,
    partnerApplications, customerStatuses, customerNotes, catalogProducts, inventoryProducts, managedProducts,
    addToCart, updateQuantity, removeFromCart, toggleWishlist, placeOrder, updateOrder,
    addSellerApplication, reviewSellerApplication, updateSeller, addPartnerApplication,
    reviewPartnerApplication, updateDeliveryPartner, updateCustomerStatus, addCustomerNote,
    updateProduct, addProduct,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider.");
  return context;
}
