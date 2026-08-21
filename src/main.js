import './style.css';
import { KitchenScene } from './three/scene.js';
import { InspectorModal } from './ui/inspectorModal.js';
import { SearchEngineUI } from './ui/searchEngine.js';
import { FreshnessCalculatorUI } from './ui/calculatorUI.js';
import { PantryTrackerUI } from './ui/pantryTracker.js';
import { SafetyWizardUI } from './tools/safetyWizard.js';
import { TemperatureSimulatorUI } from './tools/temperatureSimulator.js';
import { ScannerSimulatorUI } from './tools/scannerSimulator.js';
import { getFoodById } from './data/foodkeeper-data.js';
import { sound } from './audio/sounds.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Containers
  const canvasContainer = document.getElementById('canvas-3d');
  const annotationsContainer = document.getElementById('annotations-container');
  const inspectorContainer = document.getElementById('inspector-modal-container');

  // Door buttons & labels
  const fridgeDoorBtn = document.getElementById('fridge-door-toggle-btn');
  const fridgeDoorText = document.getElementById('fridge-door-btn-text');
  const freezerDrawerBtn = document.getElementById('freezer-drawer-toggle-btn');
  const freezerDrawerText = document.getElementById('freezer-drawer-btn-text');

  // --- 1. Initialize Core Components ---
  let kitchenScene = null;
  let inspectorModal = null;
  let searchEngine = null;
  let calculatorUI = null;
  let pantryTracker = null;
  let safetyWizard = null;
  let tempSimulator = null;
  let scannerSimulator = null;

  // Initialize Pantry Tracker
  pantryTracker = new PantryTrackerUI({
    containerId: 'pantry-tracker-container',
    onInspectFood: (foodItem) => {
      if (kitchenScene) {
        kitchenScene.selectFoodById(foodItem.id);
      }
      if (inspectorModal) {
        inspectorModal.open(foodItem);
      }
    }
  });

  // Initialize Freshness Calculator UI
  calculatorUI = new FreshnessCalculatorUI({
    containerId: 'calculator-container',
    onAddToPantry: (foodItem, options) => {
      if (pantryTracker) {
        pantryTracker.addItem(foodItem, options);
      }
    }
  });

  // Initialize Safety Diagnostic Wizard
  safetyWizard = new SafetyWizardUI({
    containerId: 'safety-wizard-container',
    onOpenFoodDetails: (foodItem) => {
      if (inspectorModal) {
        inspectorModal.open(foodItem);
      }
    }
  });

  // Initialize Temperature Danger Zone Simulator
  tempSimulator = new TemperatureSimulatorUI({
    containerId: 'danger-zone-container'
  });

  // Initialize Barcode & Grocery Scanner Simulator
  scannerSimulator = new ScannerSimulatorUI({
    containerId: 'scanner-container',
    onAddMultipleToPantry: (itemsToAdd) => {
      if (pantryTracker) {
        pantryTracker.addMultipleItems(itemsToAdd);
      }
    },
    onSingleScanned: (foodItem) => {
      if (inspectorModal) {
        inspectorModal.open(foodItem);
      }
    }
  });

  // Initialize Inspector Modal
  inspectorModal = new InspectorModal(
    inspectorContainer,
    (foodItem) => {
      if (pantryTracker) {
        pantryTracker.addItem(foodItem);
      }
      inspectorModal.close();
    },
    (foodItem) => {
      if (calculatorUI) {
        calculatorUI.setFoodItem(foodItem);
      }
      const calcSection = document.getElementById('calculator-section');
      if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  );

  // Initialize 3D Kitchen Scene
  kitchenScene = new KitchenScene(
    canvasContainer,
    annotationsContainer,
    (foodData, itemGroup) => {
      if (inspectorModal) {
        inspectorModal.open(foodData);
      }
    },
    (doorType, isOpen) => {
      // Callback from 3D direct mesh click
      if (doorType === 'fridge' && fridgeDoorText) {
        fridgeDoorText.textContent = isOpen ? 'Close Fridge' : 'Open Fridge';
      } else if (doorType === 'freezer' && freezerDrawerText) {
        freezerDrawerText.textContent = isOpen ? 'Close Freezer' : 'Open Freezer';
      }
    }
  );

  // Initialize Search Engine & Full Database Browser Modal
  searchEngine = new SearchEngineUI({
    headerInputId: 'header-search-input',
    searchDropdownId: 'header-search-dropdown',
    databaseModalId: 'database-modal-container',
    onSelectFood: (foodItem) => {
      if (inspectorModal) {
        inspectorModal.open(foodItem);
      }
    },
    onZoom3D: (foodId) => {
      if (kitchenScene) {
        kitchenScene.selectFoodById(foodId);
      }
    }
  });

  // --- 2. Fridge & Freezer Door Interactive Button Wiring ---
  if (fridgeDoorBtn) {
    fridgeDoorBtn.addEventListener('click', () => {
      if (kitchenScene) {
        const isOpen = kitchenScene.toggleFridgeDoor();
        if (fridgeDoorText) {
          fridgeDoorText.textContent = isOpen ? 'Close Fridge' : 'Open Fridge';
        }
      }
    });
  }

  if (freezerDrawerBtn) {
    freezerDrawerBtn.addEventListener('click', () => {
      if (kitchenScene) {
        const isOpen = kitchenScene.toggleFreezerDrawer();
        if (freezerDrawerText) {
          freezerDrawerText.textContent = isOpen ? 'Close Freezer' : 'Open Freezer';
        }
      }
    });
  }

  // Database Modal Trigger buttons
  const openDbBtn = document.getElementById('open-db-modal-btn');
  const heroOpenDbBtn = document.getElementById('hero-open-db-btn');
  if (openDbBtn) {
    openDbBtn.addEventListener('click', () => searchEngine.openDatabaseModal());
  }
  if (heroOpenDbBtn) {
    heroOpenDbBtn.addEventListener('click', () => searchEngine.openDatabaseModal());
  }

  // Hero Explore Button
  const heroExploreBtn = document.getElementById('hero-explore-btn');
  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
      sound.playSelect();
      kitchenScene.selectFoodById('milk_whole');
    });
  }

  // Quick inspect pills in story sections
  document.querySelectorAll('.quick-inspect-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const foodId = btn.dataset.inspect;
      const foodItem = getFoodById(foodId);
      if (foodItem) {
        sound.playSelect();
        if (kitchenScene) {
          kitchenScene.selectFoodById(foodId);
        }
        if (inspectorModal) {
          inspectorModal.open(foodItem);
        }
      }
    });
  });

  // 3D Camera Zone Navigation Buttons
  const zoneBtns = document.querySelectorAll('.zone-nav-btn');
  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const zone = btn.dataset.zone;
      sound.playHover();

      zoneBtns.forEach(b => {
        b.className = 'zone-nav-btn px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 transition-all';
      });
      btn.className = 'zone-nav-btn px-2.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-500 text-white shadow-glow-fresh transition-all';

      if (kitchenScene && kitchenScene.cameraDirector) {
        kitchenScene.cameraDirector.goToZone(zone);
      }
    });
  });

  // 360° Orbit Mode Toggle
  const orbitToggle = document.getElementById('orbit-mode-toggle');
  let isOrbitActive = false;
  if (orbitToggle) {
    orbitToggle.addEventListener('click', () => {
      sound.playHover();
      isOrbitActive = !isOrbitActive;

      if (kitchenScene && kitchenScene.cameraDirector) {
        kitchenScene.cameraDirector.setFreeOrbit(isOrbitActive);
      }

      if (isOrbitActive) {
        orbitToggle.className = 'px-3 py-1.5 rounded-xl text-xs font-medium border border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-glow-fresh transition-all flex items-center gap-1';
        orbitToggle.innerHTML = '<span>🔄</span> <span>Orbit: ON</span>';
      } else {
        orbitToggle.className = 'px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-slate-300 hover:bg-white/10 transition-all flex items-center gap-1';
        orbitToggle.innerHTML = '<span>🔄</span> <span class="hidden sm:inline">360° Orbit</span>';
      }
    });
  }

  // Audio Sound Mute Toggle
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (soundToggleBtn && soundIcon) {
    soundIcon.textContent = sound.isMuted ? '🔇' : '🔊';
    soundToggleBtn.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      soundIcon.textContent = isMuted ? '🔇' : '🔊';
      if (!isMuted) sound.playSelect();
    });
  }
});
