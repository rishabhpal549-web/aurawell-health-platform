# 🌿 AuraWell — Health & Wellness Social Media Platform

> **Brand Tagline:** *Discover Better Health. Build Better Habits.*  
> **Motto:** *आरोग्यम् परमं भाग्यम् (Health is Supreme Wealth) — Evidence-Informed Community Wellness.*  
> **Platforms:** Responsive Web (Mobile, Tablet, Desktop), Android Application (Installable PWA & Capacitor Native APK), Full Responsive Admin Panel.

---

## 1. Executive Summary & Brand Identity

**AuraWell** is a production-oriented health, nutrition, yoga, and lifestyle social network. It is designed to inspire lifelong vitality through mindful daily habits, evidence-based nutrition, and a supportive, judgment-free online community.

### Visual Identity & Design System
- **Original Brand Emblem:** Stylized botanical leaf intersecting with a radiant cardiovascular pulse circle enclosed in a deep emerald aura.
- **Curated Palette:**
  - *Primary:* Luminous Emerald (`#1e9e68` / `hsl(158, 64%, 42%)`)
  - *Secondary:* Solar Amber Gold (`#f59e0b` / `hsl(38, 92%, 50%)`)
  - *Neutrals:* Deep Charcoal (`#0c1214`) for default dark mode, Pure Pearl (`#ffffff`) for accessible light mode.
- **Typography:** *Outfit* (Modern heading typography) and *Plus Jakarta Sans* (Legible UI and Devanagari numerals/Hindi).
- **Aesthetic:** Glassmorphism with subtle backdrop-blur, smooth micro-animations, and elevated contrast standards.

---

## 2. Key Architecture & Features

### 🌐 Multilingual Localization (i18n)
- **Languages:** Complete native **Hindi (हिन्दी)** and **English** localization out of the box.
- **RTL & Extended Indic Support:** Localization-ready architecture configured for Bengali, Marathi, Tamil, Telugu, Gujarati, Punjabi, Kannada, Malayalam, Odia, Urdu (with automated right-to-left alignment), Assamese, and Nepali.
- **Dynamic Switcher:** Instant, zero-reload language switching in the top navigation bar.

### 🥗 Dynamic Community Feed & Healthy Recipes
- Category filters: *For You*, *Doctor Verified*, *Healthy Recipes*, *Yoga & Movement*, *Sleep & Mind*.
- **Recipe Macro-Nutrient Badges:** Displays calories, protein, complex carbs, healthy fats, and dietary fiber per serving.
- **Interactive Social Network:** Likes with heart micro-animations, nested comments, shareable links (Web Share API), and personal wellness bookmarks.
- **Mandatory Medical Disclaimer:** Transparent educational banner reminding users that content is not a substitute for clinical medical diagnosis.

### 📱 Vertical Short-Form Video (Reels)
- Dedicated 9:16 mobile-first vertical video player.
- Tap-to-play/pause, sound mute/unmute control, progress scrubber, and spinning audio disc animation.
- Video upload with client-side file type and size validation.

### 🧘 Personal Wellness Tracker (DPDP Compliant)
- **Hydration Target:** Interactive SVG circular progress ring tracking daily water intake with quick +250ml, +500ml logging buttons.
- **Sleep Quality Logger:** Visual hours slider and 5-star sleep restorative rating.
- **Mindful Box Breathing (Pranayama):** Interactive expanding/contracting breathing orb guiding users through 4s Inhale → 4s Hold → 4s Exhale → 4s Hold to reset autonomic nervous system tone.
- **Daily Habits Checklist:** Daily streaks (e.g., 7 Days Streak 🔥) with green completion glows.
- **Strict Privacy Guarantee:** Personal wellness logs are strictly private, physically separated in database tables, and never published to public social feeds without explicit user action.

### 🛡️ Complete Responsive Admin Console (`admin.html`)
- Dedicated administrative interface with full parity on mobile phones, tablets, laptops, and desktop computers.
- **Overview Dashboard:** Real-time KPI metrics (Total Users, Active Members, Pending Reports, Media Storage).
- **User Governance:** Search and filter members, issue official policy warnings, suspend accounts, and grant Verified Expert credentials.
- **Content Moderation Queue:** Review user-flagged posts for dangerous health claims with one-click content removal.
- **Clinical Content Review:** Verification workflow ensuring only qualified clinicians (MBBS/MD/RD) can author peer-reviewed health articles.
- **Platform Parameters:** Manage upload size limits, maintenance mode, and legal disclaimers.
- **Security Audit Logs:** Tamper-evident log of administrative logins, permissions modifications, and takedowns with JSON export.

### 🔒 Role-Based Access Control (RBAC)
- `regular`: Standard community member with personal habit tracking and social posting.
- `verified_expert`: Verified physician, nutritionist, or yoga acharya with verified badge.
- `moderator`: Content safety officer handling misinformation reports.
- `editor`: Health education reviewer.
- `admin` / `super_admin`: Full system, user, and security audit governance.
- **Interactive Role Switcher Chip:** Test all personas instantly via the navigation bar chip.

---

## 3. Directory Structure

