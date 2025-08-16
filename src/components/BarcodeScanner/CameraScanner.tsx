import React from 'react';
import { Camera, StopCircle } from 'lucide-react';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';

interface CameraScannerProps {
  onResult: (result: string) => void;
  className?: string;
}

export function CameraScanner({ onResult, className = '' }: CameraScannerProps) {
  const {
    isScanning,
    result,
    error,
    startScanning,
    stopScanning,
    clearResult
  } = useBarcodeScanner('scanner-container');

  React.useEffect(() => {
    if (result) {
      onResult(result.text);
      clearResult();
    }
  }, [result, onResult, clearResult]);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Scanner Container */}
      <div 
        id="scanner-container" 
        className={`
          relative w-full bg-gray-100 rounded-lg overflow-hidden
          ${isScanning ? 'block' : 'hidden'}
        `}
        style={{ minHeight: '300px' }}
      />
      
      {/* Camera Preview Placeholder */}
      {!isScanning && (
        <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 font-medium">カメラでバーコードをスキャン</p>
            <p className="text-sm text-gray-400 mt-2">
              レターパックのバーコードをカメラに向けてください
            </p>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="mt-6 flex gap-3 justify-center">
        {!isScanning ? (
          <button
            onClick={startScanning}
            className="btn-primary flex items-center gap-2"
          >
            <Camera className="h-5 w-5" />
            スキャン開始
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="btn-secondary flex items-center gap-2"
          >
            <StopCircle className="h-5 w-5" />
            停止
          </button>
        )}
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium mb-2">{error}</p>
          <div className="text-red-700 text-xs">
            <p><strong>解決手順:</strong></p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>ブラウザのアドレスバーのカメラアイコンをクリック</li>
              <li>カメラアクセスを「許可」に変更</li>
              <li>ページを更新して再度お試しください</li>
              <li>問題が続く場合は「ファイル」タブをお使いください</li>
            </ol>
          </div>
        </div>
      )}

      {isScanning && !error && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm font-medium mb-2">
            📷 バーコードをカメラに向けてください
          </p>
          <p className="text-blue-600 text-xs">
            カメラが起動しない場合は、ブラウザのカメラ権限を確認してください
          </p>
        </div>
      )}
    </div>
  );
}