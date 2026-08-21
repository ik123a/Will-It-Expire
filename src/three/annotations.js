import * as THREE from 'three';

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
      });
    });
  }

  update() {
    if (!this.annotations.length || !this.camera) return;

    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    this.annotations.forEach(({ element, object, offsetY }) => {
      object.getWorldPosition(this.tempVec);
      this.tempVec.y += offsetY;

      // Project 3D coordinate to Normalized Device Coordinates (-1 to +1)
      this.tempVec.project(this.camera);

      // Check if item is in front of camera view frustum
      if (this.tempVec.z > 1.0) {
        element.style.display = 'none';
        return;
      }

      const x = (this.tempVec.x * widthHalf) + widthHalf;
      const y = -(this.tempVec.y * heightHalf) + heightHalf;

      // Check if coordinate is inside screen boundaries
      if (x < -50 || x > window.innerWidth + 50 || y < -50 || y > window.innerHeight + 50) {
        element.style.display = 'none';
      } else {
        element.style.display = 'flex';
        element.style.transform = `translate(-50%, -100%) translate3d(${x}px, ${y}px, 0)`;
      }
    });
  }

  setVisible(visible) {
    this.container.style.opacity = visible ? '1' : '0';
    this.container.style.pointerEvents = visible ? 'auto' : 'none';
  }
}
