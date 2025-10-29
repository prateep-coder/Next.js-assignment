import Link from 'next/link'

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-4xl">
          {product.category === 'Laptops' ? '💻' : 
           product.category === 'Phones' ? '📱' : '🎧'}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-green-600">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1">
            <span>⭐ {product.rating}</span>
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
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}