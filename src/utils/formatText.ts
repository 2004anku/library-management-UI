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

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
export const formatPhoneNumber = (phone?: string | null): string => {
  if (!phone) return "";

  // Keep only digits
  let number = phone.replace(/\D/g, "");

  // Remove country code if user entered it
  if (number.startsWith("91") && number.length === 12) {
    number = number.slice(2);
  }

  // Remove leading zero
  if (number.startsWith("0")) {
    number = number.slice(1);
  }

  return `+91${number}`;
};
