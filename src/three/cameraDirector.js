import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { sound } from '../audio/sounds.js';

gsap.registerPlugin(ScrollTrigger);

export class CameraDirector {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;

    this.lookTarget = new THREE.Vector3(0, 0.4, 0);
    this.isFreeOrbit = false;
    this.activeTween = null;
    this.currentZone = 'hero';

    // Waypoint coordinates
    this.waypoints = {
      hero: { pos: new THREE.Vector3(0, 2.5, 9.5), target: new THREE.Vector3(0, 0.4, 0) },
      fridge: { pos: new THREE.Vector3(-4.2, 0.9, 2.2), target: new THREE.Vector3(-4.8, 0.6, -2.5) },
      pantry: { pos: new THREE.Vector3(4.2, 1.2, 2.2), target: new THREE.Vector3(4.8, 0.8, -2.5) },
      counter: { pos: new THREE.Vector3(0, 0.9, 3.6), target: new THREE.Vector3(0, -0.2, 0.8) },
      tools: { pos: new THREE.Vector3(0, 3.2, 10.5), target: new THREE.Vector3(0, 0.3, 0) },
    };

    // 1. Initialize Official OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera clipping through the floor
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 16.0;
    this.controls.enabled = false; // Disabled by default in story mode

    // 2. Set initial position
    this.camera.position.copy(this.waypoints.hero.pos);
    this.controls.target.copy(this.waypoints.hero.target);
    this.camera.lookAt(this.waypoints.hero.target);

    // 3. Initialize Story Scroll Triggers
    this.initStoryScrollTriggers();
  }

  initStoryScrollTriggers() {
    const sections = [
      { id: 'hero-section', zone: 'hero' },
      { id: 'fridge-story-section', zone: 'fridge' },
      { id: 'pantry-story-section', zone: 'pantry' },
      { id: 'labels-story-section', zone: 'counter' },
      { id: 'calculator-section', zone: 'tools' },
      { id: 'safety-wizard-section', zone: 'tools' },
      { id: 'danger-zone-section', zone: 'tools' },
      { id: 'scanner-section', zone: 'tools' },
      { id: 'my-pantry-section', zone: 'tools' },
    ];

    sections.forEach(({ id, zone }) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          if (!this.isFreeOrbit) {
            this.goToZone(zone, false);
          }
        },
        onEnterBack: () => {
          if (!this.isFreeOrbit) {
            this.goToZone(zone, false);
          }
        },
      });
    });
  }

  // Smooth camera transition to any target position & look-at vector
  transitionCamera(targetPos, targetLookAt, duration = 1.2, onComplete) {
    if (this.activeTween) {
      this.activeTween.kill();
    }

    const currentPos = this.camera.position;
    const currentTarget = this.controls.target;

    this.activeTween = gsap.timeline({
      onComplete: () => {
        this.activeTween = null;
        if (onComplete) onComplete();
      }
    });

    this.activeTween.to(currentPos, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: duration,
      ease: 'power2.out',
    }, 0);

    this.activeTween.to(currentTarget, {
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        this.camera.lookAt(currentTarget);
      }
    }, 0);
  }

  // Jump to specific zone waypoint ('hero' | 'fridge' | 'pantry' | 'counter' | 'tools')
  goToZone(zoneName, playAudio = true) {
    const wp = this.waypoints[zoneName];
    if (!wp) return;

    this.currentZone = zoneName;
    if (playAudio) sound.playTransition();

    this.transitionCamera(wp.pos, wp.target, 1.1);

    // Update zone nav button highlights in UI
    const zoneBtns = document.querySelectorAll('.zone-nav-btn');
    zoneBtns.forEach(btn => {
      if (btn.dataset.zone === zoneName) {
        btn.className = 'zone-nav-btn px-2.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-500 text-white shadow-glow-fresh transition-all';
      } else {
        btn.className = 'zone-nav-btn px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 transition-all';
      }
    });
  }

  // Focus on a specific 3D food item mesh
  focusOnItem(itemGroup, onComplete) {
    sound.playTransition();

    const worldPos = new THREE.Vector3();
    itemGroup.getWorldPosition(worldPos);

    // Determine clean camera offset based on item's location
    const isFridgeItem = worldPos.x < 0;
    const targetCamPos = new THREE.Vector3(
      worldPos.x + (isFridgeItem ? 0.35 : -0.35),
      worldPos.y + 0.25,
      worldPos.z + 1.6
    );

    const targetLookAt = new THREE.Vector3(
      worldPos.x,
      worldPos.y + 0.08,
      worldPos.z
    );

    this.transitionCamera(targetCamPos, targetLookAt, 1.2, onComplete);
  }

  setFreeOrbit(enabled) {
    this.isFreeOrbit = enabled;
    this.controls.enabled = enabled;

    if (enabled) {
      sound.playSelect();
    } else {
      // Return to current zone waypoint smoothly
      this.goToZone(this.currentZone);
    }
  }

  update() {
    if (this.controls && this.isFreeOrbit) {
      this.controls.update();
    }
  }
}
