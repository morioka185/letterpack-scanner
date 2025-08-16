export interface TrackingNumber {
  id: string;
  number: string;
  formattedNumber: string;
  type: 'letterpack_light' | 'letterpack_plus' | 'unknown';
  isValid: boolean;
  scannedAt: Date;
  lastChecked?: Date;
  isFavorite: boolean;
  alias?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  formattedNumber: string;
  checkDigit: {
    expected: number;
    actual: number;
    isValid: boolean;
  };
  trackingUrl: string;
  message: string;
  type: 'letterpack_light' | 'letterpack_plus' | 'unknown';
}

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export interface TrackingResponse {
  number: string;
  status: 'delivered' | 'in_transit' | 'pending' | 'error';
  events: TrackingEvent[];
  estimatedDelivery?: string;
  lastUpdated: string;
}

export interface ValidationRule {
  type: 'letterpack';
  pattern: RegExp;
  checkDigitAlgorithm: (digits: string) => number;
  description: string;
}