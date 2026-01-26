/**
 * Advanced Video Caching System
 * Uses IndexedDB for persistent blob storage and Memory cache for instant access
 * Provides cookie-like persistence across sessions
 */

const DB_NAME = 'devocionalzeiros-video-cache';
const DB_VERSION = 1;
const STORE_NAME = 'videos';
const CACHE_EXPIRY_DAYS = 7;

// In-memory cache for instant access
const memoryCache = new Map<string, { blob: Blob; url: string }>();

// Track loading state to prevent duplicate fetches
const loadingPromises = new Map<string, Promise<string | null>>();

// Preloaded video elements for instant playback
export const preloadedVideoElements = new Map<string, HTMLVideoElement>();

/**
 * Open IndexedDB connection
 */
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'url' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

/**
 * Store video blob in IndexedDB
 */
const storeVideo = async (url: string, blob: Blob): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put({
        url,
        blob,
        timestamp: Date.now(),
        size: blob.size
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    db.close();
  } catch (error) {
    console.warn('Failed to store video in cache:', error);
  }
};

/**
 * Retrieve video blob from IndexedDB
 */
const getStoredVideo = async (url: string): Promise<Blob | null> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve) => {
      const request = store.get(url);
      request.onsuccess = () => {
        const result = request.result;
        db.close();
        
        if (result) {
          // Check if cache is expired
          const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
          if (Date.now() - result.timestamp > expiryTime) {
            // Cache expired, clean up
            deleteStoredVideo(url);
            resolve(null);
          } else {
            resolve(result.blob);
          }
        } else {
          resolve(null);
        }
      };
      request.onerror = () => {
        db.close();
        resolve(null);
      };
    });
  } catch {
    return null;
  }
};

/**
 * Delete video from IndexedDB
 */
const deleteStoredVideo = async (url: string): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(url);
    db.close();
  } catch {
    // Silently fail
  }
};

/**
 * Fetch video and cache it
 */
const fetchAndCacheVideo = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch video');
    
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    // Store in memory cache
    memoryCache.set(url, { blob, url: blobUrl });
    
    // Store in IndexedDB (async, don't wait)
    storeVideo(url, blob);
    
    // Create preloaded video element
    createPreloadedElement(url, blobUrl);
    
    return blobUrl;
  } catch (error) {
    console.warn('Failed to fetch and cache video:', error);
    return null;
  }
};

/**
 * Create a preloaded video element for instant playback
 */
const createPreloadedElement = (originalUrl: string, blobUrl: string): void => {
  if (preloadedVideoElements.has(originalUrl)) return;
  
  const video = document.createElement('video');
  video.src = blobUrl;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.load();
  
  preloadedVideoElements.set(originalUrl, video);
};

/**
 * Get cached video URL (from memory, IndexedDB, or fetch)
 * Returns blob URL for instant playback
 */
export const getCachedVideoUrl = async (url: string): Promise<string> => {
  // Check memory cache first (instant)
  const memoryCached = memoryCache.get(url);
  if (memoryCached) {
    return memoryCached.url;
  }
  
  // Check if already loading
  const existingPromise = loadingPromises.get(url);
  if (existingPromise) {
    const result = await existingPromise;
    return result || url;
  }
  
  // Create loading promise
  const loadPromise = (async () => {
    // Check IndexedDB
    const storedBlob = await getStoredVideo(url);
    if (storedBlob) {
      const blobUrl = URL.createObjectURL(storedBlob);
      memoryCache.set(url, { blob: storedBlob, url: blobUrl });
      createPreloadedElement(url, blobUrl);
      return blobUrl;
    }
    
    // Fetch and cache
    return await fetchAndCacheVideo(url);
  })();
  
  loadingPromises.set(url, loadPromise);
  
  try {
    const result = await loadPromise;
    return result || url;
  } finally {
    loadingPromises.delete(url);
  }
};

/**
 * Preload multiple videos in background
 */
export const preloadVideos = async (urls: string[]): Promise<void> => {
  // Prioritize first video, then load others
  if (urls.length > 0) {
    await getCachedVideoUrl(urls[0]);
  }
  
  // Load remaining videos in parallel with lower priority
  const remaining = urls.slice(1);
  if (remaining.length > 0) {
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
        .requestIdleCallback(() => {
          remaining.forEach(url => getCachedVideoUrl(url));
        }, { timeout: 3000 });
    } else {
      setTimeout(() => {
        remaining.forEach(url => getCachedVideoUrl(url));
      }, 1000);
    }
  }
};

/**
 * Check if video is cached and ready
 */
export const isVideoCached = (url: string): boolean => {
  return memoryCache.has(url) || preloadedVideoElements.has(url);
};

/**
 * Get preloaded video element
 */
export const getPreloadedElement = (url: string): HTMLVideoElement | undefined => {
  return preloadedVideoElements.get(url);
};

/**
 * Clean up expired cache entries
 */
export const cleanExpiredCache = async (): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    
    const expiryTime = Date.now() - (CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const range = IDBKeyRange.upperBound(expiryTime);
    
    const request = index.openCursor(range);
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
    
    db.close();
  } catch {
    // Silently fail
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async (): Promise<{ count: number; totalSize: number }> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const entries = request.result || [];
        db.close();
        resolve({
          count: entries.length,
          totalSize: entries.reduce((acc, entry) => acc + (entry.size || 0), 0)
        });
      };
      request.onerror = () => {
        db.close();
        resolve({ count: 0, totalSize: 0 });
      };
    });
  } catch {
    return { count: 0, totalSize: 0 };
  }
};

/**
 * Initialize cache - clean expired entries and warm up cache
 */
export const initVideoCache = (): void => {
  if (typeof window === 'undefined') return;
  
  // Clean expired entries on startup
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void })
      .requestIdleCallback(() => cleanExpiredCache());
  } else {
    setTimeout(() => cleanExpiredCache(), 5000);
  }
};

// Initialize on module load
initVideoCache();
