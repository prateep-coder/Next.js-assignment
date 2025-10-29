import products from "../data/products.json";

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}
