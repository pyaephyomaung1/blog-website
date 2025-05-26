<?php 

namespace App\Repository;
use App\Interfaces\CategoryInterface;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class CategoryRepository implements CategoryInterface
{

    public function __construct(protected Category $category)
    {
         
    }
    public function store(array $data){
        return $this->category->create([
            "name"=> $data["name"]
        ]);
    }
    public function update(array $data, int $id){
        $category = $this->category->findOrFail($id);
        $category->update([
            "name"=> $data["name"]
        ]);
        return $category;
    }
   // Better inside delete()
    public function delete(int $id)
    {
        $category = $this->category->find($id);
        if (!$category) {
            throw new ModelNotFoundException("Category not found");
        }

        return $category->delete();
    }

    public function find(int $id){
        try{
            $category = $this->category->findOrFail($id);
            return $category;
        } catch(ModelNotFoundException $e){
            return null;
        }
    }
    public function index(){
        return $this->category->orderBy("id","desc")->paginate(10);
    }
}