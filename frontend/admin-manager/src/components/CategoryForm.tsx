import React, { useEffect, useState } from "react";
import { CategoryFormProps } from "../types/types";
import { useCategories } from "../hooks/useCategories";

function CategoryForm({ selectedCategory, closeForm, onMessage }: CategoryFormProps) {
  const { upsertCategory, isLoading, errors, setErrors } = useCategories(closeForm, onMessage);
  const [category, setCategory] = useState<{ id: string; name: string }>({ id: "", name: "" });

  useEffect(() => {
    if (selectedCategory) {
      setCategory({
        id: selectedCategory.id.toString(),
        name: selectedCategory.name,
      });
      setErrors({});
    } else {
      setCategory({ id: "", name: "" });
      setErrors({});
    }
  }, [selectedCategory, setErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategory && category.name === selectedCategory.name) {
      closeForm();
      return;
    }

    await upsertCategory(category, (message: string) => {
      onMessage(message);
      closeForm();
    });
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
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
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
            <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
              {isLoading ? "Loading..." : category.id ? "Update Category" : "Add Category"}
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

export default CategoryForm;
