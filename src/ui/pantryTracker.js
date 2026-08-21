import confetti from 'canvas-confetti';
import { calculateFreshness } from '../data/calculator.js';
import { FOOD_ITEMS, getFoodById } from '../data/foodkeeper-data.js';
import { sound } from '../audio/sounds.js';

export class PantryTrackerUI {
  constructor({ containerId, onInspectFood }) {
    this.container = document.getElementById(containerId);
    this.onInspectFood = onInspectFood;
    this.storageKey = 'will_it_expire_pantry_items';
    this.consumedStatsKey = 'will_it_expire_consumed_stats';
    this.items = this.loadItems();
    this.stats = this.loadStats();

    this.init();
  }

  loadItems() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load pantry data from localStorage', e);
    }

    return [
      {
        uid: 'demo_1',
        foodId: 'milk_whole',
        storage: 'fridge',
        isOpened: true,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        uid: 'demo_2',
        foodId: 'eggs_fresh',
        storage: 'fridge',
        isOpened: false,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        uid: 'demo_3',
        foodId: 'strawberries_fresh',
        storage: 'fridge',
        isOpened: false,
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        uid: 'demo_4',
        foodId: 'ketchup_heinz',
        storage: 'pantry',
        isOpened: true,
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    ];
  }

  loadStats() {
    try {
      const data = localStorage.getItem(this.consumedStatsKey);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return {
      itemsEaten: 8,
      moneySavedUSD: 42.50,
      co2SavedKg: 16.2
    };
  }

  saveStats() {
    try {
      localStorage.setItem(this.consumedStatsKey, JSON.stringify(this.stats));
    } catch (e) {}
  }

  saveItems() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save pantry items', e);
    }
  }

  addItem(foodItem, options = {}) {
    const newItem = {
      uid: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      foodId: foodItem.id,
      storage: options.storage || foodItem.idealStorage || 'fridge',
      isOpened: options.isOpened || false,
      date: options.date || new Date().toISOString().split('T')[0],
      customName: options.customName || null,
      customIcon: options.customIcon || null,
    };

    this.items.unshift(newItem);
    this.saveItems();
    this.render();

    sound.playSuccess();
    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.8 },
        colors: ['#10B981', '#34D399', '#38BDF8', '#F59E0B'],
      });
    } catch (e) {}

    const pantrySection = document.getElementById('my-pantry-section');
    if (pantrySection) {
      pantrySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  addMultipleItems(itemsArray) {
    itemsArray.forEach(({ foodItem, options }) => {
      const newItem = {
        uid: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        foodId: foodItem.id,
        storage: options.storage || foodItem.idealStorage || 'fridge',
        isOpened: options.isOpened || false,
        date: options.date || new Date().toISOString().split('T')[0],
      };
      this.items.unshift(newItem);
    });

    this.saveItems();
    this.render();

    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#10B981', '#34D399', '#38BDF8', '#F59E0B'],
      });
    } catch (e) {}

    const pantrySection = document.getElementById('my-pantry-section');
    if (pantrySection) {
      pantrySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  removeItem(uid) {
    this.items = this.items.filter(i => i.uid !== uid);
    this.saveItems();
    this.render();
  }

  markAsConsumed(uid) {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#38BDF8'],
      });
    } catch (e) {}

    // Increment environmental & money savings stats
    this.stats.itemsEaten += 1;
    this.stats.moneySavedUSD += 4.75;
    this.stats.co2SavedKg += 1.8;
    this.saveStats();

    this.removeItem(uid);
  }

  exportCSV() {
    sound.playSelect();
    const enriched = this.getEnrichedItems();
    const headers = ['Food Name', 'Category', 'Storage', 'Opened', 'Date Input', 'Days Remaining', 'Freshness %', 'Estimated Expiry Date', 'Status'];
    const rows = enriched.map(i => [
      `"${i.food.name}"`,
      `"${i.food.categoryName}"`,
      `"${i.storage}"`,
      `"${i.isOpened ? 'Yes' : 'No'}"`,
      `"${i.date}"`,
      i.calc.daysRemaining,
      `${i.calc.percentage}%`,
      `"${i.calc.expiryDate}"`,
      `"${i.calc.statusText}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pantry_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportJSON() {
    sound.playSelect();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pantry_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  getEnrichedItems() {
    return this.items.map(entry => {
      let food = getFoodById(entry.foodId);
      if (!food) {
        food = {
          id: entry.foodId,
          name: entry.customName || 'Custom Food Item',
          icon: entry.customIcon || '🍽️',
          categoryName: 'Custom Food',
          idealStorage: entry.storage,
          pantryLife: { unopened: '7 Days', unopenedDays: 7, opened: '3 Days', openedDays: 3 },
          refrigLife: { unopened: '7 Days', unopenedDays: 7, opened: '5 Days', openedDays: 5 },
          freezeLife: { duration: '3 Months', days: 90 },
          storageTips: 'Stored according to custom user preferences.',
          spoilageGuide: { look: 'Inspect for discoloration/mold', smell: 'Check for sour/ammonia odors', touch: 'Check for slime', tasteWarning: 'Inspect before eating' },
          safetyRating: 'moderate_risk',
          dateType: 'Best If Used By',
          funFact: 'Tracking food expiration reduces household food waste by up to 35%.'
        };
      }
      const calc = calculateFreshness({
        item: food,
        storage: entry.storage,
        isOpened: entry.isOpened,
        selectedDate: entry.date,
      });
      return { ...entry, food, calc };
    });
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    if (!this.container) return;

    const enrichedItems = this.getEnrichedItems();
    enrichedItems.sort((a, b) => a.calc.daysRemaining - b.calc.daysRemaining);

    const totalCount = enrichedItems.length;
    const expiredCount = enrichedItems.filter(i => i.calc.daysRemaining < 0).length;
    const urgentCount = enrichedItems.filter(i => i.calc.daysRemaining >= 0 && i.calc.daysRemaining <= 3).length;
    const freshCount = enrichedItems.filter(i => i.calc.daysRemaining > 3).length;

    this.container.innerHTML = `
      <div class="bg-obsidian-900/90 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-bezel">
        
        <!-- Header & Stats Bar -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 tracking-widest mb-1">
              <span>🏠</span> Live Virtual Kitchen Inventory
            </div>
            <h3 class="text-2xl font-bold text-white font-display">My Tracked Pantry & Fridge</h3>
            <p class="text-xs text-slate-400 mt-0.5">Real-time expiration countdowns and spoilage prevention alerts.</p>
          </div>

          <!-- Quick Stats Pill Badges -->
          <div class="flex flex-wrap items-center gap-2">
            <div class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span class="text-[10px] text-slate-400 block font-mono">Total</span>
              <span class="text-sm font-bold text-white font-mono">${totalCount}</span>
            </div>
            <div class="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
              <span class="text-[10px] text-rose-300 block font-mono">Expired</span>
              <span class="text-sm font-bold text-rose-400 font-mono">${expiredCount}</span>
            </div>
            <div class="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span class="text-[10px] text-amber-300 block font-mono">Eat Soon</span>
              <span class="text-sm font-bold text-amber-400 font-mono">${urgentCount}</span>
            </div>
            <div class="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span class="text-[10px] text-emerald-300 block font-mono">Fresh</span>
              <span class="text-sm font-bold text-emerald-400 font-mono">${freshCount}</span>
            </div>
          </div>
        </div>

        <!-- Food Waste Savings Banner -->
        <div class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-obsidian-900 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="text-2xl p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              🌱
            </div>
            <div>
              <div class="text-xs font-bold text-white">Your Environmental & Food Waste Impact</div>
              <div class="text-[11px] text-slate-300">By eating food before it expires, you save money and prevent landfill methane emissions.</div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-xs font-mono">
            <div class="text-center">
              <span class="text-emerald-400 font-bold text-base">$${this.stats.moneySavedUSD.toFixed(2)}</span>
              <span class="text-[10px] text-slate-400 block">Saved</span>
            </div>
            <div class="text-center border-l border-white/10 pl-4">
              <span class="text-sky-400 font-bold text-base">${this.stats.itemsEaten}</span>
              <span class="text-[10px] text-slate-400 block">Items Eaten</span>
            </div>
            <div class="text-center border-l border-white/10 pl-4">
              <span class="text-teal-300 font-bold text-base">${this.stats.co2SavedKg.toFixed(1)} kg</span>
              <span class="text-[10px] text-slate-400 block">CO2 Prevented</span>
            </div>
          </div>
        </div>

        <!-- Toolbar: Add Custom Item & Export Actions -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div class="flex items-center gap-2">
            <button id="open-custom-item-modal-btn" class="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold shadow-glow-fresh flex items-center gap-1.5 transition-all">
              <span>+</span> Add Custom Item
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button id="export-csv-btn" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors flex items-center gap-1">
              <span>📄</span> CSV Export
            </button>
            <button id="export-json-btn" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors flex items-center gap-1">
              <span>💾</span> JSON Backup
            </button>
          </div>
        </div>

        <!-- Inventory Card Grid -->
        ${!enrichedItems.length ? `
          <div class="py-16 text-center text-slate-400">
            <div class="text-4xl mb-3">🧺</div>
            <h4 class="text-base font-semibold text-white">Your Virtual Kitchen is Empty</h4>
            <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Click any food item in the 3D kitchen above or search the database to start tracking your groceries!</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${enrichedItems.map(item => `
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
                
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">${item.food.icon}</span>
                      <div>
                        <h4 class="text-sm font-semibold text-white">${item.food.name}</h4>
                        <div class="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono text-slate-400">
                          <span>${item.storage === 'fridge' ? '🧊 Fridge' : item.storage === 'freezer' ? '❄️ Freezer' : '🥫 Pantry'}</span>
                          <span>•</span>
                          <span>${item.isOpened ? '✂️ Opened' : '🔒 Sealed'}</span>
                        </div>
                      </div>
                    </div>

                    <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.calc.badgeClass}">
                      ${item.calc.daysRemaining < 0 ? `-${Math.abs(item.calc.daysRemaining)}d past` : `${item.calc.daysRemaining}d left`}
                    </span>
                  </div>

                  <!-- Freshness Progress Meter -->
                  <div class="mt-4 space-y-1.5">
                    <div class="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Freshness</span>
                      <span class="text-white font-bold">${item.calc.percentage}%</span>
                    </div>
                    <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-500" style="width: ${item.calc.percentage}%; background-color: ${item.calc.color};"></div>
                    </div>
                  </div>

                  <div class="mt-3 text-[11px] text-slate-400 font-mono">
                    Estimated Expiry: <span class="text-slate-200">${item.calc.expiryDate}</span>
                  </div>
                </div>

                <!-- Card Actions -->
                <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <button data-uid="${item.uid}" class="pantry-consumed-btn text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold flex items-center gap-1 transition-colors">
                    <span>✨</span> Ate It
                  </button>
                  <button data-id="${item.food.id}" class="pantry-inspect-btn text-xs px-2 py-1 text-slate-400 hover:text-white transition-colors">
                    Inspect
                  </button>
                  <button data-uid="${item.uid}" class="pantry-delete-btn text-xs p-1 text-slate-500 hover:text-rose-400 transition-colors" title="Delete">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>

              </div>
            `).join('')}
          </div>
        `}

      </div>

      <!-- Custom Food Item Creator Modal Dialog -->
      <div id="custom-item-dialog" class="hidden fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-obsidian-900 border border-white/15 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 class="text-base font-bold text-white font-display">Add Custom Food Item</h4>
            <button id="close-custom-modal-btn" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-[11px] font-mono text-slate-400 uppercase mb-1">Food Name</label>
              <input id="custom-item-name" type="text" placeholder="e.g. Grandma's Lasagna" class="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-mono text-slate-400 uppercase mb-1">Emoji Icon</label>
                <input id="custom-item-icon" type="text" value="🍲" class="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none focus:border-emerald-400">
              </div>
              <div>
                <label class="block text-[11px] font-mono text-slate-400 uppercase mb-1">Storage</label>
                <select id="custom-item-storage" class="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400">
                  <option value="fridge" class="bg-obsidian-900">🧊 Fridge</option>
                  <option value="pantry" class="bg-obsidian-900">🥫 Pantry</option>
                  <option value="freezer" class="bg-obsidian-900">❄️ Freezer</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-mono text-slate-400 uppercase mb-1">Estimated Lifespan (Days)</label>
              <input id="custom-item-days" type="number" value="5" min="1" max="365" class="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400">
            </div>
          </div>

          <div class="pt-3 border-t border-white/10 flex justify-end gap-2">
            <button id="cancel-custom-modal-btn" class="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white">Cancel</button>
            <button id="save-custom-modal-btn" class="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold shadow-glow-fresh">Save to Pantry</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.pantry-consumed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.markAsConsumed(btn.dataset.uid);
      });
    });

    this.container.querySelectorAll('.pantry-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playHover();
        this.removeItem(btn.dataset.uid);
      });
    });

    this.container.querySelectorAll('.pantry-inspect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const food = getFoodById(btn.dataset.id);
        if (food && this.onInspectFood) {
          this.onInspectFood(food);
        }
      });
    });

    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportJsonBtn = document.getElementById('export-json-btn');
    if (exportCsvBtn) exportCsvBtn.addEventListener('click', () => this.exportCSV());
    if (exportJsonBtn) exportJsonBtn.addEventListener('click', () => this.exportJSON());

    // Custom Item Modal wiring
    const customModal = document.getElementById('custom-item-dialog');
    const openCustomBtn = document.getElementById('open-custom-item-modal-btn');
    const closeCustomBtn = document.getElementById('close-custom-modal-btn');
    const cancelCustomBtn = document.getElementById('cancel-custom-modal-btn');
    const saveCustomBtn = document.getElementById('save-custom-modal-btn');

    if (openCustomBtn && customModal) {
      openCustomBtn.addEventListener('click', () => {
        sound.playSelect();
        customModal.classList.remove('hidden');
      });
    }

    if (closeCustomBtn && customModal) {
      closeCustomBtn.addEventListener('click', () => customModal.classList.add('hidden'));
    }
    if (cancelCustomBtn && customModal) {
      cancelCustomBtn.addEventListener('click', () => customModal.classList.add('hidden'));
    }

    if (saveCustomBtn && customModal) {
      saveCustomBtn.addEventListener('click', () => {
        const name = document.getElementById('custom-item-name').value.trim() || 'Custom Homemade Food';
        const icon = document.getElementById('custom-item-icon').value.trim() || '🍲';
        const storage = document.getElementById('custom-item-storage').value;
        const days = parseInt(document.getElementById('custom-item-days').value, 10) || 5;

        const customFoodObj = {
          id: 'custom_' + Date.now(),
          name,
          icon,
          categoryName: 'Custom Homemade',
          idealStorage: storage,
          pantryLife: { unopened: `${days} Days`, unopenedDays: days, opened: `${days} Days`, openedDays: days },
          refrigLife: { unopened: `${days} Days`, unopenedDays: days, opened: `${days} Days`, openedDays: days },
          freezeLife: { duration: '3 Months', days: 90 },
          storageTips: 'Keep tightly sealed in an airtight food-grade container.',
          spoilageGuide: { look: 'Look for mold or discoloration', smell: 'Check for sour/ammonia odors', touch: 'Check for slimy texture', tasteWarning: 'Inspect sensory quality before eating' },
          safetyRating: 'moderate_risk',
          dateType: 'Best If Used By',
          funFact: 'Homemade cooked meals are safe for 3-4 days in a 38°F refrigerator.'
        };

        this.addItem(customFoodObj, { storage, customName: name, customIcon: icon });
        customModal.classList.add('hidden');
      });
    }
  }
}
