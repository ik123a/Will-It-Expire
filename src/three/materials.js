import * as THREE from 'three';

/**
 * Creates procedural high-resolution canvas textures for labels and packaging
 */
function createLabelTexture({ title, subtitle, color = '#ffffff', textColor = '#111827', accentColor = '#e11d48', width = 512, height = 256 }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Border / Accent trim
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, width - 12, height - 12);

  // Decorative inner line
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  // Accent banner block
  ctx.fillStyle = accentColor;
  ctx.fillRect(24, 28, width - 48, 40);

  // Subtitle / Brand header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(subtitle.toUpperCase(), width / 2, 48);

  // Main Title
  ctx.fillStyle = textColor;
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(title, width / 2, 120);

  // Bottom details
  ctx.font = '16px monospace';
  ctx.fillStyle = '#6b7280';
  ctx.fillText('USDA INSPECTED • 100% ORGANIC', width / 2, 175);
  ctx.fillText('KEEP REFRIGERATED • NET WT 16 OZ', width / 2, 205);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Generate textures
export const milkTexture = createLabelTexture({
  title: 'ORGANIC WHOLE MILK',
  subtitle: 'FRESH DAIRY CO.',
  color: '#f8fafc',
  textColor: '#0f172a',
  accentColor: '#2563eb'
});

export const ketchupTexture = createLabelTexture({
  title: 'HEINZ TOMATO KETCHUP',
  subtitle: '57 VARIETIES',
  color: '#fffbeb',
  textColor: '#991b1b',
  accentColor: '#dc2626'
});

export const oliveOilTexture = createLabelTexture({
  title: 'EXTRA VIRGIN OLIVE OIL',
  subtitle: 'COLD PRESSED • ESTATE GROWN',
  color: '#fefce8',
  textColor: '#14532d',
  accentColor: '#15803d'
});

export const tunaTexture = createLabelTexture({
  title: 'SOLID WHITE ALBACORE',
  subtitle: 'WILD CAUGHT IN WATER',
  color: '#eff6ff',
  textColor: '#1e3a8a',
  accentColor: '#1d4ed8'
});

export const honeyTexture = createLabelTexture({
  title: 'PURE CLOVER HONEY',
  subtitle: '100% RAW & UNFILTERED',
  color: '#fef3c7',
  textColor: '#78350f',
  accentColor: '#d97706'
});

export const mayoTexture = createLabelTexture({
  title: 'REAL MAYONNAISE',
  subtitle: 'RICH & CREAMY',
  color: '#fffbeb',
  textColor: '#1e293b',
  accentColor: '#eab308'
});

export const yogurtTexture = createLabelTexture({
  title: 'AUTHENTIC GREEK YOGURT',
  subtitle: 'HIGH PROTEIN • PLAIN',
  color: '#f0f9ff',
  textColor: '#0369a1',
  accentColor: '#0284c7'
});

export const pastaTexture = createLabelTexture({
  title: 'BRONZE CUT SPAGHETTI',
  subtitle: '100% DURUM SEMOLINA',
  color: '#fef3c7',
  textColor: '#78350f',
  accentColor: '#d97706'
});

export const jamTexture = createLabelTexture({
  title: 'STRAWBERRY PRESERVES',
  subtitle: 'ALL NATURAL FRUIT',
  color: '#fff1f2',
  textColor: '#9f1239',
  accentColor: '#e11d48'
});

export const iceCreamTexture = createLabelTexture({
  title: 'MADAGASCAR VANILLA',
  subtitle: 'PREMIUM CHURNED ICE CREAM',
  color: '#f0fdf4',
  textColor: '#166534',
  accentColor: '#15803d'
});

/**
 * Common PBR Materials
 */
export const materials = {
  // Wood for pantry shelves
  woodShelf: new THREE.MeshStandardMaterial({
    color: 0xc89d68,
    roughness: 0.65,
    metalness: 0.05,
  }),
  woodDark: new THREE.MeshStandardMaterial({
    color: 0x8b5a2b,
    roughness: 0.7,
    metalness: 0.02,
  }),
  
  // Kitchen tile & walls
  floorTile: new THREE.MeshStandardMaterial({
    color: 0x1e2436,
    roughness: 0.4,
    metalness: 0.1,
  }),
  kitchenWall: new THREE.MeshStandardMaterial({
    color: 0x0f1422,
    roughness: 0.85,
  }),
  subwayTile: new THREE.MeshStandardMaterial({
    color: 0x182033,
    roughness: 0.3,
    metalness: 0.1,
  }),
  
  // Refrigerator exterior & interior
  fridgeBody: new THREE.MeshStandardMaterial({
    color: 0x1a2133,
    roughness: 0.2,
    metalness: 0.85,
  }),
  fridgeInterior: new THREE.MeshStandardMaterial({
    color: 0xedf2f7,
    roughness: 0.15,
    metalness: 0.1,
  }),
  fridgeGlassShelf: new THREE.MeshPhysicalMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.7,
    ior: 1.5,
  }),
  
  // Countertop
  marbleCounter: new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.25,
    metalness: 0.2,
  }),
  
  // Glass containers
  clearGlass: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.85,
    ior: 1.52,
  }),
  darkGreenGlass: new THREE.MeshPhysicalMaterial({
    color: 0x1b4332,
    transparent: true,
    opacity: 0.7,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.6,
    ior: 1.54,
  }),
  
  // Metals
  stainlessSteel: new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.2,
    metalness: 0.9,
  }),
  goldSpout: new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.3,
    metalness: 0.8,
  }),
  canMetal: new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.35,
    metalness: 0.85,
  }),

  // Plastics & Packaging
  plasticWhite: new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.3,
  }),
  plasticRed: new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.3,
  }),
  plasticYellow: new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.3,
  }),
  plasticBlack: new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.4,
  }),
  eggCartonPulp: new THREE.MeshStandardMaterial({
    color: 0xca8a04,
    roughness: 0.9,
    metalness: 0.0,
  }),
  eggShell: new THREE.MeshStandardMaterial({
    color: 0xfef3c7,
    roughness: 0.5,
  }),
  cheeseMaterial: new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.4,
  }),
  salmonMaterial: new THREE.MeshStandardMaterial({
    color: 0xfb7185,
    roughness: 0.35,
  }),
  appleSkin: new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.25,
    metalness: 0.05,
  }),
  bananaSkin: new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.4,
  }),
  strawberryRed: new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.3,
  }),
  strawberryLeaf: new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.6,
  }),
  breadCrust: new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.8,
  }),
  breadInside: new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    roughness: 0.9,
  }),
  honeyLiquid: new THREE.MeshPhysicalMaterial({
    color: 0xd97706,
    transparent: true,
    opacity: 0.85,
    roughness: 0.1,
    transmission: 0.5,
  }),
};
