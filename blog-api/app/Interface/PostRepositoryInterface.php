<?php 

namespace App\Interface;

interface PostRepositoryInterface 
{
    public function getAll();
    public function getById($id);
    public function getBySlug($slug);
    public function storePost(array $data);
    public function updatePost($id, array $data);
    public function deletePost($id);
    
}