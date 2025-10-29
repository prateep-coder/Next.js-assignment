import { useRouter } from 'next/router'
import Link from 'next/link'

// Static data
const productsData = [
  {
    id: "1",
    name: "MacBook Pro 16\"",
    description: "Supercharged by M2 Pro and M2 Max, MacBook Pro takes its power and efficiency further than ever. It delivers exceptional performance whether you're compiling code, editing multiple streams of 8K video, or experiencing immersive gaming.",
    price: 249999,
    category: "Laptops",
    inventory: 15,
    slug: "macbook-pro",
    rating: 4.8,
    reviews: 124,
    features: ["M2 Max Chip", "32GB RAM", "1TB SSD", "Liquid Retina XDR Display"]
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    description: "Forged from titanium and featuring the groundbreaking A17 Pro chip, iPhone 15 Pro marks a huge leap in performance, camera capabilities, and pro features.",
    price: 134900,
    category: "Phones",
    inventory: 8,
    slug: "iphone-15-pro",
    rating: 4.6,
    reviews: 89,
    features: ["Titanium Design", "A17 Pro Chip", "48MP Camera", "5G"]
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation with premium sound quality. Enjoy your music without distractions with our best-ever noise canceling and 30-hour battery life.",
    price: 29990,
    category: "Audio",
    inventory: 25,
    slug: "sony-headphones",
    rating: 4.7,
    reviews: 67,
    features: ["Noise Canceling", "30hr Battery", "Touch Control", "Quick Charge"]
  }
]

export default function ProductDetail() {
  const router = useRouter()
  const { slug } = router.query

  const product = productsData.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    )
  }

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
            <div className="flex gap-4">
              <button onClick={() => router.back()} className="hover:underline">← Back</button>
              <Link href="/" className="hover:underline">Home</Link>
            </div>
            <Link href="/" className="text-xl font-bold">🛍️ TechStore</Link>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <span className="text-6xl">
                {getCategoryIcon(product.category)}
              </span>
            </div>
            
            <div className="md:w-1/2">
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  <span>⭐ {product.rating}</span>
                  <span>({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                  product.inventory > 10 ? 'bg-green-500 text-white' :
                  product.inventory > 0 ? 'bg-yellow-500 text-white' : 
                  'bg-red-500 text-white'
                }`}>
                  {product.inventory > 10 ? 'In Stock' : product.inventory > 0 ? 'Low Stock' : 'Out of Stock'}
                </span>
                <span className="ml-3 text-gray-600">{product.inventory} units available</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Key Features:</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition-colors">
                  🛒 Add to Cart
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded font-semibold transition-colors">
                  ❤️ Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Static generation
export async function getStaticPaths() {
  const paths = productsData.map(product => ({
    params: { slug: product.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const product = productsData.find(p => p.slug === params.slug)

  return {
    props: {
      product: product || null
    }
  }
}