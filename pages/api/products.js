const products = require('../../data/products.json')

export default function handler(req, res) {
  const { method, query } = req

  if (method === 'GET') {
    const { slug } = query
    
    if (slug) {
      const product = products.find(p => p.slug === slug)
      return product ? 
        res.json({ success: true, data: product }) : 
        res.status(404).json({ error: 'Product not found' })
    }

    res.json({ 
      success: true, 
      data: products,
      meta: {
        total: products.length,
        categories: [...new Set(products.map(p => p.category))]
      }
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}