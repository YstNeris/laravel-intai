<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Fake data from https://fakestoreapi.com/products/categories
        $categories = Http::get('https://fakestoreapi.com/products/categories')->json();

        foreach ($categories as &$category) {
            $category = [
                'title' => $category
            ];
        }

        Category::insert($categories);
    }
}
