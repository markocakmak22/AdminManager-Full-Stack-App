<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    protected $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function getAllProducts(): Collection
    {
        return $this->product->with('category')->get();
    }

    public function createProduct(array $data): Product
    {
        $product = $this->product->create($data);
        $product->load('category');
        return $product;
    }

    public function getProductById(Product $product): Product
    {
        return $product->load('category');
    }

    public function updateProduct(Product $product, array $data): Product
    {
        $product->update($data);
        $product->load('category');
        return $product;
    }

    public function deleteProduct(Product $product): void
    {
        $product->delete();
    }
}
