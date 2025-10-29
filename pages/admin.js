import Link from 'next/link'

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">🛍️ TechStore</Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/admin" className="font-semibold">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className="text-xl font-semibold mb-2">Admin Features</h2>
            <p className="text-gray-600 mb-4">Manage your products and inventory</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold">Product Management</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove products</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold">Inventory Tracking</h3>
                <p className="text-sm text-gray-600">Monitor stock levels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}