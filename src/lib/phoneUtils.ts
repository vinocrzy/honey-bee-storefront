/**
 * Phone Number Utilities
 * E.164 format validation and formatting for checkout
 */

/**
 * Format phone number to E.164 format
 * Converts: (555) 123-4567 → +15551234567
 * If already E.164, returns as-is
 */
export const formatPhoneToE164 = (phone: string, countryCode: string = '1'): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If already starts with +, return as-is (assume valid)
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Add country code if not present
  if (digits.length === 10) {
    return `+${countryCode}${digits}`;
  }
  
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // Return with + prefix
  return `+${digits}`;
};

/**
 * Validate phone number format (E.164)
 * Returns true if valid, false otherwise
 * E.164 format: +[country code][number] (10-15 digits total)
 */
export const validatePhoneE164 = (phone: string): boolean => {
  const e164Regex = /^\+[1-9]\d{10,14}$/;
  return e164Regex.test(phone);
};

/**
 * Format phone for display
 * +15551234567 → (555) 123-4567
 */
export const formatPhoneForDisplay = (phone: string): string => {
  // Remove + and country code for US numbers
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const areaCode = cleaned.slice(1, 4);
    const middle = cleaned.slice(4, 7);
    const last = cleaned.slice(7);
    return `(${areaCode}) ${middle}-${last}`;
  }
  
  if (cleaned.length === 10) {
    const areaCode = cleaned.slice(0, 3);
    const middle = cleaned.slice(3, 6);
    const last = cleaned.slice(6);
    return `(${areaCode}) ${middle}-${last}`;
  }
  
  return phone;
};

/**
 * Auto-format phone number as user types
 * Returns formatted string for input value
 */
export const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};
