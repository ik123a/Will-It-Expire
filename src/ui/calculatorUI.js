import { FOOD_ITEMS } from '../data/foodkeeper-data.js';
import { calculateFreshness } from '../data/calculator.js';
import { sound } from '../audio/sounds.js';

export class FreshnessCalculatorUI {
  constructor({ containerId, onAddToPantry }) {
    this.container = document.getElementById(containerId);
    this.onAddToPantry = onAddToPantry;
    this.selectedFood = FOOD_ITEMS[0]; // default whole milk
    this.selectedStorage = 'fridge';
    this.isOpened = false;
    this.selectedDate = new Date().toISOString().split('T')[0];

    this.init();
  }

  init() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="bg-obsidian-900/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-bezel">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">
              ⏱️
            </div>
            <div>
              <h3 class="text-xl font-bold text-white font-display">Will It Expire? Smart Calculator</h3>
              <p class="text-xs text-slate-400">Calculate remaining days, freshness percentage, and safe consumption window.</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Left Controls Column -->
          <div class="lg:col-span-6 space-y-5">
            
            <!-- 1. Food Selector -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Select Food Item</label>
              <select id="calc-food-select" class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors">
                ${FOOD_ITEMS.map(item => `
                  <option value="${item.id}" class="bg-obsidian-900 text-white">${item.icon} ${item.name} (${item.categoryName})</option>
                `).join('')}
              </select>
            </div>

            <!-- 2. Storage Location Switcher -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Storage Condition</label>
              <div class="grid grid-cols-3 gap-2">
                <button data-storage="fridge" class="calc-storage-btn py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-sky-500 text-white border-sky-400 shadow-glow-fridge">
                  <span>🧊</span> Fridge
                </button>
                <button data-storage="pantry" class="calc-storage-btn py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10">
                  <span>🥫</span> Pantry
                </button>
                <button data-storage="freezer" class="calc-storage-btn py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10">
                  <span>❄️</span> Freezer
                </button>
              </div>
            </div>

            <!-- 3. Opened Status Toggle -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Package State</label>
              <div class="grid grid-cols-2 gap-2">
                <button id="calc-unopened-btn" class="py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-emerald-500 text-white border-emerald-400">
                  <span>🔒</span> Unopened / Factory Sealed
                </button>
                <button id="calc-opened-btn" class="py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10">
                  <span>✂️</span> Opened / Broken Seal
                </button>
              </div>
            </div>

            <!-- 4. Date Purchased / Opened Picker -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Date Purchased or Opened</label>
              <input id="calc-date-input" type="date" value="${this.selectedDate}" class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors">
            </div>

          </div>

          <!-- Right Result Display Column -->
          <div class="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
            
            <div>
              <!-- Circular Freshness Gauge & Status -->
              <div class="flex items-center gap-6">
                
                <!-- SVG Circle Gauge -->
                <div class="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" stroke-width="8" fill="none"/>
                    <circle id="calc-gauge-bar" cx="50" cy="50" r="42" stroke="#10B981" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="0" stroke-linecap="round" fill="none" class="transition-all duration-700 ease-out"/>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span id="calc-percent-val" class="text-2xl font-bold text-white font-mono">100%</span>
                    <span class="text-[9px] font-mono uppercase tracking-wider text-slate-400">Freshness</span>
                  </div>
                </div>

                <!-- Status text -->
                <div>
                  <span id="calc-status-badge" class="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full border mb-1.5"></span>
                  <h4 id="calc-status-title" class="text-xl font-bold text-white font-display"></h4>
                  <div class="text-xs text-slate-400 mt-1 font-mono">
                    Estimated Expiry: <span id="calc-expiry-date" class="text-white font-bold"></span>
                  </div>
                </div>

              </div>

              <!-- Actionable Advice Card -->
              <div class="mt-6 p-4 rounded-xl bg-obsidian-950/60 border border-white/10">
                <div class="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <span>💡</span> Guidance & Food Safety
                </div>
                <p id="calc-advice-text" class="text-xs text-slate-400 leading-relaxed"></p>
              </div>
            </div>

            <!-- Add to Pantry CTA -->
            <div class="mt-6 pt-4 border-t border-white/5">
              <button id="calc-save-pantry-btn" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-glow-fresh active:scale-98">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Track this in My Kitchen Pantry
              </button>
            </div>

