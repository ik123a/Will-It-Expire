import * as THREE from 'three';
import gsap from 'gsap';
import { sound } from '../audio/sounds.js';

export class RaycastController {
  constructor(camera, renderer, interactiveItems, onItemSelect, onDoorToggle) {
    this.camera = camera;
    this.renderer = renderer;
    this.interactiveItems = interactiveItems;
    this.onItemSelect = onItemSelect;
    this.onDoorToggle = onDoorToggle;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    this.isEnabled = true;

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onClick = this.onClick.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('pointermove', this.onPointerMove);
    this.renderer.domElement.addEventListener('click', this.onClick);
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
    if (!enabled && this.hoveredObject) {
      this.resetHover();
    }
  }

  getIntersectedGroup(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Find intersections with all children of interactive groups
    const flatMeshes = [];
    this.interactiveItems.forEach(group => {
      group.traverse(child => {
        if (child.isMesh) flatMeshes.push(child);
      });
    });

    const intersects = this.raycaster.intersectObjects(flatMeshes, false);
    if (intersects.length > 0) {
      let current = intersects[0].object;
      while (current && !this.interactiveItems.includes(current)) {
        current = current.parent;
      }
      return current;
    }
    return null;
  }

  onPointerMove(event) {
    if (!this.isEnabled) return;

    const hitGroup = this.getIntersectedGroup(event);

    if (hitGroup !== this.hoveredObject) {
      this.resetHover();

      if (hitGroup) {
        this.hoveredObject = hitGroup;
        document.body.style.cursor = 'pointer';
        sound.playHover();

        // Only scale/lift food items, never distort doors or structural groups
        if (hitGroup.userData && hitGroup.userData.foodData) {
          gsap.killTweensOf(hitGroup.scale);
          gsap.killTweensOf(hitGroup.position);

          const origScale = hitGroup.userData.originalScale || new THREE.Vector3(1, 1, 1);
          const origY = hitGroup.userData.originalY !== undefined ? hitGroup.userData.originalY : hitGroup.position.y;

          gsap.to(hitGroup.scale, {
            x: origScale.x * 1.08,
            y: origScale.y * 1.08,
            z: origScale.z * 1.08,
            duration: 0.22,
            ease: 'power2.out',
          });
          gsap.to(hitGroup.position, {
            y: origY + 0.1,
            duration: 0.22,
            ease: 'power2.out',
          });
        }
      } else {
        document.body.style.cursor = 'default';
      }
    }
  }

  resetHover() {
    if (this.hoveredObject) {
      if (this.hoveredObject.userData && this.hoveredObject.userData.foodData) {
        gsap.killTweensOf(this.hoveredObject.scale);
        gsap.killTweensOf(this.hoveredObject.position);

        const origScale = this.hoveredObject.userData.originalScale || new THREE.Vector3(1, 1, 1);
        const origY = this.hoveredObject.userData.originalY !== undefined ? this.hoveredObject.userData.originalY : this.hoveredObject.position.y;

        gsap.to(this.hoveredObject.scale, {
          x: origScale.x,
          y: origScale.y,
          z: origScale.z,
          duration: 0.22,
          ease: 'power2.out',
        });
        gsap.to(this.hoveredObject.position, {
          y: origY,
          duration: 0.22,
          ease: 'power2.out',
        });
      }
      this.hoveredObject = null;
    }
    document.body.style.cursor = 'default';
  }

  onClick(event) {
    if (!this.isEnabled) return;

    const hitGroup = this.getIntersectedGroup(event);
    if (hitGroup) {
      if (hitGroup.userData.isFridgeDoor || hitGroup.userData.isFreezerDrawer) {
        if (this.onDoorToggle) {
          this.onDoorToggle(hitGroup.userData.isFridgeDoor ? 'fridge' : 'freezer');
        }
        return;
      }

      if (this.onItemSelect) {
        sound.playSelect();
        this.onItemSelect(hitGroup);
      }
    }
  }

  dispose() {
    window.removeEventListener('pointermove', this.onPointerMove);
    this.renderer.domElement.removeEventListener('click', this.onClick);
  }
}
