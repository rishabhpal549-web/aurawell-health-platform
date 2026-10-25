/**
 * AuraWell Health Knowledge Center & Evidence-Based Articles
 */

const ArticleService = {
  init() {
    this.renderArticles();
    window.addEventListener('aura:languageChange', () => this.renderArticles());
  },

  renderArticles() {
    const container = document.getElementById('articlesListContainer');
    if (!container) return;

    const isHi = I18nService.currentLang === 'hi';

    container.innerHTML = AuraState.articles.map(art => {
      const title = isHi && art.titleHi ? art.titleHi : art.title;

      return `
        <div class="post-card" style="cursor: pointer;" onclick="ArticleService.openArticleModal('${art.id}')">
          <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; max-height: 240px; margin-bottom: 0.5rem;">
            <img src="${art.coverImage}" alt="${title}" style="width: 100%; height: 220px; object-fit: cover;">
            <div style="position: absolute; top: 1rem; left: 1rem; display: flex; gap: 0.5rem;">
              <span class="badge badge-primary">${art.category}</span>
              <span class="badge badge-verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Peer Reviewed
              </span>
            </div>
          </div>

          <h3 style="font-size: 1.25rem; line-height: 1.35; margin-bottom: 0.5rem;">${title}</h3>
          <p style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.75rem;">${art.summary}</p>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); padding-top: 0.5rem; border-top: 1px solid var(--border-subtle);">
            <div>
              <span style="font-weight: 700; color: var(--text-primary);">${art.authorName}</span>
              <span> • Reviewed by ${art.reviewerName}</span>
            </div>
            <span>${art.readTime}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  openArticleModal(articleId) {
    const art = AuraState.articles.find(a => a.id === articleId);
    if (!art) return;

    const modal = document.getElementById('articleDetailModal');
    const titleEl = document.getElementById('articleModalTitle');
    const bodyEl = document.getElementById('articleModalBody');

    const isHi = I18nService.currentLang === 'hi';
    const title = isHi && art.titleHi ? art.titleHi : art.title;

    if (titleEl) titleEl.textContent = title;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="disclaimer-banner" style="margin-bottom: 1.25rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>
            <strong>Educational Health Information:</strong> This article is authored and reviewed by qualified clinicians for general wellness education only. It does not establish a doctor-patient relationship nor constitute medical diagnosis or prescription. Always consult your personal physician.
          </div>
        </div>

        <img src="${art.coverImage}" alt="${title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.25rem;">

        <div style="background: var(--bg-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-size: 0.84rem; display: flex; flex-direction: column; gap: 0.35rem;">
          <div><strong>Author:</strong> ${art.authorName} (${art.authorCredentials})</div>
          <div><strong>Clinical Reviewer:</strong> ${art.reviewerName}</div>
          <div><strong>Review Date:</strong> ${art.reviewDate}</div>
        </div>

        <div style="font-size: 0.96rem; line-height: 1.7; color: var(--text-primary); display: flex; flex-direction: column; gap: 1rem;">
          ${art.content.replace(/\n\n/g, '<br><br>')}
        </div>
      `;
    }

    if (modal) modal.classList.add('active');
  },

  closeArticleModal() {
    const modal = document.getElementById('articleDetailModal');
    if (modal) modal.classList.remove('active');
  }
};

window.ArticleService = ArticleService;
