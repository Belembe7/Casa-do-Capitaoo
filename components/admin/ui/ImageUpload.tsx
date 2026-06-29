'use client';

import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  bucket?: string;
  folder?: string;
  maxImages?: number;
}

export default function ImageUpload({
  images,
  onChange,
  bucket = 'gallery',
  folder = 'uploads',
  maxImages = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;

      if (!isSupabaseConfigured()) {
        const urls = Array.from(files).map((f) => URL.createObjectURL(f));
        onChange([...images, ...urls].slice(0, maxImages));
        toast.success('Imagens adicionadas (modo local)');
        return;
      }

      setUploading(true);
      const supabase = createClient();
      const newUrls: string[] = [];

      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop();
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) {
          toast.error(`Erro ao carregar ${file.name}`);
          continue;
        }
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }

      onChange([...images, ...newUrls].slice(0, maxImages));
      setUploading(false);
      toast.success(`${newUrls.length} imagem(ns) carregada(s)`);
    },
    [images, onChange, bucket, folder, maxImages]
  );

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors ${
          uploading ? 'opacity-50 pointer-events-none' : 'hover:border-[var(--admin-primary)] hover:bg-slate-50'
        }`}
      >
        <Upload size={24} className="text-[var(--admin-text-muted)] mb-2" />
        <span className="text-sm text-[var(--admin-text-muted)]">
          {uploading ? 'A carregar...' : 'Arrastar imagens ou clicar para selecionar'}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={url + i} className="relative aspect-square rounded overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
