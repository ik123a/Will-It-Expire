import * as THREE from 'three';
import { createKitchenEnvironment } from './environment.js';
import { createFoodModels } from './foodModels.js';
import { AnnotationManager } from './annotations.js';
import { RaycastController } from './raycaster.js';
import { CameraDirector } from './cameraDirector.js';

export class KitchenScene {
  constructor(canvasContainer, annotationContainer, onFoodSelected, onDoorStateChange) {
    this.canvasContainer = canvasContainer;
    this.annotationContainer = annotationContainer;
    this.onFoodSelected = onFoodSelected;
    this.onDoorStateChange = onDoorStateChange;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.annotationManager = null;
    this.raycastController = null;
    this.cameraDirector = null;
    this.interactiveItems = [];
    this.particles = null;
    this.environment = null;

    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.init();
  }

  init() {
    // 1. Scene with depth fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b0e17);
    this.scene.fog = new THREE.FogExp2(0x0b0e17, 0.035);

    // 2. Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.set(0, 2.5, 9.5);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.canvasContainer.appendChild(this.renderer.domElement);

    // 4. Lighting System
    this.setupLighting();

    // 5. Environment (Pantry, Refrigerator with articulated doors, Counter)
    this.environment = createKitchenEnvironment(this.scene);

    // 6. Food Items
    const { interactiveItems } = createFoodModels(this.scene);
    this.interactiveItems = interactiveItems;

    // Add door and freezer drawer to raycast clickable items list
    if (this.environment.fridgeDoorHinge) {
      this.interactiveItems.push(this.environment.fridgeDoorHinge);
    }
    if (this.environment.freezerDrawerGroup) {
      this.interactiveItems.push(this.environment.freezerDrawerGroup);
    }

    // 7. Ambient Floating Dust Particles
    this.setupParticles();

    // 8. Annotations Manager (only for actual food items)
    const foodOnlyItems = this.interactiveItems.filter(i => i.userData.foodData);
    this.annotationManager = new AnnotationManager(this.camera, this.annotationContainer);
    this.annotationManager.init(foodOnlyItems, (itemGroup) => {
      this.handleItemInteraction(itemGroup);
    });

    // 9. Raycast Controller
    this.raycastController = new RaycastController(
      this.camera,
      this.renderer,
      this.interactiveItems,
      (itemGroup) => {
        this.handleItemInteraction(itemGroup);
      },
      (doorType) => {
        if (doorType === 'fridge') {
          this.toggleFridgeDoor();
        } else if (doorType === 'freezer') {
          this.toggleFreezerDrawer();
        }
      }
    );

    // 10. Camera Director
    this.cameraDirector = new CameraDirector(this.camera, this.scene, this.renderer);

    // Window resize
    window.addEventListener('resize', this.onWindowResize);

    // Render loop
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.4);
    sunLight.position.set(6, 9, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -9;
    sunLight.shadow.camera.right = 9;
    sunLight.shadow.camera.top = 9;
    sunLight.shadow.camera.bottom = -9;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.6);
    fillLight.position.set(-8, 5, 4);
    this.scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0x38bdf8, 2.0, 20, Math.PI / 4, 0.5);
    rimLight.position.set(0, 8, -6);
    this.scene.add(rimLight);
  }

  setupParticles() {
    const particleCount = 80;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 8 + 1;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  toggleFridgeDoor() {
    if (this.environment && this.environment.toggleFridgeDoor) {
      const isOpen = this.environment.toggleFridgeDoor((openState) => {
        if (this.onDoorStateChange) this.onDoorStateChange('fridge', openState);
      });
      return isOpen;
    }
    return false;
  }

  toggleFreezerDrawer() {
    if (this.environment && this.environment.toggleFreezerDrawer) {
      const isOpen = this.environment.toggleFreezerDrawer((openState) => {
        if (this.onDoorStateChange) this.onDoorStateChange('freezer', openState);
      });
      return isOpen;
    }
    return false;
  }

  handleItemInteraction(itemGroup) {
    // If the food item is inside the fridge or freezer and it is closed, auto-open the door
    const foodData = itemGroup.userData.foodData;
    if (foodData) {
      if (foodData.idealStorage === 'fridge' && this.environment && !this.environment.isFridgeOpen()) {
        this.toggleFridgeDoor();
      } else if (foodData.idealStorage === 'freezer' && this.environment && !this.environment.isFreezerOpen()) {
        this.toggleFreezerDrawer();
      }
    }

    if (this.cameraDirector) {
      this.cameraDirector.focusOnItem(itemGroup, () => {
        if (this.onFoodSelected) {
          this.onFoodSelected(itemGroup.userData.foodData, itemGroup);
        }
      });
    } else if (this.onFoodSelected) {
      this.onFoodSelected(itemGroup.userData.foodData, itemGroup);
    }
  }

  selectFoodById(foodId) {
    const found = this.interactiveItems.find(item => item.userData.foodId === foodId);
    if (found) {
      this.handleItemInteraction(found);
      return true;
    }
    return false;
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.particles) {
      this.particles.rotation.y += 0.0006;
    }

    if (this.cameraDirector) {
      this.cameraDirector.update();
    }

    if (this.annotationManager) {
      this.annotationManager.update();
    }

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
