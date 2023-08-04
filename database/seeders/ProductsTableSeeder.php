<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Fake data from https://fakestoreapi.com/products
        $products = Http::get('https://fakestoreapi.com/products')->json();

        foreach ($products as &$product) {
            $product['category_id'] = Category::where('title', $product['category'])->first()->id;
            $product['image_url'] = $product['image'];
            unset($product['category']);
            unset($product['rating']);
            unset($product['image']);
        }

        Product::insert($products);
    }
}
