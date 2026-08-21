import { sound } from '../audio/sounds.js';

/**
 * Food Inspector Drawer & Detail Modal with Deep Pathogen Profiles
 */
export class InspectorModal {
  constructor(container, onAddToPantry, onOpenCalculator) {
    this.container = container;
    this.onAddToPantry = onAddToPantry;
    this.onOpenCalculator = onOpenCalculator;
    this.currentItem = null;

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div id="inspector-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0 pointer-events-none"></div>
      
      <div id="inspector-drawer" class="fixed top-0 right-0 h-full w-full max-w-lg bg-obsidian-900/95 border-l border-white/10 backdrop-blur-2xl z-50 transform translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-2xl overflow-hidden">
        
        <!-- Header bar -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-obsidian-950/40">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono tracking-widest text-emerald-400 uppercase">Food Inspector</span>
            <span id="inspector-risk-badge" class="text-[10px] font-mono px-2 py-0.5 rounded-full border"></span>
          </div>
          <button id="inspector-close-btn" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200">
          
          <!-- Hero Title & Category -->
          <div class="flex items-start gap-4">
            <div id="inspector-icon" class="text-4xl p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner flex items-center justify-center"></div>
            <div class="flex-1">
              <h2 id="inspector-name" class="text-2xl font-bold text-white tracking-tight font-display"></h2>
              <div class="flex items-center gap-2 mt-1">
                <span id="inspector-category" class="text-xs text-slate-400"></span>
                <span class="text-slate-600">•</span>
                <span id="inspector-datetype" class="text-xs text-amber-300/90 font-mono"></span>
              </div>
            </div>
          </div>

          <!-- Ideal Storage Recommendation -->
          <div class="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-obsidian-800/40 border border-emerald-500/20">
            <div class="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Optimal Storage Best Practice
            </div>
            <p id="inspector-tips" class="text-sm text-slate-300 leading-relaxed"></p>
          </div>

          <!-- Shelf Life Timelines Grid -->
          <div>
            <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span>⏱️</span> Shelf Life by Storage Condition
            </h3>
            <div class="grid grid-cols-3 gap-2.5">
              
              <!-- Pantry -->
              <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div class="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <span>🥫</span> Pantry
                </div>
                <div class="mt-2 space-y-1">
                  <div class="text-[11px] text-slate-400">Unopened:</div>
                  <div id="inspector-pantry-unopened" class="text-xs font-semibold text-white"></div>
                  <div class="text-[11px] text-slate-400 pt-1 border-t border-white/5">Opened:</div>
                  <div id="inspector-pantry-opened" class="text-xs font-semibold text-amber-300"></div>
                </div>
              </div>

              <!-- Refrigerator -->
              <div class="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 flex flex-col justify-between">
                <div class="text-xs text-sky-300 font-medium flex items-center gap-1">
                  <span>🧊</span> Fridge
                </div>
                <div class="mt-2 space-y-1">
                  <div class="text-[11px] text-slate-400">Unopened:</div>
                  <div id="inspector-refrig-unopened" class="text-xs font-semibold text-sky-200"></div>
                  <div class="text-[11px] text-slate-400 pt-1 border-t border-white/5">Opened:</div>
                  <div id="inspector-refrig-opened" class="text-xs font-semibold text-sky-300"></div>
                </div>
              </div>

              <!-- Freezer -->
              <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div class="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <span>❄️</span> Freezer
                </div>
                <div class="mt-2 space-y-1">
                  <div class="text-[11px] text-slate-400">Frozen:</div>
                  <div id="inspector-freezer" class="text-xs font-semibold text-white"></div>
                  <div class="text-[10px] text-slate-500 pt-1">Halts bacteria indefinitely</div>
                </div>
              </div>

            </div>
          </div>

          <!-- Sensory Spoilage Checklist (Look / Smell / Touch) -->
          <div class="p-4 rounded-xl bg-obsidian-950/60 border border-white/10 space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-semibold">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              The Sensory Spoilage Test
            </h3>

            <div class="space-y-2 text-xs">
              <div class="p-2 rounded bg-white/5 flex gap-2">
                <span class="font-semibold text-slate-300 min-w-12">👀 Look:</span>
                <span id="inspector-spoilage-look" class="text-slate-400"></span>
              </div>
              <div class="p-2 rounded bg-white/5 flex gap-2">
                <span class="font-semibold text-slate-300 min-w-12">👃 Smell:</span>
                <span id="inspector-spoilage-smell" class="text-slate-400"></span>
              </div>
              <div class="p-2 rounded bg-white/5 flex gap-2">
                <span class="font-semibold text-slate-300 min-w-12">✋ Touch:</span>
                <span id="inspector-spoilage-touch" class="text-slate-400"></span>
              </div>
            </div>

            <div id="inspector-taste-warning" class="text-[11px] text-rose-300/90 italic pt-1 border-t border-white/5"></div>
          </div>

          <!-- Pathogen Profile -->
          <div class="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-slate-300 flex items-start gap-2.5">
            <span class="text-base">🔬</span>
            <div>
              <span class="font-bold text-rose-300 font-mono">Microbial Pathogen Risk: </span>
              <span id="inspector-pathogen" class="text-slate-300"></span>
            </div>
          </div>

          <!-- Food Science Fun Fact -->
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 flex gap-2.5 items-start">
            <span class="text-base">💡</span>
            <div>
              <span class="font-semibold text-slate-300">Food Science: </span>
              <span id="inspector-funfact"></span>
            </div>
          </div>

        </div>

        <!-- Action Footer -->
        <div class="p-5 border-t border-white/10 bg-obsidian-950/80 flex items-center gap-3">
          <button id="inspector-calc-btn" class="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-white/20 active:scale-98">
            <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            Calculate Expiry
          </button>
          
          <button id="inspector-add-pantry-btn" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-glow-fresh active:scale-98">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add to My Pantry
          </button>
        </div>

      </div>
    `;

    // Event listeners
    const closeBtn = document.getElementById('inspector-close-btn');
    const backdrop = document.getElementById('inspector-backdrop');
    const calcBtn = document.getElementById('inspector-calc-btn');
    const addBtn = document.getElementById('inspector-add-pantry-btn');

    closeBtn.addEventListener('click', () => this.close());
    backdrop.addEventListener('click', () => this.close());

    calcBtn.addEventListener('click', () => {
      if (this.currentItem && this.onOpenCalculator) {
        this.close();
        this.onOpenCalculator(this.currentItem);
      }
    });

    addBtn.addEventListener('click', () => {
      if (this.currentItem && this.onAddToPantry) {
        this.onAddToPantry(this.currentItem);
      }
    });
  }

  open(foodItem) {
    if (!foodItem) return;
    this.currentItem = foodItem;
    sound.playSelect();

    // Populate data
    document.getElementById('inspector-icon').textContent = foodItem.icon;
    document.getElementById('inspector-name').textContent = foodItem.name;
    document.getElementById('inspector-category').textContent = foodItem.categoryName;
    document.getElementById('inspector-datetype').textContent = `Label: "${foodItem.dateType}"`;
    document.getElementById('inspector-tips').textContent = foodItem.storageTips;

    // Risk badge
    const riskBadge = document.getElementById('inspector-risk-badge');
    if (foodItem.safetyRating === 'high_risk') {
      riskBadge.textContent = 'High Pathogen Risk';
      riskBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded-full border bg-rose-500/20 text-rose-300 border-rose-500/30';
    } else if (foodItem.safetyRating === 'moderate_risk') {
      riskBadge.textContent = 'Moderate Risk';
      riskBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded-full border bg-amber-500/20 text-amber-300 border-amber-500/30';
    } else {
      riskBadge.textContent = 'Low Risk (Quality Degradation)';
      riskBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }

    // Shelf life grid
    document.getElementById('inspector-pantry-unopened').textContent = foodItem.pantryLife.unopened;
    document.getElementById('inspector-pantry-opened').textContent = foodItem.pantryLife.opened;
    document.getElementById('inspector-refrig-unopened').textContent = foodItem.refrigLife.unopened;
    document.getElementById('inspector-refrig-opened').textContent = foodItem.refrigLife.opened;
    document.getElementById('inspector-freezer').textContent = foodItem.freezeLife.duration;

    // Spoilage checklist
    document.getElementById('inspector-spoilage-look').textContent = foodItem.spoilageGuide.look;
    document.getElementById('inspector-spoilage-smell').textContent = foodItem.spoilageGuide.smell;
    document.getElementById('inspector-spoilage-touch').textContent = foodItem.spoilageGuide.touch;
    document.getElementById('inspector-taste-warning').textContent = `⚠️ Safety Note: ${foodItem.spoilageGuide.tasteWarning}`;
    document.getElementById('inspector-pathogen').textContent = foodItem.pathogenRisk || 'Nominal Microbial Baseline';
    document.getElementById('inspector-funfact').textContent = foodItem.funFact;

    // Show drawer
    const drawer = document.getElementById('inspector-drawer');
    const backdrop = document.getElementById('inspector-backdrop');
    
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
  }

  close() {
    const drawer = document.getElementById('inspector-drawer');
    const backdrop = document.getElementById('inspector-backdrop');

    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
  }
}
