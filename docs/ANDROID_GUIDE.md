# AuraWell Android Application Build & Publishing Guide

AuraWell is engineered for Android users through two pathways:
1. **Instant Progressive Web App (PWA) Installation:** Works on any Android phone (Chrome/Edge/Samsung Internet) with zero app store friction, full offline caching, and home screen icon.
2. **Native Android APK / AAB Bundle (Capacitor):** Can be compiled into an Android App Bundle (`.aab`) and submitted directly to the **Google Play Store**.

---

## 1. Instant Android Installation via PWA

1. Open `https://aurawell.org` on any Android device using Google Chrome or Samsung Internet.
2. Tap the browser menu (three dots) or click the **Install App** banner.
3. Tap **"Install AuraWell"**.
4. The high-resolution AuraWell emerald icon appears on the device home screen and app drawer.
5. The application runs full-screen (standalone mode) without browser address bars, with offline habit tracking enabled via ServiceWorker.

---

## 2. Compiling the Native Android Application with Capacitor

### Prerequisites:
- Android Studio Hedgehog / Iguana / Ladybug
- JDK 17 or higher
- Android SDK Platform 34 (Android 14)

### Build Steps:
```bash
# 1. In the project directory:
cd aurawell-health-platform

# 2. Add Android platform (if utilizing Capacitor CLI):
npx cap add android

# 3. Synchronize web assets into Android project:
npx cap sync android

# 4. Open in Android Studio:
npx cap open android
```

---

## 3. Generating a Signed Release Keystore for Google Play

In your terminal or PowerShell:
```bash
keytool -genkey -v -keystore aurawell-release.keystore -alias aurawell-key -keyalg RSA -keysize 2048 -validity 10000
```

Configure `android/app/build.gradle`:
```groovy
android {
    signingConfigs {
        release {
            storeFile file("aurawell-release.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias "aurawell-key"
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

Build the release bundle:
```bash
cd android
./gradlew bundleRelease
```
Output: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 4. Google Play Store Submission Checklist

- [ ] **Privacy Policy URL:** Publicly accessible URL pointing to your DPDP compliant policy.
- [ ] **Health Content Disclosure:** Check the Google Play Health Apps Declaration indicating educational and wellness nature (non-clinical diagnostic).
- [ ] **Target Audience:** General public (13+ years).
- [ ] **App Icon:** 512x512 PNG (Use `assets/images/aurawell-logo.jpg`).
- [ ] **Feature Graphic:** 1024x500 PNG banner showcasing the emerald wellness feed and habit tracker.
- [ ] **Screenshots:** Minimum 2 phone screenshots (portrait 1080x1920) and 1 tablet screenshot.
