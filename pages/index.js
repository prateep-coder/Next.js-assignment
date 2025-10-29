import { useState } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

// Import data directly
const productsData = [
  {
    "id": "1",
    "name": "MacBook Pro 16\"",
    "description": "Supercharged by M2 Pro and M2 Max, MacBook Pro takes its power and efficiency further than ever.",
    "price": 249999,
    "category": "Laptops",
    "inventory": 15,
    "slug": "macbook-pro",
    "rating": 4.8,
    "reviews": 124
  },
  {
    "id": "2",
    "name": "iPhone 15 Pro",
    "description": "Forged from titanium and featuring the groundbreaking A17 Pro chip.",
    "price": 134900,
    "category": "Phones",
    "inventory": 8,
    "slug": "iphone-15-pro",
    "rating": 4.6,
    "reviews": 89
  },
  {
    "id": "3",
    "name": "Sony WH-1000XM5",
    "description": "Industry-leading noise cancellation with premium sound quality.",
    "price": 29990,
    "category": "Audio",
    "inventory": 25,
    "slug": "sony-headphones",
    "rating": 4.7,
    "reviews": 67
  }
]

export default function Home({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      {/* Search Section */}
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          </div>
        )}
      </div>
    </Layout>
  )
}

// FIXED: No API calls, direct data
export async function getStaticProps() {
  return {
    props: {
      products: productsData
    }
  }
}