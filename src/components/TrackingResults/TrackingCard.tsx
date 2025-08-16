import React from 'react';
import { Copy, ExternalLink, Check, AlertCircle } from 'lucide-react';
import type { ValidationResult } from '@/types/tracking';

interface TrackingCardProps {
  result: ValidationResult;
  onCopy?: (text: string) => void;
}

export function TrackingCard({ result, onCopy }: TrackingCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!result.formattedNumber) return;
    
    try {
      await navigator.clipboard.writeText(result.formattedNumber);
      setCopied(true);
      onCopy?.(result.formattedNumber);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleTrackingLink = () => {
    if (result.trackingUrl) {
      window.open(result.trackingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'letterpack_light':
        return 'レターパックライト';
      case 'letterpack_plus':
        return 'レターパックプラス';
      default:
        return '追跡番号';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'letterpack_light':
        return 'bg-blue-100 text-blue-800';
      case 'letterpack_plus':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
          ${result.isValid 
            ? 'bg-green-100 text-green-600' 
            : 'bg-red-100 text-red-600'
          }
        `}>
          {result.isValid ? (
            <Check className="h-6 w-6" />
          ) : (
            <AlertCircle className="h-6 w-6" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Type Badge */}
          <div className="mb-3">
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${getTypeColor(result.type)}
            `}>
              {getTypeLabel(result.type)}
            </span>
          </div>

          {/* Tracking Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              追跡番号
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-lg font-bold">
                {result.formattedNumber}
              </div>
              <button
                onClick={handleCopy}
                className="btn-outline p-3"
                title="コピー"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Validation Status */}
          <div className="mb-4">
            <div className={`
              p-3 rounded-lg border
              ${result.isValid 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
              }
            `}>
              <p className="font-medium">{result.message}</p>
              {!result.isValid && (
                <p className="text-sm mt-1">
                  チェックデジット: 期待値 {result.checkDigit.expected}, 
                  実際 {result.checkDigit.actual}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {result.isValid && result.trackingUrl && (
            <div className="flex gap-3">
              <button
                onClick={handleTrackingLink}
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                日本郵便で追跡
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}