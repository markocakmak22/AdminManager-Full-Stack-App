import { useState } from "react";

import { Product } from "../types/types";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddNewProduct = () => {
    setSelectedProduct({ id: "", name: "", description:"", price:null,category:null});
    setMessage(null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setMessage(null);
  };

  const closeForm = () => {
    setSelectedProduct(null);
  };

  const handleMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <div className="container-fluid px-4">
      <h3 className="mt-4">Products Management</h3>
      <div className="mb-4">
        <button onClick={handleAddNewProduct} className="btn btn-primary">
          Add New Product
        </button>
      </div>
      <ProductList
        closeForm={closeForm}
        onMessage={handleMessage}
        onProductSelect={handleProductSelect}
      />
      {selectedProduct && (
        <ProductForm
          selectedProduct={selectedProduct}
          closeForm={closeForm}
          onMessage={handleMessage}
        />
      )}
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
}

export default Products;
