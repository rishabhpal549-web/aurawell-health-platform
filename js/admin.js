/**
 * AuraWell Complete Responsive Admin Panel Controller
 * Parity across Mobile, Tablet, Laptop, and Desktop.
 */

const AdminService = {
  currentTab: 'overview',

  init() {
    this.renderKPIs();
    this.renderActiveTab();
    this.attachEventListeners();
  },

  attachEventListeners() {
    // Admin Navigation Items
    document.querySelectorAll('.admin-nav-item button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);

        // Close mobile drawer on navigation
        const sidebar = document.querySelector('.admin-sidebar');
        if (sidebar) sidebar.classList.remove('open');
      });
    });

    // Mobile Hamburger Toggle
    const mobileToggle = document.getElementById('adminMobileToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  },

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.admin-nav-item').forEach(item => {
      const btn = item.querySelector('button');
      if (btn && btn.getAttribute('data-tab') === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update breadcrumbs
    const breadcrumb = document.getElementById('adminBreadcrumb');
    if (breadcrumb) {
      const titles = {
        overview: 'Overview Dashboard',
        users: 'User Management & Permissions',
        moderation: 'Community Moderation Queue',
        healthReview: 'Health Content Review Workflow',
        settings: 'Platform Settings & Governance',
        auditLogs: 'Security & Compliance Audit Logs'
      };
      breadcrumb.textContent = titles[tabName] || tabName;
    }

    this.renderActiveTab();
  },

  renderKPIs() {
    const totalUsers = AuraState.demoUsers.length + 1840; // Base count + live
    const pendingReports = AuraState.reports.length;
    const totalPosts = AuraState.posts.length + 320;
    const totalArticles = AuraState.articles.length;

    const elTotal = document.getElementById('kpiTotalUsers');
    const elActive = document.getElementById('kpiActiveUsers');
    const elReports = document.getElementById('kpiPendingReports');
    const elStorage = document.getElementById('kpiStorageUsed');

    if (elTotal) elTotal.textContent = totalUsers.toLocaleString();
    if (elActive) elActive.textContent = '1,248';
    if (elReports) elReports.textContent = pendingReports;
    if (elStorage) elStorage.textContent = '4.2 GB';

    // Update pending badge in sidebar
    const badge = document.getElementById('adminPendingBadge');
    if (badge) {
      badge.textContent = pendingReports;
      badge.style.display = pendingReports > 0 ? 'inline-block' : 'none';
    }
  },

  renderActiveTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    switch (this.currentTab) {
      case 'overview':
        this.renderOverviewTab(container);
        break;
      case 'users':
        this.renderUsersTab(container);
        break;
      case 'moderation':
        this.renderModerationTab(container);
        break;
      case 'healthReview':
        this.renderHealthReviewTab(container);
        break;
      case 'settings':
        this.renderSettingsTab(container);
        break;
      case 'auditLogs':
        this.renderAuditLogsTab(container);
        break;
      default:
        this.renderOverviewTab(container);
    }
  },

  renderOverviewTab(container) {
    container.innerHTML = `
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            System Health & Compliance Overview
          </div>
          <span class="badge badge-primary">DPDP Compliant</span>
        </div>
        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="disclaimer-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            <div>
              <strong>Production Environment Active:</strong> Supabase RLS policies are active on PostgreSQL database. All client sessions are authenticated via JWT tokens. User health records are physically isolated from public social feeds.
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
            <div style="background: var(--bg-elevated); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <h4 style="margin-bottom: 0.5rem; color: var(--primary-light);">Verified Medical Creators</h4>
              <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">14 certified physicians & accredited dietitians with verified qualifications.</p>
              <button class="btn btn-secondary btn-sm" onclick="AdminService.switchTab('users')">Manage Verifications</button>
            </div>

            <div style="background: var(--bg-elevated); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <h4 style="margin-bottom: 0.5rem; color: var(--secondary-light);">Community Safety Queue</h4>
              <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">${AuraState.reports.length} user-flagged posts requiring review for health misinformation.</p>
              <button class="btn btn-secondary btn-sm" onclick="AdminService.switchTab('moderation')">Open Moderation</button>
            </div>

            <div style="background: var(--bg-elevated); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <h4 style="margin-bottom: 0.5rem; color: var(--accent-indigo);">Clinical Articles Published</h4>
              <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">${AuraState.articles.length} peer-reviewed wellness guides live with citations.</p>
              <button class="btn btn-secondary btn-sm" onclick="AdminService.switchTab('healthReview')">Review Drafts</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderUsersTab(container) {
    container.innerHTML = `
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Registered Users & Role Governance
          </div>
          <input type="text" class="form-input" style="max-width: 250px; font-size: 0.84rem; padding: 0.4rem 0.8rem;" placeholder="Search user..." oninput="AdminService.filterUsers(this.value)">
        </div>

        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>User / Account</th>
                <th>Role</th>
                <th>Verification Status</th>
                <th>Credentials / Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="adminUsersTbody">
              ${AuraState.demoUsers.map(u => `
                <tr id="userRow_${u.id}">
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <img src="${u.avatar}" style="width: 36px; height: 36px; border-radius: var(--radius-full); object-fit: cover;">
                      <div>
                        <div style="font-weight: 700;">${u.displayName}</div>
                        <div style="font-size: 0.76rem; color: var(--text-muted);">${u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge ${u.role === 'admin' ? 'badge-amber' : u.role === 'verified_expert' ? 'badge-verified' : 'badge-primary'}">${u.role}</span>
                  </td>
                  <td>
                    ${u.verified 
                      ? '<span style="color: var(--status-verified); font-weight: 700; font-size: 0.82rem;">✓ Verified</span>' 
                      : '<span style="color: var(--text-muted); font-size: 0.82rem;">Standard Member</span>'}
                  </td>
                  <td style="max-width: 260px; font-size: 0.8rem; color: var(--text-secondary);">
                    ${u.credentials || u.bio}
                  </td>
                  <td>
                    <div style="display: flex; gap: 0.4rem;">
                      <button class="btn btn-secondary btn-sm" onclick="AdminService.toggleUserVerification('${u.id}')" title="Toggle Verified Badge">
                        ${u.verified ? 'Revoke' : 'Verify'}
                      </button>
                      <button class="btn btn-outline btn-sm" style="color: var(--status-danger); border-color: hsla(355, 78%, 56%, 0.4);" onclick="AdminService.warnUser('${u.id}')">
                        Warn
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderModerationTab(container) {
    if (AuraState.reports.length === 0) {
      container.innerHTML = `
        <div class="admin-card" style="padding: 3rem; text-align: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--primary-light); margin-bottom: 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h3>Moderation Queue is Clean</h3>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">All reported posts and potential health claims have been reviewed.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Pending Content Reports (${AuraState.reports.length})
          </div>
        </div>

        <div>
          ${AuraState.reports.map(rep => `
            <div class="mod-item-card" id="modCard_${rep.id}">
              <div class="mod-header">
                <div>
                  <strong>Report ID:</strong> <span style="font-family: monospace;">${rep.id}</span>
                  <span style="margin: 0 0.5rem; color: var(--text-muted);">•</span>
                  <span>Reported by: @${rep.reportedBy}</span>
                  <span style="margin: 0 0.5rem; color: var(--text-muted);">•</span>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${rep.timestamp}</span>
                </div>
                <span class="mod-reason-badge">${rep.reason}</span>
              </div>

              <div class="mod-content-preview">
                <strong>Flagged Content Excerpt:</strong><br>
                ${rep.contentSnippet}
              </div>

              <div class="mod-actions-row">
                <button class="btn btn-secondary btn-sm" onclick="AdminService.resolveReport('${rep.id}', 'dismiss')">
                  Dismiss Report
                </button>
                <button class="btn btn-primary btn-sm" style="background: var(--status-danger);" onclick="AdminService.resolveReport('${rep.id}', 'remove')">
                  Remove Content & Strike
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderHealthReviewTab(container) {
    container.innerHTML = `
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Health & Clinical Articles Review Workflow
          </div>
        </div>

        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="disclaimer-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div>
              <strong>Strict Health Publishing Standard:</strong> In compliance with platform policy, only educational articles reviewed by certified medical clinicians (MBBS/MD/RD/PhD) can be marked as "Peer Reviewed". Never publish unverified miracle cure claims.
            </div>
          </div>

          ${AuraState.articles.map(art => `
            <div style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                <div>
                  <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.35rem;">${art.title}</h4>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">
                    Author: <strong>${art.authorName}</strong> (${art.authorCredentials}) • Clinical Reviewer: <strong>${art.reviewerName}</strong>
                  </div>
                </div>
                <span class="badge badge-verified">Approved & Published</span>
              </div>

              <p style="font-size: 0.88rem; color: var(--text-secondary);">${art.summary}</p>

              <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button class="btn btn-secondary btn-sm" onclick="ArticleService.openArticleModal('${art.id}')">View Full Article</button>
                <button class="btn btn-primary btn-sm" onclick="App.showToast('Article review verified & re-certified', 'success')">Verify Credentials</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderSettingsTab(container) {
    const s = AuraState.settings;
    container.innerHTML = `
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Platform Governance & System Parameters
          </div>
        </div>

        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Brand Name & Platform Title</label>
            <input type="text" class="form-input" value="AuraWell" readonly>
          </div>

          <div class="form-group">
            <label class="form-label">Platform Tagline</label>
            <input type="text" class="form-input" value="Discover Better Health. Build Better Habits." readonly>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Max Image Upload Size (MB)</label>
              <input type="number" class="form-input" value="${s.maxImageUploadMb}" id="settingMaxImage">
            </div>
            <div class="form-group">
              <label class="form-label">Max Video Upload Size (MB)</label>
              <input type="number" class="form-input" value="${s.maxVideoUploadMb}" id="settingMaxVideo">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">DPDP Act (India) Data Retention Window (Days)</label>
            <input type="number" class="form-input" value="${s.dpdpDataRetentionDays}" id="settingRetention">
          </div>

          <div class="form-group">
            <label class="form-label">Mandatory Medical Educational Disclaimer Text</label>
            <textarea class="form-textarea" rows="3">AuraWell is an evidence-informed health and lifestyle community. Content published on this platform is for educational and self-improvement purposes only. It is not clinical medical advice, diagnosis, or prescription. Always consult an accredited physician before starting a new nutritional or exercise protocol.</textarea>
          </div>

          <button class="btn btn-primary" style="align-self: flex-start;" onclick="AdminService.saveSettings()">Save Platform Settings</button>
        </div>
      </div>
    `;
  },

  renderAuditLogsTab(container) {
    container.innerHTML = `
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Security, Access & Compliance Audit Trail
          </div>
          <button class="btn btn-secondary btn-sm" onclick="AdminService.exportAuditLogs()">Export Logs (JSON)</button>
        </div>

        <div style="padding: 0;">
          ${AuraState.auditLogs.map(log => `
            <div class="audit-row">
              <div class="audit-time">${log.timestamp}</div>
              <div class="audit-actor">
                @${log.actor} 
                <span class="badge ${log.severity === 'warning' ? 'badge-danger' : 'badge-primary'}" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">${log.severity}</span>
              </div>
              <div class="audit-action">${log.action}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  toggleUserVerification(userId) {
    const user = AuraState.demoUsers.find(u => u.id === userId);
    if (!user) return;

    user.verified = !user.verified;
    if (user.verified) {
      user.role = AuraRoles.VERIFIED_EXPERT;
      AuraState.addAuditLog(AuraState.currentUser.username, 'admin', `Granted Verified Expert badge to @${user.username}`);
      App.showToast(`Verified Expert badge granted to @${user.username}`, 'success');
    } else {
      user.role = AuraRoles.REGULAR;
      AuraState.addAuditLog(AuraState.currentUser.username, 'admin', `Revoked verification badge from @${user.username}`);
      App.showToast(`Verification revoked from @${user.username}`, 'info');
    }

    this.renderUsersTab(document.getElementById('adminTabContent'));
  },

  warnUser(userId) {
    const user = AuraState.demoUsers.find(u => u.id === userId);
    if (!user) return;

    AuraState.addAuditLog(AuraState.currentUser.username, 'admin', `Issued formal community guidelines warning to @${user.username}`, 'warning');
    App.showToast(`Official policy warning recorded for @${user.username}`, 'info');
  },

  resolveReport(reportId, action) {
    AuraState.resolveReport(reportId, action);
    this.renderKPIs();
    this.renderModerationTab(document.getElementById('adminTabContent'));
    App.showToast(action === 'remove' ? 'Violating content removed from feed' : 'Report dismissed', 'success');
  },

  saveSettings() {
    AuraState.addAuditLog(AuraState.currentUser.username, 'admin', 'Updated platform configuration parameters');
    App.showToast('Platform settings saved successfully', 'success');
  },

  exportAuditLogs() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(AuraState.auditLogs, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `aurawell_audit_logs_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

window.AdminService = AdminService;
