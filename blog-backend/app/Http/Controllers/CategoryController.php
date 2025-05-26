<?php

namespace App\Http\Controllers;

use App\Http\Request\Category\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Interfaces\CategoryInterface;
use App\Models\Category;
use DB;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(protected CategoryInterface $categoryInterface)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = $this->categoryInterface->index();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(CategoryStoreRequest $request)
    {
        DB::beginTransaction();
        try {
            $category = $this->categoryInterface->store($request->validated());
            DB::commit();

            return response()->json([
                'message' => 'Category created successfully',
                'data' => $category->fresh()
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function find(int $id)
    {
        $category = $this->categoryInterface->find($id);
        return response()->json([
            'message' => 'Category found',
            'data' => $category
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(CategoryUpdateRequest $request, int $id)
    {

        DB::beginTransaction();
        try {
            $this->categoryInterface->update($request->validated(), $id);
            DB::commit();

            return response()->json([
                'message' => 'Category updated successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $this->categoryInterface->delete($id);
            DB::commit();
            return response()->json([
                'message' => 'Category deleted'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        }

        /**
         * Update the specified resource in storage.
         */


        /**
         * Remove the specified resource from storage.
         */
    }
}
