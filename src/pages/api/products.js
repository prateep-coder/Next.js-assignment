import {
  getAllProducts,
  getProductBySlug,
  getCategories,
} from "../../lib/products";

export default function handler(req, res) {
  const { method, query } = req;

  // Authentication check
  const isAdmin =
    req.headers.authorization === `Bearer ${process.env.ADMIN_TOKEN}`;

  // Input validation
  const validateProduct = (product) => {
    const errors = [];
    if (!product.name || product.name.length < 2)
      errors.push("Name must be at least 2 characters");
    if (!product.price || product.price < 0)
      errors.push("Price must be positive");
    if (!product.category) errors.push("Category is required");
    if (product.inventory < 0) errors.push("Inventory cannot be negative");
    return errors;
  };

  switch (method) {
    case "GET":
      try {
        const { slug, search, category } = query;
        let filteredProducts = getAllProducts();

        // Single product
        if (slug) {
          const product = getProductBySlug(slug);
          return product
            ? res.json({ success: true, data: product })
            : res.status(404).json({ error: "Not found" });
        }

        // Search
        if (search) {
          filteredProducts = filteredProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.description.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Category filter
        if (category) {
          filteredProducts = filteredProducts.filter(
            (p) => p.category === category
          );
        }

        // Replace products with getAllProducts() and getCategories()
        res.json({
          success: true,
          data: filteredProducts,
          meta: {
            total: filteredProducts.length,
            categories: getCategories(),
          },
        });
      } catch (error) {
        console.log("Server error", error);
        res.status(500).json({ error: "Server error" });
      }
      break;

    case "POST":
      if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });

      try {
        const validationErrors = validateProduct(req.body);
        if (validationErrors.length > 0)
          return res
            .status(400)
            .json({ error: "Validation failed", details: validationErrors });

        const newProduct = {
          id: (products.length + 1).toString(),
          ...req.body,
          slug: req.body.name.toLowerCase().replace(/\s+/g, "-"),
          lastUpdated: new Date().toISOString(),
          rating: req.body.rating || 4.0,
          reviews: req.body.reviews || 0,
        };

        // Check duplicate slug
        if (products.find((p) => p.slug === newProduct.slug)) {
          return res.status(409).json({ error: "Product already exists" });
        }

        products.push(newProduct);
        res.status(201).json({ success: true, data: newProduct });
      } catch (error) {
        console.log("failed to create product", error);
        res.status(500).json({ error: "Failed to create product" });
      }
      break;

    case "PUT":
      if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });

      try {
        const { id } = req.body;
        const index = products.findIndex((p) => p.id === id);
        if (index === -1)
          return res.status(404).json({ error: "Product not found" });

        const validationErrors = validateProduct(req.body);
        if (validationErrors.length > 0)
          return res
            .status(400)
            .json({ error: "Validation failed", details: validationErrors });

        products[index] = {
          ...products[index],
          ...req.body,
          lastUpdated: new Date().toISOString(),
        };
        res.json({ success: true, data: products[index] });
      } catch (error) {
        console.log("failed to delete product", error);
        res.status(500).json({ error: "Failed to update product" });
      }
      break;

    case "DELETE":
      if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });

      try {
        const { id } = req.body;
        const index = products.findIndex((p) => p.id === id);
        if (index === -1)
          return res.status(404).json({ error: "Product not found" });

        const deleted = products.splice(index, 1)[0];
        res.json({ success: true, data: deleted });
      } catch (error) {
        console.log("failed to delete product", error);

        res.status(500).json({ error: "Failed to delete product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
