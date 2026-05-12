"use client";

import { useState } from "react";
import type { GalleryPhoto } from "@/types";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getIconPath } from "@/lib/icons";
import { getImageUrl } from "@/lib/image-url";

export default function GaleriClient({
  photos,
}: {
  photos: (GalleryPhoto & { category_name: string })[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function navigate(direction: number) {
    if (lightboxIndex === null) return;
    const newIndex = lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setLightboxIndex(newIndex);
    }
  }

  return (
    <>
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" staggerDelay={0.075}>
        {photos.map((photo, index) => (
          <StaggerItem key={photo.id}>
            <button
              onClick={() => openLightbox(index)}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-80 transition-opacity w-full"
            >
              <img
                src={getImageUrl(photo.filename)}
                alt={photo.title || ""}
                className="w-full h-full object-cover"
              />
            </button>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {photos.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          Belum ada foto di galeri.
        </p>
      )}

      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("x")!} />
            </svg>
          </button>

          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("chevron-left")!} />
              </svg>
            </button>
          )}

          <img
            src={getImageUrl(photos[lightboxIndex].filename)}
            alt={photos[lightboxIndex].title || ""}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {lightboxIndex < photos.length - 1 && (
            <button
              className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("chevron-right")!} />
              </svg>
            </button>
          )}

          {photos[lightboxIndex].title && (
            <div className="absolute bottom-4 text-white text-center w-full">
              <p className="text-lg">{photos[lightboxIndex].title}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}