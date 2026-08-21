import * as THREE from 'three';
import {
  materials,
  milkTexture,
  ketchupTexture,
  oliveOilTexture,
  tunaTexture,
  honeyTexture,
  mayoTexture,
  yogurtTexture,
  pastaTexture,
  jamTexture,
  iceCreamTexture
} from './materials.js';
import { getFoodById } from '../data/foodkeeper-data.js';

export function createFoodModels(scene) {
  const interactiveItems = [];
  const foodGroup = new THREE.Group();
  foodGroup.name = 'InteractiveFoodGroup';

  // Helper to register interactive object
  function registerItem(group, foodId, floatOffset = 0.5) {
    const foodData = getFoodById(foodId);
    group.userData = {
      isInteractive: true,
      foodId: foodId,
      foodData: foodData,
      floatOffset: floatOffset,
      originalY: group.position.y,
      originalScale: group.scale.clone(),
    };
    
    // Enable shadows on all child meshes and store reference
    group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData = group.userData;
      }
    });

    interactiveItems.push(group);
    foodGroup.add(group);
    return group;
  }

  // ==========================================
  // 1. ORGANIC WHOLE MILK CARTON (Fridge)
  // ==========================================
  const milkGroup = new THREE.Group();
  const milkBodyGeo = new THREE.BoxGeometry(0.7, 1.2, 0.7);
  const milkLabelMat = new THREE.MeshStandardMaterial({
    map: milkTexture,
    roughness: 0.35,
  });
  const milkBody = new THREE.Mesh(milkBodyGeo, [
    milkLabelMat, milkLabelMat, materials.plasticWhite, materials.plasticWhite, milkLabelMat, milkLabelMat
  ]);
  milkBody.position.y = 0.6;
  milkGroup.add(milkBody);

  const roofGeo = new THREE.CylinderGeometry(0.04, 0.5, 0.35, 4, 1);
  roofGeo.rotateY(Math.PI / 4);
  const roof = new THREE.Mesh(roofGeo, materials.plasticWhite);
  roof.position.y = 1.35;
  milkGroup.add(roof);

  const capGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
  const cap = new THREE.Mesh(capGeo, materials.plasticRed);
  cap.position.set(0.15, 1.45, 0.15);
  cap.rotation.z = -0.3;
  milkGroup.add(cap);

  milkGroup.position.set(-5.5, 1.85, -2.3);
  registerItem(milkGroup, 'milk_whole', 1.7);

  // ==========================================
  // 2. HEINZ KETCHUP BOTTLE (Pantry)
  // ==========================================
  const ketchupGroup = new THREE.Group();
  const kBodyGeo = new THREE.CylinderGeometry(0.35, 0.38, 0.9, 24);
  const kLabelMat = new THREE.MeshStandardMaterial({ map: ketchupTexture, roughness: 0.3 });
  const kBody = new THREE.Mesh(kBodyGeo, kLabelMat);
  kBody.position.y = 0.45;
  ketchupGroup.add(kBody);

  const kNeckGeo = new THREE.CylinderGeometry(0.15, 0.35, 0.5, 24);
  const kNeck = new THREE.Mesh(kNeckGeo, materials.plasticRed);
  kNeck.position.y = 1.15;
  ketchupGroup.add(kNeck);

  const kCapGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.16, 24);
  const kCap = new THREE.Mesh(kCapGeo, materials.plasticWhite);
  kCap.position.y = 1.45;
  ketchupGroup.add(kCap);

  ketchupGroup.position.set(4.0, 0.85, -2.4);
  registerItem(ketchupGroup, 'ketchup_heinz', 1.6);

  // ==========================================
  // 3. FRESH STRAWBERRIES CLAMSHELL (Fridge)
  // ==========================================
  const strawGroup = new THREE.Group();
  const tubGeo = new THREE.BoxGeometry(1.0, 0.45, 0.8);
  const tub = new THREE.Mesh(tubGeo, materials.clearGlass);
  tub.position.y = 0.22;
  strawGroup.add(tub);

  const berryPositions = [
    [-0.25, 0.2, -0.18], [0.25, 0.2, -0.18],
    [-0.25, 0.2, 0.18], [0.25, 0.2, 0.18],
    [0.0, 0.32, 0.0]
  ];
  berryPositions.forEach(([bx, by, bz]) => {
    const berryGeo = new THREE.ConeGeometry(0.14, 0.25, 12);
    berryGeo.rotateX(Math.PI);
    const berry = new THREE.Mesh(berryGeo, materials.strawberryRed);
    berry.position.set(bx, by, bz);
    strawGroup.add(berry);

    const leafGeo = new THREE.CylinderGeometry(0.08, 0.01, 0.02, 5);
    const leaf = new THREE.Mesh(leafGeo, materials.strawberryLeaf);
    leaf.position.set(bx, by + 0.12, bz);
    strawGroup.add(leaf);
  });

  strawGroup.position.set(-4.0, 1.85, -2.2);
  registerItem(strawGroup, 'strawberries_fresh', 0.8);

  // ==========================================
  // 4. ARTISAN SLICED BREAD LOAF (Pantry)
  // ==========================================
  const breadGroup = new THREE.Group();
  const loafGeo = new THREE.BoxGeometry(1.2, 0.6, 0.7);
  const loaf = new THREE.Mesh(loafGeo, materials.breadCrust);
  loaf.position.y = 0.3;
  breadGroup.add(loaf);

  for (let s = -0.5; s <= 0.5; s += 0.15) {
    const sliceLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.58, 0.68),
      materials.breadInside
    );
    sliceLine.position.set(s, 0.3, 0.02);
    breadGroup.add(sliceLine);
  }

  const clipGeo = new THREE.BoxGeometry(0.1, 0.1, 0.04);
  const clip = new THREE.Mesh(clipGeo, materials.plasticYellow);
  clip.position.set(0.65, 0.3, 0);
  breadGroup.add(clip);

  breadGroup.position.set(5.2, 0.85, -2.3);
  registerItem(breadGroup, 'artisan_bread', 0.9);

  // ==========================================
  // 5. FARM FRESH EGGS CARTON (Fridge)
  // ==========================================
  const eggGroup = new THREE.Group();
  const cartonBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.25, 0.9),
    materials.eggCartonPulp
  );
  cartonBase.position.y = 0.12;
  eggGroup.add(cartonBase);

  const eggPositions = [
    [-0.45, 0.26, -0.22], [0.0, 0.26, -0.22], [0.45, 0.26, -0.22],
    [-0.45, 0.26, 0.22], [0.0, 0.26, 0.22], [0.45, 0.26, 0.22],
  ];
  eggPositions.forEach(([ex, ey, ez]) => {
    const eggGeo = new THREE.SphereGeometry(0.13, 16, 16);
    eggGeo.scale(1.0, 1.35, 1.0);
    const egg = new THREE.Mesh(eggGeo, materials.eggShell);
    egg.position.set(ex, ey, ez);
    eggGroup.add(egg);
  });

  eggGroup.position.set(-4.8, 0.65, -2.3);
  registerItem(eggGroup, 'eggs_fresh', 0.9);

  // ==========================================
  // 6. EXTRA VIRGIN OLIVE OIL BOTTLE (Pantry)
  // ==========================================
  const oilGroup = new THREE.Group();
  const oilBodyGeo = new THREE.CylinderGeometry(0.32, 0.34, 1.3, 16);
  const oilLabelMat = new THREE.MeshStandardMaterial({ map: oliveOilTexture, roughness: 0.25 });
  const oilBody = new THREE.Mesh(oilBodyGeo, oilLabelMat);
  oilBody.position.y = 0.65;
  oilGroup.add(oilBody);

  const oilNeckGeo = new THREE.CylinderGeometry(0.12, 0.28, 0.6, 16);
  const oilNeck = new THREE.Mesh(oilNeckGeo, materials.darkGreenGlass);
  oilNeck.position.y = 1.55;
  oilGroup.add(oilNeck);

  const spoutGeo = new THREE.CylinderGeometry(0.06, 0.12, 0.2, 16);
  const spout = new THREE.Mesh(spoutGeo, materials.goldSpout);
  spout.position.y = 1.9;
  oilGroup.add(spout);

  oilGroup.position.set(3.6, 2.45, -2.4);
  registerItem(oilGroup, 'olive_oil_evoo', 2.1);

  // ==========================================
  // 7. AGED CHEDDAR CHEESE WEDGE (Fridge)
  // ==========================================
  const cheeseGroup = new THREE.Group();
  const wedgeShape = new THREE.Shape();
  wedgeShape.moveTo(0, 0);
  wedgeShape.lineTo(0.9, 0);
  wedgeShape.lineTo(0.5, 0.8);
  wedgeShape.closePath();

  const extrudeSettings = { depth: 0.45, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
  const wedgeGeo = new THREE.ExtrudeGeometry(wedgeShape, extrudeSettings);
  wedgeGeo.rotateX(-Math.PI / 2);
  const cheese = new THREE.Mesh(wedgeGeo, materials.cheeseMaterial);
  cheese.position.set(-0.4, 0.05, 0.4);
  cheeseGroup.add(cheese);

  const rindGeo = new THREE.BoxGeometry(0.95, 0.45, 0.03);
  const rind = new THREE.Mesh(rindGeo, materials.plasticBlack);
  rind.position.set(0.05, 0.25, -0.4);
  cheeseGroup.add(rind);

  cheeseGroup.position.set(-3.7, 0.65, -2.1);
  registerItem(cheeseGroup, 'cheddar_cheese', 0.8);

  // ==========================================
  // 8. CANNED ALBACORE TUNA (Pantry)
  // ==========================================
  const tunaGroup = new THREE.Group();
  const canGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.4, 32);
  const tunaLabelMat = new THREE.MeshStandardMaterial({ map: tunaTexture, roughness: 0.35 });
  const tunaCan = new THREE.Mesh(canGeo, [tunaLabelMat, materials.canMetal, materials.canMetal]);
  tunaCan.position.y = 0.2;
  tunaGroup.add(tunaCan);

  const ringGeo = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
  const ring = new THREE.Mesh(ringGeo, materials.canMetal);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0.15, 0.41, 0.1);
  tunaGroup.add(ring);

  const tunaCan2 = tunaCan.clone();
  tunaCan2.position.y = 0.6;
  tunaGroup.add(tunaCan2);

  tunaGroup.position.set(5.7, 0.85, -2.3);
  registerItem(tunaGroup, 'canned_tuna', 1.0);

  // ==========================================
  // 9. WILD SALMON FILLET (Fridge Bottom)
  // ==========================================
  const salmonGroup = new THREE.Group();
  const trayGeo = new THREE.BoxGeometry(1.2, 0.08, 0.8);
  const tray = new THREE.Mesh(trayGeo, materials.plasticBlack);
  tray.position.y = 0.04;
  salmonGroup.add(tray);

  const fishGeo = new THREE.BoxGeometry(1.0, 0.22, 0.6);
  const fish = new THREE.Mesh(fishGeo, materials.salmonMaterial);
  fish.position.y = 0.17;
  salmonGroup.add(fish);

  for (let m = -0.4; m <= 0.4; m += 0.2) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.23, 0.58),
      materials.plasticWhite
    );
    stripe.position.set(m, 0.17, 0);
    salmonGroup.add(stripe);
  }

  salmonGroup.position.set(-4.6, -0.55, -2.3);
  registerItem(salmonGroup, 'salmon_fresh', 0.7);

  // ==========================================
  // 10. GREEK YOGURT CUP (Fridge)
  // ==========================================
  const yogurtGroup = new THREE.Group();
  const tubYogurtGeo = new THREE.CylinderGeometry(0.38, 0.28, 0.55, 24);
  const yogMat = new THREE.MeshStandardMaterial({ map: yogurtTexture, roughness: 0.3 });
  const yogurtTub = new THREE.Mesh(tubYogurtGeo, yogMat);
  yogurtTub.position.y = 0.28;
  yogurtGroup.add(yogurtTub);

  const lidGeo = new THREE.CylinderGeometry(0.39, 0.39, 0.03, 24);
  const lid = new THREE.Mesh(lidGeo, materials.canMetal);
  lid.position.y = 0.57;
  yogurtGroup.add(lid);

  yogurtGroup.position.set(-4.7, 1.85, -2.1);
  registerItem(yogurtGroup, 'greek_yogurt', 0.9);

  // ==========================================
  // 11. HONEYCRISP APPLE (Prep Counter Bowl)
  // ==========================================
  const appleGroup = new THREE.Group();
  const appleGeo = new THREE.SphereGeometry(0.24, 20, 20);
  appleGeo.scale(1.0, 0.95, 1.0);
  const apple = new THREE.Mesh(appleGeo, materials.appleSkin);
  apple.position.y = 0.24;
  appleGroup.add(apple);

  const stemGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.1, 8);
  const stem = new THREE.Mesh(stemGeo, materials.woodDark);
  stem.position.set(0, 0.48, 0);
  stem.rotation.z = 0.2;
  appleGroup.add(stem);

  appleGroup.position.set(0.7, -0.35, 1.0);
  registerItem(appleGroup, 'honeycrisp_apple', 0.7);

  // ==========================================
  // 12. RIPE BANANAS BUNCH (Prep Counter Bowl)
  // ==========================================
  const bananaGroup = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0.1, 0),
    new THREE.Vector3(-0.2, 0.02, 0.05),
    new THREE.Vector3(0.0, 0.0, 0.1),
    new THREE.Vector3(0.2, 0.04, 0.05),
    new THREE.Vector3(0.4, 0.15, 0),
  ]);
  const bananaGeo = new THREE.TubeGeometry(curve, 16, 0.09, 8, false);
  const banana1 = new THREE.Mesh(bananaGeo, materials.bananaSkin);
  banana1.position.y = 0.1;
  bananaGroup.add(banana1);

  const banana2 = banana1.clone();
  banana2.rotation.z = 0.2;
  banana2.position.set(-0.05, 0.18, -0.1);
  bananaGroup.add(banana2);

  bananaGroup.position.set(1.0, -0.35, 0.95);
  registerItem(bananaGroup, 'ripe_bananas', 0.7);

  // ==========================================
  // 13. PURE CLOVER HONEY JAR (Pantry Top)
  // ==========================================
  const honeyGroup = new THREE.Group();
  const jarGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.65, 6);
  const jar = new THREE.Mesh(jarGeo, materials.honeyLiquid);
  jar.position.y = 0.33;
  honeyGroup.add(jar);

  const hLabelMat = new THREE.MeshStandardMaterial({ map: honeyTexture, roughness: 0.3 });
  const hLabel = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.35, 6), hLabelMat);
  hLabel.position.y = 0.33;
  honeyGroup.add(hLabel);

  const hLidGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.1, 16);
  const hLid = new THREE.Mesh(hLidGeo, materials.goldSpout);
  hLid.position.y = 0.7;
  honeyGroup.add(hLid);

  honeyGroup.position.set(4.8, 2.45, -2.4);
  registerItem(honeyGroup, 'pure_honey', 1.0);

  // ==========================================
  // 14. FRESH GROUND BEEF TRAY (Fridge Bottom)
  // ==========================================
  const beefGroup = new THREE.Group();
  const beefTray = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.08, 0.8),
    materials.plasticBlack
  );
  beefTray.position.y = 0.04;
  beefGroup.add(beefTray);

  const beefGeo = new THREE.BoxGeometry(0.9, 0.3, 0.6);
  const beefMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 });
  const beef = new THREE.Mesh(beefGeo, beefMat);
  beef.position.y = 0.2;
  beefGroup.add(beef);

  const wrap = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.32, 0.65),
    materials.clearGlass
  );
  wrap.position.y = 0.2;
  beefGroup.add(wrap);

  beefGroup.position.set(-5.5, -0.55, -2.2);
  registerItem(beefGroup, 'raw_ground_beef', 0.7);

  // ==========================================
  // 15. REAL MAYONNAISE JAR (Pantry/Door)
  // ==========================================
  const mayoGroup = new THREE.Group();
  const mayoJarGeo = new THREE.CylinderGeometry(0.34, 0.3, 0.75, 24);
  const mayoMat = new THREE.MeshStandardMaterial({ map: mayoTexture, roughness: 0.3 });
  const mayoJar = new THREE.Mesh(mayoJarGeo, mayoMat);
  mayoJar.position.y = 0.38;
  mayoGroup.add(mayoJar);

  const mayoLidGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 24);
  const mayoLid = new THREE.Mesh(mayoLidGeo, materials.plasticYellow);
  mayoLid.position.y = 0.81;
  mayoGroup.add(mayoLid);

  mayoGroup.position.set(5.6, 2.45, -2.3);
  registerItem(mayoGroup, 'mayonnaise_real', 1.1);

  // ==========================================
  // 16. BRONZE CUT SPAGHETTI BOX (Pantry Shelf)
  // ==========================================
  const pastaGroup = new THREE.Group();
  const pastaBoxGeo = new THREE.BoxGeometry(0.5, 1.4, 0.3);
  const pastaMat = new THREE.MeshStandardMaterial({ map: pastaTexture, roughness: 0.4 });
  const pastaBox = new THREE.Mesh(pastaBoxGeo, pastaMat);
  pastaBox.position.y = 0.7;
  pastaGroup.add(pastaBox);

  pastaGroup.position.set(3.4, -0.75, -2.3);
  registerItem(pastaGroup, 'dry_pasta_durum', 1.6);

  // ==========================================
  // 17. STRAWBERRY JAM JAR (Pantry Shelf)
  // ==========================================
  const jamGroup = new THREE.Group();
  const jamJarGeo = new THREE.CylinderGeometry(0.3, 0.28, 0.6, 24);
  const jamMat = new THREE.MeshStandardMaterial({ map: jamTexture, roughness: 0.3 });
  const jamJar = new THREE.Mesh(jamJarGeo, jamMat);
  jamJar.position.y = 0.3;
  jamGroup.add(jamJar);

  const jamLidGeo = new THREE.CylinderGeometry(0.31, 0.31, 0.08, 24);
  const jamLid = new THREE.Mesh(jamLidGeo, materials.plasticRed);
  jamLid.position.y = 0.64;
  jamGroup.add(jamLid);

  jamGroup.position.set(4.6, -0.75, -2.3);
  registerItem(jamGroup, 'strawberry_jam', 0.9);

  // ==========================================
  // 18. VANILLA ICE CREAM TUB (Freezer Drawer)
  // ==========================================
  const iceCreamGroup = new THREE.Group();
  const tubIceGeo = new THREE.CylinderGeometry(0.42, 0.36, 0.65, 24);
  const iceMat = new THREE.MeshStandardMaterial({ map: iceCreamTexture, roughness: 0.3 });
  const iceTub = new THREE.Mesh(tubIceGeo, iceMat);
  iceTub.position.y = 0.33;
  iceCreamGroup.add(iceTub);

  const iceLidGeo = new THREE.CylinderGeometry(0.43, 0.43, 0.06, 24);
  const iceLid = new THREE.Mesh(iceLidGeo, materials.plasticWhite);
  iceLid.position.y = 0.68;
  iceCreamGroup.add(iceLid);

  iceCreamGroup.position.set(-4.8, -1.85, -2.2);
  registerItem(iceCreamGroup, 'ice_cream_tub', 0.9);

  scene.add(foodGroup);
  return { foodGroup, interactiveItems };
}
