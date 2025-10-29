import productsData from '../data/products.json';

export function getAllProducts() {
  return productsData;
}

export function getProductBySlug(slug) {
  return productsData.find(product => product.slug === slug);
}

export function getCategories() {
  return [...new Set(productsData.map(product => product.category))];
}