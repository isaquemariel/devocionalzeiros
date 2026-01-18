import { useEffect, useState, useRef } from 'react';

// Critical assets to preload on app initialization
const CRITICAL_ASSETS = {
  images: [
    '/src/assets/logo-white.png',
    '/src/assets/logo-header.png',
  ],
  landingImages: [
    '/src/assets/founder-portrait.jpg',
    '/src/assets/group-photo.jpg',
    '/src/assets/speaking-event.jpg',
    '/src/assets/community-certificates.jpg',
  ],
  homeImages: [
    '/src/assets/card-leitura-biblica-new.png',
    '/src/assets/card-devocional-new.png',
    '/src/assets/card-ranking.png',
    '/src/assets/card-chat.png',
    '/src/assets/card-sermao.png',
    '/src/assets/card-quiz.png',
    '/src/assets/card-embaixador.png',
    '/src/assets/card-biblia-estudo.png',
  ]
};

// Global cache to persist across component mounts
const imageCache = new Map<string, HTMLImageElement>();
const preloadedSets = new Set<string>();

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    // Check if already cached
    if (imageCache.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = () => {
      resolve(); // Don't block on error
    };
    img.src = src;
  });
};

const preloadImageSet = async (setName: string, images: string[]): Promise<void> => {
  if (preloadedSets.has(setName)) return;
  
  await Promise.all(images.map(preloadImage));
  preloadedSets.add(setName);
};

// Preload video with low priority
const preloadVideo = (src: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = src;
  document.head.appendChild(link);
};

export const useCriticalPreloader = () => {
  const [isReady, setIsReady] = useState(preloadedSets.has('critical'));
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current || preloadedSets.has('critical')) {
      setIsReady(true);
      return;
    }
    
    hasStarted.current = true;

    const loadCritical = async () => {
      // Load critical images first (logos, etc.)
      await preloadImageSet('critical', CRITICAL_ASSETS.images);
      setIsReady(true);
      
      // Then preload landing page images in background
      requestIdleCallback(() => {
        preloadImageSet('landing', CRITICAL_ASSETS.landingImages);
      }, { timeout: 2000 });
    };

    loadCritical();
  }, []);

  return { isReady };
};

export const useHomePreloader = () => {
  const [isReady, setIsReady] = useState(preloadedSets.has('home'));
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current || preloadedSets.has('home')) {
      setIsReady(true);
      return;
    }
    
    hasStarted.current = true;

    preloadImageSet('home', CRITICAL_ASSETS.homeImages).then(() => {
      setIsReady(true);
    });
  }, []);

  return { isReady };
};

// Preload next page images before navigation
export const preloadPageAssets = (pageName: 'home' | 'landing') => {
  const assets = pageName === 'home' ? CRITICAL_ASSETS.homeImages : CRITICAL_ASSETS.landingImages;
  preloadImageSet(pageName, assets);
};

// Check if an image is already cached
export const isImageCached = (src: string): boolean => {
  return imageCache.has(src);
};

// Get cached image count for debugging
export const getCachedImageCount = (): number => {
  return imageCache.size;
};

// Polyfill requestIdleCallback for Safari
if (typeof window !== 'undefined' && !window.requestIdleCallback) {
  (window as any).requestIdleCallback = (cb: () => void, options?: { timeout: number }) => {
    const start = Date.now();
    return setTimeout(() => {
      cb();
    }, options?.timeout || 1);
  };
}
