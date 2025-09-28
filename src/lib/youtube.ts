/**
 * YouTube utility functions for video processing and embedding
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports youtube.com/watch?v=, youtu.be/, and embed URLs
 */
export function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Generate YouTube thumbnail URL from video URL
 * @param url - YouTube video URL
 * @param quality - Thumbnail quality (default, medium, high, maxres)
 * @returns Thumbnail URL or null if invalid
 */
export function getYouTubeThumbnailUrl(
  url: string, 
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'
): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault', 
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Check if URL is a supported video platform (YouTube, Vimeo)
 */
export function isVideoUrl(url: string): boolean {
  return url.includes('youtube.com') || 
         url.includes('youtu.be') || 
         url.includes('vimeo.com');
}

/**
 * Generate YouTube embed URL with autoplay
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const params = autoplay ? '?autoplay=1' : '';
  return `https://www.youtube.com/embed/${videoId}${params}`;
}
