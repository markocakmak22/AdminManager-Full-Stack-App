import React, { useEffect, useState } from "react";
import { ProductFormProps } from "../types/types";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../types/types";

function ProductForm({ selectedProduct, closeForm, onMessage }: ProductFormProps) {
  const { upsertProduct, isLoading, errors, setErrors } = useProducts(closeForm, onMessage);
  const [product, setProduct] = useState<{ id: string; name: string; description: string; price: number | null; category_id: string }>({ id: "", name: "", description: "", price: null, category_id: "" });
  const { categories } = useCategories(closeForm, onMessage);

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        id: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category_id: selectedProduct.category?.id ?? ""
      });
      setErrors({});
    } else {
      setProduct({ id: "", name: "", description: "", price: null, category_id: "" });
      setErrors({});
    }
  }, [selectedProduct, setErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await upsertProduct(product, (message: string) => {
      onMessage(message);
      closeForm();
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-plus me-1"></i>
        {selectedProduct?.id ? "Edit Product" : "Add Product"}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productId" className="form-label">Product ID</label>
            <input
              type="text"
              className="form-control"
              id="productId"
              name="id"
              value={product.id}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="productName"
              name="name"
              value={product.name}
              placeholder="Enter product name"
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
                setErrors((prev) => ({ ...prev, name: null }));
              }}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Product Description</label>
            <textarea
              className="form-control"
              id="productDescription"
              name="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Product Price</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="productPrice"
              name="price"
              value={product.price ?? ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setProduct({ ...product, price: isNaN(value) ? null : value });
                setErrors((prev) => ({ ...prev, price: null }));
              }}
              required
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Category</label>
            <select
              className="form-control"
              onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
              value={product.category_id}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories?.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
              {isLoading ? "Loading..." : product.id ? "Update Product" : "Add Product"}
            </button>
            {!isLoading && (
              <button onClick={closeForm} type="button" className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
