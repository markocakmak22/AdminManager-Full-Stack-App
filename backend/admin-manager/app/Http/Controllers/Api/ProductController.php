<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Services\ProductService;
use App\Http\Requests\ProductRequest;
use App\Models\Product;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllProducts();
        return response()->json($products);
    }

    public function store(ProductRequest $request)
    {
        $product = $this->productService->createProduct($request->validated());
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        $product = $this->productService->getProductById($product);
        return response()->json($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product = $this->productService->updateProduct($product, $request->validated());
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product);
        return response()->json(null, 204);
    }
}
