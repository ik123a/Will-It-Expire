import * as THREE from 'three';
import gsap from 'gsap';
import { materials } from './materials.js';
import { sound } from '../audio/sounds.js';

export function createKitchenEnvironment(scene) {
  const envGroup = new THREE.Group();
  envGroup.name = 'KitchenEnvironment';

  // --- 1. Floor & Base Grid ---
  const floorGeo = new THREE.PlaneGeometry(34, 28);
  const floor = new THREE.Mesh(floorGeo, materials.floorTile);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2, 0);
  floor.receiveShadow = true;
  envGroup.add(floor);

  const gridHelper = new THREE.GridHelper(34, 34, 0x334155, 0x1e293b);
  gridHelper.position.set(0, -1.99, 0);
  envGroup.add(gridHelper);

  // --- 2. Back Walls & Subway Tile Backsplash ---
  const wallGeo = new THREE.PlaneGeometry(34, 18);
  const backWall = new THREE.Mesh(wallGeo, materials.kitchenWall);
  backWall.position.set(0, 6, -8);
  backWall.receiveShadow = true;
  envGroup.add(backWall);

  const backsplash = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 5.2),
    materials.subwayTile
  );
  backsplash.position.set(0, 1.8, -7.95);
  backsplash.receiveShadow = true;
  envGroup.add(backsplash);

  // Under-cabinet LED warm strip lighting
  const ledStrip = new THREE.PointLight(0x38bdf8, 1.8, 9);
  ledStrip.position.set(0, 4.0, -5);
  envGroup.add(ledStrip);

  // --- 3. REFRIGERATOR UNIT (Left Zone) WITH OPENING DOOR & SLIDING FREEZER ---
  const fridgeGroup = new THREE.Group();
  fridgeGroup.name = 'FridgeUnit';
  fridgeGroup.position.set(-4.8, 0.8, -2.5);

  const outerWidth = 3.8, outerHeight = 5.8, outerDepth = 3.0;
  const innerWidth = 3.4, innerHeight = 5.4, innerDepth = 2.6;

  // Outer cabinet
  const fridgeOuter = new THREE.Mesh(
    new THREE.BoxGeometry(outerWidth, outerHeight, outerDepth),
    materials.fridgeBody
  );
  fridgeOuter.castShadow = true;
  fridgeOuter.receiveShadow = true;
  fridgeGroup.add(fridgeOuter);

  // Interior white insulated cavity
  const fridgeInner = new THREE.Mesh(
    new THREE.BoxGeometry(innerWidth, innerHeight, innerDepth),
    materials.fridgeInterior
  );
  fridgeInner.position.set(0, 0, 0.25);
  fridgeGroup.add(fridgeInner);

  // Refrigerator Upper Glass Shelves
  const shelfYPositions = [-0.6, 0.6, 1.8];
  shelfYPositions.forEach((y) => {
    const shelf = new THREE.Mesh(
      new THREE.BoxGeometry(innerWidth - 0.1, 0.08, innerDepth - 0.2),
      materials.fridgeGlassShelf
    );
    shelf.position.set(0, y, 0.25);
    shelf.receiveShadow = true;
    fridgeGroup.add(shelf);

    const trim = new THREE.Mesh(
      new THREE.BoxGeometry(innerWidth - 0.1, 0.08, 0.04),
      materials.stainlessSteel
    );
    trim.position.set(0, y, 1.45);
    fridgeGroup.add(trim);
  });

  // Refrigerator Interior Top LED light
  const fridgeInteriorLight = new THREE.PointLight(0x38bdf8, 3.5, 8);
  fridgeInteriorLight.position.set(0, 2.4, 0.8);
  fridgeGroup.add(fridgeInteriorLight);

  // Top digital LED temperature display
  const tempPanel = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.2, 0.02),
    materials.plasticBlack
  );
  tempPanel.position.set(0, 2.7, 1.51);
  fridgeGroup.add(tempPanel);

  // ----------------------------------------------------
  // ANIMATED UPPER REFRIGERATOR DOOR (Swings on left hinge)
  // ----------------------------------------------------
  const fridgeDoorHinge = new THREE.Group();
  fridgeDoorHinge.name = 'FridgeDoorHinge';
  // Position hinge at front-left edge of fridge
  fridgeDoorHinge.position.set(-1.85, 0.6, 1.5);

  const doorWidth = 3.75, doorHeight = 4.1, doorThickness = 0.18;
  const doorPanel = new THREE.Mesh(
    new THREE.BoxGeometry(doorWidth, doorHeight, doorThickness),
    materials.fridgeBody
  );
  // Offset door mesh so hinge is at left edge (x: doorWidth / 2)
  doorPanel.position.set(doorWidth / 2, 0, 0);
  doorPanel.castShadow = true;
  doorPanel.receiveShadow = true;
  fridgeDoorHinge.add(doorPanel);

  // Long vertical stainless steel handle on right edge of door
  const handleVertical = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 2.8, 16),
    materials.stainlessSteel
  );
  handleVertical.position.set(doorWidth - 0.25, 0, 0.18);
  fridgeDoorHinge.add(handleVertical);

  // Handle top/bottom mounts
  const mountTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), materials.stainlessSteel);
  mountTop.position.set(doorWidth - 0.25, 1.35, 0.09);
  fridgeDoorHinge.add(mountTop);

  const mountBottom = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), materials.stainlessSteel);
  mountBottom.position.set(doorWidth - 0.25, -1.35, 0.09);
  fridgeDoorHinge.add(mountBottom);

  // Interior Door Bins (Condiment Racks inside door)
  const doorBinYPositions = [-1.3, -0.1, 1.1];
  doorBinYPositions.forEach((by) => {
    const doorBin = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth - 0.6, 0.25, 0.35),
      materials.fridgeGlassShelf
    );
    doorBin.position.set(doorWidth / 2, by, -0.22);
    fridgeDoorHinge.add(doorBin);

    const doorBinTrim = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth - 0.6, 0.25, 0.03),
      materials.stainlessSteel
    );
    doorBinTrim.position.set(doorWidth / 2, by, -0.38);
    fridgeDoorHinge.add(doorBinTrim);
  });

  // Mini Mustard & Dressing bottles in door racks
  const miniBottle1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.45, 16),
    materials.plasticYellow
  );
  miniBottle1.position.set(doorWidth / 2 - 0.8, -0.1 + 0.3, -0.22);
  fridgeDoorHinge.add(miniBottle1);

  const miniBottle2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.15, 0.5, 16),
    materials.darkGreenGlass
  );
  miniBottle2.position.set(doorWidth / 2 + 0.8, -0.1 + 0.32, -0.22);
  fridgeDoorHinge.add(miniBottle2);

  fridgeDoorHinge.userData = { isFridgeDoor: true };
  fridgeGroup.add(fridgeDoorHinge);

  // ----------------------------------------------------
  // ANIMATED SLIDING BOTTOM FREEZER DRAWER
  // ----------------------------------------------------
  const freezerDrawerGroup = new THREE.Group();
  freezerDrawerGroup.name = 'FreezerDrawerGroup';
  freezerDrawerGroup.position.set(0, -1.9, 0);

  // Drawer Front Panel
  const freezerFront = new THREE.Mesh(
    new THREE.BoxGeometry(3.75, 1.45, 0.18),
    materials.fridgeBody
  );
  freezerFront.position.set(0, 0, 1.5);
  freezerFront.castShadow = true;
  freezerFront.receiveShadow = true;
  freezerDrawerGroup.add(freezerFront);

  // Horizontal freezer handle
  const freezerHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 2.2, 16),
    materials.stainlessSteel
  );
  freezerHandle.rotation.z = Math.PI / 2;
  freezerHandle.position.set(0, 0.45, 1.68);
  freezerDrawerGroup.add(freezerHandle);

  // Deep interior freezer bin container
  const freezerBin = new THREE.Mesh(
    new THREE.BoxGeometry(innerWidth - 0.2, 1.2, innerDepth - 0.4),
    materials.clearGlass
  );
  freezerBin.position.set(0, -0.1, 0.25);
  freezerDrawerGroup.add(freezerBin);

  freezerDrawerGroup.userData = { isFreezerDrawer: true };
  fridgeGroup.add(freezerDrawerGroup);

  envGroup.add(fridgeGroup);

  // Door Animation State
  let isFridgeOpen = false;
  let isFreezerOpen = false;

  function toggleFridgeDoor(callback) {
    isFridgeOpen = !isFridgeOpen;
    const targetAngle = isFridgeOpen ? -Math.PI * 0.62 : 0; // ~110 degrees open

    if (isFridgeOpen) {
      sound.playDoorOpen();
    } else {
      sound.playDoorClose();
    }

    gsap.killTweensOf(fridgeDoorHinge.rotation);
    gsap.to(fridgeDoorHinge.rotation, {
      y: targetAngle,
      duration: 0.85,
      ease: isFridgeOpen ? 'power2.out' : 'back.in(1.2)',
      onComplete: () => {
        if (callback) callback(isFridgeOpen);
      }
    });

    // Dim/brighten interior light
    gsap.to(fridgeInteriorLight, {
      intensity: isFridgeOpen ? 4.5 : 2.0,
      duration: 0.5
    });

    return isFridgeOpen;
  }

  function toggleFreezerDrawer(callback) {
    isFreezerOpen = !isFreezerOpen;
    const targetZ = isFreezerOpen ? 1.5 : 0;

    sound.playDrawerSlide();

    gsap.killTweensOf(freezerDrawerGroup.position);
    gsap.to(freezerDrawerGroup.position, {
      z: targetZ,
      duration: 0.75,
      ease: 'power2.inOut',
      onComplete: () => {
        if (callback) callback(isFreezerOpen);
      }
    });

    return isFreezerOpen;
  }

  // --- 4. WOODEN PANTRY SHELVES UNIT (Right Zone) ---
  const pantryGroup = new THREE.Group();
  pantryGroup.name = 'PantryUnit';
  pantryGroup.position.set(4.8, 0.8, -2.5);

  // Vertical side pillars (Warm Oak Wood)
  const pillarGeo = new THREE.BoxGeometry(0.18, 5.8, 2.4);
  const leftPillar = new THREE.Mesh(pillarGeo, materials.woodShelf);
  leftPillar.position.set(-1.9, 0, 0);
  leftPillar.castShadow = true;
  leftPillar.receiveShadow = true;
  pantryGroup.add(leftPillar);

  const rightPillar = new THREE.Mesh(pillarGeo, materials.woodShelf);
  rightPillar.position.set(1.9, 0, 0);
  rightPillar.castShadow = true;
  rightPillar.receiveShadow = true;
  pantryGroup.add(rightPillar);

  // Back panel
  const backPanel = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 5.8, 0.1),
    materials.woodDark
  );
  backPanel.position.set(0, 0, -1.15);
  backPanel.receiveShadow = true;
  pantryGroup.add(backPanel);

  // Pantry Shelves (4 tiers)
  const pantryShelvesY = [-2.4, -0.8, 0.8, 2.4];
  pantryShelvesY.forEach((y) => {
    const pShelf = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.12, 2.3),
      materials.woodShelf
    );
    pShelf.position.set(0, y, 0);
    pShelf.castShadow = true;
    pShelf.receiveShadow = true;
    pantryGroup.add(pShelf);

    // Metal brackets
    const bracketLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.08), materials.stainlessSteel);
    bracketLeft.position.set(-1.75, y - 0.12, 0.8);
    pantryGroup.add(bracketLeft);

    const bracketRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.08), materials.stainlessSteel);
    bracketRight.position.set(1.75, y - 0.12, 0.8);
    pantryGroup.add(bracketRight);
  });

  // Decorative Glass Canisters with cereal/grains on top pantry shelf
  for (let c = -1.2; c <= 1.2; c += 0.8) {
    const canister = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.7, 16),
      materials.clearGlass
    );
    canister.position.set(c, 2.4 + 0.42, 0.3);
    pantryGroup.add(canister);

    const canisterLid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 0.08, 16),
      materials.woodShelf
    );
    canisterLid.position.set(c, 2.4 + 0.8, 0.3);
    pantryGroup.add(canisterLid);
  }

  // Warm overhead pantry spotlight
  const pantryLight = new THREE.PointLight(0xfef3c7, 2.2, 7);
  pantryLight.position.set(0, 2.7, 0.8);
  pantryGroup.add(pantryLight);

  envGroup.add(pantryGroup);

  // --- 5. CENTER PREP COUNTERTOP & KITCHEN PROPS (Middle Zone) ---
  const counterGroup = new THREE.Group();
  counterGroup.name = 'PrepCounter';
  counterGroup.position.set(0, -0.6, 0.8);

  // Marble island countertop
  const counterTop = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.16, 2.2),
    materials.marbleCounter
  );
  counterTop.castShadow = true;
  counterTop.receiveShadow = true;
  counterGroup.add(counterTop);

  // Base cabinet
  const counterBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 2.6, 2.0),
    materials.woodDark
  );
  counterBase.position.set(0, -1.35, 0);
  counterBase.castShadow = true;
  counterBase.receiveShadow = true;
  counterGroup.add(counterBase);

  // Recessed Kitchen Sink Basin (left side of counter)
  const sinkBasin = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.25, 0.9),
    materials.stainlessSteel
  );
  sinkBasin.position.set(-1.0, 0.02, -0.2);
  counterGroup.add(sinkBasin);

  // Chrome Gooseneck Arch Faucet
  const faucetCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.6, 0),
    new THREE.Vector3(0.1, 0.75, 0),
    new THREE.Vector3(0.25, 0.65, 0),
    new THREE.Vector3(0.25, 0.55, 0),
  ]);
  const faucetMesh = new THREE.Mesh(
    new THREE.TubeGeometry(faucetCurve, 20, 0.03, 12, false),
    materials.stainlessSteel
  );
  faucetMesh.position.set(-1.0, 0.15, -0.65);
  counterGroup.add(faucetMesh);

  // Faucet Handle Knobs
  const knobLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 12), materials.stainlessSteel);
  knobLeft.position.set(-1.18, 0.2, -0.65);
  counterGroup.add(knobLeft);

  const knobRight = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 12), materials.stainlessSteel);
  knobRight.position.set(-0.82, 0.2, -0.65);
  counterGroup.add(knobRight);

  // Stainless Steel 2-Slot Toaster (right side of counter)
  const toaster = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.42, 0.35),
    materials.stainlessSteel
  );
  toaster.position.set(1.35, 0.28, -0.4);
  counterGroup.add(toaster);

  // Toaster slots
  const slot1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.06), materials.plasticBlack);
  slot1.position.set(1.35, 0.49, -0.46);
  counterGroup.add(slot1);
  const slot2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.06), materials.plasticBlack);
  slot2.position.set(1.35, 0.49, -0.34);
  counterGroup.add(slot2);

  // Wooden Cutting board
  const cuttingBoard = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.06, 0.95),
    materials.woodShelf
  );
  cuttingBoard.position.set(0.1, 0.11, 0.15);
  cuttingBoard.castShadow = true;
  cuttingBoard.receiveShadow = true;
  counterGroup.add(cuttingBoard);

  // Chef's Prep Knife on cutting board
  const knifeBlade = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.01, 0.08),
    materials.stainlessSteel
  );
  knifeBlade.position.set(0.45, 0.15, 0.35);
  knifeBlade.rotation.y = -0.3;
  counterGroup.add(knifeBlade);

  const knifeHandle = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.03, 0.05),
    materials.woodDark
  );
  knifeHandle.position.set(0.72, 0.15, 0.44);
  knifeHandle.rotation.y = -0.3;
  counterGroup.add(knifeHandle);

  // Ceramic fruit bowl
  const bowlGeo = new THREE.CylinderGeometry(0.75, 0.45, 0.38, 32);
  const bowl = new THREE.Mesh(bowlGeo, materials.plasticWhite);
  bowl.position.set(0.9, 0.25, 0.4);
  bowl.castShadow = true;
  bowl.receiveShadow = true;
  counterGroup.add(bowl);

  envGroup.add(counterGroup);

  // --- 6. HANGING OVERHEAD PENDANT LIGHTS ---
  const pendantPositions = [-1.4, 1.4];
  pendantPositions.forEach((px) => {
    // Hanging cord
    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 2.5, 8),
      materials.plasticBlack
    );
    cord.position.set(px, 4.5, 0.8);
    envGroup.add(cord);

    // Matte black cone lampshade
    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.45, 0.4, 16, 1, true),
      materials.plasticBlack
    );
    shade.position.set(px, 3.1, 0.8);
    envGroup.add(shade);

    // Glowing warm bulb
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffedd5 })
    );
    bulb.position.set(px, 3.0, 0.8);
    envGroup.add(bulb);

    const pendantLight = new THREE.PointLight(0xffedd5, 1.6, 6);
    pendantLight.position.set(px, 2.8, 0.8);
    envGroup.add(pendantLight);
  });

  scene.add(envGroup);

  return {
    envGroup,
    fridgeGroup,
    pantryGroup,
    counterGroup,
    fridgeDoorHinge,
    freezerDrawerGroup,
    toggleFridgeDoor,
    toggleFreezerDrawer,
    isFridgeOpen: () => isFridgeOpen,
    isFreezerOpen: () => isFreezerOpen,
  };
}
