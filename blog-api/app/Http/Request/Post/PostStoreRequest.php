<?php

use App\Traits\ApiResponseTrait;
use Illuminate\Foundation\Http\FormRequest;


class PostStoreRequest extends FormRequest
{

    use ApiResponseTrait;
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'min:10'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }


    private function generateSlug(string $title):string{
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while(\App\Models\Post::where('slug', $slug )->exists()){
            $slug = $originalSlug . '_' . $counter;
            $counter++;
        }
        return $slug;
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $response = $this->errorResponse('Validate Error', 422, $errors);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}

