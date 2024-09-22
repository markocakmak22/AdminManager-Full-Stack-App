import { useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";
import { Category } from "../types/types";
import { useState } from "react";

export const useCategories = (closeForm:()=>void, onMessage:(msg: string)=>void, ) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const { data: categories, isLoading: isFetching, error } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    staleTime: Infinity,
  });

  const deleteCategory = async (id: string, onSuccess: () => void, onError: () => void) => {
    try {
      await categoryService.deleteCategory(id);
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories = []) =>
        oldCategories.filter((category) => category.id !== id)
      );
      onSuccess();
    } catch (err) {
      console.error("Error deleting category:", err);
      onError();
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return;

    setLoadingId(id);
    setIsLoading(true);

    try {
      await deleteCategory(id, () => {
        onMessage("Category deleted successfully!");
        closeForm()
      }, () => {
        onMessage("Error deleting category.");
      });
    } finally {
      setLoadingId(null);
      setIsLoading(false);
    }
  };

  const upsertCategory = async (category: { id?: string; name: string }, onSuccess: (message: string) => void) => {
    setIsLoading(true);
    setErrors({});

    try {
      if (category.id) {
        const updatedCategory = await categoryService.updateCategory(category.id, { name: category.name });
        queryClient.setQueryData<Category[]>(["categories"], (oldCategories = []) =>
          oldCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
        onSuccess("Category updated successfully!");
      } else {
        const newCategory = await categoryService.createCategory({ name: category.name });
        queryClient.setQueryData<Category[]>(["categories"], (oldCategories = []) => [...oldCategories, newCategory]);
        onSuccess("Category created successfully!");
      }
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ name: "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { categories, isFetching, error, handleDelete, upsertCategory, isLoading, errors, loadingId, setErrors };
};
