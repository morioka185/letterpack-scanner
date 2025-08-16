import { Package, Scan } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-letterpack-red" />
              <Scan className="h-6 w-6 text-letterpack-blue" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                レターパック追跡
              </h1>
              <p className="text-sm text-gray-500">
                バーコードスキャナー
              </p>
            </div>
          </div>

          {/* Right side - could add navigation or settings */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <span className="text-sm text-gray-500">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}