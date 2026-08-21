import { FOOD_CATEGORIES, FOOD_ITEMS, searchFoodItems } from '../data/foodkeeper-data.js';
import { sound } from '../audio/sounds.js';

export class SearchEngineUI {
  constructor({ headerInputId, searchDropdownId, databaseModalId, onSelectFood, onZoom3D }) {
    this.headerInput = document.getElementById(headerInputId);
    this.searchDropdown = document.getElementById(searchDropdownId);
    this.databaseModal = document.getElementById(databaseModalId);
    this.onSelectFood = onSelectFood;
    this.onZoom3D = onZoom3D;

    this.activeCategory = 'all';
    this.activeStorage = 'all';
    this.query = '';

    this.init();
  }

  init() {
    this.initHeaderSearch();
    this.initDatabaseModal();
  }

  initHeaderSearch() {
    if (!this.headerInput || !this.searchDropdown) return;

    this.headerInput.addEventListener('input', (e) => {
      const q = e.target.value;
      if (q.trim().length > 0) {
        const results = searchFoodItems(q).slice(0, 6);
        this.renderDropdownResults(results);
      } else {
        this.searchDropdown.classList.add('hidden');
      }
    });

    this.headerInput.addEventListener('focus', () => {
      if (this.headerInput.value.trim().length > 0) {
        const results = searchFoodItems(this.headerInput.value).slice(0, 6);
        this.renderDropdownResults(results);
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.headerInput.contains(e.target) && !this.searchDropdown.contains(e.target)) {
        this.searchDropdown.classList.add('hidden');
      }
    });

    // Global keyboard shortcut: Ctrl+K or / to focus search
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.headerInput.focus();
      }
    });
  }

  renderDropdownResults(results) {
    if (!results.length) {
      this.searchDropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-400">
          No food items found matching your search.
        </div>
      `;
      this.searchDropdown.classList.remove('hidden');
      return;
    }

    this.searchDropdown.innerHTML = results.map(item => `
      <button data-id="${item.id}" class="search-result-row w-full text-left p-3 hover:bg-white/10 transition-colors flex items-center justify-between border-b border-white/5 last:border-0">
        <div class="flex items-center gap-3">
          <span class="text-xl">${item.icon}</span>
          <div>
            <div class="text-xs font-semibold text-white">${item.name}</div>
            <div class="text-[10px] text-slate-400">${item.categoryName} • ${item.idealStorage === 'fridge' ? '🧊 Fridge' : '🥫 Pantry'}</div>
          </div>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-300">
          ${item.idealStorage === 'fridge' ? item.refrigLife.opened : item.pantryLife.opened}
        </span>
      </button>
    `).join('');

    this.searchDropdown.querySelectorAll('.search-result-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const foodItem = FOOD_ITEMS.find(f => f.id === id);
        if (foodItem) {
          sound.playSelect();
          this.searchDropdown.classList.add('hidden');
          this.headerInput.value = '';
          
          if (foodItem.modelKey && this.onZoom3D) {
            this.onZoom3D(foodItem.id);
          }
          if (this.onSelectFood) {
            this.onSelectFood(foodItem);
          }
        }
      });
    });

    this.searchDropdown.classList.remove('hidden');
  }

  initDatabaseModal() {
    if (!this.databaseModal) return;

    this.databaseModal.innerHTML = `
      <div id="db-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity duration-300 opacity-0 pointer-events-none"></div>
      
      <div id="db-dialog" class="fixed inset-4 md:inset-10 lg:inset-20 bg-obsidian-900/95 border border-white/15 rounded-3xl backdrop-blur-2xl z-50 transform scale-95 opacity-0 pointer-events-none transition-all duration-300 flex flex-col shadow-2xl overflow-hidden">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-obsidian-950/50">
          <div>
            <h2 class="text-xl font-bold text-white font-display flex items-center gap-2">
              <span>📚</span> USDA FoodKeeper Expiration Intelligence
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">Explore safe shelf life, storage conditions, and spoilage indicators across 150+ foods.</p>
          </div>
          <button id="db-close-btn" class="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Filter bar -->
        <div class="p-5 border-b border-white/10 bg-obsidian-950/20 space-y-4">
          <!-- Search input -->
          <div class="relative">
            <input id="db-search-input" type="text" placeholder="Search by food name, spoilage sign, or storage tip..." class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors">
          </div>

          <!-- Category pill tabs -->
          <div id="db-category-pills" class="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            ${FOOD_CATEGORIES.map(cat => `
              <button data-category="${cat.id}" class="cat-pill whitespace-nowrap px-3 py-1.5 rounded-full border transition-all ${cat.id === 'all' ? 'bg-emerald-500 text-white border-emerald-400 shadow-glow-fresh' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}">
                ${cat.icon} ${cat.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Food grid -->
        <div id="db-food-grid" class="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Populated dynamically -->
        </div>

      </div>
    `;

    // Event listeners
    const closeBtn = document.getElementById('db-close-btn');
    const backdrop = document.getElementById('db-backdrop');
    const searchInput = document.getElementById('db-search-input');
    const categoryPills = document.querySelectorAll('.cat-pill');

    closeBtn.addEventListener('click', () => this.closeDatabaseModal());
    backdrop.addEventListener('click', () => this.closeDatabaseModal());

    searchInput.addEventListener('input', (e) => {
      this.query = e.target.value;
      this.renderDatabaseGrid();
    });

    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        sound.playHover();
        categoryPills.forEach(p => {
          p.className = 'cat-pill whitespace-nowrap px-3 py-1.5 rounded-full border transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';
        });
        pill.className = 'cat-pill whitespace-nowrap px-3 py-1.5 rounded-full border transition-all bg-emerald-500 text-white border-emerald-400 shadow-glow-fresh';
        this.activeCategory = pill.dataset.category;
        this.renderDatabaseGrid();
      });
    });

    this.renderDatabaseGrid();
  }

  renderDatabaseGrid() {
    const grid = document.getElementById('db-food-grid');
    if (!grid) return;

    const items = searchFoodItems(this.query, this.activeCategory, this.activeStorage);

    if (!items.length) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <div class="text-3xl mb-2">🔍</div>
          <p class="text-sm">No food items found matching your filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div data-id="${item.id}" class="food-card p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all cursor-pointer flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="text-3xl p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">${item.icon}</span>
              <div>
                <h4 class="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">${item.name}</h4>
                <span class="text-[11px] text-slate-400">${item.categoryName}</span>
              </div>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.safetyRating === 'high_risk' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : item.safetyRating === 'moderate_risk' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}">
              ${item.safetyRating === 'high_risk' ? 'High Risk' : item.safetyRating === 'moderate_risk' ? 'Moderate' : 'Low Risk'}
            </span>
          </div>

          <p class="text-xs text-slate-400 mt-3 line-clamp-2">${item.storageTips}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span class="text-slate-400 font-mono text-[11px]">
            ${item.idealStorage === 'fridge' ? '🧊 Fridge: ' + item.refrigLife.opened : '🥫 Pantry: ' + item.pantryLife.opened}
          </span>
          <span class="text-emerald-400 font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Inspect &rarr;
          </span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.food-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const foodItem = FOOD_ITEMS.find(f => f.id === id);
        if (foodItem) {
          sound.playSelect();
          this.closeDatabaseModal();
          if (foodItem.modelKey && this.onZoom3D) {
            this.onZoom3D(foodItem.id);
          }
          if (this.onSelectFood) {
            this.onSelectFood(foodItem);
          }
        }
      });
    });
  }

  openDatabaseModal() {
    sound.playSelect();
    const dialog = document.getElementById('db-dialog');
    const backdrop = document.getElementById('db-backdrop');
    
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');

    dialog.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    dialog.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
  }

  closeDatabaseModal() {
    const dialog = document.getElementById('db-dialog');
    const backdrop = document.getElementById('db-backdrop');

    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');

    dialog.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    dialog.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
  }
}
