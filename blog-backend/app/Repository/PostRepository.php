<?php

use App\Interfaces\PostInterface;
use App\Models\Post;

class PostRepository implements PostInterface
{
    public function __construct(protected Post $post)
    {
    }

    public function store(array $data)
    {
        
    }
    public function update(array $data, int $id)
    {

    }
    public function delete(int $id)
    {

    }
    public function find(int $id)
    {

    }
    public function index()
    {

    }

}