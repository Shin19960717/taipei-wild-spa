"use client";

import { useCallback, useState } from "react";

export default function useGallery() {
  const [gallery, setGallery] = useState({
    isOpen: false,
    member: null,
    imageIndex: 0,
  });

  const openGallery = useCallback((member, imageIndex = 0) => {
    setGallery({ isOpen: true, member, imageIndex });
  }, []);

  const closeGallery = useCallback(() => {
    setGallery({ isOpen: false, member: null, imageIndex: 0 });
  }, []);

  const showPrevImage = useCallback(() => {
    setGallery((prev) => {
      if (!prev.member) return prev;

      return {
        ...prev,
        imageIndex:
          prev.imageIndex === 0
            ? prev.member.imgs.length - 1
            : prev.imageIndex - 1,
      };
    });
  }, []);

  const showNextImage = useCallback(() => {
    setGallery((prev) => {
      if (!prev.member) return prev;

      return {
        ...prev,
        imageIndex:
          prev.imageIndex === prev.member.imgs.length - 1
            ? 0
            : prev.imageIndex + 1,
      };
    });
  }, []);

  const selectGalleryImage = useCallback((imageIndex) => {
    setGallery((prev) => ({ ...prev, imageIndex }));
  }, []);

  return {
    gallery,
    openGallery,
    closeGallery,
    showPrevImage,
    showNextImage,
    selectGalleryImage,
  };
}