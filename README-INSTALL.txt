POEAGE RESPONSIVE CUSTOMER STOREFRONT PAGES

Included:
- Responsive Header with navigation links:
  Home, Shop, Categories, New Arrivals, Best Sellers, Offers
- Desktop navigation and mobile horizontally-scrollable navigation
- Mobile menu with search and account link
- Shop page with search, category filter and sorting
- Categories page
- New Arrivals page
- Best Sellers page
- Offers page
- Shared responsive ProductCard and sample product data
- App.jsx routes

Install dependencies:
npm install
npm install lucide-react react-router-dom

Integration:
1. Copy the contents of this package's src/ folder into your existing project's src/ folder.
2. Keep your existing src/Compet/Home.jsx (the completed homepage component).
3. Keep your existing src/layouts/MainLayout.jsx and ensure it renders <Header />, <Outlet /> and <Footer />.
4. Replace src/components/Header.jsx with the included Header.jsx.
5. Replace src/App.jsx with the included App.jsx.
6. Ensure src/main.jsx wraps <App /> in <BrowserRouter>.
7. Merge the included index.css rules into your existing src/index.css if needed.

Expected existing project paths:
src/Compet/Home.jsx
src/layouts/MainLayout.jsx
src/components/Footer.jsx

If your existing logo is at src/Asset/2.png, copy it to public/logo.png to use the logo location referenced by Header.jsx.
Alternatively, change the image src in Header.jsx to your preferred logo import/path.

Run:
npm run dev

Notes:
- The product catalogue is demo data in src/data/products.js.
- Cart and wishlist buttons on listing cards currently show local demo feedback only.
- Search, filters and sorting work on the sample product list.
- Backend, MongoDB, user authentication, persistent cart/wishlist, payment and live inventory are not connected.
- Product links currently route to a placeholder Product details page.
- The header uses React Router NavLink and Link.
