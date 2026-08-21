import { sound } from '../audio/sounds.js';

export class TemperatureSimulatorUI {
  constructor({ containerId }) {
    this.container = document.getElementById(containerId);
    this.currentTempF = 72; // default room temperature

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  getTempData(tempF) {
    const tempC = Math.round(((tempF - 32) * 5) / 9);

    if (tempF <= 0) {
      return {
        zone: 'Deep Freeze Zone',
        badge: '❄️ BACTERIA DORMANT',
        colorClass: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
        barColor: '#0ea5e9',
        description: 'Microbial activity is in complete suspended animation. Freezing preserves food safety indefinitely, though texture slowly degrades over months.',
        bacterialRate: '0x (Completely Stopped)',
        maxTime: 'Indefinite (USDA)',
        hazardLevel: 'None (Safe)'
      };
    } else if (tempF > 0 && tempF <= 40) {
      return {
        zone: 'Safe Cold Refrigerator',
        badge: '🧊 SAFE COLD ZONE',
        colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        barColor: '#10b981',
        description: 'Bacterial multiplication is slowed to a crawl. Food remains safe for standard USDA shelf lives. Note: <em>Listeria monocytogenes</em> can still slowly multiply at 36-40°F.',
        bacterialRate: 'Very Slow (1x)',
        maxTime: 'Standard Shelf Life (Days to Weeks)',
        hazardLevel: 'Low Hazard'
      };
    } else if (tempF > 40 && tempF <= 90) {
      return {
        zone: '🔥 THE BACTERIAL DANGER ZONE',
        badge: '⚠️ DANGER ZONE: DOUBLES EVERY 20 MIN',
        colorClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        barColor: '#f59e0b',
        description: 'Pathogenic bacteria (Salmonella, E. coli, Staph) multiply exponentially at room temperature. A single bacterium multiplies into over 2 million cells in just 7 hours.',
        bacterialRate: 'Exponential (2x every 20 minutes)',
        maxTime: '2 Hours Maximum (1 hr if ambient >90°F)',
        hazardLevel: 'High Hazard'
      };
    } else if (tempF > 90 && tempF <= 140) {
      return {
        zone: '🚨 CRITICAL BACTERIAL ACCELERATION',
        badge: '🚫 MAXIMUM PATHOGEN REPRODUCTION',
        colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        barColor: '#f43f5e',
        description: 'Peak temperature for rapid bacterial reproduction. Food left in a warm car, picnic, or lukewarm buffet table produces heat-stable enterotoxins rapidly.',
        bacterialRate: 'Ultra Rapid (Peak Virulence)',
        maxTime: '1 Hour Maximum Limit',
        hazardLevel: 'Severe Hazard'
      };
    } else if (tempF > 140 && tempF < 165) {
      return {
        zone: 'Safe Hot Holding Zone',
        badge: '♨️ HOT HOLDING (BACTERIOSTATIC)',
        colorClass: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
        barColor: '#14b8a6',
        description: 'Commercial steam tables and slow cookers hold food at or above 140°F to prevent bacteria from multiplying during service.',
        bacterialRate: '0x (Multiplication Suppressed)',
        maxTime: 'Up to 4 Hours during food service',
        hazardLevel: 'Safe (Hot)'
      };
    } else {
      return {
        zone: 'Bacterial Thermal Destruction Zone',
        badge: '⚡ THERMAL KILL ZONE (SAFE)',
        colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        barColor: '#10b981',
        description: 'Cooking food to an internal 165°F (74°C) instantaneously destroys Salmonella, Campylobacter, and vegetative pathogens throughout meat and poultry.',
        bacterialRate: '99.999% Pathogen Thermal Destruction',
        maxTime: 'Immediate Safety Achieved',
        hazardLevel: 'Fully Sanitized (Cooked)'
      };
    }
  }

  render() {
    const data = this.getTempData(this.currentTempF);
    const tempC = Math.round(((this.currentTempF - 32) * 5) / 9);

    this.container.innerHTML = `
      <div class="bg-obsidian-900/90 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-bezel">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xl">
              🌡️
            </div>
            <div>
              <h3 class="text-xl font-bold text-white font-display">Temperature Danger Zone Simulator</h3>
              <p class="text-xs text-slate-400">Interactive thermal slider demonstrating bacterial multiplication rates between 0°F and 212°F.</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Slider Column -->
          <div class="lg:col-span-6 space-y-6">
            
            <!-- Temperature Readout -->
            <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span class="text-xs text-slate-400 font-mono block">Current Temperature</span>
                <span class="text-3xl font-extrabold text-white font-mono">${this.currentTempF}°F <span class="text-lg text-slate-400 font-normal">(${tempC}°C)</span></span>
              </div>
              <span class="text-[11px] font-mono uppercase px-3 py-1 rounded-full border ${data.colorClass}">
                ${data.badge}
              </span>
            </div>

            <!-- Range Slider -->
            <div class="space-y-2">
              <input id="temp-slider-input" type="range" min="0" max="212" value="${this.currentTempF}" class="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400">
              <div class="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0°F (Freeze)</span>
                <span>40°F (Fridge)</span>
                <span>70°F (Room)</span>
                <span>140°F (Holding)</span>
                <span>165°F (Cooked)</span>
                <span>212°F (Boil)</span>
              </div>
            </div>

            <!-- Quick Presets -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Quick Thermal Presets</label>
              <div class="grid grid-cols-3 gap-2">
                <button data-temp="0" class="temp-preset-btn py-2 px-2.5 rounded-xl border text-[11px] font-medium bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 transition-all text-center">
                  ❄️ Freezer (0°F)
                </button>
                <button data-temp="37" class="temp-preset-btn py-2 px-2.5 rounded-xl border text-[11px] font-medium bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 transition-all text-center">
                  🧊 Fridge (37°F)
                </button>
                <button data-temp="72" class="temp-preset-btn py-2 px-2.5 rounded-xl border text-[11px] font-medium bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 transition-all text-center">
                  🏠 Room (72°F)
                </button>
                <button data-temp="95" class="temp-preset-btn py-2 px-2.5 rounded-xl border text-[11px] font-medium bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 transition-all text-center">
                  ☀️ Hot Car (95°F)
                </button>
                <button data-temp="145" class="temp-preset-btn py-2 px-2.5 rounded-xl border text-[11px] font-medium bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 transition-all text-center">
                  ♨️ Holding (145°F)
                </button>
                <button data-temp="165" class="temp-preset-btn py-2 px-2.5 rounded-xl border text-[11px] font-medium bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 transition-all text-center">
                  🍗 Chicken (165°F)
                </button>
              </div>
            </div>

          </div>

          <!-- Impact & Biological Breakdown Column -->
          <div class="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
            
            <div class="space-y-4">
              <div>
                <span class="text-xs text-slate-400 font-mono uppercase">Zone Classification</span>
                <h4 class="text-xl font-bold text-white font-display mt-0.5">${data.zone}</h4>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed">${data.description}</p>

              <div class="grid grid-cols-2 gap-3 pt-2">
                <div class="p-3 rounded-xl bg-obsidian-950/60 border border-white/10">
                  <span class="text-[10px] font-mono text-slate-400 block">Bacterial Growth Rate</span>
                  <span class="text-xs font-bold text-white">${data.bacterialRate}</span>
                </div>
                <div class="p-3 rounded-xl bg-obsidian-950/60 border border-white/10">
                  <span class="text-[10px] font-mono text-slate-400 block">Safe Time Threshold</span>
                  <span class="text-xs font-bold text-white">${data.maxTime}</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 italic">
              Rule of Thumb: <strong>"When in doubt, throw it out!"</strong> Never rely on taste or smell alone for food left in the Danger Zone (>2 hours).
            </div>

          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const slider = document.getElementById('temp-slider-input');
    const presetBtns = document.querySelectorAll('.temp-preset-btn');

    if (slider) {
      slider.addEventListener('input', (e) => {
        this.currentTempF = parseInt(e.target.value, 10);
        this.render();
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playHover();
        this.currentTempF = parseInt(btn.dataset.temp, 10);
        this.render();
      });
    });
  }
}
