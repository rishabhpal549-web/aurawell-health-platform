/**
 * AuraWell Reactive State Management & Seed Database
 * Implements full CRUD, event subscriptions, and resilient local storage sync.
 */

const AuraRoles = {
  REGULAR: 'regular',
  VERIFIED_EXPERT: 'verified_expert',
  MODERATOR: 'moderator',
  EDITOR: 'editor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

const AuraState = {
  // Demo Users representing all roles
  demoUsers: [
    {
      id: 'usr_priya',
      username: 'dr_priya_sharma',
      displayName: 'Dr. Priya Sharma, MD',
      email: 'priya.sharma@aurawell.org',
      role: AuraRoles.VERIFIED_EXPERT,
      avatar: 'assets/images/doctor-priya.jpg',
      bio: 'Integrative Physician & Clinical Nutritionist. AIIMS Alum. Dedicated to lifestyle medicine and evidence-based wellness.',
      verified: true,
      credentials: 'MBBS, MD (Medicine), PG Dip Clinical Nutrition',
      followersCount: 14820,
      followingCount: 194,
      interests: ['Nutrition', 'Metabolic Health', 'Gut Health', 'Preventive Care'],
      twoFactorEnabled: true
    },
    {
      id: 'usr_rahul',
      username: 'coach_rahul',
      displayName: 'Rahul Verma',
      email: 'rahul.fit@aurawell.org',
      role: AuraRoles.VERIFIED_EXPERT,
      avatar: 'assets/images/coach-rahul.jpg',
      bio: 'Yoga Practitioner (500hr RYT) & Functional Movement Coach. Helping you build sustainable morning routines and spinal flexibility.',
      verified: true,
      credentials: 'Certified Yoga Acharya (RYT-500), CSCS Coach',
      followersCount: 9340,
      followingCount: 128,
      interests: ['Yoga', 'Mobility', 'Breathwork', 'Habit Building'],
      twoFactorEnabled: false
    },
    {
      id: 'usr_admin',
      username: 'ananya_admin',
      displayName: 'Ananya Deshmukh (Admin)',
      email: 'admin@aurawell.org',
      role: AuraRoles.ADMIN,
      avatar: 'assets/images/aurawell-logo.jpg',
      bio: 'Platform Safety, Content Standards & Clinical Review Lead at AuraWell.',
      verified: true,
      credentials: 'Head of Trust & Platform Integrity',
      followersCount: 3410,
      followingCount: 45,
      interests: ['Platform Safety', 'Health Ethics', 'Community Standards'],
      twoFactorEnabled: true
    },
    {
      id: 'usr_mod',
      username: 'vikram_moderator',
      displayName: 'Vikram Joshi (Moderator)',
      email: 'moderator@aurawell.org',
      role: AuraRoles.MODERATOR,
      avatar: 'assets/images/aurawell-logo.jpg',
      bio: 'AuraWell Trust & Safety Moderator. Ensuring misinformation-free wellness discussions.',
      verified: true,
      credentials: 'Community Moderator',
      followersCount: 1200,
      followingCount: 88,
      interests: ['Fact Checking', 'Community Safety'],
      twoFactorEnabled: true
    },
    {
      id: 'usr_regular',
      username: 'aarav_wellness',
      displayName: 'Aarav Patel',
      email: 'aarav.patel@gmail.com',
      role: AuraRoles.REGULAR,
      avatar: 'assets/images/aurawell-logo.jpg',
      bio: 'Software engineer on a mission to beat sedentary burnout. Tracking hydration, daily steps, and clean vegetarian eating.',
      verified: false,
      followersCount: 312,
      followingCount: 245,
      interests: ['Hydration', '10k Steps', 'Sleep Hygiene', 'Work-Life Balance'],
      twoFactorEnabled: false
    }
  ],

  // Current active user
  currentUser: null,

  // Seed Data: Wellness Posts
  posts: [
    {
      id: 'post_101',
      authorId: 'usr_priya',
      authorName: 'Dr. Priya Sharma, MD',
      authorUsername: 'dr_priya_sharma',
      authorAvatar: 'assets/images/doctor-priya.jpg',
      authorVerified: true,
      category: 'Nutrition',
      createdAt: '2 hours ago',
      timestamp: Date.now() - 7200000,
      content: 'Here is what a truly balanced, low-glycemic lunch looks like! 🥗 Pairing fiber-dense complex carbs (quinoa), plant protein (edamame & roasted spiced chickpeas), healthy monounsaturated fats (avocado), and antioxidant-rich pomegranate seeds helps prevent post-meal sugar spikes and afternoon brain fog. \n\nRemember: healthy eating is about nutrient abundance, not restriction! What are you fueling your body with today?',
      mediaType: 'image',
      mediaUrl: 'assets/images/nutrition-bowl.jpg',
      altText: 'A vibrant balanced Buddha bowl with roasted chickpeas, edamame, quinoa, sweet potatoes, and avocado.',
      recipeData: {
        calories: '480 kcal',
        protein: '22g',
        carbs: '54g',
        fat: '18g',
        fiber: '14g'
      },
      likesCount: 342,
      likedBy: ['usr_regular', 'usr_rahul'],
      bookmarkedBy: ['usr_regular'],
      commentsCount: 18,
      comments: [
        {
          id: 'c_1',
          userId: 'usr_regular',
          userName: 'Aarav Patel',
          userAvatar: 'assets/images/aurawell-logo.jpg',
          text: 'This looks delicious Dr. Priya! Is quinoa better than brown rice for blood sugar control?',
          timestamp: '1 hour ago'
        },
        {
          id: 'c_2',
          userId: 'usr_priya',
          userName: 'Dr. Priya Sharma, MD',
          userAvatar: 'assets/images/doctor-priya.jpg',
          text: 'Great question Aarav! Both are healthy whole grains, but quinoa has a lower glycemic index (53 vs 68) and provides all 9 essential amino acids.',
          timestamp: '45 mins ago'
        }
      ],
      sharesCount: 65,
      viewsCount: 1420
    },
    {
      id: 'post_102',
      authorId: 'usr_rahul',
      authorName: 'Rahul Verma',
      authorUsername: 'coach_rahul',
      authorAvatar: 'assets/images/coach-rahul.jpg',
      authorVerified: true,
      category: 'Yoga',
      createdAt: '4 hours ago',
      timestamp: Date.now() - 14400000,
      content: 'Morning Prasarita Padottanasana & Virabhadrasana variations in the fresh morning mountain air! 🌲 \n\nOpening the chest, elongating the spine, and syncing your inhalation with extension activates the parasympathetic nervous system within 5 deep breaths. If you sit at a laptop all day, take 3 minutes right now to stand up, interlace your fingers behind your back, and breathe deeply.',
      mediaType: 'image',
      mediaUrl: 'assets/images/yoga-sunrise.jpg',
      altText: 'Yoga practitioner in warrior pose on a wooden deck surrounded by misty pine forest at sunrise.',
      likesCount: 518,
      likedBy: ['usr_regular', 'usr_priya'],
      bookmarkedBy: ['usr_priya'],
      commentsCount: 24,
      comments: [
        {
          id: 'c_3',
          userId: 'usr_regular',
          userName: 'Aarav Patel',
          userAvatar: 'assets/images/aurawell-logo.jpg',
          text: 'Doing this chest opener right now at my desk. Instant relief for my neck tightness!',
          timestamp: '2 hours ago'
        }
      ],
      sharesCount: 89,
      viewsCount: 2310
    },
    {
      id: 'post_103',
      authorId: 'usr_priya',
      authorName: 'Dr. Priya Sharma, MD',
      authorUsername: 'dr_priya_sharma',
      authorAvatar: 'assets/images/doctor-priya.jpg',
      authorVerified: true,
      category: 'Ayurveda & Science',
      createdAt: 'Yesterday',
      timestamp: Date.now() - 86400000,
      content: 'Botanical science meets daily lifestyle: Tulsi (Holy Basil), fresh Amla (Indian Gooseberry), and Curcumin from turmeric have undergone extensive clinical trials for their adaptogenic and immune-modulating properties. 🌿 \n\nAmla contains up to 20x more Vitamin C than oranges by weight. However, herbs work synergistically with sleep and physical activity—they are not magic cures for chronic stress. Start with a simple cup of fresh ginger-tulsi tea in the morning.',
      mediaType: 'image',
      mediaUrl: 'assets/images/ayurveda-herbs.jpg',
      altText: 'Scientific wellness flat lay of Tulsi, turmeric root, and amla gooseberries with laboratory pipette and journal.',
      likesCount: 680,
      likedBy: ['usr_regular'],
      bookmarkedBy: ['usr_regular'],
      commentsCount: 31,
      comments: [],
      sharesCount: 142,
      viewsCount: 3890
    }
  ],

  // Seed Data: Short Videos (Reels)
  reels: [
    {
      id: 'reel_201',
      authorId: 'usr_rahul',
      authorName: 'Rahul Verma',
      authorUsername: 'coach_rahul',
      authorAvatar: 'assets/images/coach-rahul.jpg',
      authorVerified: true,
      category: 'Mobility Routine',
      caption: '3 desk stretches you can do in 60 seconds to release lower back and hip flexor tension. Save for your work day! 🧘‍♂️ #DeskYoga #Mobility #PostureCorrection',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: 'assets/images/yoga-sunrise.jpg',
      likesCount: 1240,
      likedBy: ['usr_regular'],
      commentsCount: 48,
      audioTitle: 'Morning Awakening • 432Hz Calm Frequency',
      viewsCount: 5800
    },
    {
      id: 'reel_202',
      authorId: 'usr_priya',
      authorName: 'Dr. Priya Sharma, MD',
      authorUsername: 'dr_priya_sharma',
      authorAvatar: 'assets/images/doctor-priya.jpg',
      authorVerified: true,
      category: 'Nutrition Fact-Check',
      caption: 'Does lemon warm water in the morning "detox" your liver? The medical truth from a physician. (Spoiler: your liver & kidneys are your detox system!) 🍋 #NutritionScience #DoctorExplains',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'assets/images/nutrition-bowl.jpg',
      likesCount: 2980,
      likedBy: ['usr_regular', 'usr_rahul'],
      commentsCount: 112,
      audioTitle: 'Science Talks • Dr. Priya Sharma',
      viewsCount: 12400
    }
  ],

  // Seed Data: Health Education Articles
  articles: [
    {
      id: 'art_301',
      title: 'The Science of Circadian Rhythms: How Morning Sunlight Regulates Sleep and Metabolism',
      titleHi: 'सर्केडियन रिदम का विज्ञान: सुबह की धूप कैसे नींद और मेटाबॉलिज्म को नियंत्रित करती है',
      authorId: 'usr_priya',
      authorName: 'Dr. Priya Sharma, MD',
      authorCredentials: 'MBBS, MD (Medicine), PG Dip Clinical Nutrition',
      reviewerName: 'Dr. Rajesh Deshmukh, MD (Endocrinology)',
      reviewDate: '15 October 2026',
      readTime: '6 min read',
      category: 'Sleep & Metabolism',
      coverImage: 'assets/images/yoga-sunrise.jpg',
      summary: 'Exposure to natural morning sunlight within 60 minutes of waking triggers cortisol synthesis and sets the 14-hour timer for nocturnal melatonin release.',
      content: `### The Master Clock: The Suprachiasmatic Nucleus (SCN)
Inside the hypothalamus sits the suprachiasmatic nucleus, our biological master clock. When morning photons (especially blue-cyan spectrum light) hit intrinsically photosensitive retinal ganglion cells (ipRGCs), a neural signal transmits directly to the SCN.

#### Key Benefits of Morning Sunlight:
1. **Suppression of Residual Melatonin:** Wakes up cognitive alertness without caffeine dependency.
2. **Phase Alignment:** Synchronizes peripheral clocks in your liver, gut microbiome, and skeletal muscle.
3. **Nocturnal Sleep Quality:** Sets an internal biochemical timer so that 14 to 16 hours later, your pineal gland secretes melatonin efficiently.

> **Clinical Disclaimer:** This educational article provides evidence-informed lifestyle science and does not replace professional medical diagnosis or clinical treatment. If suffering from severe chronic insomnia, consult a board-certified sleep specialist.

#### Reputable References:
- *National Institute of General Medical Sciences (NIGMS): Circadian Rhythms Research (2025).*
- *American Academy of Sleep Medicine: Light Therapy & Sleep Architecture.*`,
      approved: true,
      status: 'published'
    },
    {
      id: 'art_302',
      title: 'Evidence-Based Indian Plant Proteins: Combining Grains & Legumes for Complete Amino Acid Profiles',
      titleHi: 'साक्ष्य-आधारित भारतीय पादप प्रोटीन: पूर्ण अमीनो एसिड प्रोफ़ाइल हेतु अनाज और दालों का संयोजन',
      authorId: 'usr_priya',
      authorName: 'Dr. Priya Sharma, MD',
      authorCredentials: 'MBBS, MD (Medicine), PG Dip Clinical Nutrition',
      reviewerName: 'Dr. Sunita Rao, PhD, Registered Dietitian',
      reviewDate: '18 October 2026',
      readTime: '5 min read',
      category: 'Nutrition',
      coverImage: 'assets/images/nutrition-bowl.jpg',
      summary: 'Why the traditional pairing of Dal-Chawal or Rajma-Chawal isn’t just comforting—it represents an ancient, biologically optimal amino acid complement.',
      content: `### Understanding Protein Quality (DIAAS & PDCAAS)
Proteins are built from 20 amino acids, 9 of which are essential and cannot be synthesized by the human body.

#### The Synergistic Pairing:
- **Cereals (Rice, Millets, Wheat):** High in methionine and cysteine, but limiting in lysine.
- **Pulses & Legumes (Moong, Chana, Rajma, Soy):** High in lysine, but limiting in sulfur amino acids (methionine).

When consumed together across the day, they form a **complete biological protein score**, equivalent to egg or dairy protein profiles, without unnecessary saturated fats.

> **Educational Notice:** Always adjust protein intake based on age, kidney function, and physical training intensity under guidance from a registered dietitian.`,
      approved: true,
      status: 'published'
    }
  ],

  // Personal Wellness Habit Tracker State
  wellnessTracker: {
    streakDays: 7,
    waterIntakeMl: 2250,
    waterGoalMl: 3000,
    sleepHours: 7.5,
    sleepQuality: 4, // 1 to 5
    habits: [
      { id: 'h_1', title: 'Morning 500ml Warm Hydration', titleHi: 'सुबह 500 मिली गुनगुना पानी', category: 'Hydration', completed: true },
      { id: 'h_2', title: '20 Min Sunlight Walk or Yoga', titleHi: '20 मिनट धूप में टहलना या योगाभ्यास', category: 'Movement', completed: true },
      { id: 'h_3', title: 'Mindful Eating (No Phone/TV during lunch)', titleHi: 'सजग भोजन (दोपहर में फोन/टीवी बंद)', category: 'Nutrition', completed: true },
      { id: 'h_4', title: '10 Min Box Breathing (Pranayama)', titleHi: '10 मिनट बॉक्स प्राणायाम', category: 'Mindfulness', completed: false },
      { id: 'h_5', title: 'Digital Sunset (No screens 45 min before sleep)', titleHi: 'डिजिटल सूर्यास्त (सोने से 45 मिनट पहले स्क्रीन बंद)', category: 'Sleep', completed: false }
    ]
  },

  // Moderation & Platform Safety Queue
  reports: [
    {
      id: 'rep_001',
      reportedPostId: 'post_fake_claim',
      contentSnippet: '"Drink this boiled herb water to permanently cure Type-2 Diabetes in 3 days! Guaranteed results without insulin!"',
      authorName: 'Unverified Herbal Vendor',
      reason: 'Dangerous Medical Misinformation & Fraudulent Disease Cure Claim',
      reportedBy: 'dr_priya_sharma',
      timestamp: '3 hours ago',
      status: 'pending'
    },
    {
      id: 'rep_002',
      reportedPostId: 'post_spam_02',
      contentSnippet: '"Click here to buy unauthorized weight loss supplements fast delivery!"',
      authorName: 'SpamAccount_88',
      reason: 'Spam & Prohibited Health Product Promotion',
      reportedBy: 'aarav_wellness',
      timestamp: '5 hours ago',
      status: 'pending'
    }
  ],

  // Audit Logs (Security, Administrative actions, DPDP compliance)
  auditLogs: [
    {
      id: 'aud_1',
      timestamp: '25-Oct-2026 13:40:12',
      actor: 'ananya_admin',
      role: 'admin',
      action: 'Verified Expert Badge granted to Dr. Priya Sharma MD after credential authentication',
      severity: 'info',
      ip: '192.168.1.42'
    },
    {
      id: 'aud_2',
      timestamp: '25-Oct-2026 12:15:30',
      actor: 'vikram_moderator',
      role: 'moderator',
      action: 'Content takedown: Removed unverified cancer cure post by user @herbal_magic',
      severity: 'warning',
      ip: '192.168.1.88'
    },
    {
      id: 'aud_3',
      timestamp: '25-Oct-2026 09:22:04',
      actor: 'system',
      role: 'system',
      action: 'Daily DPDP privacy audit: verified zero health habit leaks into public index',
      severity: 'info',
      ip: '127.0.0.1'
    }
  ],

  // Platform Settings
  settings: {
    maintenanceMode: false,
    maxImageUploadMb: 15,
    maxVideoUploadMb: 60,
    allowGuestBrowsing: true,
    requireReviewedDoctorBadge: true,
    dpdpDataRetentionDays: 365
  },

  init() {
    // Restore or initialize Current User
    const savedUser = StorageService.get(AuraConfig.storageKeys.currentUser);
    if (savedUser) {
      this.currentUser = savedUser;
    } else {
      this.currentUser = this.demoUsers[4]; // Default to Aarav Patel (Regular User)
      StorageService.set(AuraConfig.storageKeys.currentUser, this.currentUser);
    }

    // Restore posts from local storage if existing
    const savedPosts = StorageService.get(AuraConfig.storageKeys.posts);
    if (savedPosts && savedPosts.length) {
      this.posts = savedPosts;
    } else {
      StorageService.set(AuraConfig.storageKeys.posts, this.posts);
    }

    // Restore wellness tracker
    const savedTracker = StorageService.get(AuraConfig.storageKeys.wellnessLogs);
    if (savedTracker) {
      this.wellnessTracker = savedTracker;
    } else {
      StorageService.set(AuraConfig.storageKeys.wellnessLogs, this.wellnessTracker);
    }

    // Restore reports
    const savedReports = StorageService.get(AuraConfig.storageKeys.reports);
    if (savedReports) {
      this.reports = savedReports;
    } else {
      StorageService.set(AuraConfig.storageKeys.reports, this.reports);
    }

    // Restore audit logs
    const savedAudit = StorageService.get(AuraConfig.storageKeys.auditLogs);
    if (savedAudit) {
      this.auditLogs = savedAudit;
    } else {
      StorageService.set(AuraConfig.storageKeys.auditLogs, this.auditLogs);
    }
  },

  // Switch demo user for pairing/testing
  switchUser(userId) {
    const found = this.demoUsers.find(u => u.id === userId);
    if (found) {
      this.currentUser = found;
      StorageService.set(AuraConfig.storageKeys.currentUser, found);
      window.dispatchEvent(new CustomEvent('aura:userChanged', { detail: found }));
      this.addAuditLog(found.username, found.role, `Switched active session to user @${found.username}`);
      return found;
    }
    return null;
  },

  // Post Actions
  addPost(postData) {
    const newPost = {
      id: 'post_' + Date.now(),
      authorId: this.currentUser.id,
      authorName: this.currentUser.displayName,
      authorUsername: this.currentUser.username,
      authorAvatar: this.currentUser.avatar,
      authorVerified: this.currentUser.verified,
      category: postData.category || 'General Wellness',
      createdAt: 'Just now',
      timestamp: Date.now(),
      content: postData.content,
      mediaType: postData.mediaType || null,
      mediaUrl: postData.mediaUrl || null,
      altText: postData.altText || '',
      recipeData: postData.recipeData || null,
      likesCount: 0,
      likedBy: [],
      bookmarkedBy: [],
      commentsCount: 0,
      comments: [],
      sharesCount: 0,
      viewsCount: 1
    };

    this.posts.unshift(newPost);
    StorageService.set(AuraConfig.storageKeys.posts, this.posts);
    window.dispatchEvent(new CustomEvent('aura:postAdded', { detail: newPost }));
    return newPost;
  },

  toggleLikePost(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const uid = this.currentUser.id;
    const index = post.likedBy.indexOf(uid);
    let isLiked = false;

    if (index > -1) {
      post.likedBy.splice(index, 1);
      post.likesCount = Math.max(0, post.likesCount - 1);
      isLiked = false;
    } else {
      post.likedBy.push(uid);
      post.likesCount += 1;
      isLiked = true;
    }

    StorageService.set(AuraConfig.storageKeys.posts, this.posts);
    window.dispatchEvent(new CustomEvent('aura:postLiked', { detail: { postId, isLiked, likesCount: post.likesCount } }));
    return { isLiked, likesCount: post.likesCount };
  },

  toggleBookmark(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const uid = this.currentUser.id;
    const index = post.bookmarkedBy.indexOf(uid);
    let isSaved = false;

    if (index > -1) {
      post.bookmarkedBy.splice(index, 1);
      isSaved = false;
    } else {
      post.bookmarkedBy.push(uid);
      isSaved = true;
    }

    StorageService.set(AuraConfig.storageKeys.posts, this.posts);
    return isSaved;
  },

  addComment(postId, commentText) {
    const post = this.posts.find(p => p.id === postId);
    if (!post || !commentText.trim()) return null;

    const newComment = {
      id: 'c_' + Date.now(),
      userId: this.currentUser.id,
      userName: this.currentUser.displayName,
      userAvatar: this.currentUser.avatar,
      text: commentText.trim(),
      timestamp: 'Just now'
    };

    post.comments.push(newComment);
    post.commentsCount = post.comments.length;
    StorageService.set(AuraConfig.storageKeys.posts, this.posts);
    window.dispatchEvent(new CustomEvent('aura:commentAdded', { detail: { postId, comment: newComment } }));
    return newComment;
  },

  // Wellness Tracker Actions
  addWater(amountMl) {
    this.wellnessTracker.waterIntakeMl = Math.min(6000, this.wellnessTracker.waterIntakeMl + amountMl);
    StorageService.set(AuraConfig.storageKeys.wellnessLogs, this.wellnessTracker);
    window.dispatchEvent(new CustomEvent('aura:habitUpdated', { detail: this.wellnessTracker }));
    return this.wellnessTracker.waterIntakeMl;
  },

  resetWater() {
    this.wellnessTracker.waterIntakeMl = 0;
    StorageService.set(AuraConfig.storageKeys.wellnessLogs, this.wellnessTracker);
    window.dispatchEvent(new CustomEvent('aura:habitUpdated', { detail: this.wellnessTracker }));
  },

  toggleHabit(habitId) {
    const habit = this.wellnessTracker.habits.find(h => h.id === habitId);
    if (habit) {
      habit.completed = !habit.completed;
      StorageService.set(AuraConfig.storageKeys.wellnessLogs, this.wellnessTracker);
      window.dispatchEvent(new CustomEvent('aura:habitUpdated', { detail: this.wellnessTracker }));
      return habit.completed;
    }
    return false;
  },

  setSleepHours(hours) {
    this.wellnessTracker.sleepHours = parseFloat(hours);
    StorageService.set(AuraConfig.storageKeys.wellnessLogs, this.wellnessTracker);
    window.dispatchEvent(new CustomEvent('aura:habitUpdated', { detail: this.wellnessTracker }));
  },

  // Content Moderation & Reporting
  reportPost(postId, reason) {
    const post = this.posts.find(p => p.id === postId);
    const newReport = {
      id: 'rep_' + Date.now(),
      reportedPostId: postId,
      contentSnippet: post ? post.content.slice(0, 140) + '...' : 'Content not found',
      authorName: post ? post.authorName : 'Unknown',
      reason: reason || 'Community Guidelines Violation',
      reportedBy: this.currentUser.username,
      timestamp: 'Just now',
      status: 'pending'
    };

    this.reports.unshift(newReport);
    StorageService.set(AuraConfig.storageKeys.reports, this.reports);
    this.addAuditLog(this.currentUser.username, this.currentUser.role, `Filed content report for post ${postId} (${reason})`);
    return newReport;
  },

  resolveReport(reportId, actionTaken) {
    const index = this.reports.findIndex(r => r.id === reportId);
    if (index > -1) {
      const rep = this.reports[index];
      if (actionTaken === 'remove') {
        // Remove the post from feed
        this.posts = this.posts.filter(p => p.id !== rep.reportedPostId);
        StorageService.set(AuraConfig.storageKeys.posts, this.posts);
      }
      this.reports.splice(index, 1);
      StorageService.set(AuraConfig.storageKeys.reports, this.reports);
      this.addAuditLog(this.currentUser.username, this.currentUser.role, `Moderation action on report ${reportId}: ${actionTaken}`);
      window.dispatchEvent(new CustomEvent('aura:moderationAction', { detail: { reportId, actionTaken } }));
      return true;
    }
    return false;
  },

  // Audit Logs
  addAuditLog(actor, role, action, severity = 'info') {
    const log = {
      id: 'aud_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      actor,
      role,
      action,
      severity,
      ip: '127.0.0.1'
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 50) this.auditLogs.pop();
    StorageService.set(AuraConfig.storageKeys.auditLogs, this.auditLogs);
  }
};

window.AuraRoles = AuraRoles;
window.AuraState = AuraState;
