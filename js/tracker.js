/**
 * AuraWell Personal Wellness Tracker & Mindful Habits Engine
 * Includes interactive Box Breathing (Pranayama), Hydration Ring, and Sleep Logger.
 */

const TrackerService = {
  breathingInterval: null,
  breathingActive: false,
  breathingSeconds: 0,
  currentPhase: 'inhale', // inhale (4s) -> hold (4s) -> exhale (4s) -> holdEmpty (4s)

  init() {
    this.renderTracker();
    this.attachEventListeners();

    window.addEventListener('aura:habitUpdated', () => this.renderTracker());
    window.addEventListener('aura:languageChange', () => this.renderTracker());
  },

  attachEventListeners() {
    // Breathing Start/Stop button
    const breathBtn = document.getElementById('toggleBreathingBtn');
    if (breathBtn) {
      breathBtn.addEventListener('click', () => this.toggleBreathing());
    }
  },

  renderTracker() {
    const data = AuraState.wellnessTracker;

    // Render Hydration Progress Ring
    const amountEl = document.getElementById('waterAmountText');
    const ringFill = document.getElementById('waterRingFill');
    if (amountEl && ringFill) {
      amountEl.textContent = `${data.waterIntakeMl} ml`;
      const pct = Math.min(1, data.waterIntakeMl / data.waterGoalMl);
      const circumference = 2 * Math.PI * 65; // r=65 => ~408.4
      const offset = circumference * (1 - pct);
      ringFill.style.strokeDasharray = `${circumference} ${circumference}`;
      ringFill.style.strokeDashoffset = offset;
    }

    // Render Sleep Slider
    const sleepDisplay = document.getElementById('sleepDisplayVal');
    const sleepInput = document.getElementById('sleepRangeInput');
    if (sleepDisplay && sleepInput) {
      sleepDisplay.textContent = data.sleepHours;
      sleepInput.value = data.sleepHours;
    }

    // Render Daily Habits
    const habitsList = document.getElementById('dailyHabitsList');
    if (habitsList) {
      const isHi = I18nService.currentLang === 'hi';
      habitsList.innerHTML = data.habits.map(h => `
        <div class="habit-row ${h.completed ? 'completed' : ''}" onclick="TrackerService.toggleHabit('${h.id}')">
          <div class="habit-left">
            <div class="habit-checkbox">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div class="habit-title">${isHi && h.titleHi ? h.titleHi : h.title}</div>
              <div class="habit-category-badge">${h.category}</div>
            </div>
          </div>
          ${h.completed ? '<span class="badge badge-primary">Completed</span>' : '<span class="badge badge-amber">Pending</span>'}
        </div>
      `).join('');
    }
  },

  addWater(amountMl) {
    AuraState.addWater(amountMl);
    App.showToast(`+${amountMl}ml logged! Stay hydrated 💧`, 'success');
  },

  resetWater() {
    AuraState.resetWater();
    App.showToast('Hydration counter reset for a new day', 'info');
  },

  updateSleep(hours) {
    AuraState.setSleepHours(hours);
  },

  toggleHabit(habitId) {
    const completed = AuraState.toggleHabit(habitId);
    if (completed) {
      App.showToast('Habit accomplished! Consistency builds vitality 🌱', 'success');
    }
  },

  toggleBreathing() {
    const card = document.getElementById('breathingCard');
    const btn = document.getElementById('toggleBreathingBtn');
    const orbText = document.getElementById('breathingOrbCount');
    const label = document.getElementById('breathingPhaseLabel');

    if (this.breathingActive) {
      // Stop
      clearInterval(this.breathingInterval);
      this.breathingActive = false;
      this.breathingSeconds = 0;
      if (card) card.classList.remove('active');
      if (btn) btn.textContent = I18nService.t('tracker.startBreathing');
      if (label) label.textContent = I18nService.t('tracker.breathingTitle');
      if (orbText) orbText.textContent = '4s';
    } else {
      // Start
      this.breathingActive = true;
      this.breathingSeconds = 0;
      if (card) card.classList.add('active');
      if (btn) btn.textContent = I18nService.t('tracker.stopBreathing');

      const phases = [
        { name: 'inhale', text: I18nService.t('tracker.inhale'), duration: 4 },
        { name: 'hold', text: I18nService.t('tracker.hold'), duration: 4 },
        { name: 'exhale', text: I18nService.t('tracker.exhale'), duration: 4 },
        { name: 'holdEmpty', text: I18nService.t('tracker.holdEmpty'), duration: 4 }
      ];

      let phaseIdx = 0;
      let counter = 4;

      if (label) label.textContent = phases[0].text;
      if (orbText) orbText.textContent = counter + 's';

      this.breathingInterval = setInterval(() => {
        counter--;
        if (counter <= 0) {
          phaseIdx = (phaseIdx + 1) % 4;
          counter = 4;
          if (label) label.textContent = phases[phaseIdx].text;
        }
        if (orbText) orbText.textContent = counter + 's';
      }, 1000);
    }
  }
};

window.TrackerService = TrackerService;
