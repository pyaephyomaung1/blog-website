<?php 

use Illuminate\Http\UploadedFile;

trait ImageTrait {
    public function uploadImage(UploadedFile $file, string $folder = 'uploads'):? string
    {
        $extension = $file->getClientOriginalExtension();
        $fileName = time() .'.'. $extension;
        $path = $file->storeAs($folder, $fileName, 'public');
        return $path;
    }

    public function deleteImage(string $path)
    {
        return Storage::disk('public')->delete(($path));
    }
}