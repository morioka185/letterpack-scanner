export interface BarcodeResult {
  id: string;
  text: string;
  format: string;
  timestamp: Date;
  confidence?: number;
}

export interface ScanResult {
  id: string;
  rawData: string;
  decodedNumber: string;
  format: BarcodeFormat;
  confidence: number;
  scannedAt: Date;
  source: 'camera' | 'file';
  imageData?: string;
}

export type BarcodeFormat = 
  | 'CODE_128' 
  | 'EAN_13' 
  | 'EAN_8' 
  | 'ITF' 
  | 'CODE_39' 
  | 'CODABAR' 
  | 'QR_CODE';

export interface ScannerConfig {
  fps: number;
  qrbox: { width: number; height: number } | number;
  aspectRatio?: number;
  disableFlip?: boolean;
  videoConstraints?: MediaTrackConstraints;
}