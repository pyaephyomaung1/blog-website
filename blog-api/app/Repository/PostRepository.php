<?php

use App\Interface\PostRepositoryInterface;
use App\Models\Post;
use App\Traits\ImageUploadTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostRepository implements PostRepositoryInterface
{
  use ImageUploadTrait;
  protected $postRepository;

  public function __construct(Post $post)
  {
    $this->postRepository = $post;
  }
  public function getAll()
  {
    return $this->postRepository->orderBy("created_at", "desc")->paginate(9);
  }
  public function getById($id)
  {
    return $this->postRepository->find($id);
  }
  public function getBySlug($slug)
  {
    return $this->postRepository->getBySlug($slug);
  }
  public function storePost(array $data)
  {
    try {
      $data["image"] = $this->uploadImage($data["image"], "Posts");
      return $this->postRepository->create($data);
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }
  public function updatePost($id, array $data)
  {
    try {
      $post = $this->postRepository->findOrFail($id);

      if (isset($data["image"]) && $data["image"] instanceof UploadedFile) {
        if ($post->image) {
          $this->deleteImage($post->image);
        }
      }
      $data["image"] = $this->uploadImage($data["image"], "Pages");
      return $post->update($data);
    } catch (ModelNotFoundException $e) {
      throw new Exception("Page not found.");
    }
  }
  public function deletePost($id)
  {
    try {
      $post = $this->postRepository->findOrFail($id);
      if ($post->img_path) {
        Storage::disk("public")->delete($post->img_path);
      }
      $this->deleteImage($post->img_path);
      return $post->delete();
    } catch (ModelNotFoundException $m) {
      throw new Exception("Post not found");
    } catch (Exception $e) {
      throw new Exception("Failed to delete post ", $e->getMessage());
    }
  }
}
