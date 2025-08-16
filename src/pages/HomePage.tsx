import { useState } from 'react';
import { CameraScanner } from '@/components/BarcodeScanner/CameraScanner';
import { FileScanner } from '@/components/BarcodeScanner/FileScanner';
import { TrackingCard } from '@/components/TrackingResults/TrackingCard';
import { validateLetterpackNumber } from '@/utils/validation';
import type { ValidationResult } from '@/types/tracking';
import { FileText, Zap, Shield, Globe, Camera, Upload } from 'lucide-react';

export function HomePage() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'file'>('camera');

  const handleScanResult = (scannedText: string) => {
    console.log('Received scan result:', scannedText);
    const result = validateLetterpackNumber(scannedText);
    setValidationResult(result);
  };

  const handleCopy = (text: string) => {
    console.log('Copied to clipboard:', text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            レターパック追跡番号スキャナー
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            レターパックのバーコードをスキャンして、追跡番号を自動取得。
            <br />
            チェックデジット検証で正確性を確認し、日本郵便での追跡が可能です。
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">高速スキャン</h3>
            <p className="text-sm text-gray-600">カメラでバーコードを瞬時に読み取り</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">検証機能</h3>
            <p className="text-sm text-gray-600">チェックデジットで番号の正確性を確認</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">追跡連携</h3>
            <p className="text-sm text-gray-600">日本郵便サイトと直接連携</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">形式対応</h3>
            <p className="text-sm text-gray-600">ライト・プラス両方に対応</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              バーコードスキャン
            </h3>
            
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">使用方法</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. 「スキャン開始」ボタンを押す</li>
                <li>2. カメラの使用を許可する</li>
                <li>3. レターパックのバーコードを画面の中央に配置</li>
                <li>4. バーコードから10-30cm程度の距離を保つ</li>
                <li>5. 明るい場所でスキャンする</li>
                <li>6. 自動的に追跡番号を読み取ります</li>
              </ol>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-900 mb-2">📝 スキャンのコツ</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• バーコードが画面の枠内に収まるように調整</li>
                <li>• 手ぶれを避けて安定した状態でスキャン</li>
                <li>• 反射や影でバーコードが見えにくい場合は角度を変える</li>
                <li>• エラーが続く場合は一度停止して再開してみる</li>
              </ul>
            </div>

            {/* Scan Mode Toggle */}
            <div className="mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setScanMode('camera')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                    scanMode === 'camera'
                      ? 'bg-white text-letterpack-red shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Camera className="h-4 w-4" />
                  カメラ
                </button>
                <button
                  onClick={() => setScanMode('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                    scanMode === 'file'
                      ? 'bg-white text-letterpack-red shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  ファイル
                </button>
              </div>
            </div>

            {scanMode === 'camera' ? (
              <CameraScanner onResult={handleScanResult} />
            ) : (
              <FileScanner onResult={handleScanResult} />
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              読み取り結果
            </h3>
            
            {validationResult ? (
              <TrackingCard 
                result={validationResult} 
                onCopy={handleCopy}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  バーコードをスキャンしてください
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  追跡番号の検証結果がここに表示されます
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            サポート情報
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">対応バーコード形式</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CODE_128（主要形式）</li>
                <li>• EAN_13 / EAN_8</li>
                <li>• ITF（Interleaved 2 of 5）</li>
                <li>• CODE_39 / CODABAR</li>
                <li>• UPC_A / UPC_E</li>
                <li>• RSS_14 / RSS_EXPANDED</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">検証アルゴリズム</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 12桁数字形式チェック</li>
                <li>• チェックデジット検証（mod 7）</li>
                <li>• レターパック形式判定</li>
                <li>• 自動フォーマット変換</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-orange-900 mb-4">
            🔧 トラブルシューティング
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-orange-900 mb-2">カメラが起動しない場合</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• ブラウザでカメラの使用許可を確認</li>
                <li>• HTTPS接続を使用（GitHub Pagesは自動的にHTTPS）</li>
                <li>• 他のアプリでカメラが使用されていないか確認</li>
                <li>• ブラウザを再起動してみる</li>
                <li>• カメラアクセスに問題がある場合は「ファイル」タブを使用</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-900 mb-2">環境情報</h4>
              <div className="text-sm text-orange-800 space-y-1">
                <div>• セキュア接続: {window.location.protocol === 'https:' ? '✅ HTTPS' : '❌ HTTP'}</div>
                <div>• カメラAPI: {navigator.mediaDevices ? '✅ 対応' : '❌ 非対応'}</div>
                <div>• ブラウザ: {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Safari') ? 'Safari' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'その他'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}