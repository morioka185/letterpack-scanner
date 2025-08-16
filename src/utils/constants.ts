export const SCANNER_CONFIG = {
  fps: 10,
  qrbox: { width: 300, height: 200 },
  aspectRatio: 1.5,
  disableFlip: false,
  videoConstraints: {
    facingMode: 'environment'
  }
} as const;

export const SUPPORTED_FORMATS = [
  'CODE_128',
  'EAN_13', 
  'EAN_8',
  'ITF',
  'CODE_39',
  'CODABAR'
] as const;

export const LETTERPACK_PATTERNS = {
  LIGHT: /^23[0-9]{10}$/,
  PLUS: /^24[0-9]{10}$/,
  GENERAL: /^[0-9]{12}$/
} as const;

export const TRACKING_URLS = {
  JAPAN_POST: 'https://trackings.post.japanpost.jp/services/srv/search/direct',
  ALTERNATIVE: 'https://www.post.japanpost.jp/service/letterpack/'
} as const;

export const APP_CONFIG = {
  MAX_HISTORY_ITEMS: 100,
  CAMERA_RETRY_ATTEMPTS: 3,
  SCAN_TIMEOUT: 30000, // 30 seconds
  AUTO_COPY_DELAY: 2000 // 2 seconds
} as const;