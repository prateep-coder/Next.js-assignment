import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="h-48 bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-4xl">📱</div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.price.toLocaleString()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inventory > 10 ? 'bg-green-100 text-green-800' :
            product.inventory > 0 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {product.inventory} in stock
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}