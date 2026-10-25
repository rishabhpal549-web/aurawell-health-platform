/**
 * AuraWell Home Feed, Post Cards & Content Creation Logic
 */

const FeedService = {
  currentCategory: 'all',
  searchQuery: '',

  init() {
    this.renderStories();
    this.renderFeed();
    this.attachEventListeners();

    window.addEventListener('aura:postAdded', () => this.renderFeed());
    window.addEventListener('aura:postLiked', (e) => this.updatePostLikesUI(e.detail));
    window.addEventListener('aura:commentAdded', () => this.renderFeed());
    window.addEventListener('aura:languageChange', () => {
      this.renderStories();
      this.renderFeed();
    });
  },

  attachEventListeners() {
    // Feed Category Tabs
    document.querySelectorAll('.feed-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.getAttribute('data-category') || 'all';
        this.renderFeed();
      });
    });
  },

  renderStories() {
    const container = document.getElementById('storiesContainer');
    if (!container) return;

    const stories = [
      { id: 'st_1', name: 'Dr. Priya', avatar: 'assets/images/doctor-priya.jpg', topic: 'Gut Health' },
      { id: 'st_2', name: 'Coach Rahul', avatar: 'assets/images/coach-rahul.jpg', topic: 'Morning Spine' },
      { id: 'st_3', name: 'Aarav P.', avatar: 'assets/images/aurawell-logo.jpg', topic: '10k Steps' },
      { id: 'st_4', name: 'Ayurveda', avatar: 'assets/images/ayurveda-herbs.jpg', topic: 'Amla Science' },
      { id: 'st_5', name: 'Nutrition', avatar: 'assets/images/nutrition-bowl.jpg', topic: 'High Protein' }
    ];

    container.innerHTML = stories.map(s => `
      <div class="story-item" onclick="FeedService.openStory('${s.id}')">
        <div class="story-ring">
          <img src="${s.avatar}" alt="${s.name}" class="story-avatar">
        </div>
        <span class="story-label">${s.name}</span>
      </div>
    `).join('');
  },

  openStory(storyId) {
    App.showToast(I18nService.t('common.success') + ` (${storyId})`, 'info');
  },

  renderFeed() {
    const feedContainer = document.getElementById('feedPostsContainer');
    if (!feedContainer) return;

    let filtered = AuraState.posts;

    // Filter by Category
    if (this.currentCategory !== 'all') {
      if (this.currentCategory === 'medical') {
        filtered = filtered.filter(p => p.authorVerified);
      } else if (this.currentCategory === 'recipes') {
        filtered = filtered.filter(p => p.category.toLowerCase().includes('nutrition') || p.recipeData);
      } else if (this.currentCategory === 'fitness') {
        filtered = filtered.filter(p => p.category.toLowerCase().includes('yoga') || p.category.toLowerCase().includes('fitness'));
      } else if (this.currentCategory === 'sleep') {
        filtered = filtered.filter(p => p.category.toLowerCase().includes('sleep') || p.category.toLowerCase().includes('mind'));
      }
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.content.toLowerCase().includes(q) || 
        p.authorName.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      feedContainer.innerHTML = `
        <div class="glass-panel" style="padding: 3rem 1.5rem; text-align: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--primary-light); margin-bottom: 1rem;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <h3 style="margin-bottom: 0.5rem;">No wellness posts found</h3>
          <p style="font-size: 0.9rem;">Try selecting a different category or be the first to share a healthy habit!</p>
        </div>
      `;
      return;
    }

    const currentUserId = AuraState.currentUser ? AuraState.currentUser.id : null;

    feedContainer.innerHTML = filtered.map(post => {
      const isLiked = post.likedBy.includes(currentUserId);
      const isBookmarked = post.bookmarkedBy.includes(currentUserId);

      // Recipe Macro Nutrient HTML
      let macrosHtml = '';
      if (post.recipeData) {
        macrosHtml = `
          <div class="recipe-macros-box">
            <div class="macro-pill">
              <span class="macro-value">${post.recipeData.calories}</span>
              <span class="macro-label">${I18nService.t('feed.calories')}</span>
            </div>
            <div class="macro-pill">
              <span class="macro-value">${post.recipeData.protein}</span>
              <span class="macro-label">${I18nService.t('feed.protein')}</span>
            </div>
            <div class="macro-pill">
              <span class="macro-value">${post.recipeData.carbs}</span>
              <span class="macro-label">${I18nService.t('feed.carbs')}</span>
            </div>
            <div class="macro-pill">
              <span class="macro-value">${post.recipeData.fat}</span>
              <span class="macro-label">${I18nService.t('feed.fat')}</span>
            </div>
            <div class="macro-pill">
              <span class="macro-value">${post.recipeData.fiber}</span>
              <span class="macro-label">${I18nService.t('feed.fiber')}</span>
            </div>
          </div>
        `;
      }

      // Media HTML with Instagram-style Double-Tap Like
      let mediaHtml = '';
      if (post.mediaUrl) {
        if (post.mediaType === 'video') {
          mediaHtml = `
            <div class="post-media-container" ondblclick="FeedService.handleDoubleTapLike('${post.id}', this)">
              <video src="${post.mediaUrl}" controls class="post-media-video" preload="metadata"></video>
              <div class="double-tap-heart">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>
          `;
        } else {
          mediaHtml = `
            <div class="post-media-container" ondblclick="FeedService.handleDoubleTapLike('${post.id}', this)">
              <img src="${post.mediaUrl}" alt="${post.altText || post.category}" class="post-media-img" loading="lazy">
              <div class="double-tap-heart">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>
          `;
        }
      }

      // Format hashtags
      const formattedContent = post.content.replace(/(#[a-zA-Z0-9_\u0900-\u097F]+)/g, '<span class="post-hashtag" onclick="FeedService.searchTag(\'$1\')">$1</span>');

      // Comments List
      const commentsHtml = post.comments.slice(0, 3).map(c => `
        <div class="comment-item">
          <img src="${c.userAvatar}" class="comment-avatar" alt="${c.userName}">
          <div class="comment-content">
            <span class="comment-author-name">${c.userName}</span>
            <span>${c.text}</span>
          </div>
        </div>
      `).join('');

      return `
        <article class="post-card" id="postCard_${post.id}">
          <header class="post-header">
            <div class="post-author-wrapper" onclick="App.showUserProfile('${post.authorId}')">
              <img src="${post.authorAvatar}" alt="${post.authorName}" class="post-author-avatar">
              <div class="post-author-meta">
                <div class="post-author-name-row">
                  <span class="post-author-name">${post.authorName}</span>
                  ${post.authorVerified ? `
                    <span class="badge badge-verified" title="Verified Medical/Health Expert">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      Verified
                    </span>
                  ` : ''}
                </div>
                <span class="post-author-handle">@${post.authorUsername} • ${post.createdAt}</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="post-category-tag">${post.category}</span>
              <button class="post-actions-menu-btn" title="Options" onclick="FeedService.openPostOptions('${post.id}')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
          </header>

          <div class="post-text">${formattedContent}</div>

          ${macrosHtml}
          ${mediaHtml}

          <div class="post-toolbar">
            <div class="toolbar-left-group">
              <button class="action-btn ${isLiked ? 'liked' : ''}" id="likeBtn_${post.id}" onclick="FeedService.toggleLike('${post.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span id="likesCount_${post.id}">${post.likesCount}</span>
              </button>

              <button class="action-btn" onclick="FeedService.focusCommentInput('${post.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>${post.commentsCount}</span>
              </button>

              <button class="action-btn" onclick="FeedService.sharePost('${post.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>${post.sharesCount || 0}</span>
              </button>
            </div>

            <button class="action-btn ${isBookmarked ? 'bookmarked' : ''}" id="bookmarkBtn_${post.id}" onclick="FeedService.toggleBookmark('${post.id}')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>

          <div class="post-comments-container">
            ${commentsHtml}
            <div class="comment-input-row">
              <input type="text" class="comment-input" id="commentInput_${post.id}" placeholder="${I18nService.t('feed.writeComment')}" onkeydown="if(event.key==='Enter') FeedService.submitComment('${post.id}')">
              <button class="btn btn-primary btn-sm" onclick="FeedService.submitComment('${post.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  toggleLike(postId) {
    const res = AuraState.toggleLikePost(postId);
    if (!res) return;

    const btn = document.getElementById(`likeBtn_${postId}`);
    const countEl = document.getElementById(`likesCount_${postId}`);
    if (btn && countEl) {
      if (res.isLiked) {
        btn.classList.add('liked');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        btn.classList.add('animate-heart');
        setTimeout(() => btn.classList.remove('animate-heart'), 500);
      } else {
        btn.classList.remove('liked');
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
      countEl.textContent = res.likesCount;
    }
  },

  handleDoubleTapLike(postId, container) {
    const post = AuraState.posts.find(p => p.id === postId);
    if (!post) return;

    // Show heart pop animation
    const heart = container.querySelector('.double-tap-heart');
    if (heart) {
      heart.classList.add('pop');
      setTimeout(() => heart.classList.remove('pop'), 600);
    }

    // Like if not already liked
    const uid = AuraState.currentUser ? AuraState.currentUser.id : null;
    if (uid && !post.likedBy.includes(uid)) {
      this.toggleLike(postId);
    }
  },

  toggleBookmark(postId) {
    const isSaved = AuraState.toggleBookmark(postId);
    const btn = document.getElementById(`bookmarkBtn_${postId}`);
    if (btn) {
      if (isSaved) {
        btn.classList.add('bookmarked');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        App.showToast('Post saved to your wellness bookmarks!', 'success');
      } else {
        btn.classList.remove('bookmarked');
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
    }
  },

  focusCommentInput(postId) {
    const input = document.getElementById(`commentInput_${postId}`);
    if (input) input.focus();
  },

  submitComment(postId) {
    const input = document.getElementById(`commentInput_${postId}`);
    if (!input || !input.value.trim()) return;

    AuraState.addComment(postId, input.value.trim());
    input.value = '';
    this.renderFeed();
    App.showToast('Comment posted!', 'success');
  },

  sharePost(postId) {
    const shareUrl = `${window.location.origin}/#post_${postId}`;
    if (navigator.share) {
      navigator.share({
        title: 'AuraWell Health & Wellness',
        text: 'Check out this evidence-based wellness post on AuraWell:',
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        App.showToast(I18nService.t('common.linkCopied'), 'success');
      });
    }
  },

  openPostOptions(postId) {
    // Open Report Modal
    App.openReportModal(postId);
  },

  searchTag(tag) {
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.value = tag;
      this.searchQuery = tag;
      this.renderFeed();
    }
  }
};

window.FeedService = FeedService;
