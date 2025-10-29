import { useRouter } from "next/router";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "../../lib/products";

export default function ProductDetail({ product, relatedProducts = [] }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <button
                onClick={() => router.back()}
                className="hover:text-blue-200"
              >
                ← Back
              </button>
              <span className="text-gray-300">|</span>
              <Link href="/" className="hover:text-blue-200 font-semibold">
                🏠 Home
              </Link>
            </div>
            <Link href="/" className="text-xl font-bold hover:text-blue-200">
              🛍️ TechStore
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
              <div className="text-6xl">
                {product.category === "Laptops"
                  ? "💻"
                  : product.category === "Phones"
                  ? "📱"
                  : product.category === "Audio"
                  ? "🎧"
                  : "🖥️"}
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  <span>⭐ {product.rating}</span>
                  <span>({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    product.inventory > 10
                      ? "bg-green-100 text-green-800"
                      : product.inventory > 0
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inventory > 10
                    ? "In Stock"
                    : product.inventory > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
                <span className="ml-3 text-gray-600">
                  {product.inventory} units available
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="font-semibold">
                    {new Date(product.lastUpdated).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  🛒 Add to Cart
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  ❤️ Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.length === 0 && (
            <div className="col-span-full text-gray-500 text-center">
              No related products found.
            </div>
          )}
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                <div className="text-5xl drop-shadow">
                  {product.category === "Laptops"
                    ? "💻"
                    : product.category === "Phones"
                    ? "📱"
                    : product.category === "Audio"
                    ? "🎧"
                    : "🖥️"}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow ${
                      product.inventory > 10
                        ? "bg-green-500 text-white"
                        : product.inventory > 0
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {product.inventory} left
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-700 transition">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <Link href={`/products/${product.slug}`}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-semibold transition-colors shadow">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const products = getAllProducts();
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const product = getProductBySlug(params.slug);
    if (!product) {
      return { notFound: true };
    }
    // Find related products (same category, not itself, max 3)
    const allProducts = getAllProducts();
    const relatedProducts = allProducts
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .slice(0, 3);

    return {
      props: {
        product,
        relatedProducts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log('not found ', error);
    
    return { notFound: true };
  }
}
