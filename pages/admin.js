import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function AdminPanel() {
  const [products, setProducts] = useState([])

  // Client-side only
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.data || []))
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Admin features coming soon...</p>
          <div className="mt-4">
            <p>Total Products: {products.length}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}