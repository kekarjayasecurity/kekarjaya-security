"use client";

import { useRef, useState } from "react";
import { getImageUrl } from "@/lib/image-url";

interface ImageUploadProps {
  value?: string;
  onChange: (filename: string) => void;
  label?: string;
  multiple?: boolean;
  onMultipleChange?: (filenames: string[]) => void;
}

function toUploadUrl(value: string | undefined): string | null {
  if (!value) return null;
  return getImageUrl(value) || null;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Gambar",
  multiple = false,
  onMultipleChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(toUploadUrl(value));

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (multiple && onMultipleChange && data.filenames) {
        onMultipleChange(data.filenames);
      } else if (data.filenames && data.filenames.length > 0) {
        onChange(data.filenames[0]);
        setPreview(getImageUrl(data.filenames[0]));
      }
    } catch {
      alert("Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {uploading ? "Mengupload..." : "Pilih File"}
        </button>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-lg"
          />
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}