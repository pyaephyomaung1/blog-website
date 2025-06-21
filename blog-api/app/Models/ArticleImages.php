<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleImages extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'image_path',
        'caption',
        'body',
        'order_index'
    ];

    public function article(){
        return $this->belongsTo(Article::class);
    }
}


// Schema::create('article_images', function (Blueprint $table) {
//             $table->id();
//             $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
//             $table->string('image_path')->nullable();
//             $table->string('caption')->nullable();
//             $table->longText('body')->nullable();
//             $table->integer('order_index')->nullable(false);
//             $table->timestamps();
//         });