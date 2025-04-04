/**
 * Sanitize and normalize a URL
 * @param {string} url - The URL to sanitize
 * @returns {string} - The sanitized URL
 */
export const sanitizeUrl = (url) => {
  // Ensure URL has a protocol
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    // Parse and reconstruct URL to normalize it
    const parsedUrl = new URL(url);

    // Remove trailing slashes
    let normalizedUrl =
      parsedUrl.origin + parsedUrl.pathname.replace(/\/+$/, "");

    // Add query parameters if they exist
    if (parsedUrl.search) {
      normalizedUrl += parsedUrl.search;
    }

    // Add hash if it exists
    if (parsedUrl.hash) {
      normalizedUrl += parsedUrl.hash;
    }

    return normalizedUrl;
  } catch (error) {
    throw new Error("Invalid URL format");
  }
};

/**
 * Check if a URL is potentially malicious
 * @param {string} url - The URL to check
 * @returns {boolean} - True if URL is suspicious
 */
export const isSuspiciousUrl = (url) => {
  const suspiciousPatterns = [
    /\.(exe|dll|bat|cmd|msi|ps1|sh)$/i, // Executable files
    /(phish|malware|spam|scam)/i, // Suspicious keywords
    /^data:/i, // Data URLs
    /^javascript:/i, // JavaScript URLs
    /^vbscript:/i, // VBScript URLs
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(url));
};
