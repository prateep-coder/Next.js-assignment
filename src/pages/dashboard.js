import Link from "next/link";

export default function Dashboard({ products, stats }) {
  const lowStock = products.filter((p) => p.inventory < 5);

  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200">
              🛍️ TechStore
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-blue-200">
                Home
              </Link>
              <Link
                href="/dashboard"
                className="font-semibold border-b-2 border-white pb-1"
              >
                Dashboard
              </Link>
              <Link href="/admin" className="hover:text-blue-200">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600">
              {stats.totalProducts}
            </div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-red-600">
              {stats.lowStock}
            </div>
            <div className="text-gray-600">Low Stock</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(stats.totalValue)}
            </div>
            <div className="text-gray-600">Total Value</div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStock.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-3">
              ⚠️ Low Stock Alert
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lowStock.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded p-3 border border-yellow-200"
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-red-600 text-sm">
                    Only {product.inventory} left
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">All Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Product</th>
                  <th className="px-6 py-3 text-left font-semibold">Price</th>
                  <th className="px-6 py-3 text-left font-semibold">Stock</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">{product.inventory}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.inventory > 10
                            ? "bg-green-100 text-green-800"
                            : product.inventory > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inventory > 10
                          ? "In Stock"
                          : product.inventory > 0
                          ? "Low Stock"
                          : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Import data directly instead of fetching via HTTP
    const { getAllProducts } = await import("../lib/products");
    const products = getAllProducts();

    const stats = {
      totalProducts: products.length,
      lowStock: products.filter((p) => p.inventory < 5).length,
      totalValue: products.reduce((sum, p) => sum + p.price * p.inventory, 0),
    };

    return { props: { products, stats } };
  } catch (error) {
    return {
      props: {
        products: [],
        stats: { totalProducts: 0, lowStock: 0, totalValue: 0 },
      },
    };
  }
}
