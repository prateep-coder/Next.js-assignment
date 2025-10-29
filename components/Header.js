import Link from 'next/link'

export default function Header() {
  return (
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
  )
}