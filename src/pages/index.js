import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProducts, getCategories } from "../lib/products";

export default function Home({ products: initialProducts, categories }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const formatPrice = (price) =>
    `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const products = useMemo(() => {
    let filtered = [...initialProducts];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
    }

    return filtered;
  }, [search, selectedCategory, sortBy, initialProducts]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="gradient-bg text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-blue-200 transition-colors"
            >
              🛍️ TechStore
            </Link>
            <nav className="flex gap-6">
              <Link
                href="/"
                className="font-semibold border-b-2 border-white pb-1"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-blue-200 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                className="hover:text-blue-200 transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Tech
          </h1>
          <p className="text-xl mb-8">
            Find the latest gadgets and electronics
          </p>
          <input
            type="text"
            placeholder="🔍 Search products..."
            className="w-full max-w-md mx-auto px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {products.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="h-48 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                <div className="text-4xl">
                  {product.category === "Laptops"
                    ? "💻"
                    : product.category === "Phones"
                    ? "📱"
                    : product.category === "Audio"
                    ? "🎧"
                    : "🖥️"}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.inventory > 10
                        ? "bg-green-500 text-white"
                        : product.inventory > 0
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {product.inventory} left
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <Link href={`/products/${product.slug}`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">Try changing your search criteria</p>
          </div>
        )}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const products = getAllProducts();
    const categories = getCategories();
    return {
      props: {
        products,
        categories,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
        categories: [],
      },
    };
  }
}
