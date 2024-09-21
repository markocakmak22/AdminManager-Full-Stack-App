import { useState } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import { Category } from "../types/types";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleAddNewCategory = () => {
    setSelectedCategory({ id: "", name: "" });
    setMessage(null);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setMessage(null);
  };

  const closeForm = () => {
    setSelectedCategory(null);
  };

  const handleMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="container-fluid px-4">
      <h3 className="mt-4">Categories Management</h3>
      <div className="mb-4">
        <button onClick={handleAddNewCategory} className="btn btn-primary">
          Add New Category
        </button>
      </div>
      <CategoryList
        closeForm={closeForm}
        onMessage={handleMessage}
        onCategorySelect={handleCategorySelect}
      />
      {selectedCategory && (
        <CategoryForm
          selectedCategory={selectedCategory}
          closeForm={closeForm}
          onMessage={handleMessage}
        />
      )}
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
}

export default Categories;
