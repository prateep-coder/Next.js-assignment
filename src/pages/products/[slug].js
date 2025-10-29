import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getProductBySlug, getAllProducts } from '../../lib/products';

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="p-8 text-center">Loading...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-6xl">
                {product.category === 'Laptops' ? '💻' : 
                 product.category === 'Phones' ? '📱' : 
                 product.category === 'Audio' ? '🎧' : '🖥️'}
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

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold">
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const products = getAllProducts();
  
  const paths = products.map(product => ({
    params: { slug: product.slug }
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);

  return {
    props: {
      product: product || null
    },
    revalidate: 60
  };
}