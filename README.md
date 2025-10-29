# 📦 Inventra

A simple and efficient mobile inventory management app built with React Native and Expo. Manage your products, track stock levels, and organize your inventory - all offline.

## 🚀 Demo Links

- **🌐 Try Online:** `[Add Appetize Link Here]`
- **📱 Download APK:** `[Add Download Link Here]`
- **🎥 Video Demo:** `[Add Video Link Here]`

## ✨ Features

- Add, edit, and delete products
- Capture product images with camera
- Track quantities and prices
- Organize by categories
- Local SQLite database (works offline)
- Clean, modern UI

## 🛠️ Tech Stack

- React Native + Expo
- TypeScript
- Expo Router (Navigation)
- Expo SQLite (Database)
- NativeWind (Styling)

## 📋 Prerequisites

- Node.js (v18+)
- npm/yarn/pnpm
- Git

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/fortstar09/inventra.git
cd inventra
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Run the app

- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Scan QR code with Expo Go app on your device

## 📦 Build for Production

### Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

### Build Android APK

```bash
# Preview build
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

### Build iOS (macOS only)

```bash
eas build --platform ios --profile production
```

## 🐛 Troubleshooting

**Clear cache:**
```bash
npx expo start -c
```

**Reinstall dependencies:**
```bash
rm -rf node_modules
npm install
```

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📝 License

MIT License

---

⭐ Star this repo if you find it helpful!