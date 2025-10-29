import { getAllProducts, getProductBySlug, getCategories } from '../../lib/products';

export default function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    const { slug } = query;
    
    if (slug) {
      const product = getProductBySlug(slug);
      return product ? 
        res.json({ success: true, data: product }) : 
        res.status(404).json({ error: 'Product not found' });
    }

    const products = getAllProducts();
    res.json({ 
      success: true, 
      data: products,
      meta: {
        total: products.length,
        categories: getCategories()
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}