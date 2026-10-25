/**
 * AuraWell Authentication, User Session & Account Privacy Manager
 * Implements DPDP Act compliant account controls, export data, and secure role checks.
 */

const AuthService = {
  init() {
    this.updateUserUI();
    window.addEventListener('aura:userChanged', () => {
      this.updateUserUI();
    });
  },

  getCurrentUser() {
    return AuraState.currentUser;
  },

  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user) return false;
    if (user.role === AuraRoles.SUPER_ADMIN) return true;
    if (user.role === AuraRoles.ADMIN && requiredRole !== AuraRoles.SUPER_ADMIN) return true;
    if (user.role === AuraRoles.MODERATOR && (requiredRole === AuraRoles.MODERATOR || requiredRole === AuraRoles.REGULAR)) return true;
    return user.role === requiredRole;
  },

  login(email, password) {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Check demo accounts or existing
    const existing = AuraState.demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      AuraState.currentUser = existing;
      StorageService.set(AuraConfig.storageKeys.currentUser, existing);
      AuraState.addAuditLog(existing.username, existing.role, 'User signed in successfully');
      window.dispatchEvent(new CustomEvent('aura:userChanged', { detail: existing }));
      return { success: true, user: existing };
    }

    // Register on the fly for realistic demo testing
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const newUser = {
      id: 'usr_' + Date.now(),
      username,
      displayName: username.replace('_', ' ').toUpperCase(),
      email,
      role: AuraRoles.REGULAR,
      avatar: 'assets/images/aurawell-logo.jpg',
      bio: 'New AuraWell member exploring mindful habits and health.',
      verified: false,
      followersCount: 0,
      followingCount: 0,
      interests: ['Nutrition', 'Habit Building'],
      twoFactorEnabled: false
    };

    AuraState.demoUsers.push(newUser);
    AuraState.currentUser = newUser;
    StorageService.set(AuraConfig.storageKeys.currentUser, newUser);
    AuraState.addAuditLog(newUser.username, newUser.role, 'New account registered and signed in');
    window.dispatchEvent(new CustomEvent('aura:userChanged', { detail: newUser }));
    return { success: true, user: newUser };
  },

  logout() {
    AuraState.addAuditLog(AuraState.currentUser.username, AuraState.currentUser.role, 'User signed out');
    // Set to guest or default regular user
    AuraState.currentUser = AuraState.demoUsers[4];
    StorageService.set(AuraConfig.storageKeys.currentUser, AuraState.currentUser);
    window.dispatchEvent(new CustomEvent('aura:userChanged', { detail: AuraState.currentUser }));
  },

  updateProfile(updateData) {
    const user = AuraState.currentUser;
    if (!user) return false;

    if (updateData.displayName) user.displayName = updateData.displayName.trim();
    if (updateData.bio !== undefined) user.bio = updateData.bio.trim();
    if (updateData.interests) user.interests = updateData.interests;
    if (updateData.avatar) user.avatar = updateData.avatar;

    StorageService.set(AuraConfig.storageKeys.currentUser, user);
    AuraState.addAuditLog(user.username, user.role, 'Updated profile details');
    window.dispatchEvent(new CustomEvent('aura:userChanged', { detail: user }));
    return true;
  },

  // Export User Personal Data (DPDP Act India / GDPR Right to Data Portability)
  exportUserData() {
    const user = AuraState.currentUser;
    const userPosts = AuraState.posts.filter(p => p.authorId === user.id);
    const exportBundle = {
      platform: 'AuraWell Health & Wellness Social Platform',
      exportDate: new Date().toISOString(),
      accountProfile: user,
      activity: {
        publishedPosts: userPosts,
        wellnessHabits: AuraState.wellnessTracker
      },
      privacyNotice: 'This exported data contains your personal wellness and social records generated in accordance with Digital Personal Data Protection Act compliance.'
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aurawell_data_export_${user.username}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    AuraState.addAuditLog(user.username, user.role, 'User downloaded full personal data export');
  },

  // Permanent Account Deletion
  deleteAccount() {
    const user = AuraState.currentUser;
    AuraState.addAuditLog(user.username, user.role, 'Account permanently deleted per user request', 'warning');
    // Remove posts created by this user
    AuraState.posts = AuraState.posts.filter(p => p.authorId !== user.id);
    StorageService.set(AuraConfig.storageKeys.posts, AuraState.posts);

    // Reset to demo regular user
    AuraState.currentUser = AuraState.demoUsers[4];
    StorageService.set(AuraConfig.storageKeys.currentUser, AuraState.currentUser);
    window.dispatchEvent(new CustomEvent('aura:userChanged', { detail: AuraState.currentUser }));
  },

  updateUserUI() {
    const user = this.getCurrentUser();
    if (!user) return;

    // Update avatar elements
    document.querySelectorAll('.user-avatar-img').forEach(img => {
      img.src = user.avatar;
      img.alt = user.displayName;
    });

    // Update username displays
    document.querySelectorAll('.current-user-name').forEach(el => {
      el.textContent = user.displayName;
    });

    document.querySelectorAll('.current-user-handle').forEach(el => {
      el.textContent = '@' + user.username;
    });

    // Update role badge chip
    const roleChip = document.getElementById('roleBadgeChip');
    if (roleChip) {
      const roleLabels = {
        [AuraRoles.REGULAR]: 'Member',
        [AuraRoles.VERIFIED_EXPERT]: 'Verified Doctor/Coach',
        [AuraRoles.MODERATOR]: 'Moderator',
        [AuraRoles.ADMIN]: 'Admin',
        [AuraRoles.SUPER_ADMIN]: 'Super Admin'
      };
      roleChip.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span class="label">${roleLabels[user.role] || user.role}</span>
      `;
    }
  }
};

window.AuthService = AuthService;
