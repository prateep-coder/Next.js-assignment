import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
    rating: "",
    reviews: "",
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.data || []);
    } catch {
      setMessage("❌ Error fetching products");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      inventory: parseInt(form.inventory),
      rating: parseFloat(form.rating) || 4.0,
      reviews: parseInt(form.reviews) || 0,
    };

    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch("/api/products", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer admin123",
        },
        body: JSON.stringify(
          editing ? { ...productData, id: editing.id } : productData
        ),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(editing ? "✅ Product updated!" : "✅ Product added!");
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          inventory: "",
          rating: "",
          reviews: "",
        });
        setEditing(null);
        fetchProducts();
      } else {
        setMessage(`❌ ${data.error || "Error saving product"}`);
      }
    } catch {
      setMessage("❌ Error saving product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer admin123",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Product deleted!");
        fetchProducts();
      } else {
        setMessage(`❌ ${data.error || "Error deleting product"}`);
      }
    } catch {
      setMessage("❌ Error deleting product");
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  const getCategoryIcon = (cat) =>
    ({
      Laptops: "💻",
      Phones: "📱",
      Audio: "🎧",
      Monitors: "🖥️",
      Tablets: "📟",
      Wearables: "⌚",
    }[cat] || "📦");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🛍️</span>
            <span>
              <h1 className="text-2xl font-bold">TechStore</h1>
              <p className="text-blue-100 text-xs">Admin Panel</p>
            </span>
          </Link>
          <nav className="flex gap-6 text-base">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="font-semibold border-b-2 border-white pb-1"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editing ? "✏️ Edit Product" : "➕ Add Product"}
              </h2>
              {message && (
                <div
                  className={`p-3 rounded-lg mb-4 text-sm font-medium border ${
                    message.includes("❌")
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Product name"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="input input-bordered w-full"
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    className="input input-bordered w-full"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                    min="0"
                    step="0.01"
                  />
                  <input
                    type="number"
                    placeholder="Inventory"
                    className="input input-bordered w-full"
                    value={form.inventory}
                    onChange={(e) =>
                      setForm({ ...form, inventory: e.target.value })
                    }
                    required
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Rating"
                    className="input input-bordered w-full"
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: e.target.value })
                    }
                    min="0"
                    max="5"
                    step="0.1"
                  />
                  <input
                    type="number"
                    placeholder="Reviews"
                    className="input input-bordered w-full"
                    value={form.reviews}
                    onChange={(e) =>
                      setForm({ ...form, reviews: e.target.value })
                    }
                    min="0"
                  />
                </div>
                <select
                  className="input input-bordered w-full"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Laptops">💻 Laptops</option>
                  <option value="Phones">📱 Phones</option>
                  <option value="Audio">🎧 Audio</option>
                  <option value="Monitors">🖥️ Monitors</option>
                  <option value="Tablets">📟 Tablets</option>
                  <option value="Wearables">⌚ Wearables</option>
                </select>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "⏳ Processing..."
                      : editing
                      ? "📝 Update"
                      : "➕ Add"}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setEditing(null);
                        setForm({
                          name: "",
                          description: "",
                          price: "",
                          category: "",
                          inventory: "",
                          rating: "",
                          reviews: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow p-6 flex gap-6">
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {products.length}
                </div>
                <div className="text-xs text-gray-500">Total Products</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.inventory > 0).length}
                </div>
                <div className="text-xs text-gray-500">In Stock</div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Manage Products
              </h2>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                {products.length} products
              </span>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition group flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {getCategoryIcon(p.category)}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-blue-600">
                        {p.name}
                      </div>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{formatPrice(p.price)}</span>
                        <span>• {p.inventory} in stock</span>
                        <span>
                          • ⭐ {p.rating} ({p.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setForm({
                          name: p.name,
                          description: p.description,
                          price: p.price,
                          category: p.category,
                          inventory: p.inventory,
                          rating: p.rating,
                          reviews: p.reviews,
                        });
                      }}
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-200 flex items-center gap-1"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-200 flex items-center gap-1"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-2">📦</div>
                  <div className="font-semibold">No products found</div>
                  <div className="text-xs">Add your first product!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
