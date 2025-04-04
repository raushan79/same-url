/**
 * Generates a random 7-character string using lowercase letters for URL shortening
 * @function getRandomShortId
 * @returns {string} A random 7-character string containing only lowercase letters
 */
export const getRandomShortId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  // Pre-calculate length for better performance in loop
  const charLength = characters.length;
  // Initialize with empty string and specific capacity
  let shortCode = Array(7);

  for (let i = 0; i < 7; i++) {
    shortCode[i] = characters.charAt(Math.floor(Math.random() * charLength));
  }

  return shortCode.join("");
};
