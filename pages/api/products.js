const productsData = [
  {
    "id": "1",
    "name": "MacBook Pro 16\"",
    "description": "Supercharged by M2 Pro and M2 Max, MacBook Pro takes its power and efficiency further than ever.",
    "price": 249999,
    "category": "Laptops",
    "inventory": 15,
    "slug": "macbook-pro",
    "rating": 4.8,
    "reviews": 124
  },
  {
    "id": "2",
    "name": "iPhone 15 Pro",
    "description": "Forged from titanium and featuring the groundbreaking A17 Pro chip.",
    "price": 134900,
    "category": "Phones",
    "inventory": 8,
    "slug": "iphone-15-pro",
    "rating": 4.6,
    "reviews": 89
  },
  {
    "id": "3",
    "name": "Sony WH-1000XM5",
    "description": "Industry-leading noise cancellation with premium sound quality.",
    "price": 29990,
    "category": "Audio",
    "inventory": 25,
    "slug": "sony-headphones",
    "rating": 4.7,
    "reviews": 67
  }
]

export default function handler(req, res) {
  const { method, query } = req

  if (method === 'GET') {
    const { slug } = query
    
    if (slug) {
      const product = productsData.find(p => p.slug === slug)
      return product ? 
        res.json({ success: true, data: product }) : 
        res.status(404).json({ error: 'Product not found' })
    }

    res.json({ 
      success: true, 
      data: productsData,
      meta: {
        total: productsData.length,
        categories: [...new Set(productsData.map(p => p.category))]
      }
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}