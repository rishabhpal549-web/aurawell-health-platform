/**
 * AuraWell Multilingual Localization (i18n) Engine
 * Supported Initial Languages: English (en) and Hindi (hi)
 * Localization ready for: bn, mr, ta, te, gu, pa, kn, ml, or, ur, as, ne
 */

const I18nService = {
  currentLang: 'hi', // Initial default as requested

  supportedLanguages: [
    { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी', dir: 'ltr' },
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' }
  ],

  translations: {
    en: {
      appName: 'AuraWell',
      tagline: 'Discover Better Health. Build Better Habits.',
      motto: 'Evidence-Based Community Wellness',
      nav: {
        home: 'Home',
        explore: 'Reels & Video',
        articles: 'Health Library',
        tracker: 'Habit Tracker',
        profile: 'Profile',
        admin: 'Admin Panel',
        create: 'Create Post',
        notifications: 'Notifications',
        settings: 'Settings',
        logout: 'Sign Out'
      },
      feed: {
        forYou: 'For You',
        following: 'Following',
        medical: 'Doctor Verified',
        recipes: 'Healthy Recipes',
        fitness: 'Yoga & Movement',
        sleep: 'Sleep & Mind',
        sharePrompt: 'Share your healthy journey, recipe or wellness tip...',
        like: 'Like',
        comment: 'Comment',
        share: 'Share',
        save: 'Save',
        report: 'Report Post',
        writeComment: 'Add a helpful comment...',
        disclaimer: 'Community wellness content. Not medical advice. Always consult your doctor.',
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        fiber: 'Fiber'
      },
      reels: {
        title: 'Wellness Short Videos',
        soundOn: 'Unmute',
        soundOff: 'Mute',
        follow: 'Follow',
        following: 'Following',
        audioTrack: 'Original Audio • Wellness Routine'
      },
      tracker: {
        title: 'Personal Wellness Tracker',
        subtitle: 'Private & Secure • DPDP Act Compliant',
        streak: 'Day Wellness Streak',
        streakSub: 'Consistency builds lifelong vitality!',
        hydrationTitle: 'Daily Hydration Target',
        addWater250: '+250 ml',
        addWater500: '+500 ml',
        resetWater: 'Reset Today',
        targetOf: 'of 3,000 ml',
        sleepTitle: 'Sleep Duration & Quality',
        hours: 'hours',
        sleepQuality: 'Sleep Quality',
        breathingTitle: 'Mindful Box Breathing (Pranayama)',
        breathingSub: '4s Inhale • 4s Hold • 4s Exhale • 4s Hold to reset your nervous system',
        startBreathing: 'Start Guided Session',
        stopBreathing: 'Pause Session',
        inhale: 'Inhale Slowly...',
        hold: 'Hold Gently...',
        exhale: 'Exhale Smoothly...',
        holdEmpty: 'Rest Empty...',
        habitsTitle: 'Today\'s Daily Habits',
        privateNotice: 'Your health and habit logs are strictly private and never posted to public feeds.'
      },
      create: {
        title: 'Create Wellness Post',
        postTab: 'Post',
        reelTab: 'Short Video',
        recipeTab: 'Healthy Recipe',
        captionPlaceholder: 'What healthy habit or meal are you celebrating today?',
        categoryLabel: 'Wellness Category',
        audienceLabel: 'Audience Visibility',
        public: 'Public (Entire Community)',
        followers: 'Followers Only',
        altTextLabel: 'Image Description (Accessibility Alt-Text)',
        submitBtn: 'Publish Post',
        uploadPrompt: 'Click or drop high-resolution image/video here',
        tagsPlaceholder: 'Add hashtags e.g. #HealthyEating #MorningYoga'
      },
      admin: {
        panelTitle: 'AuraWell Admin Console',
        overview: 'Overview',
        users: 'User Management',
        moderation: 'Content Moderation',
        healthReview: 'Health Content Review',
        settings: 'Platform Settings',
        auditLogs: 'Audit & Security Logs',
        totalUsers: 'Total Users',
        activeUsers: 'Daily Active Users',
        pendingReports: 'Reports Awaiting Review',
        storageUsed: 'Media Storage',
        articlesPending: 'Articles in Review Queue',
        warnUser: 'Issue Warning',
        banUser: 'Suspend Account',
        verifyUser: 'Grant Verified Expert',
        dismissReport: 'Dismiss Report',
        removeContent: 'Remove Content',
        approveArticle: 'Approve & Publish',
        rejectArticle: 'Request Revision'
      },
      common: {
        searchPlaceholder: 'Search healthy recipes, yoga, creators, topics...',
        switchRole: 'Switch Demo Role',
        themeToggle: 'Toggle Theme',
        success: 'Operation completed successfully',
        linkCopied: 'Shareable wellness link copied to clipboard!'
      }
    },

    hi: {
      appName: 'AuraWell',
      tagline: 'स्वस्थ जीवन खोजें। बेहतर आदतें बनाएं।',
      motto: 'आरोग्यम् परमं भाग्यम् - साक्ष्य-आधारित सामुदायिक स्वास्थ्य',
      nav: {
        home: 'होम',
        explore: 'रील्स एवं वीडियो',
        articles: 'स्वास्थ्य ज्ञान',
        tracker: 'आदत ट्रैकर',
        profile: 'प्रोफ़ाइल',
        admin: 'एडमिन पैनल',
        create: 'पोस्ट बनाएं',
        notifications: 'सूचनाएं',
        settings: 'सेटिंग्स',
        logout: 'लॉग आउट'
      },
      feed: {
        forYou: 'आपके लिए',
        following: 'फॉलोइंग',
        medical: 'डॉक्टर सत्यापित',
        recipes: 'पौष्टिक व्यंजन',
        fitness: 'योग एवं व्यायाम',
        sleep: 'नींद एवं मानसिक शांति',
        sharePrompt: 'अपनी स्वस्थ दिनचर्या, रेसिपी या सेहतमंद सुझाव साझा करें...',
        like: 'पसंद करें',
        comment: 'टिप्पणी',
        share: 'शेयर करें',
        save: 'सहेजें',
        report: 'रिपोर्ट करें',
        writeComment: 'एक उपयोगी टिप्पणी लिखें...',
        disclaimer: 'सामुदायिक स्वास्थ्य सामग्री। यह चिकित्सीय सलाह नहीं है। हमेशा डॉक्टर से परामर्श लें।',
        calories: 'कैलोरी',
        protein: 'प्रोटीन',
        carbs: 'कार्ब्स',
        fat: 'फैट',
        fiber: 'फाइबर'
      },
      reels: {
        title: 'शॉर्ट वेलनेस वीडियो',
        soundOn: 'ध्वनि चालू',
        soundOff: 'मूक करें',
        follow: 'फॉलो करें',
        following: 'फॉलो किया गया',
        audioTrack: 'मूल ध्वनि • वेलनेस रूटीन'
      },
      tracker: {
        title: 'व्यक्तिगत स्वास्थ्य ट्रैकर',
        subtitle: 'पूर्णतः निजी एवं सुरक्षित • DPDP अधिनियम अनुपालन',
        streak: 'दिनों का वेलनेस स्ट्रीक',
        streakSub: 'नियमितता ही दीर्घायु और ऊर्जावान जीवन की कुंजी है!',
        hydrationTitle: 'दैनिक जल सेवन लक्ष्य',
        addWater250: '+२५० मिली',
        addWater500: '+५०० मिली',
        resetWater: 'आज का रीसेट करें',
        targetOf: '३,००० मिली में से',
        sleepTitle: 'नींद की अवधि एवं गुणवत्ता',
        hours: 'घंटे',
        sleepQuality: 'नींद की गुणवत्ता',
        breathingTitle: 'सजग बॉक्स श्वास (प्राणायाम)',
        breathingSub: '४ सेकंड सांस लें • ४ सेकंड रोकें • ४ सेकंड छोड़ें • ४ सेकंड विश्राम',
        startBreathing: 'सत्र प्रारंभ करें',
        stopBreathing: 'सत्र रोकें',
        inhale: 'गहरी सांस लें...',
        hold: 'सांस रोके रखें...',
        exhale: 'धीमी सांस छोड़ें...',
        holdEmpty: 'विश्राम करें...',
        habitsTitle: 'आज की दैनिक स्वास्थ्य आदतें',
        privateNotice: 'आपका स्वास्थ्य एवं आदत डेटा पूर्णतः निजी है और कभी भी सार्वजनिक फ़ीड में नहीं जाता।'
      },
      create: {
        title: 'नई स्वास्थ्य पोस्ट बनाएं',
        postTab: 'पोस्ट',
        reelTab: 'शॉर्ट वीडियो',
        recipeTab: 'पौष्टिक रेसिपी',
        captionPlaceholder: 'आज आपने क्या स्वस्थ आदत अपनाई या क्या पौष्टिक आहार लिया?',
        categoryLabel: 'स्वास्थ्य श्रेणी',
        audienceLabel: 'सामग्री दृश्यता',
        public: 'सार्वजनिक (संपूर्ण समुदाय)',
        followers: 'केवल फॉलोअर्स',
        altTextLabel: 'चित्र का विवरण (एक्सेसिबिलिटी आल्ट-टेक्स्ट)',
        submitBtn: 'प्रकाशित करें',
        uploadPrompt: 'उच्च गुणवत्ता की फोटो या वीडियो यहाँ अपलोड करें',
        tagsPlaceholder: 'हैशटैग जोड़ें जैसे #स्वस्थआहार #योग #सुबहकीदिनचर्या'
      },
      admin: {
        panelTitle: 'AuraWell एडमिन कंसोल',
        overview: 'डैशबोर्ड अवलोकन',
        users: 'उपयोगकर्ता प्रबंधन',
        moderation: 'सामग्री मॉडरेशन',
        healthReview: 'स्वास्थ्य सामग्री समीक्षा',
        settings: 'प्लेटफॉर्म सेटिंग्स',
        auditLogs: 'सुरक्षा एवं ऑडिट लॉग्स',
        totalUsers: 'कुल उपयोगकर्ता',
        activeUsers: 'दैनिक सक्रिय सदस्य',
        pendingReports: 'समीक्षा हेतु लंबित रिपोर्ट',
        storageUsed: 'मीडिया स्टोरेज',
        articlesPending: 'समीक्षाधीन लेख',
        warnUser: 'चेतावनी जारी करें',
        banUser: 'खाता निलंबित करें',
        verifyUser: 'सत्यापित विशेषज्ञ बनाएं',
        dismissReport: 'रिपोर्ट खारिज करें',
        removeContent: 'सामग्री हटाएं',
        approveArticle: 'स्वीकृत एवं प्रकाशित करें',
        rejectArticle: 'सुधार हेतु वापस भेजें'
      },
      common: {
        searchPlaceholder: 'व्यंजन, योग, विशेषज्ञ या स्वास्थ्य विषय खोजें...',
        switchRole: 'डेमो रोल बदलें',
        themeToggle: 'थीम बदलें',
        success: 'प्रक्रिया सफलतापूर्वक संपन्न हुई',
        linkCopied: 'शेयर करने योग्य लिंक कॉपी हो गया!'
      }
    }
  },

  init() {
    const saved = StorageService.get(AuraConfig.storageKeys.language, 'hi');
    this.setLanguage(saved);
  },

  setLanguage(langCode) {
    if (!this.translations[langCode]) {
      langCode = 'hi';
    }
    this.currentLang = langCode;
    StorageService.set(AuraConfig.storageKeys.language, langCode);

    const langMeta = this.supportedLanguages.find(l => l.code === langCode);
    const dir = langMeta ? langMeta.dir : 'ltr';
    document.documentElement.setAttribute('lang', langCode);
    document.documentElement.setAttribute('dir', dir);

    this.translateDOM();

    // Fire custom event
    window.dispatchEvent(new CustomEvent('aura:languageChange', { detail: { lang: langCode, dir } }));
  },

  t(path) {
    const keys = path.split('.');
    let val = this.translations[this.currentLang];
    for (const k of keys) {
      if (val && val[k] !== undefined) {
        val = val[k];
      } else {
        // Fallback to English
        let fallback = this.translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return val;
  },

  translateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('title', translation);
      }
    });
  }
};

window.I18nService = I18nService;
