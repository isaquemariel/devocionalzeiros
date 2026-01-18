import { useEffect, useState, useRef, useMemo } from 'react';

// Global image cache to persist across component mounts
const globalImageCache = new Map<string, boolean>();

export const useImagePreloader = (imageSources: string[]) => {
  // Memoize the sources array to prevent unnecessary re-renders
  const stableSourcesKey = useMemo(() => imageSources.join(','), [imageSources]);
  
  // Check if all images are already cached
  const allCached = useMemo(() => {
    return imageSources.every(src => globalImageCache.has(src));
  }, [stableSourcesKey]);
  
  const [imagesLoaded, setImagesLoaded] = useState(allCached);
  const [loadedCount, setLoadedCount] = useState(allCached ? imageSources.length : 0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (imageSources.length === 0) {
      setImagesLoaded(true);
      return;
    }

    // If all already cached, skip loading
    if (allCached) {
      setImagesLoaded(true);
      setLoadedCount(imageSources.length);
      return;
    }

    // Prevent double execution
    if (hasStarted.current) return;
    hasStarted.current = true;

    let loadedImages = 0;
    const totalImages = imageSources.length;

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        // Check cache first
        if (globalImageCache.has(src)) {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
          return;
        }

        const img = new Image();
        // Use decode() for smoother rendering
        img.onload = () => {
          if ('decode' in img) {
            img.decode().then(() => {
              globalImageCache.set(src, true);
              loadedImages++;
              setLoadedCount(loadedImages);
              resolve();
            }).catch(() => {
              globalImageCache.set(src, true);
              loadedImages++;
              setLoadedCount(loadedImages);
              resolve();
            });
          } else {
            globalImageCache.set(src, true);
            loadedImages++;
            setLoadedCount(loadedImages);
            resolve();
          }
        };
        img.onerror = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        // Set high priority for critical images
        img.fetchPriority = 'high';
        img.src = src;
      });
    };

    Promise.all(imageSources.map(preloadImage)).then(() => {
      setImagesLoaded(true);
    });

    return () => {
      hasStarted.current = false;
    };
  }, [stableSourcesKey, allCached]);

  return { 
    imagesLoaded, 
    loadedCount, 
    totalImages: imageSources.length,
    progress: imageSources.length > 0 ? (loadedCount / imageSources.length) * 100 : 100
  };
};

// Utility to preload images in the background
export const preloadImagesInBackground = (imageSources: string[]) => {
  if (typeof window === 'undefined') return;
  
  requestAnimationFrame(() => {
    imageSources.forEach(src => {
      if (!globalImageCache.has(src)) {
        const img = new Image();
        img.onload = () => {
          globalImageCache.set(src, true);
        };
        img.src = src;
      }
    });
  });
};

// Check if all images in a set are cached
export const areImagesCached = (imageSources: string[]): boolean => {
  return imageSources.every(src => globalImageCache.has(src));
};
