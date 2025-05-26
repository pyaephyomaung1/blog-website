<?php 

namespace App\Interfaces;

interface CategoryInterface
{
    public function store(array $data);
    public function update(array $data, int $id);
    public function delete(int $id);
    public function find(int $id);
    public function index();
}