export const categories = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700", count: "120+ Products" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700", count: "250+ Products" },
  { name: "Home & Living", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700", count: "180+ Products" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700", count: "90+ Products" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700", count: "150+ Products" },
  { name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700", count: "100+ Products" },
];

export const products = [
  { id: 1, name: "Premium Wireless Headphones", category: "Electronics", price: 2499, oldPrice: 3999, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700", tag: "BEST SELLER", createdAt: "2026-11-08" },
  { id: 2, name: "Classic Luxury Watch", category: "Accessories", price: 1899, oldPrice: 2999, rating: 4.7, reviews: 89, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700", tag: "POPULAR", createdAt: "2026-11-07" },
  { id: 3, name: "Modern Running Sneakers", category: "Footwear", price: 2199, oldPrice: 3499, rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700", tag: "TRENDING", createdAt: "2026-11-06" },
  { id: 4, name: "Minimalist Everyday Bag", category: "Fashion", price: 1599, oldPrice: 2499, rating: 4.6, reviews: 76, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700", tag: "NEW", createdAt: "2026-11-08" },
  { id: 5, name: "Premium Skincare Collection", category: "Beauty", price: 999, oldPrice: 1499, rating: 4.8, reviews: 145, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700", tag: "POPULAR", createdAt: "2026-11-05" },
  { id: 6, name: "Modern Home Decor", category: "Home & Living", price: 1299, oldPrice: 1999, rating: 4.5, reviews: 63, image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=700", tag: "LIMITED", createdAt: "2026-11-04" },
  { id: 7, name: "Wireless Smart Speaker", category: "Electronics", price: 1799, oldPrice: 2699, rating: 4.7, reviews: 112, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700", tag: "HOT DEAL", createdAt: "2026-11-03" },
  { id: 8, name: "Premium Sunglasses", category: "Accessories", price: 899, oldPrice: 1499, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700", tag: "NEW", createdAt: "2026-11-02" },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
