import { useEffect, useState } from 'react';

export const useImagePreloader = (imageSources: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (imageSources.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedImages = 0;
    const totalImages = imageSources.length;

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        img.onerror = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(imageSources.map(preloadImage)).then(() => {
      setImagesLoaded(true);
    });
  }, [imageSources]);

  return { imagesLoaded, loadedCount, totalImages: imageSources.length };
};