```
aurawell-health-platform/
├── index.html                   # Core Responsive Web App & PWA
├── admin.html                   # Dedicated Responsive Admin Console
├── manifest.webmanifest         # PWA Manifest for Android & Desktop install
├── service-worker.js            # Offline caching and PWA service worker
├── .env.example                 # Environment variable template
├── README.md                    # Project documentation
├── css/
│   ├── tokens.css               # Design tokens, emerald/amber palette, themes
│   ├── base.css                 # Reset, typography, micro-animations
│   ├── components.css           # Navigation, sidebars, modals, toasts
│   ├── feed.css                 # Stories, post cards, recipe macros
│   ├── reels.css                # 9:16 vertical video player, action rail
│   ├── tracker.css              # Hydration ring, sleep logger, breathing orb
│   └── admin.css                # Admin layout, tables, KPI cards, mobile drawer
├── js/
│   ├── config.js                # Configuration, Supabase & local storage adapter
│   ├── i18n.js                  # Complete Hindi & English localization dictionary
│   ├── state.js                 # Central reactive state & seed database
│   ├── auth.js                  # Authentication, DPDP data export, session manager
│   ├── feed.js                  # Feed rendering, post creation, comments, likes
│   ├── reels.js                 # Short video player engine
│   ├── tracker.js               # Water logger, sleep tracker, Box Breathing
│   ├── articles.js              # Peer-reviewed articles & detail modal reader
│   ├── admin.js                 # Admin metrics, user table, moderation queue
│   └── app.js                   # Master coordinator & modal flows
├── assets/
│   └── images/
│       ├── aurawell-logo.jpg    # Original AuraWell brand emblem
│       ├── doctor-priya.jpg     # Verified physician & nutritionist avatar
│       ├── coach-rahul.jpg      # Verified yoga & movement coach avatar
│       ├── nutrition-bowl.jpg   # Balanced Buddha bowl photography
│       ├── yoga-sunrise.jpg     # Sunrise outdoor yoga pose
│       └── ayurveda-herbs.jpg   # Botanical herbs & scientific journal
├── supabase/
│   ├── schema.sql               # Production PostgreSQL schema with 11 tables & RLS
│   └── seed.sql                 # Real seed data (doctors, posts, articles)
├── android/
│   ├── capacitor.config.json    # Capacitor configuration
│   └── app/src/main/
│       └── AndroidManifest.xml  # Android permissions and deep linking
└── docs/
    ├── ARCHITECTURE.md          # Technical blueprint and Mermaid diagrams
    ├── SECURITY_PRIVACY.md      # DPDP Act 2023 compliance and RLS matrix
    ├── DEPLOYMENT_GUIDE.md      # Vercel / Netlify / Supabase deployment guide
    └── ANDROID_GUIDE.md         # PWA install & Google Play publishing guide
```

---

## 4. How to Run Locally

You can run AuraWell instantly with zero external dependencies using PowerShell's built-in HTTP server or any lightweight web server:

```powershell
# In PowerShell:
cd "C:\Users\hp\.gemini\antigravity-ide\scratch\aurawell-health-platform"

# Start the built-in HTTP server on port 8080:
$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add("http://localhost:8080/"); $listener.Start(); Write-Host "AuraWell running at http://localhost:8080/ (Press Ctrl+C to stop)"; while ($listener.IsListening) { $context = $listener.GetContext(); $path = $context.Request.Url.LocalPath.TrimStart('/'); if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }; $filepath = Join-Path (Get-Location) $path; if (Test-Path $filepath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($filepath); $context.Response.ContentLength64 = $bytes.Length; $ext = [System.IO.Path]::GetExtension($filepath).ToLower(); switch ($ext) { ".html" { $context.Response.ContentType = "text/html" } ".css" { $context.Response.ContentType = "text/css" } ".js" { $context.Response.ContentType = "application/javascript" } ".jpg" { $context.Response.ContentType = "image/jpeg" } ".json" { $context.Response.ContentType = "application/json" } default { $context.Response.ContentType = "application/octet-stream" } }; $context.Response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $context.Response.StatusCode = 404 }; $context.Response.OutputStream.Close() }
```

Then visit:
- **Main Social Platform:** `http://localhost:8080/index.html`
- **Admin Console:** `http://localhost:8080/admin.html`

---

## 5. Audit of External Services Requiring Accounts/Configuration

| Service | Category | Requirement | Free Tier / Cost |
|---|---|---|---|
| **Supabase** | Managed Database & Auth | PostgreSQL 15+, Auth JWT, Storage Buckets | Free tier available (500MB DB, 1GB Storage) |
| **Vercel / Netlify** | Frontend Hosting & CDN | Automated Git CI/CD, SSL Certificates, Edge Network | Free tier available |
| **Mux / Cloudflare Stream** | Video Transcoding & HLS Delivery | Adaptive streaming for Short-form Reels videos | Pay-as-you-go per minute of video |
| **Resend / SendGrid** | Transactional Email | OTP codes and password recovery emails | Free tier available (3,000 emails/mo) |
| **Google Play Developer Console** | Android App Publishing | Publishing signed Android App Bundle (`.aab`) | One-time $25 registration fee |
