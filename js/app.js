/**
 * AuraWell Master Application Controller
 * Handles navigation, modals, theme toggling, toasts, and PWA setup.
 */

const App = {
  currentTab: 'feed', // 'feed' | 'reels' | 'articles' | 'tracker' | 'profile'
  uploadedFile: null,

  init() {
    // 1. Initialize configuration & state
    AuraState.init();
    I18nService.init();
    AuthService.init();

    // 2. Initialize feature services
    FeedService.init();
    ReelsService.init();
    TrackerService.init();
    ArticleService.init();

    // 3. Setup UI interactions
    this.initTheme();
    this.attachEventListeners();
    this.registerServiceWorker();
    this.renderRightSidebar();

    console.log(`[AuraWell] Platform initialized v${AuraConfig.version}`);
  },

  attachEventListeners() {
    // Top Navigation Search
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        FeedService.searchQuery = e.target.value;
        FeedService.renderFeed();
      });
    }

    // Role Switcher Chip Click
    const roleChip = document.getElementById('roleBadgeChip');
    if (roleChip) {
      roleChip.addEventListener('click', () => this.openRoleSwitcherModal());
    }

    // Language Selector Button
    const langBtn = document.getElementById('langSelectorBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    // Theme Toggle Button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Desktop Sidebar Navigation
    document.querySelectorAll('.sidebar-nav-item button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Mobile Bottom Navigation
    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        if (tab) this.switchTab(tab);
      });
    });

    // Modal close listeners on backdrop
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    // Drag and Drop Upload in Create Modal
    const dropzone = document.getElementById('createUploadDropzone');
    const fileInput = document.getElementById('createFileInput');
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          this.handleFileSelected(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleFileSelected(e.target.files[0]);
        }
      });
    }
  },

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update Sidebar active classes
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      const btn = item.querySelector('button');
      if (btn && btn.getAttribute('data-tab') === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Bottom Nav active classes
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      if (item.getAttribute('data-tab') === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Toggle Section Views
    const feedSec = document.getElementById('feedViewSection');
    const reelsSec = document.getElementById('reelsViewSection');
    const articlesSec = document.getElementById('articlesViewSection');
    const trackerSec = document.getElementById('trackerViewSection');
    const profileSec = document.getElementById('profileViewSection');

    if (feedSec) feedSec.style.display = tabName === 'feed' ? 'flex' : 'none';
    if (reelsSec) reelsSec.style.display = tabName === 'reels' ? 'flex' : 'none';
    if (articlesSec) articlesSec.style.display = tabName === 'articles' ? 'flex' : 'none';
    if (trackerSec) trackerSec.style.display = tabName === 'tracker' ? 'flex' : 'none';
    if (profileSec) profileSec.style.display = tabName === 'profile' ? 'flex' : 'none';

    if (tabName === 'profile') {
      this.renderProfileView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderRightSidebar() {
    const verifiedContainer = document.getElementById('rightRailCreators');
    if (!verifiedContainer) return;

    const experts = AuraState.demoUsers.filter(u => u.verified);
    verifiedContainer.innerHTML = experts.map(exp => `
      <div class="creator-row">
        <div class="creator-info" onclick="App.showUserProfile('${exp.id}')" style="cursor: pointer;">
          <img src="${exp.avatar}" alt="${exp.displayName}" class="creator-avatar">
          <div class="creator-details">
            <span class="creator-name">
              ${exp.displayName}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--status-verified)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </span>
            <span class="creator-specialty">${exp.credentials ? exp.credentials.split(',')[0] : 'Wellness Guide'}</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.showToast('Followed ${exp.displayName}', 'success')">Follow</button>
      </div>
    `).join('');
  },

  renderProfileView() {
    const user = AuraState.currentUser;
    const profileContainer = document.getElementById('profileViewSection');
    if (!profileContainer || !user) return;

    const userPosts = AuraState.posts.filter(p => p.authorId === user.id);

    profileContainer.innerHTML = `
      <div class="post-card" style="padding: 2rem;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <img src="${user.avatar}" alt="${user.displayName}" style="width: 84px; height: 84px; border-radius: var(--radius-full); object-fit: cover; border: 3px solid var(--primary-light);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h2 style="font-size: 1.5rem;">${user.displayName}</h2>
                ${user.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
              </div>
              <div style="color: var(--text-muted); font-size: 0.9rem;">@${user.username} • <span class="badge badge-primary">${user.role}</span></div>
              <p style="margin-top: 0.5rem; font-size: 0.92rem; max-width: 480px;">${user.bio}</p>
            </div>
          </div>

          <div style="display: flex; gap: 0.65rem;">
            <button class="btn btn-secondary btn-sm" onclick="App.openEditProfileModal()">Edit Profile</button>
            <button class="btn btn-outline btn-sm" onclick="AuthService.exportUserData()" title="Export Personal Data under DPDP Act">Export Data</button>
          </div>
        </div>

        <div style="display: flex; gap: 2rem; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
          <div><strong>${userPosts.length}</strong> <span style="color: var(--text-muted);">Posts</span></div>
          <div><strong>${user.followersCount.toLocaleString()}</strong> <span style="color: var(--text-muted);">Followers</span></div>
          <div><strong>${user.followingCount}</strong> <span style="color: var(--text-muted);">Following</span></div>
        </div>
      </div>

      <div style="margin-top: 1.5rem;">
        <h3 style="margin-bottom: 1rem;">My Published Wellness Posts</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${userPosts.length > 0 
            ? userPosts.map(p => `
                <div class="post-card">
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${p.createdAt} • ${p.category}</div>
                  <div style="margin: 0.5rem 0;">${p.content}</div>
                  ${p.mediaUrl ? `<img src="${p.mediaUrl}" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: var(--radius-sm);">` : ''}
                </div>
              `).join('')
            : '<p style="color: var(--text-muted);">You have not published any posts yet. Click "+ Create" to share your first wellness moment!</p>'
          }
        </div>
      </div>
    `;
  },

  // Modal Handlers
  openCreateModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) modal.classList.add('active');
  },

  closeCreateModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) modal.classList.remove('active');
    this.uploadedFile = null;
    const preview = document.getElementById('uploadPreviewArea');
    if (preview) preview.innerHTML = '';
  },

  handleFileSelected(file) {
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      this.showToast('Please upload a valid image (JPEG/PNG/WebP) or video (MP4/WebM)', 'error');
      return;
    }

    if (file.size > (isVideo ? AuraConfig.media.maxVideoBytes : AuraConfig.media.maxImageBytes)) {
      this.showToast('File size exceeds allowed upload limit', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedFile = {
        dataUrl: e.target.result,
        type: isVideo ? 'video' : 'image',
        name: file.name
      };

      const preview = document.getElementById('uploadPreviewArea');
      if (preview) {
        if (isVideo) {
          preview.innerHTML = `<video src="${e.target.result}" style="width: 120px; height: 120px; border-radius: var(--radius-sm); object-fit: cover;" controls></video>`;
        } else {
          preview.innerHTML = `<img src="${e.target.result}" style="width: 120px; height: 120px; border-radius: var(--radius-sm); object-fit: cover; border: 2px solid var(--primary-light);">`;
        }
      }
    };
    reader.readAsDataURL(file);
  },

  submitNewPost() {
    const contentInput = document.getElementById('createPostText');
    const categorySelect = document.getElementById('createPostCategory');
    const altTextInput = document.getElementById('createPostAltText');

    if (!contentInput || !contentInput.value.trim()) {
      this.showToast('Please write some content for your post', 'error');
      return;
    }

    const newPostData = {
      content: contentInput.value.trim(),
      category: categorySelect ? categorySelect.value : 'Nutrition',
      altText: altTextInput ? altTextInput.value.trim() : '',
      mediaType: this.uploadedFile ? this.uploadedFile.type : null,
      mediaUrl: this.uploadedFile ? this.uploadedFile.dataUrl : null
    };

    AuraState.addPost(newPostData);
    this.closeCreateModal();
    contentInput.value = '';
    this.showToast('Wellness post published to community feed! 🌿', 'success');
  },

  openRoleSwitcherModal() {
    const modal = document.getElementById('roleSwitcherModal');
    const list = document.getElementById('roleSwitcherList');
    if (!modal || !list) return;

    list.innerHTML = AuraState.demoUsers.map(u => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: var(--bg-elevated); border-radius: var(--radius-sm); cursor: pointer; border: 1px solid ${AuraState.currentUser.id === u.id ? 'var(--primary-light)' : 'var(--border-subtle)'};" onclick="App.selectRoleUser('${u.id}')">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${u.avatar}" style="width: 40px; height: 40px; border-radius: var(--radius-full); object-fit: cover;">
          <div>
            <div style="font-weight: 700;">${u.displayName}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${u.role.toUpperCase()} • @${u.username}</div>
          </div>
        </div>
        ${AuraState.currentUser.id === u.id ? '<span style="color: var(--primary-light); font-weight: 800;">✓ Active</span>' : '<button class="btn btn-secondary btn-sm">Switch</button>'}
      </div>
    `).join('');

    modal.classList.add('active');
  },

  selectRoleUser(userId) {
    AuraState.switchUser(userId);
    this.closeModal('roleSwitcherModal');
    this.showToast(`Switched active account to ${AuraState.currentUser.displayName}`, 'success');
  },

  openReportModal(postId) {
    const modal = document.getElementById('reportPostModal');
    const hiddenInput = document.getElementById('reportTargetPostId');
    if (modal && hiddenInput) {
      hiddenInput.value = postId;
      modal.classList.add('active');
    }
  },

  submitPostReport() {
    const hiddenInput = document.getElementById('reportTargetPostId');
    const reasonSelect = document.getElementById('reportReasonSelect');
    if (!hiddenInput) return;

    const postId = hiddenInput.value;
    const reason = reasonSelect ? reasonSelect.value : 'Misleading Health Claim';

    AuraState.reportPost(postId, reason);
    this.closeModal('reportPostModal');
    this.showToast('Thank you for keeping AuraWell safe. Report submitted for clinical review.', 'success');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  toggleLanguage() {
    const nextLang = I18nService.currentLang === 'hi' ? 'en' : 'hi';
    I18nService.setLanguage(nextLang);
    const langBtnText = document.getElementById('langBtnText');
    if (langBtnText) {
      langBtnText.textContent = nextLang === 'hi' ? 'हिन्दी' : 'English';
    }
    this.showToast(`Language switched to ${nextLang === 'hi' ? 'हिन्दी' : 'English'}`, 'info');
  },

  initTheme() {
    const savedTheme = StorageService.get(AuraConfig.storageKeys.theme, 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    StorageService.set(AuraConfig.storageKeys.theme, next);
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        ${type === 'success' ? '<polyline points="20 6 9 17 4 12"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  showUserProfile(userId) {
    const user = AuraState.demoUsers.find(u => u.id === userId);
    if (!user) return;
    this.showToast(`Viewing @${user.username} (${user.displayName})`, 'info');
  },

  openDirectMessages() {
    const modal = document.getElementById('directMessagesModal');
    if (modal) modal.classList.add('active');
  },

  sendDirectMessage() {
    const input = document.getElementById('dmMessageInput');
    const container = document.getElementById('dmChatMessages');
    if (!input || !input.value.trim() || !container) return;

    const userText = input.value.trim();
    input.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'display: flex; gap: 0.75rem; align-items: flex-start; justify-content: flex-end;';
    userMsg.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: #fff; padding: 0.75rem 1rem; border-radius: 14px; max-width: 78%; font-size: 0.88rem; line-height: 1.45;">
        ${userText}
      </div>
    `;
    container.appendChild(userMsg);
    container.scrollTop = container.scrollHeight;

    // Simulate friendly reply after 1.2s
    setTimeout(() => {
      const replyMsg = document.createElement('div');
      replyMsg.style.cssText = 'display: flex; gap: 0.75rem; align-items: flex-start;';
      replyMsg.innerHTML = `
        <img src="assets/images/doctor-priya.jpg" style="width: 34px; height: 34px; border-radius: var(--radius-full); object-fit: cover;">
        <div style="background: var(--bg-elevated); padding: 0.75rem 1rem; border-radius: 14px; max-width: 78%; font-size: 0.88rem; line-height: 1.45;">
          <strong style="color: var(--primary-light);">Dr. Priya Sharma, MD</strong><br>
          Glad to hear that! Keep tracking your hydration and remember to get adequate restorative sleep tonight. 🌿
        </div>
      `;
      container.appendChild(replyMsg);
      container.scrollTop = container.scrollHeight;
    }, 1200);
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .then(reg => console.log('[PWA] ServiceWorker registered with scope:', reg.scope))
          .catch(err => console.log('[PWA] ServiceWorker registration skipped:', err));
      });
    }
  }

};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
