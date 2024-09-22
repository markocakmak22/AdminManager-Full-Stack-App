import { productService } from "../services/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/types";
import { ProductListProps } from "../types/types";
import { useState } from "react";

function ProductList({ onProductSelect, onMessage, closeForm }: ProductListProps) {
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    staleTime: Infinity,
  });

  const handleDelete = async (id: string | null) => {
    if (id === null) return;
    
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!isConfirmed) {
      return;
    }

    setLoadingId(id);

    try {
      await productService.deleteProduct(id);

      queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) =>
        oldProducts.filter((product) => product.id !== id)
      );
      
      onMessage("Category deleted successfully!");
      closeForm()
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  console.log("Updated products!")
  console.log(products)
  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-list me-1"></i>
        Products
      </div>
      <div className="card-body">
        <table className="table table-striped">
          {products && products.length > 0 && (
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category ID</th>
                <th>Actions</th>
              </tr>
            </thead>
          )}
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category?.name}</td>
                  <td>
                    {loadingId !== product.id && (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => onProductSelect(product)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      {loadingId === product.id ? "Loading..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
