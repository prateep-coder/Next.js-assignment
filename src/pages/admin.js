import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPanel() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', inventory: '' })
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setMessage('Error fetching products')
    }
  }

  fetchProducts()
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    const method = editing ? 'PUT' : 'POST'
    const url = '/api/products'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify(editing ? { ...form, id: editing.id } : form)
      })

      const data = await res.json()

      if (data.success) {
        setMessage(editing ? 'Product updated successfully!' : 'Product added successfully!')
        setForm({ name: '', description: '', price: '', category: '', inventory: '' })
        setEditing(null)
        fetchProducts()
      } else {
        setMessage(data.error || 'Error saving product')
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage('Error saving product')
    }
  }

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({ id: productId })
      })

      const data = await res.json()
      if (data.success) {
        setMessage('Product deleted successfully!')
        fetchProducts()
      } else {
        setMessage(data.error || 'Error deleting product')
      }
    } catch (error) {
      console.error('Error deleting products:', error);
      setMessage('Error deleting product')
    }
  }

  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200">
              🛍️ TechStore
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-blue-200">Home</Link>
              <Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <Link href="/admin" className="font-semibold border-b-2 border-white pb-1">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">{editing ? 'Edit Product' : 'Add New Product'}</h2>
            
            {message && (
              <div className={`p-3 rounded mb-4 ${
                message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Inventory"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.inventory}
                  onChange={e => setForm({ ...form, inventory: e.target.value })}
                  required
                />
              </div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Laptops">Laptops</option>
                <option value="Phones">Phones</option>
                <option value="Audio">Audio</option>
                <option value="Monitors">Monitors</option>
                <option value="Tablets">Tablets</option>
                <option value="Wearables">Wearables</option>
              </select>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
                  {editing ? 'Update Product' : 'Add Product'}
                </button>
                {editing && (
                  <button 
                    type="button" 
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                    onClick={() => {
                      setEditing(null)
                      setForm({ name: '', description: '', price: '', category: '', inventory: '' })
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Manage Products ({products.length})</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{formatPrice(product.price)} • {product.inventory} in stock • {product.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(product)
                          setForm({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            category: product.category,
                            inventory: product.inventory
                          })
                        }}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-semibold hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No products found. Add your first product!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}