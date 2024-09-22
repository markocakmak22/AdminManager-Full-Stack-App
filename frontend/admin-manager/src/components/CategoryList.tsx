import { useCategories } from "../hooks/useCategories";
import { CategoryListProps } from "../types/types";

function CategoryList({ onCategorySelect, closeForm, onMessage }: CategoryListProps) {
  const { categories, isFetching, error, handleDelete, loadingId } = useCategories(closeForm, onMessage);
  
  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-list me-1"></i>
        Categories
      </div>
      <div className="card-body">
        <table className="table table-striped" style={{ tableLayout: "fixed" }}>
          {categories && categories.length > 0 && (
            <thead>
              <tr>
                <th className="w-25">ID</th>
                <th className="w-25">Name</th>
                <th className="w-25 text-end">Actions</th>
              </tr>
            </thead>
          )}
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td className="text-end">
                    {!loadingId && (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => onCategorySelect(category)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category.id)}
                      disabled={loadingId === category.id}
                    >
                      {loadingId === category.id ? "Loading..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
