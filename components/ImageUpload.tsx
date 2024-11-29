"use client";

import { useRef } from "react";

interface ImageUploadProps {
  setImagePreview: (image: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-8 h-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="bg-gray-100 border rounded opacity-0 w-8"
      />
      <img
        className="absolute top-0 left-0 w-full cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/512/1092/1092216.png"
        onClick={triggerFileInput}
      />
    </div>
  );
};

export default ImageUpload;
