<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    protected $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function getAllCategories(): Collection
    {
        return $this->category->all();
    }

    public function createCategory(array $data): Category
    {
        return $this->category->create($data);
    }

    public function getCategoryById(Category $category): Category
    {
        return $category;
    }

    public function updateCategory(Category $category, array $data): Category
    {
        $category->update($data);
        return $category;
    }

    public function deleteCategory(Category $category): void
    {
        $category->delete();
    }
}
