import { ProductListProps } from "../types/types";
import { useProducts } from "../hooks/useProducts";

function ProductList({ onProductSelect, closeForm, onMessage }: ProductListProps) {
  const { products, isLoading, error, handleDelete, loadingId } = useProducts(closeForm, onMessage);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

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
                <td colSpan={6} className="text-center">
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
