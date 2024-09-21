import React, { useEffect, useState } from "react";
import { CategoryFormProps } from "../types/types";
import { categoryService } from "../services/categoryService";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "../types/types";

function CategoryForm({ selectedCategory, closeForm, onMessage }: CategoryFormProps) {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<{ id: string; name: string }>({ id: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    if (selectedCategory) {
      setCategory({
        id: selectedCategory.id.toString(),
        name: selectedCategory.name,
      });
      setErrors({})
    } else {
      setCategory({ id: "", name: "" });
      setErrors({})
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({})

    if (selectedCategory && category.name === selectedCategory.name) {
      setIsLoading(false);
      closeForm();
      return;
    }

    try {
      if (category?.id) {
        const updatedCategory = await categoryService.updateCategory(
          category.id,
          { name: category.name }
        );
        queryClient.setQueryData<Category[]>(["categories"], (oldCategories = []) =>
          oldCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
        onMessage("Category updated successfully!");
      } else {
        const newCategory = await categoryService.createCategory({
          name: category.name,
        });
        queryClient.setQueryData<Category[]>(["categories"], (oldCategories = []) => [...oldCategories, newCategory]);
        onMessage("Category created successfully!");
      }

      setCategory({ id: "", name: "" });
      closeForm();
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ name: "An unexpected error occurred." });
      }
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-plus me-1"></i>
        {selectedCategory?.id ? "Edit Category" : "Add Category"}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">
              Category ID
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryId"
              name="id"
              value={category.id}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="categoryName"
              name="name"
              value={category.name}
              placeholder="Enter category name"
              onChange={(e) => {
                setCategory({ ...category, name: e.target.value });
                setErrors((prev) => ({ ...prev, name: null }));
              }}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : category.id ? "Update Category" : "Add Category"}
            </button>
            {!isLoading && (
              <button
                onClick={closeForm}
                type="button"
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
