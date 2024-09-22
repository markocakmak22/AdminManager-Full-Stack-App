export interface Category {
    id: string;
    name: string;
  }

  export interface CategoryFormProps {
    selectedCategory: Category
    closeForm: () => void;
    onMessage: (msg: string) => void;
  }

  export interface CategoryListProps {
    onCategorySelect: (category: Category) => void;
    closeForm: () => void;
    onMessage: (msg: string) => void;
  }

  export interface Product {
    id: string
    name: string;
    description: string
    price: number | null;
    category: Category | null;
  }

  export interface FormProduct {
    id: string
    name: string;
    description?: string | null;
    price: number | null;
    category_id: string | null
  }

  export interface ProductListProps {
    onProductSelect: (product: Product) => void;
    closeForm: () => void;
    onMessage: (msg: string) => void;
  }

  export interface ProductFormProps {
    selectedProduct: Product
    closeForm: () => void;
    onMessage: (msg: string) => void;
  }
  