          </div>

        </div>

      </div>
    `;

    this.bindEvents();
    this.updateCalculation();
  }

  bindEvents() {
    const foodSelect = document.getElementById('calc-food-select');
    const storageBtns = document.querySelectorAll('.calc-storage-btn');
    const unopenedBtn = document.getElementById('calc-unopened-btn');
    const openedBtn = document.getElementById('calc-opened-btn');
    const dateInput = document.getElementById('calc-date-input');
    const savePantryBtn = document.getElementById('calc-save-pantry-btn');

    foodSelect.addEventListener('change', (e) => {
      sound.playHover();
      this.selectedFood = FOOD_ITEMS.find(f => f.id === e.target.value) || FOOD_ITEMS[0];
      // Automatically switch to recommended storage
      this.setStorage(this.selectedFood.idealStorage);
      this.updateCalculation();
    });

    storageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playHover();
        this.setStorage(btn.dataset.storage);
        this.updateCalculation();
      });
    });

    unopenedBtn.addEventListener('click', () => {
      sound.playHover();
      this.isOpened = false;
      unopenedBtn.className = 'py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-emerald-500 text-white border-emerald-400';
      openedBtn.className = 'py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';
      this.updateCalculation();
    });

    openedBtn.addEventListener('click', () => {
      sound.playHover();
      this.isOpened = true;
      openedBtn.className = 'py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-amber-500 text-white border-amber-400';
      unopenedBtn.className = 'py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';
      this.updateCalculation();
    });

    dateInput.addEventListener('change', (e) => {
      this.selectedDate = e.target.value;
      this.updateCalculation();
    });

    savePantryBtn.addEventListener('click', () => {
      if (this.onAddToPantry && this.selectedFood) {
        this.onAddToPantry(this.selectedFood, {
          storage: this.selectedStorage,
          isOpened: this.isOpened,
          date: this.selectedDate,
        });
      }
    });
  }

  setStorage(storageKey) {
    this.selectedStorage = storageKey;
    const storageBtns = document.querySelectorAll('.calc-storage-btn');
    storageBtns.forEach(btn => {
      if (btn.dataset.storage === storageKey) {
        btn.className = 'calc-storage-btn py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-sky-500 text-white border-sky-400 shadow-glow-fridge';
      } else {
        btn.className = 'calc-storage-btn py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';
      }
    });
  }

  setFoodItem(item) {
    if (!item) return;
    this.selectedFood = item;
    const foodSelect = document.getElementById('calc-food-select');
    if (foodSelect) foodSelect.value = item.id;
    this.setStorage(item.idealStorage);
    this.updateCalculation();
  }

  updateCalculation() {
    const result = calculateFreshness({
      item: this.selectedFood,
      storage: this.selectedStorage,
      isOpened: this.isOpened,
      selectedDate: this.selectedDate,
    });

    // Gauge circle calculation (circumference = 2 * PI * 42 = 263.89)
    const circumference = 264;
    const offset = circumference - (result.percentage / 100) * circumference;

    const gaugeBar = document.getElementById('calc-gauge-bar');
    const percentVal = document.getElementById('calc-percent-val');
    const statusBadge = document.getElementById('calc-status-badge');
    const statusTitle = document.getElementById('calc-status-title');
    const expiryDate = document.getElementById('calc-expiry-date');
    const adviceText = document.getElementById('calc-advice-text');

    if (gaugeBar) {
      gaugeBar.style.strokeDashoffset = offset;
      gaugeBar.style.stroke = result.color;
    }
    if (percentVal) percentVal.textContent = `${result.percentage}%`;
    if (statusBadge) {
      statusBadge.textContent = result.statusText;
      statusBadge.className = `inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full border mb-1.5 ${result.badgeClass}`;
    }
    if (statusTitle) {
      if (result.daysRemaining > 0) {
        statusTitle.textContent = `${result.daysRemaining} ${result.daysRemaining === 1 ? 'Day' : 'Days'} Remaining`;
      } else if (result.daysRemaining === 0) {
        statusTitle.textContent = `Expires Today!`;
      } else {
        statusTitle.textContent = `Expired ${Math.abs(result.daysRemaining)} Days Ago`;
      }
    }
    if (expiryDate) expiryDate.textContent = result.expiryDate || 'N/A';
    if (adviceText) adviceText.textContent = result.advice;
  }
}
