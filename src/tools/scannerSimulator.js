import { FOOD_ITEMS, getFoodById } from '../data/foodkeeper-data.js';
import { sound } from '../audio/sounds.js';

export class ScannerSimulatorUI {
  constructor({ containerId, onAddMultipleToPantry, onSingleScanned }) {
    this.container = document.getElementById(containerId);
    this.onAddMultipleToPantry = onAddMultipleToPantry;
    this.onSingleScanned = onSingleScanned;

    this.isScanning = false;
    this.scannedItem = null;

    this.presets = {
      family_essentials: {
        name: 'Weekly Family Essentials',
        icon: '🛒',
        itemIds: ['milk_whole', 'artisan_bread', 'eggs_fresh', 'honeycrisp_apple', 'chicken_breasts', 'cheddar_cheese', 'greek_yogurt', 'ketchup_heinz']
      },
      fresh_healthy: {
        name: 'Healthy Fresh Produce & Seafood',
        icon: '🥗',
        itemIds: ['salmon_fresh', 'strawberries_fresh', 'blueberries_fresh', 'spinach_fresh', 'broccoli_fresh', 'avocado_haas', 'olive_oil_evoo']
      },
      bbq_cookout: {
        name: 'Weekend BBQ & Cookout',
        icon: '🥩',
        itemIds: ['raw_ground_beef', 'bacon_cured', 'hot_dogs_opened', 'bbq_sauce_smoky', 'mayonnaise_real', 'mustard_dijon', 'craft_beer']
      }
    };

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  startBarcodeScan() {
    this.isScanning = true;
    this.scannedItem = null;
    sound.playHover();
    this.render();

    setTimeout(() => {
      // Pick a random food item from the database
      const randomIndex = Math.floor(Math.random() * FOOD_ITEMS.length);
      this.scannedItem = FOOD_ITEMS[randomIndex];
      this.isScanning = false;
      sound.playSuccess();
      this.render();

      if (this.onSingleScanned) {
        this.onSingleScanned(this.scannedItem);
      }
    }, 1800);
  }

  addPresetToPantry(presetKey) {
    const preset = this.presets[presetKey];
    if (!preset) return;

    const itemsToAdd = preset.itemIds
      .map(id => getFoodById(id))
      .filter(Boolean)
      .map(food => ({
        foodItem: food,
        options: {
          storage: food.idealStorage,
          isOpened: false,
          date: new Date().toISOString().split('T')[0]
        }
      }));

    if (this.onAddMultipleToPantry) {
      this.onAddMultipleToPantry(itemsToAdd);
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="bg-obsidian-900/90 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-bezel">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">
              📷
            </div>
            <div>
              <h3 class="text-xl font-bold text-white font-display">Barcode & Grocery Scanner Simulator</h3>
              <p class="text-xs text-slate-400">Simulate rapid item input via camera barcode scanning or 1-click grocery haul import.</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left Column: Camera Viewfinder Simulation -->
          <div class="lg:col-span-6 flex flex-col items-center">
            
            <div class="relative w-full max-w-sm aspect-[4/3] rounded-2xl bg-obsidian-950 border-2 border-dashed border-white/20 overflow-hidden flex flex-col items-center justify-center p-6 shadow-inner">
              
              ${this.isScanning ? `
                <!-- Laser Scanning Line -->
                <div class="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_15px_#f43f5e] animate-bounce top-1/2"></div>
                <div class="text-center space-y-2 z-10">
                  <div class="text-3xl animate-pulse">📷</div>
                  <div class="text-xs font-mono text-emerald-400">Scanning Barcode...</div>
                  <div class="text-[10px] text-slate-500">Querying USDA FoodKeeper API</div>
                </div>
              ` : this.scannedItem ? `
                <div class="text-center space-y-2 z-10 animate-fade-in">
                  <div class="text-4xl">${this.scannedItem.icon}</div>
                  <div class="text-sm font-bold text-white font-display">${this.scannedItem.name}</div>
                  <div class="text-xs font-mono text-emerald-400">Barcode Detected: 0413030${Math.floor(1000 + Math.random() * 9000)}</div>
                  <button id="quick-add-scanned-btn" class="mt-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold shadow-glow-fresh transition-all">
                    + Add to My Pantry
                  </button>
                </div>
              ` : `
                <div class="text-center space-y-2 z-10">
                  <div class="text-4xl text-slate-600">║▌║█║▌│║▌║▌█</div>
                  <div class="text-xs font-semibold text-slate-300">Camera Viewfinder Ready</div>
                  <div class="text-[11px] text-slate-500">Point camera at food packaging barcode</div>
                </div>
              `}

              <!-- Viewfinder Corner Markers -->
              <div class="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
              <div class="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
              <div class="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              <div class="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

            </div>

            <button id="trigger-scan-btn" ${this.isScanning ? 'disabled' : ''} class="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-98">
              <span>⚡</span> ${this.isScanning ? 'Scanning...' : 'Simulate Camera Barcode Scan'}
            </button>

          </div>

          <!-- Right Column: Preset Grocery Receipt Hauls -->
          <div class="lg:col-span-6 space-y-4">
            <div>
              <span class="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">Batch Grocery Receipt Import</span>
              <p class="text-xs text-slate-400">Quickly populate your virtual kitchen with realistic curated grocery shopping hauls:</p>
            </div>

            <div class="space-y-3">
              ${Object.entries(this.presets).map(([key, preset]) => `
                <div class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">${preset.icon}</span>
                    <div>
                      <div class="text-xs font-bold text-white">${preset.name}</div>
                      <div class="text-[10px] text-slate-400 font-mono">${preset.itemIds.length} USDA verified items</div>
                    </div>
                  </div>
                  <button data-preset="${key}" class="import-preset-btn px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all">
                    Import Haul &rarr;
                  </button>
                </div>
              `).join('')}
            </div>

          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const scanBtn = document.getElementById('trigger-scan-btn');
    const quickAddBtn = document.getElementById('quick-add-scanned-btn');
    const presetBtns = document.querySelectorAll('.import-preset-btn');

    if (scanBtn) {
      scanBtn.addEventListener('click', () => this.startBarcodeScan());
    }

    if (quickAddBtn && this.scannedItem) {
      quickAddBtn.addEventListener('click', () => {
        if (this.onAddMultipleToPantry) {
          this.onAddMultipleToPantry([{
            foodItem: this.scannedItem,
            options: {
              storage: this.scannedItem.idealStorage,
              isOpened: false,
              date: new Date().toISOString().split('T')[0]
            }
          }]);
        }
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.preset;
        this.addPresetToPantry(key);
      });
    });
  }
}
