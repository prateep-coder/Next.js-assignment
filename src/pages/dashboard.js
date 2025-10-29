import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  }, []);

  const formatPrice = (price) =>
    `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const totalValue = formatPrice(
    products.reduce((sum, p) => sum + p.price * p.inventory, 0)
  );
  const lowStockCount = products.filter(
    (p) => p.inventory > 0 && p.inventory < 5
  ).length;

  return (
    <Layout>
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 drop-shadow">
          Dashboard
        </h1>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600">
              {products.length}
            </div>
            <div className="text-gray-500">Total Products</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-yellow-100">
            <div className="text-3xl font-bold text-yellow-600">
              {lowStockCount}
            </div>
            <div className="text-gray-500">Low Stock</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-green-100">
            <div className="text-3xl font-bold text-green-600">
              {totalValue}
            </div>
            <div className="text-gray-500">Total Value</div>
          </div>
        </div>
        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold text-gray-700">
              All Products
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.category}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-6 py-4">{p.inventory}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          p.inventory > 10
                            ? "bg-green-100 text-green-700"
                            : p.inventory > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.inventory > 10
                          ? "In Stock"
                          : p.inventory > 0
                          ? "Low Stock"
                          : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-400">
                      <div className="text-5xl mb-2">📦</div>
                      <div className="font-semibold">No products found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
