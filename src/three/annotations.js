import * as THREE from 'three';

const clamp = (v, lo, hi) => (lo > hi ? (lo + hi) / 2 : Math.min(Math.max(v, lo), hi));

const inflate = (r, by) => ({
  left: r.left - by,
  right: r.right + by,
  top: r.top - by,
  bottom: r.bottom + by,
});

const overlaps = (a, b) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

/**
 * Manages floating 3D-to-2D screen-space HTML annotations above interactive items.
 */
export class AnnotationManager {
  constructor(camera, container) {
    this.camera = camera;
    this.container = container;
    this.annotations = [];
    this.tempVec = new THREE.Vector3();
    this.onItemClickCallback = null;
    this.sizesDirty = true;
  }

  init(interactiveItems, onItemClick) {
    this.onItemClickCallback = onItemClick;
    this.container.innerHTML = '';
    this.annotations = [];

    interactiveItems.forEach((group) => {
      const data = group.userData.foodData;
      if (!data) return;

      const el = document.createElement('button');
      el.className = 'annotation-tag absolute pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-obsidian-900/85 border border-white/15 text-slate-200 shadow-bezel transition-all duration-200 hover:scale-105 hover:border-emerald-400/50 hover:bg-obsidian-800 focus:outline-none';
      
      let quickLife = 'Fresh';
      if (data.idealStorage === 'fridge') {
        quickLife = data.refrigLife.opened || 'Refrigerate';
      } else {
        quickLife = data.pantryLife.opened || 'Pantry';
      }

      el.innerHTML = `
        <span class="text-sm">${data.icon}</span>
        <span class="font-medium text-slate-100">${data.name.split(' ')[0]}</span>
        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-300">${quickLife}</span>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onItemClickCallback) {
          this.onItemClickCallback(group);
        }
      });

      this.container.appendChild(el);
      this.annotations.push({
        element: el,
        object: group,
        offsetY: group.userData.floatOffset || 0.6,
        w: 0,
        h: 0,
      });
    });

    this.sizesDirty = true;
    if (!this.onResize) {
      this.onResize = () => { this.sizesDirty = true; };
      window.addEventListener('resize', this.onResize);
    }
  }

  update() {
    if (!this.annotations.length || !this.camera) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 10;
    const margin = 14;

    this.measure();

    // Obstacles: hero copy plus fixed chrome. Without the chrome, clamping a
    // far off-screen anchor parks its tag under the header, reading as clipped.
    const reserved = [];
    for (const sel of ['.story-content-card', 'header', '#zone-nav']) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
      reserved.push(inflate(r, gap));
    }

    const candidates = [];
    for (const ann of this.annotations) {
      ann.object.getWorldPosition(this.tempVec);
      this.tempVec.y += ann.offsetY;
      this.tempVec.project(this.camera);

      if (this.tempVec.z > 1.0) {
        ann.element.style.display = 'none';
        continue;
      }

      candidates.push({
        ann,
        x: this.tempVec.x * (vw / 2) + vw / 2,
        y: -(this.tempVec.y * (vh / 2)) + vh / 2,
        z: this.tempVec.z,
      });
    }

    // Nearest to camera wins its natural position; the rest step aside.
    candidates.sort((a, b) => a.z - b.z);

    const placed = reserved.slice();
    for (const c of candidates) {
      const { element, w, h } = c.ann;
      if (!w || !h) {
        element.style.display = 'none';
        continue;
      }

      // Clamp using the tag's real size: the old fixed +/-50px test ran before
      // translate(-50%), so edge tags still overflowed and got clipped.
      const cx = clamp(c.x, margin + w / 2, vw - margin - w / 2);
      const step = h + gap;

      let chosen = null;
      for (let i = 0; i < 7 && !chosen; i++) {
        for (const sign of i === 0 ? [0] : [-1, 1]) {
          const cy = clamp(c.y + sign * i * step, margin + h, vh - margin);
          const rect = { left: cx - w / 2, right: cx + w / 2, top: cy - h, bottom: cy };
          if (placed.some((p) => overlaps(rect, p))) continue;
          chosen = { cy, rect };
          break;
        }
      }

      if (!chosen) {
        element.style.display = 'none';
        continue;
      }

      placed.push(chosen.rect);
      element.style.display = 'flex';
      element.style.transform =
        `translate(-50%, -100%) translate3d(${cx}px, ${chosen.cy}px, 0)`;
    }
  }

  // Sizes are static per tag, so measure once instead of forcing a layout
  // read for every tag on every frame.
  measure() {
    if (!this.sizesDirty && this.annotations.every((a) => a.w)) return;
    for (const ann of this.annotations) {
      ann.w = ann.element.offsetWidth;
      ann.h = ann.element.offsetHeight;
    }
    this.sizesDirty = false;
  }

  setVisible(visible) {
    this.container.style.opacity = visible ? '1' : '0';
    this.container.style.pointerEvents = visible ? 'auto' : 'none';
  }
}
