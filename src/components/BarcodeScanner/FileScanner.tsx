import React, { useRef } from 'react';
import { Upload, Image } from 'lucide-react';

interface FileScannerProps {
  onResult: (result: string) => void;
  className?: string;
}

export function FileScanner({ onResult, className = '' }: FileScannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // This is a placeholder implementation
      // In a real implementation, you would use a library like ZXing or similar
      // to decode barcodes from image files
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          // For demo purposes, we'll extract numbers from filename
          const numbers = file.name.match(/\d{12}/);
          if (numbers) {
            onResult(numbers[0]);
          } else {
            alert('画像からバーコードを読み取れませんでした。カメラでの読み取りをお試しください。');
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File reading error:', error);
      alert('ファイルの読み込みに失敗しました。');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div 
        onClick={handleClick}
        className="w-full h-72 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors"
      >
        <div className="text-center">
          <Image className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 font-medium mb-2">画像ファイルを選択</p>
          <p className="text-sm text-gray-400">
            バーコードが写った画像をアップロード
          </p>
          <div className="mt-4">
            <button
              type="button"
              className="btn-outline flex items-center gap-2 mx-auto"
              onClick={handleClick}
            >
              <Upload className="h-4 w-4" />
              ファイル選択
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          ※ 画像からの読み取りは現在ベータ機能です
        </p>
      </div>
    </div>
  );
}