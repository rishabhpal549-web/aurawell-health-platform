/**
 * AuraWell Vertical Short-Form Video (Reels) Controller
 */

const ReelsService = {
  activeReelIndex: 0,
  isMuted: true,

  init() {
    this.renderReels();
    window.addEventListener('aura:languageChange', () => this.renderReels());
  },

  renderReels() {
    const container = document.getElementById('reelsContainer');
    if (!container) return;

    const currentUserId = AuraState.currentUser ? AuraState.currentUser.id : null;

    container.innerHTML = AuraState.reels.map((reel, idx) => {
      const isLiked = reel.likedBy.includes(currentUserId);

      return `
        <div class="reel-viewport" id="reelViewport_${reel.id}">
          <video 
            id="reelVideo_${reel.id}" 
            class="reel-video-element" 
            src="${reel.videoUrl}" 
            poster="${reel.posterUrl}" 
            loop 
            playsinline 
            ${this.isMuted ? 'muted' : ''}
            onclick="ReelsService.togglePlay('${reel.id}')"
            ontimeupdate="ReelsService.updateProgress('${reel.id}')"
          ></video>

          <!-- Center Play Indicator -->
          <div class="reel-center-play-icon" id="playIcon_${reel.id}">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>

          <!-- Verified Topic Tag -->
          <div class="reel-topic-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ${reel.category}
          </div>

          <!-- Sound Mute Toggle -->
          <button class="reel-sound-btn" onclick="ReelsService.toggleMute('${reel.id}')" title="Toggle Sound">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="soundIcon_${reel.id}">
              ${this.isMuted 
                ? '<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>'
                : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>'}
            </svg>
          </button>

          <!-- Right Action Rail -->
          <div class="reel-actions-rail">
            <button class="reel-action-btn ${isLiked ? 'liked' : ''}" onclick="ReelsService.toggleLikeReel('${reel.id}')">
              <div class="reel-icon-bubble">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <span>${reel.likesCount}</span>
            </button>

            <button class="reel-action-btn" onclick="ReelsService.openReelComments('${reel.id}')">
              <div class="reel-icon-bubble">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span>${reel.commentsCount}</span>
            </button>

            <button class="reel-action-btn" onclick="FeedService.sharePost('${reel.id}')">
              <div class="reel-icon-bubble">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </div>
              <span>Share</span>
            </button>

            <div class="reel-audio-disc">
              <img src="${reel.authorAvatar}" alt="Audio Cover">
            </div>
          </div>

          <!-- Bottom Meta Overlay -->
          <div class="reel-bottom-overlay">
            <div class="reel-creator-row">
              <img src="${reel.authorAvatar}" alt="${reel.authorName}" class="reel-creator-avatar">
              <span class="reel-creator-name">${reel.authorName}</span>
              <button class="reel-follow-pill" onclick="ReelsService.toggleFollow(this)">+ ${I18nService.t('reels.follow')}</button>
            </div>

            <p class="reel-caption-text">${reel.caption}</p>

            <div class="reel-audio-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              <span>${reel.audioTitle || I18nService.t('reels.audioTrack')}</span>
            </div>
          </div>

          <!-- Scrubber Progress Bar -->
          <div class="reel-progress-track">
            <div class="reel-progress-fill" id="reelProgress_${reel.id}"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  togglePlay(reelId) {
    const video = document.getElementById(`reelVideo_${reelId}`);
    const icon = document.getElementById(`playIcon_${reelId}`);
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      if (icon) {
        icon.classList.remove('visible');
      }
    } else {
      video.pause();
      if (icon) {
        icon.classList.add('visible');
      }
    }
  },

  toggleMute(reelId) {
    this.isMuted = !this.isMuted;
    document.querySelectorAll('.reel-video-element').forEach(v => {
      v.muted = this.isMuted;
    });
    this.renderReels();
  },

  updateProgress(reelId) {
    const video = document.getElementById(`reelVideo_${reelId}`);
    const fill = document.getElementById(`reelProgress_${reelId}`);
    if (video && fill && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      fill.style.width = pct + '%';
    }
  },

  toggleLikeReel(reelId) {
    const reel = AuraState.reels.find(r => r.id === reelId);
    if (!reel) return;

    const uid = AuraState.currentUser.id;
    const idx = reel.likedBy.indexOf(uid);
    if (idx > -1) {
      reel.likedBy.splice(idx, 1);
      reel.likesCount = Math.max(0, reel.likesCount - 1);
    } else {
      reel.likedBy.push(uid);
      reel.likesCount += 1;
    }
    this.renderReels();
  },

  toggleFollow(btn) {
    if (btn.classList.contains('following')) {
      btn.classList.remove('following');
      btn.textContent = '+ ' + I18nService.t('reels.follow');
      App.showToast('Unfollowed', 'info');
    } else {
      btn.classList.add('following');
      btn.textContent = I18nService.t('reels.following');
      App.showToast('Followed creator for wellness routines!', 'success');
    }
  },

  openReelComments(reelId) {
    App.showToast('Comments thread loaded for video', 'info');
  }
};

window.ReelsService = ReelsService;
