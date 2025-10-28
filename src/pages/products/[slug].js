import { useRouter } from "next/router";
import Link from "next/link";
import products from "@/data/products.json";

export default function ProductDetail({ product }) {
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
    </div>
  );
}

export async function getStaticPaths() {
  const products = [
    { slug: "macbook-pro" },
    { slug: "iphone-15-pro" },
    { slug: "sony-headphones" },
    { slug: "samsung-monitor" },
  ];

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
    const res = await fetch(
      `http://localhost:3000/api/products?slug=${params.slug}`
    );
    const data = await res.json();

    if (!data.success) {
      return { notFound: true };
    }

    return {
      props: {
        product: data.data,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}
