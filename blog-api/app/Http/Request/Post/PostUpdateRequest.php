<?php 

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    public function authorize(){
        return true;
    }

    public function rules(){
        
    }
}