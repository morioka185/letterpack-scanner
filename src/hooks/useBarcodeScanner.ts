import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import type { BarcodeResult, ScannerConfig } from '@/types/barcode';
import { SCANNER_CONFIG } from '@/utils/constants';
import { isValidTrackingNumberFormat } from '@/utils/validation';

interface UseBarcodeScanner {
  isScanning: boolean;
  result: BarcodeResult | null;
  error: string | null;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  clearResult: () => void;
  scanFromFile: (file: File) => Promise<void>;
}

export function useBarcodeScanner(
  elementId: string,
  config: Partial<ScannerConfig> = {}
): UseBarcodeScanner {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<BarcodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const mergedConfig = { ...SCANNER_CONFIG, ...config };

  const onScanSuccess = (decodedText: string, result: any) => {
    console.log('Scanned result:', decodedText);
    
    // Validate if it's a potential tracking number
    if (isValidTrackingNumberFormat(decodedText)) {
      const scanResult: BarcodeResult = {
        id: Date.now().toString(),
        text: decodedText,
        format: result.result?.format || 'UNKNOWN',
        timestamp: new Date()
      };
      
      setResult(scanResult);
      setError(null);
      stopScanning();
    } else {
      setError(`検出: ${decodedText} - 12桁の追跡番号ではありません`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const onScanError = (errorMessage: string) => {
    // Suppress frequent scanning errors - only log critical ones
    if (errorMessage.includes('No MultiFormat Readers')) {
      console.warn('Scanner error:', errorMessage);
    }
  };

  const startScanning = async (): Promise<void> => {
    try {
      setError(null);
      setResult(null);
      
      if (scannerRef.current) {
        await scannerRef.current.clear();
      }

      const scanner = new Html5QrcodeScanner(
        elementId,
        {
          fps: mergedConfig.fps,
          qrbox: mergedConfig.qrbox,
          aspectRatio: mergedConfig.aspectRatio,
          disableFlip: mergedConfig.disableFlip,
          videoConstraints: mergedConfig.videoConstraints,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.ITF,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.CODABAR,
          ]
        },
        false
      );

      scannerRef.current = scanner;
      scanner.render(onScanSuccess, onScanError);
      setIsScanning(true);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(`カメラの起動に失敗しました: ${errorMessage}`);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  const scanFromFile = async (file: File): Promise<void> => {
    try {
      setError(null);
      
      // This would require additional implementation for file scanning
      // For now, we'll show a placeholder message
      setError('ファイルスキャン機能は現在開発中です');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ファイルの読み取りに失敗しました';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return {
    isScanning,
    result,
    error,
    startScanning,
    stopScanning,
    clearResult,
    scanFromFile
  };
}