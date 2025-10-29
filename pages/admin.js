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
          <p className="text-gray-600">Admin features coming soon...</p>
          <div className="mt-4">
            <p>Total Products: 3</p>
          </div>
        </div>
      </div>
    </div>
  )
}