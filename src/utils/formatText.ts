export const capitalizeWords = (text?: string | null): string => {
  if (!text) return "";

  return text
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const capitalizeFirstLetter = (text?: string | null): string => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Converts text to uppercase.
 */
export const toUpperCase = (text?: string | null): string => {
  return text ? text.toUpperCase() : "";
};

/**
 * Converts text to lowercase.
 */
export const toLowerCase = (text?: string | null): string => {
  return text ? text.toLowerCase() : "";
};
