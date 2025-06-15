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
            'slug' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'integer'],
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $response = $this->errorResponse('Validate Error', 422, $errors);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}

