import Link from 'next/link'

// Static data
const productsData = [
  {
    id: "1",
    name: "MacBook Pro 16\"",
    price: 249999,
    category: "Laptops",
    inventory: 15,
    rating: 4.8
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    price: 134900,
    category: "Phones",
    inventory: 8,
    rating: 4.6
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    price: 29990,
    category: "Audio",
    inventory: 25,
    rating: 4.7
  }
]

export default function Dashboard() {
  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">🛍️ TechStore</Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/dashboard" className="font-semibold">Dashboard</Link>
              <Link href="/admin" className="hover:underline">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600">{productsData.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-red-600">
              {productsData.filter(p => p.inventory < 5).length}
            </div>
            <div className="text-gray-600">Low Stock</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(productsData.reduce((sum, p) => sum + (p.price * p.inventory), 0))}
            </div>
            <div className="text-gray-600">Total Value</div>
          </div>
        </div>

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
                {productsData.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">{product.inventory}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.inventory > 10 ? 'bg-green-100 text-green-800' :
                        product.inventory > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.inventory > 10 ? 'In Stock' : product.inventory > 0 ? 'Low Stock' : 'Out of Stock'}
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
  )
}