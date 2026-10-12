# Nirvana Store (nirvanaApp-v1)

Aplikasi mobile **React Native** (Android & iOS) untuk Nirvana Store, toko online dengan fitur belanja, keranjang, checkout, pembayaran, dan konten seputar yoga.

## Fitur

Disimpulkan dari struktur `src/layouts` dan `src/services`:

- **Navigasi bottom tab:** Home, Shop, My Mat, Yoga News, Profile
- **Katalog produk:** daftar produk, kategori, detail produk, dan gambar produk
- **Keranjang & checkout:** cart, alamat pengiriman, kupon, invoice
- **Pembayaran:** proses pembayaran
- **Akun:** autentikasi, OTP, dan data akun
- **Penyimpanan lokal:** SQLite (`services/database/service_sqlite.js`) dan AsyncStorage

## Tech stack

| | |
|---|---|
| Framework | React Native 0.63.4, React 16.13.1, Expo 40 (unimodules) |
| Navigasi | React Navigation 5 (stack, bottom-tabs, material-bottom-tabs) |
| UI | react-native-paper, react-native-reanimated, react-native-svg, react-native-modal |
| HTTP | axios |
| Fitur native | NFC (`react-native-nfc-manager`), video, WebView, reCAPTCHA |
| Test & lint | Jest, ESLint |

## Struktur proyek

```
App.js / index.js     entry point
app.json              nama app: "Nirvana Store"
android/  ios/        project native
assets/               aset gambar dan font
src/
  layouts/            layar & komponen UI (bottom_tabs, items, button)
  services/           proses bisnis dan panggilan API (cart, checkout, payment, ...)
  functions/          helper
  material/           warna, dimensi, konstanta, string
  values/             style
  icons/ local_file/  aset lokal
__tests__/            App-test.js
```

## Menjalankan

Prasyarat: Node.js, JDK dan Android Studio (untuk Android) atau Xcode (untuk iOS). Panduan lengkap ada di dokumentasi React Native untuk versi 0.63.

```bash
yarn install          # atau: npm install
yarn start            # Metro bundler

yarn android          # jalankan di Android
yarn ios              # jalankan di iOS (perlu: cd ios && pod install)

yarn test             # Jest
yarn lint             # ESLint
```
