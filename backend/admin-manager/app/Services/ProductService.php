<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function getAllProducts()
    {
        return Product::with('category')->get();
    }

    public function createProduct(array $data)
    {
        return Product::create($data);
    }

    public function getProductById(Product $product)
    {
        return $product->load('category');
    }

    public function updateProduct(Product $product, array $data)
    {
        $product->update($data);
        return $product;
    }

    public function deleteProduct(Product $product)
    {
        $product->delete();
    }
}
