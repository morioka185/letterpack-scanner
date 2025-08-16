# レターパック追跡番号取得アプリ

レターパックのバーコードから追跡番号を取得し、検証・追跡するWebアプリケーション

## 🚀 機能

- **バーコードスキャン**: カメラを使用したリアルタイムスキャン
- **追跡番号検証**: チェックデジット検証（mod 7）
- **フォーマット変換**: 自動的にXXXX-XXXX-XXXX形式に変換
- **日本郵便連携**: 追跡サイトへの直接リンク
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 🛠️ 技術スタック

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Barcode**: html5-qrcode
- **Icons**: Lucide React
- **State**: Zustand (予定)

## 📦 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 🎯 使用方法

1. **スキャン開始**ボタンを押してカメラを起動
2. レターパックのバーコードをカメラに向ける
3. 自動的に追跡番号が読み取られ、検証される
4. **追跡番号をコピー**ボタンでクリップボードにコピー
5. **日本郵便で追跡**ボタンで追跡サイトを開く

## 📱 対応バーコード形式

- CODE_128 (主要)
- EAN_13 / EAN_8
- ITF (Interleaved 2 of 5)
- CODE_39 / CODABAR

## 🔍 検証アルゴリズム

レターパック追跡番号は12桁の数字で構成され、最後の1桁がチェックデジットです。

```
検証式: (最初の11桁の合計) % 7 = チェックデジット
例: 238124139853
→ (2+3+8+1+2+4+1+3+9+8+5) % 7 = 46 % 7 = 4
→ チェックデジット: 4 ≠ 3 (無効)
```

## 🎨 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── BarcodeScanner/ # スキャナー関連
│   ├── TrackingResults/# 結果表示
│   ├── UI/             # 基本UIコンポーネント
│   └── Layout/         # レイアウト
├── hooks/              # カスタムフック
├── types/              # TypeScript型定義
├── utils/              # ユーティリティ関数
└── pages/              # ページコンポーネント
```

## 🔗 API

### 追跡URL生成

```typescript
const trackingUrl = `https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=${number}&locale=ja`;
```

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

問題や質問がある場合は、[Issues](https://github.com/morioka185/letterpack-scanner/issues)で報告してください。