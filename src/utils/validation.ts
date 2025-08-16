import type { ValidationResult } from '@/types/tracking';

export function validateLetterpackNumber(number: string): ValidationResult {
  // Remove all non-digits
  const digitsOnly = number.replace(/\D/g, '');
  
  // Check if exactly 12 digits
  if (digitsOnly.length !== 12) {
    return {
      isValid: false,
      formattedNumber: number,
      checkDigit: { expected: 0, actual: 0, isValid: false },
      trackingUrl: '',
      message: '12桁の数字である必要があります',
      type: 'unknown'
    };
  }
  
  // Extract first 11 digits for check digit calculation
  const first11Digits = digitsOnly.substring(0, 11);
  const actualCheckDigit = parseInt(digitsOnly.charAt(11));
  
  // Calculate expected check digit (sum of first 11 digits % 7)
  const sum = first11Digits
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  const expectedCheckDigit = sum % 7;
  
  const isCheckDigitValid = actualCheckDigit === expectedCheckDigit;
  const formattedNumber = formatTrackingNumber(digitsOnly);
  
  // Determine type based on prefix patterns (this is simplified)
  let type: 'letterpack_light' | 'letterpack_plus' | 'unknown' = 'unknown';
  const prefix = digitsOnly.substring(0, 4);
  if (prefix >= '2300' && prefix <= '2399') {
    type = 'letterpack_light';
  } else if (prefix >= '2400' && prefix <= '2499') {
    type = 'letterpack_plus';
  }
  
  return {
    isValid: isCheckDigitValid,
    formattedNumber,
    checkDigit: {
      expected: expectedCheckDigit,
      actual: actualCheckDigit,
      isValid: isCheckDigitValid
    },
    trackingUrl: isCheckDigitValid ? generateTrackingUrl(digitsOnly) : '',
    message: isCheckDigitValid 
      ? '有効なレターパック追跡番号です' 
      : `チェックデジットが不正です（期待値: ${expectedCheckDigit}, 実際: ${actualCheckDigit}）`,
    type
  };
}

export function formatTrackingNumber(number: string): string {
  const digitsOnly = number.replace(/\D/g, '');
  if (digitsOnly.length === 12) {
    return `${digitsOnly.substring(0, 4)}-${digitsOnly.substring(4, 8)}-${digitsOnly.substring(8, 12)}`;
  }
  return number;
}

export function generateTrackingUrl(number: string): string {
  const digitsOnly = number.replace(/\D/g, '');
  return `https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=${digitsOnly}&locale=ja`;
}

export function isValidTrackingNumberFormat(text: string): boolean {
  const digitsOnly = text.replace(/\D/g, '');
  return digitsOnly.length === 12;
}