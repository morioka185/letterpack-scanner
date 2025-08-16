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
  const lastErrorTime = useRef<number | null>(null);

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
      // Show user-friendly message occasionally
      const now = Date.now();
      if (!lastErrorTime.current || now - lastErrorTime.current > 5000) {
        setError('バーコードが検出できません。バーコードを画面の中央に配置し、適切な距離を保ってください。');
        setTimeout(() => setError(null), 3000);
        lastErrorTime.current = now;
      }
    }
  };

  const startScanning = async (): Promise<void> => {
    try {
      setError(null);
      setResult(null);
      
      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
        setError('カメラアクセスにはHTTPS接続が必要です。');
        return;
      }

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('このブラウザはカメラアクセスをサポートしていません。');
        return;
      }

      // Test camera permissions first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        stream.getTracks().forEach(track => track.stop());
        console.log('Camera permission granted');
      } catch (permissionError: any) {
        console.error('Camera permission error:', permissionError);
        if (permissionError.name === 'NotAllowedError') {
          setError('カメラの使用が拒否されました。ブラウザの設定でカメラの使用を許可してください。');
        } else if (permissionError.name === 'NotFoundError') {
          setError('カメラが見つかりません。デバイスにカメラが接続されているか確認してください。');
        } else if (permissionError.name === 'NotSupportedError') {
          setError('このブラウザではカメラアクセスがサポートされていません。');
        } else {
          setError(`カメラアクセスエラー: ${permissionError.message}`);
        }
        return;
      }
      
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
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.CODE_93,
            Html5QrcodeSupportedFormats.CODABAR,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.ITF,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.RSS_14,
            Html5QrcodeSupportedFormats.RSS_EXPANDED,
          ],
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          },
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true
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

  const scanFromFile = async (_file: File): Promise<void> => {
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