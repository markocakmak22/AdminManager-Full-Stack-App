export interface Category {
    id: string;
    name: string;
  }

  export interface CategoryFormProps {
    selectedCategory: { id: string; name: string } | null;
    closeForm: () => void;
    onMessage: (msg: string) => void;
  }

  export interface CategoryListProps {
    onCategorySelect: (category: Category) => void;
    closeForm: () => void;
    onMessage: (msg: string) => void;
  }