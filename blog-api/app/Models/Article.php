<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'meta_description',
        'cover_image',
        'body',
        'is_published',
        'user_id',
    ];

    public function author(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function articleImage(){
        return $this->hasMany(ArticleImages::class)->orderBy('order_index');
    }
}


//   Schema::create('articles', function (Blueprint $table) {
//             $table->id();
//             $table->string('title');
//             $table->string('slug')->unique();
//             $table->string('meta_description')->nullable();
//             $table->string('cover_image')->nullable();
//             $table->longText('body');
//             $table->boolean('is_published');
//             $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
//             $table->timestamps();
//         });