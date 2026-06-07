/**
 * Extracts the 11-character video ID from any standard YouTube URL format.
 * Handles: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
 * Returns null if no valid ID is found.
 */
export function extractYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Normalizes any YouTube URL to the canonical watch URL for storage.
 * Returns null if the URL is not a valid YouTube URL.
 */
export function normalizeYouTubeUrl(url: string): string | null {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

/**
 * Builds a YouTube embed src from a stored canonical URL.
 * Returns null if URL is invalid.
 */
export function buildEmbedUrl(canonicalUrl: string): string | null {
  const id = extractYouTubeId(canonicalUrl);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`
    : null;
}
