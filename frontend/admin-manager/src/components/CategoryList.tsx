import { categoryService } from "../services/categoryService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../types/types";
import { CategoryListProps } from "../types/types";
import { useState } from "react";

function CategoryList({ onCategorySelect, onMessage, closeForm }: CategoryListProps) {
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    staleTime: Infinity,
  });

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!isConfirmed) {
      return;
    }

    setLoadingId(id);

    try {
      await categoryService.deleteCategory(id);

      queryClient.setQueryData<Category[]>(["categories"], (oldCategories = []) =>
        oldCategories.filter((category) => category.id !== id)
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
                    {loadingId !== category.id && (
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
