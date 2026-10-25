# AuraWell Deployment & Launch Guide

This guide outlines step-by-step instructions to deploy AuraWell to production on modern cloud infrastructure (Vercel, Netlify, Supabase) and configure production domains.

---

## 1. Supabase Backend Setup

1. **Create Project:**
   - Log in to [Supabase](https://supabase.com) and create a new project named `aurawell-production`.
   - Choose a region close to your primary audience (e.g., `ap-south-1` Mumbai for India).

2. **Execute Database Migrations:**
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Copy the contents of `supabase/schema.sql` and click **Run**.
   - Verify that all 11 tables and Row Level Security (RLS) policies are created.
   - Run `supabase/seed.sql` to populate initial verified doctor accounts, articles, and recipes.

3. **Configure Storage Buckets:**
   - Create two storage buckets in **Storage**:
     - `public-media`: Public read enabled for post images and verified creator avatars.
     - `private-wellness`: Private bucket with authenticated user RLS policies for habit exports.

4. **Obtain API Keys:**
   - Go to **Project Settings > API**.
   - Copy `Project URL` and `anon public` key into your `.env` file.

---

## 2. Web Application Deployment (Vercel / Netlify / Cloudflare Pages)

### Option A: Deploy via Vercel CLI / Git
```bash
# In the project root:
vercel --prod
```
Configure Environment Variables in Vercel Project Settings:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Option B: Static & PWA Hosting on Any Web Server / Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name aurawell.org www.aurawell.org;

    root /var/www/aurawell-health-platform;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /admin {
        try_files $uri /admin.html;
    }

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|webp|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 3. Production Health Check Checklist

- [ ] HTTPS enforced across all endpoints.
- [ ] Language switching (Hindi & English) verified.
- [ ] PWA Service Worker caching active.
- [ ] Post creation with image upload verified.
- [ ] Like and Comment threads persisting.
- [ ] Daily Habit Tracker (Hydration & Box Breathing) functional.
- [ ] Admin Console (`/admin.html`) accessible on mobile and desktop.
- [ ] User DPDP data export generates complete JSON bundle.
