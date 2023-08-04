<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
  protected $fillable = [
    'title',
    'price',
    'description',
    'image_url',
    'category_id',
  ];

  public function category(): BelongsTo
  {
      return $this->belongsTo(Category::class);
  }
}
