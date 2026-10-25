/**
 * AuraWell Platform Configuration & Storage Adapter
 * Supports direct Supabase Cloud integration or seamless local resilient IndexedDB/LocalStorage persistence.
 */

const AuraConfig = {
  appName: 'AuraWell',
  tagline: 'Discover Better Health. Build Better Habits.',
  version: '1.0.0-production',

  // Supabase Configuration (Populated from .env or configured dynamically)
  supabase: {
    url: window.AURA_ENV?.SUPABASE_URL || 'https://demo-aurawell.supabase.co',
    anonKey: window.AURA_ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key',
    isConfigured: false // Set to true when actual credentials are provided
  },

  // Media & Video Transcoding Service
  media: {
    maxImageBytes: 15 * 1024 * 1024, // 15MB
    maxVideoBytes: 60 * 1024 * 1024, // 60MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedVideoTypes: ['video/mp4', 'video/webm', 'video/quicktime']
  },

  // Storage Keys for Local Resilience
  storageKeys: {
    users: 'aurawell_users_v1',
    currentUser: 'aurawell_current_user_v1',
    posts: 'aurawell_posts_v1',
    reels: 'aurawell_reels_v1',
    comments: 'aurawell_comments_v1',
    habits: 'aurawell_habits_v1',
    wellnessLogs: 'aurawell_wellness_logs_v1',
    articles: 'aurawell_articles_v1',
    reports: 'aurawell_reports_v1',
    auditLogs: 'aurawell_audit_logs_v1',
    settings: 'aurawell_settings_v1',
    language: 'aurawell_language_v1',
    theme: 'aurawell_theme_v1'
  }
};

/**
 * Storage Helper with Safe JSON Parse and Fallback
 */
const StorageService = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`[StorageService] Failed to read ${key}:`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[StorageService] Failed to write ${key}:`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`[StorageService] Failed to remove ${key}:`, e);
      return false;
    }
  }
};

window.AuraConfig = AuraConfig;
window.StorageService = StorageService;
