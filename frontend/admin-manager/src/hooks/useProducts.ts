import { useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { Product } from "../types/types";
import { useState } from "react";

export const useProducts = (closeForm: () => void = () => {},onMessage: (msg: string) => void = () => {}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const { data: products, isLoading: isFetching, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    staleTime: Infinity,
  });

  const handleDelete = async (id: string | null) => {
    if (id === null) return;

    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return;

    setLoadingId(id);

    try {
      await productService.deleteProduct(id);
      queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) =>
        oldProducts.filter((product) => product.id !== id)
      );
      onMessage("Product deleted successfully!");
      closeForm()
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const upsertProduct = async (product: { id?: string; name: string; description: string; price: number | null; category_id: string }, onSuccess: (message: string) => void) => {
    setIsLoading(true);
    setErrors({});
  
    try {
      if (product.id) {
        const updatedProduct = await productService.updateProduct(product.id, {
          name: product.name,
          description: product.description,
          price: product.price,
          category_id: product.category_id,
        });
  
        queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) =>
          oldProducts.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
        );
        onSuccess("Product updated successfully!");
      } else {
        const newProduct = await productService.createProduct({
          name: product.name,
          description: product.description,
          price: product.price,
          category_id: product.category_id,
        });
  
        queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) => [...oldProducts, newProduct]);
        onSuccess("Product created successfully!");
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

  

  return { products, isFetching, isLoading, error, handleDelete, loadingId, upsertProduct, errors, setErrors };

};
