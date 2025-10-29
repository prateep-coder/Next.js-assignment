import { useState } from 'react'
import Link from 'next/link'

// Static data
const productsData = [
  {
    id: "1",
    name: "MacBook Pro 16\"",
    description: "Supercharged by M2 Pro and M2 Max, MacBook Pro takes its power and efficiency further than ever.",
    price: 249999,
    category: "Laptops",
    inventory: 15,
    slug: "macbook-pro",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    description: "Forged from titanium and featuring the groundbreaking A17 Pro chip.",
    price: 134900,
    category: "Phones",
    inventory: 8,
    slug: "iphone-15-pro",
    rating: 4.6,
    reviews: 89
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation with premium sound quality.",
    price: 29990,
    category: "Audio",
    inventory: 25,
    slug: "sony-headphones",
    rating: 4.7,
    reviews: 67
  }
]

export default function Home() {
  const [products] = useState(productsData)
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  )

  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Laptops': '💻',
      'Phones': '📱',
      'Audio': '🎧'
    }
    return icons[category] || '📦'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">🛍️ TechStore</Link>
            <nav className="flex gap-6">
              <Link href="/" className="font-semibold">Home</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/admin" className="hover:underline">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <input
            type="text"
            placeholder="🔍 Search products..."
            className="w-full max-w-md mx-auto px-4 py-2 rounded text-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">
                  {getCategoryIcon(product.category)}
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-600">{formatPrice(product.price)}</span>
                  <div className="flex items-center gap-1">
                    <span>⭐ {product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviews})</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.inventory > 10 ? 'bg-green-500 text-white' :
                    product.inventory > 0 ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {product.inventory} in stock
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {product.category}
                  </span>
                </div>

                <Link href={`/products/${product.slug}`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try changing your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}