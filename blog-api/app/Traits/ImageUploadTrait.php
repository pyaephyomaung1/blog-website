<?php
namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait ImageUploadTrait
{
    /**
     * Upload an image file.
     *
     * @param UploadedFile $file
     * @param string $folder
     * @return string|null
     */
    public function uploadImage(UploadedFile $file, string $folder = 'uploads'): ?string
    {
        $extension = $file->getClientOriginalExtension();
        $filename  = time() . '_' . uniqid() . '.' . $extension;

        $path = $file->storeAs($folder, $filename, 'public');

        return $path ? $path : null;
    }

    /**
     * Delete an existing image.
     *
     * @param string $path
     * @return bool
     */
    public function deleteImage(string $path): bool
    {
        return Storage::disk('public')->delete($path);
    }
}