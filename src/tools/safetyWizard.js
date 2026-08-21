import { sound } from '../audio/sounds.js';

/**
 * "Can I Eat This?" Interactive Food Safety Diagnostic Decision Tree
 * Evaluates food category, temperature history, sensory factors, and mold penetration
 * to render an instant FDA/USDA-backed safety verdict.
 */
export class SafetyWizardUI {
  constructor({ containerId, onOpenFoodDetails }) {
    this.container = document.getElementById(containerId);
    this.onOpenFoodDetails = onOpenFoodDetails;

    this.state = {
      foodType: 'perishable_meat_dairy', // 'perishable_meat_dairy' | 'soft_cheese' | 'hard_cheese' | 'canned' | 'produce_soft' | 'produce_hard' | 'pantry_dry'
      leftAtRoomTemp: false,
      visibleMold: false,
      badOdor: false,
      slimyTexture: false,
      swollenPackage: false,
    };

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  evaluateVerdict() {
    const { foodType, leftAtRoomTemp, visibleMold, badOdor, slimyTexture, swollenPackage } = this.state;

    // 1. Critical Hazard: Swollen or bulging can / vacuum pack
    if (swollenPackage) {
      return {
        level: 'danger',
        badge: '🚫 CRITICAL HAZARD: BOTULISM RISK',
        title: 'Do Not Taste — Discard Immediately!',
        explanation: 'A bulging, swollen, or spurting container indicates active gas production by anaerobic bacteria like <strong>Clostridium botulinum</strong> or extreme wild yeast pressure. Botulinum neurotoxin is fatal even in microscopic doses.',
        action: 'Double-bag the container and discard in outdoor trash. Never taste-test food from swollen packages.',
        colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        pathogen: 'Clostridium botulinum / Microbial Gas Fermentation'
      };
    }

    // 2. Critical Hazard: Perishable meat/dairy/seafood left in Danger Zone > 2 hours
    if ((foodType === 'perishable_meat_dairy' || foodType === 'soft_cheese') && leftAtRoomTemp) {
      return {
        level: 'danger',
        badge: '🚫 UNHEALTHY: DANGER ZONE TIME LIMIT EXCEEDED',
        title: 'Discard: Bacterial Multiplications Out of Control',
        explanation: 'Perishable meat, poultry, seafood, cut dairy, and cooked leftovers left between 40°F and 140°F (4°C - 60°C) for over 2 hours allow bacteria like <em>Staphylococcus aureus</em> and <em>Bacillus cereus</em> to produce heat-stable enterotoxins that cannot be destroyed by cooking.',
        action: 'Throw away. Reheating will kill the live bacteria but will NOT neutralize heat-stable enterotoxins.',
        colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        pathogen: 'Staphylococcus aureus, Bacillus cereus'
      };
    }

    // 3. Mold on Soft Foods vs Hard Foods
    if (visibleMold) {
      if (foodType === 'hard_cheese' || foodType === 'produce_hard') {
        return {
          level: 'caution',
          badge: '⚠️ CONDITIONAL SALVAGE: CUT WITH 1-INCH MARGIN',
          title: 'Trim 1 Inch Around Mold and Consume Rest',
          explanation: 'On dense foods with low moisture (Hard Cheddar, Parmesan, Carrots, Cabbage, Bell Peppers), mold hyphae cannot penetrate deeply. You can safely cut at least 1 inch (2.5 cm) around and below the mold spot. Do not let the knife touch the mold to prevent cross-contamination.',
          action: 'Carve out a 1-inch perimeter around the mold with a clean knife. The remaining block is safe to eat.',
          colorClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
          pathogen: 'Surface Penicillium / Aspergillus Molds'
        };
      } else {
        return {
          level: 'danger',
          badge: '🚫 TOXIC: DEEP MOLD MYCOTOXIN PENETRATION',
          title: 'Discard: Mycotoxins Spread Throughout Soft Food',
          explanation: 'On porous or high-moisture foods (Bread, Soft Cheese, Yogurt, Strawberries, Cooked Leftovers, Deli Meat), visible mold is only the fruiting tip. Microscopic root threads (hyphae) and invisible mycotoxins penetrate throughout the entire item.',
          action: 'Discard the whole container/loaf immediately. Never scrape mold off bread or soft dairy.',
          colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
          pathogen: 'Mycotoxins & Fungal Hyphae'
        };
      }
    }

    // 4. Foul Odor or Slimy Texture on Meats/Produce
    if (badOdor || slimyTexture) {
      return {
        level: 'danger',
        badge: '🚫 SPOILED: BACTERIAL DECOMPOSITION',
        title: 'Discard: Active Bacterial Decomposition',
        explanation: 'Sour, ammonia, putrid smells, or a slippery mucus coating on meats and vegetables are caused by large colonies of decomposing bacteria (e.g. <em>Pseudomonas</em>, <em>Listeria</em>) breaking down proteins and fats into volatile amines and sulfur.',
        action: 'Throw away. Do not attempt to wash or rinse slimy meat or fish.',
        colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        pathogen: 'Pseudomonas, Proteus, Salmonella'
      };
    }

    // 5. Hard pantry dry goods left at room temp
    if (foodType === 'pantry_dry') {
      return {
        level: 'safe',
        badge: '✅ SAFE TO CONSUME: PANTRY STABLE',
        title: 'Safe to Eat (Inspect for Weevils or Stale Flavor)',
        explanation: 'Dry pantry goods (White Rice, Dry Pasta, Rolled Oats, Pure Honey, Granulated Sugar, Salt) have low water activity (Aw < 0.6) and cannot support pathogenic bacterial reproduction at room temperature.',
        action: 'Safe to prepare. Ensure dry storage away from moisture.',
        colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        pathogen: 'Extremely Low Pathogen Risk'
      };
    }

    // Default Safe Verdict
    return {
      level: 'safe',
      badge: '✅ FOOD SAFETY CRITERIA PASSED: SAFE TO EAT',
      title: 'Optimal Sensory & Biological Condition',
      explanation: 'No signs of temperature abuse, microbial gas, mold penetration, or sensory spoilage detected. If kept properly stored in the refrigerator or pantry within standard USDA timelines, this food is safe to prepare and enjoy.',
      action: 'Safe to consume. Follow recommended cooking temperatures (165°F for poultry, 160°F for ground beef, 145°F for steaks/seafood).',
      colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      pathogen: 'Nominal Bacterial Baseline'
    };
  }

  render() {
    const verdict = this.evaluateVerdict();

    this.container.innerHTML = `
      <div class="bg-obsidian-900/90 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-bezel">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl">
              🩺
            </div>
            <div>
              <h3 class="text-xl font-bold text-white font-display">"Can I Eat This?" Sensory Diagnostic Wizard</h3>
              <p class="text-xs text-slate-400">Step-by-step diagnostic decision tree based on USDA & FDA microbiological thresholds.</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Left Questions Column -->
          <div class="lg:col-span-6 space-y-5">
            
            <!-- Question 1: Food Matrix Type -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">1. What type of food are you inspecting?</label>
              <select id="wizard-food-type" class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors">
                <option value="perishable_meat_dairy" ${this.state.foodType === 'perishable_meat_dairy' ? 'selected' : ''} class="bg-obsidian-900">🥩 Raw Meat, Poultry, Seafood, or Cooked Leftovers</option>
                <option value="soft_cheese" ${this.state.foodType === 'soft_cheese' ? 'selected' : ''} class="bg-obsidian-900">🥛 Milk, Yogurt, Sour Cream, Brie, or Soft Cheeses</option>
                <option value="hard_cheese" ${this.state.foodType === 'hard_cheese' ? 'selected' : ''} class="bg-obsidian-900">🧀 Hard Block Cheese (Cheddar, Parmesan, Swiss)</option>
                <option value="produce_soft" ${this.state.foodType === 'produce_soft' ? 'selected' : ''} class="bg-obsidian-900">🍓 Soft Fruits & Veggies (Strawberries, Bread, Tomatoes, Spinach)</option>
                <option value="produce_hard" ${this.state.foodType === 'produce_hard' ? 'selected' : ''} class="bg-obsidian-900">🥕 Hard Dense Produce (Carrots, Apples, Potatoes, Cabbage)</option>
                <option value="canned" ${this.state.foodType === 'canned' ? 'selected' : ''} class="bg-obsidian-900">🥫 Canned Foods, Broths, or Jarred Preserves</option>
                <option value="pantry_dry" ${this.state.foodType === 'pantry_dry' ? 'selected' : ''} class="bg-obsidian-900">🌾 Dry Pantry Staples (Rice, Dry Pasta, Oats, Honey, Sugar)</option>
              </select>
            </div>

            <!-- Sensory Checkbox Toggles -->
            <div class="space-y-2.5">
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400">2. Sensory & Environmental Checks</label>
              
              <!-- Check 1: Room Temp Exposure -->
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <input type="checkbox" id="check-room-temp" ${this.state.leftAtRoomTemp ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500 bg-white/10 border-white/20 focus:ring-0">
                <span class="text-xs text-slate-300">Left in Room Temp / Car (>40°F / 4°C) for <strong>more than 2 hours</strong></span>
              </label>

              <!-- Check 2: Visible Mold -->
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <input type="checkbox" id="check-mold" ${this.state.visibleMold ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500 bg-white/10 border-white/20 focus:ring-0">
                <span class="text-xs text-slate-300">Visible <strong>Mold Fuzz</strong> (white, green, blue, black, or pink spots)</span>
              </label>

              <!-- Check 3: Bad Odor -->
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <input type="checkbox" id="check-odor" ${this.state.badOdor ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500 bg-white/10 border-white/20 focus:ring-0">
                <span class="text-xs text-slate-300">Unpleasant, <strong>sour, pungent, ammonia</strong> or putrid smell</span>
              </label>

              <!-- Check 4: Slimy Texture -->
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <input type="checkbox" id="check-slime" ${this.state.slimyTexture ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500 bg-white/10 border-white/20 focus:ring-0">
                <span class="text-xs text-slate-300"><strong>Slimy, sticky, slick or mushy</strong> breakdown</span>
              </label>

              <!-- Check 5: Swollen Package -->
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <input type="checkbox" id="check-swollen" ${this.state.swollenPackage ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500 bg-white/10 border-white/20 focus:ring-0">
                <span class="text-xs text-slate-300"><strong>Swollen, bloated, bulging</strong> container or hiss/gas upon opening</span>
              </label>

            </div>

          </div>

          <!-- Right Verdict Display Column -->
          <div class="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
            
            <div class="space-y-4">
              
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${verdict.colorClass}">
                  ${verdict.badge}
                </span>
              </div>

              <h4 class="text-xl font-bold text-white font-display">${verdict.title}</h4>

              <p class="text-xs text-slate-300 leading-relaxed">${verdict.explanation}</p>

              <div class="p-4 rounded-xl bg-obsidian-950/60 border border-white/10 space-y-2">
                <div class="text-[11px] font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                  <span>📌</span> Recommended Action:
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">${verdict.action}</p>
                <div class="text-[10px] font-mono text-slate-500 pt-1 border-t border-white/5">
                  Biological Concern: <span class="text-slate-300">${verdict.pathogen}</span>
                </div>
              </div>

            </div>

            <div class="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500 italic">
              * Based on USDA FSIS (Food Safety and Inspection Service) guidelines and FDA Model Food Code standards.
            </div>

          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const foodTypeSelect = document.getElementById('wizard-food-type');
    const checkRoomTemp = document.getElementById('check-room-temp');
    const checkMold = document.getElementById('check-mold');
    const checkOdor = document.getElementById('check-odor');
    const checkSlime = document.getElementById('check-slime');
    const checkSwollen = document.getElementById('check-swollen');

    if (foodTypeSelect) {
      foodTypeSelect.addEventListener('change', (e) => {
        sound.playHover();
        this.state.foodType = e.target.value;
        this.render();
      });
    }

    if (checkRoomTemp) {
      checkRoomTemp.addEventListener('change', (e) => {
        sound.playHover();
        this.state.leftAtRoomTemp = e.target.checked;
        this.render();
      });
    }

    if (checkMold) {
      checkMold.addEventListener('change', (e) => {
        sound.playHover();
        this.state.visibleMold = e.target.checked;
        this.render();
      });
    }

    if (checkOdor) {
      checkOdor.addEventListener('change', (e) => {
        sound.playHover();
        this.state.badOdor = e.target.checked;
        this.render();
      });
    }

    if (checkSlime) {
      checkSlime.addEventListener('change', (e) => {
        sound.playHover();
        this.state.slimyTexture = e.target.checked;
        this.render();
      });
    }

    if (checkSwollen) {
      checkSwollen.addEventListener('change', (e) => {
        sound.playHover();
        this.state.swollenPackage = e.target.checked;
        this.render();
      });
    }
  }
}
