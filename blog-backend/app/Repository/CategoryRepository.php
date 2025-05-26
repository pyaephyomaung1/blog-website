<?php 

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
    public function delete(int $id)
    {
        try{
            $category = $this->category->findOrFail($id);
            if($category){
                $category->delete();
            } else {
                return 'Category not found';
            }
        } catch(ModelNotFoundException $e){
            return 'Category Not Found';
        }
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