<?php

namespace App\Http\Controllers;

use App\Interface\PostRepositoryInterface;
use Illuminate\Http\Request;


class PostController extends Controller
{

    protected $postRepository;
    
    public function _construct(PostRepositoryInterface $postRepository){
        $this->postRepository = $postRepository;
    }

    public function index(){
        $post = $this->postRepository->getAll();
        return 
    }


}
