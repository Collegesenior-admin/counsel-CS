// Utility function to extract images from JSONB format
export function extractImagesFromJsonb(imageUrls: any): string[] {
  try {
    if (!imageUrls) return [];
    
    // If it's already an array of strings
    if (Array.isArray(imageUrls) && imageUrls.every(item => typeof item === 'string')) {
      return imageUrls;
    }
    
    // If it's an array of objects like [{"image1":"url"},{"image2":"url"}]
    if (Array.isArray(imageUrls)) {
      return imageUrls.map((item: any) => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null) {
          const key = Object.keys(item)[0];
          return item[key];
        }
        return '';
      }).filter(Boolean);
    }
    
    // If it's a string, try to parse it
    if (typeof imageUrls === 'string') {
      const parsed = JSON.parse(imageUrls);
      return extractImagesFromJsonb(parsed);
    }
    
    return [];
  } catch (error) {
    console.error('Error extracting images:', error);
    return [];
  }
}

// Get the first image or fallback
export function getMainImage(imageUrls: any, fallback: string = 'https://via.placeholder.com/400x300'): string {
  const images = extractImagesFromJsonb(imageUrls);
  return images.length > 0 ? images[0] : fallback;
}

// Get thumbnail images (excluding the first one)
export function getThumbnailImages(imageUrls: any, count: number = 3): string[] {
  const images = extractImagesFromJsonb(imageUrls);
  return images.slice(1, count + 1);
}
