/**
 * Comprehensive USDA FoodKeeper & Food Safety Knowledge Database
 * 100+ Food Items across 10 Categories with verified scientific shelf-life timelines,
 * biological pathogen profiles, sensory spoilage checklists, and storage best practices.
 */

export const FOOD_CATEGORIES = [
  { id: 'all', name: 'All Foods', icon: '🍽️', count: 100 },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛', count: 16 },
  { id: 'meat', name: 'Meat & Poultry', icon: '🥩', count: 12 },
  { id: 'seafood', name: 'Seafood', icon: '🐟', count: 10 },
  { id: 'produce', name: 'Fruits & Veggies', icon: '🍎', count: 18 },
  { id: 'bakery', name: 'Bakery & Grains', icon: '🍞', count: 10 },
  { id: 'condiments', name: 'Condiments & Sauces', icon: '🥫', count: 10 },
  { id: 'canned', name: 'Canned & Jarred', icon: '🥫', count: 10 },
  { id: 'staples', name: 'Pantry Staples', icon: '🍯', count: 11 },
  { id: 'frozen', name: 'Frozen Foods', icon: '❄️', count: 6 },
  { id: 'beverages', name: 'Beverages', icon: '🧃', count: 8 },
];

export const FOOD_ITEMS = [
  // ==========================================
  // 1. DAIRY & EGGS (16 items)
  // ==========================================
  {
    id: 'milk_whole',
    name: 'Whole Milk (Pasteurized)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥛',
    modelKey: 'milk',
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '7 Days past date', unopenedDays: 7, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '3 Months (thaw in fridge)', days: 90 },
    storageTips: 'Store in the coldest part of the fridge (middle or lower shelf), never in the door where temperature fluctuates.',
    spoilageGuide: {
      look: 'Curdling, chunky yellowed texture, watery separation that does not remix.',
      smell: 'Sour, pungent, fermented or acidic odor.',
      touch: 'Thick, slimy or lumpy consistency.',
      tasteWarning: 'Never drink sour milk; small sips won\'t kill you but high bacterial load causes food poisoning.'
    },
    pathogenRisk: 'Listeria monocytogenes, Campylobacter jejuni',
    safetyRating: 'high_risk',
    dateType: 'Sell By',
    funFact: 'Ultra-pasteurized milk (UHT) can last 3-6 months unopened at room temp, but once opened, it must be refrigerated and used within 7-10 days.'
  },
  {
    id: 'milk_skim',
    name: 'Skim / Low-Fat Milk',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥛',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '7-10 Days past date', unopenedDays: 10, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '3 Months', days: 90 },
    storageTips: 'Keep tightly sealed. Lower fat content causes it to spoil slightly differently than whole milk (tends to turn watery/sour rather than chunky).',
    spoilageGuide: {
      look: 'Bluish-gray watery separation, curdling flakes.',
      smell: 'Sharp sour vinegar-like odor.',
      touch: 'Watery with slimy sediment at bottom.',
      tasteWarning: 'Bacterial fermentation produces lactic acid and off-flavors.'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Sell By',
    funFact: 'Skim milk contains the same calcium, protein, and B vitamins as whole milk, but with virtually zero milkfat.'
  },
  {
    id: 'milk_oat',
    name: 'Oat Milk (Plant-Based)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🌾',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '6-9 Months (Aseptic Box)', unopenedDays: 240, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: 'Not Recommended (grainy separation)', days: 30 },
    storageTips: 'Shake well before pouring. Refrigerate immediately after opening and keep cap tightly sealed.',
    spoilageGuide: {
      look: 'Slimy gel-like consistency, mold inside cap, chunky curdling.',
      smell: 'Sour, fermented or cardboard-like stale smell.',
      touch: 'Slimy or viscous stringy texture.',
      tasteWarning: 'Plant-based milks have no dairy lactose, but wild yeasts and mold can still thrive once exposed to air.'
    },
    pathogenRisk: 'Bacillus cereus, Spoilage Molds',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Oat milk is naturally sweet because enzymes convert oat starches into maltose during manufacturing.'
  },
  {
    id: 'milk_almond',
    name: 'Almond Milk (Unsweetened)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🌰',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '6-9 Months (Aseptic Carton)', unopenedDays: 240, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Store on an interior fridge shelf. Keep away from strong aromatic foods like onions.',
    spoilageGuide: {
      look: 'Curdled separation that doesn\'t recombine when shaken, bloated container.',
      smell: 'Sour, bitter, or fermented yeast smell.',
      touch: 'Slimy, thick or clumpy texture.',
      tasteWarning: 'Discard immediately if the carton feels bloated under pressure.'
    },
    pathogenRisk: 'Yeast & Mold Spoilage',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'A bloated plant-milk carton indicates active gas-producing microbial fermentation inside.'
  },
  {
    id: 'heavy_cream',
    name: 'Heavy Whipping Cream',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥛',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1 Month', unopenedDays: 30, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: '3-4 Months (best whipped before freezing)', days: 120 },
    storageTips: 'Ultra-pasteurized cream has a longer unopened shelf life, but once opened, it must be consumed within 10 days.',
    spoilageGuide: {
      look: 'Separated oil layer, yellow crust around the spout, mold speckles.',
      smell: 'Sour, cheesy or rancid smell.',
      touch: 'Curdled, thick butter-like lumps with watery fluid.',
      tasteWarning: 'High fat slows initial bacterial growth, but once it turns sour, it is unsafe.'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Heavy cream has at least 36% milkfat, making it the highest-fat fluid dairy product available.'
  },
  {
    id: 'sour_cream',
    name: 'Cultured Sour Cream',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥣',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '1-2 Weeks', openedDays: 14 },
    freezeLife: { duration: 'Not Recommended (emulsion separates)', days: 30 },
    storageTips: 'Smooth the surface with a spoon before resealing to reduce moisture pooling, which attracts mold.',
    spoilageGuide: {
      look: 'Pink, blue, green, or black mold spores on surface, watery yellow separation.',
      smell: 'Harsh pungent odor or moldy basement smell.',
      touch: 'Rubbery curd or lumpy watery texture.',
      tasteWarning: 'Never scrape mold off sour cream! Fungal hyphae reach the bottom of soft dairy.'
    },
    pathogenRisk: 'Mycotoxins & Mold Spores',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Water separating on top is harmless whey; simply stir it back into the sour cream.'
  },
  {
    id: 'butter_salted',
    name: 'Salted Butter',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🧈',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Days (covered)', unopenedDays: 2, opened: '1-2 Days (butter bell)', openedDays: 2 },
    refrigLife: { unopened: '1-3 Months', unopenedDays: 90, opened: '1 Month', openedDays: 30 },
    freezeLife: { duration: '6-9 Months', days: 240 },
    storageTips: 'Store in butter compartment or sealed dish. Butter absorbs strong odors from onions and garlic easily.',
    spoilageGuide: {
      look: 'Dark yellow discoloration on outer edges.',
      smell: 'Rancid, stale paint or chemical aroma.',
      touch: 'Sticky surface or melted rancid oil pools.',
      tasteWarning: 'Rancid butter is unpleasant and oxidizes lipids, but rare to cause lethal poisoning.'
    },
    pathogenRisk: 'Lipid Oxidation (Low Pathogen)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Salted butter has a lower water activity and salt barrier that allows it to safely sit in a French butter bell on the counter for 1-2 weeks.'
  },
  {
    id: 'butter_unsalted',
    name: 'Unsalted Butter',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🧈',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store on Counter', unopenedDays: 0, opened: 'Do Not Store on Counter', openedDays: 0 },
    refrigLife: { unopened: '1-2 Months', unopenedDays: 60, opened: '2-3 Weeks', openedDays: 21 },
    freezeLife: { duration: '6-9 Months', days: 240 },
    storageTips: 'Without salt as a natural preservative, unsalted butter goes rancid faster than salted butter. Keep refrigerated.',
    spoilageGuide: {
      look: 'Dark yellow outer rim, mold spots.',
      smell: 'Sour, stale cheesy or paint smell.',
      touch: 'Slimy or sticky surface.',
      tasteWarning: 'Rancid fatty acids taste unpleasantly sour.'
    },
    pathogenRisk: 'Rancidity / Mold',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Professional bakers prefer unsalted butter because it gives 100% control over the exact salt ratio in doughs.'
  },
  {
    id: 'cheddar_cheese',
    name: 'Cheddar Cheese (Hard Block)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🧀',
    modelKey: 'cheese',
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '6 Months', unopenedDays: 180, opened: '3-4 Weeks', openedDays: 28 },
    freezeLife: { duration: '6 Months (may become crumbly)', days: 180 },
    storageTips: 'Wrap loosely in parchment or wax paper, then enclose in a zip bag to allow the cheese to breathe while retaining moisture.',
    spoilageGuide: {
      look: 'Surface mold. On HARD cheeses (cheddar, parmesan), you can safely cut away 1 inch around mold and consume the rest. On soft cheeses, discard entirely!',
      smell: 'Sharp ammonia or sour yeasty smell.',
      touch: 'Excessively greasy, slimy, or completely hardened like plastic.',
      tasteWarning: 'Low moisture hard cheese is very resilient against deep fungal hyphae penetration.'
    },
    pathogenRisk: 'Surface Molds (Low Risk for Hard Cheese)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Hard cheeses have very low water activity, making it nearly impossible for harmful pathogens like Listeria to thrive inside the block.'
  },
  {
    id: 'mozzarella_fresh',
    name: 'Fresh Mozzarella (In Water)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🧀',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: 'Use By date', unopenedDays: 14, opened: '3-5 Days', openedDays: 5 },
    freezeLife: { duration: 'Not Recommended (becomes mushy)', days: 30 },
    storageTips: 'Keep submerged in its original brine liquid until use. High moisture makes it highly perishable.',
    spoilageGuide: {
      look: 'Yellowing or pink discoloration, slimy brine water.',
      smell: 'Sour, fermented or sharp ammonia odor.',
      touch: 'Slimy or mushy texture that falls apart.',
      tasteWarning: 'High-moisture cheeses can harbor Listeria. Do not consume if brine smells sour.'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Fresh mozzarella is stretched in hot water (pasta filata method), creating its signature smooth, elastic fibrous texture.'
  },
  {
    id: 'parmesan_wedge',
    name: 'Parmigiano-Reggiano (Wedge)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🧀',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '2-4 Weeks (cool pantry)', unopenedDays: 28, opened: '1-2 Weeks', openedDays: 14 },
    refrigLife: { unopened: '1 Year', unopenedDays: 365, opened: '2-4 Months', openedDays: 90 },
    freezeLife: { duration: '1 Year (grate before freezing)', days: 365 },
    storageTips: 'Wrap in cheese paper or parchment and keep in vegetable crisper drawer. Save the hard rind to simmer in soups and sauces!',
    spoilageGuide: {
      look: 'White calcium lactate crystals are normal! Green or gray surface mold can simply be cut away with 1 inch margin.',
      smell: 'Musty mold smell throughout.',
      touch: 'Dry and crumbly is normal; sticky or slimy is bad.',
      tasteWarning: 'One of the safest foods on earth due to 24-36 months of aging and high salinity.'
    },
    pathogenRisk: 'Extremely Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'The white crunchy specks in aged Parmesan are not salt—they are tyrosine amino acid crystals formed during protein breakdown.'
  },
  {
    id: 'brie_soft_cheese',
    name: 'Brie / Camembert (Soft Cheese)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🧀',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '1-2 Weeks', openedDays: 14 },
    freezeLife: { duration: 'Not Recommended (texture ruins)', days: 30 },
    storageTips: 'Wrap in wax paper, not plastic cling wrap, so the live Penicillium camemberti white rind can breathe.',
    spoilageGuide: {
      look: 'Pink, gray, or blue mold breaking through white bloomy rind, brown weeping edges.',
      smell: 'Overwhelming chemical ammonia smell.',
      touch: 'Liquefied or slimy center with crusty rind.',
      tasteWarning: 'Discard immediately if mold other than the white rind appears.'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'The white fluffy rind of Brie is a living edible mold (Penicillium camemberti) that ripens the cheese from the outside in.'
  },
  {
    id: 'cottage_cheese',
    name: 'Cottage Cheese (4% Curd)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥣',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Store inverted (upside down) in the fridge—this creates a vacuum seal that inhibits mold growth on top.',
    spoilageGuide: {
      look: 'Pink or yellowish mold colonies, watery separation with cloudy slime.',
      smell: 'Foul sour or yeasty odor.',
      touch: 'Curds feel slimy or gritty.',
      tasteWarning: 'High moisture allows mold toxins to penetrate throughout container.'
    },
    pathogenRisk: 'Listeria & Spoilage Molds',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Storing your cottage cheese or sour cream tub upside down creates an airtight barrier that can extend freshness by up to a week.'
  },
  {
    id: 'greek_yogurt',
    name: 'Greek Yogurt',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥣',
    modelKey: 'yogurt',
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '7 Days', openedDays: 7 },
    freezeLife: { duration: '1-2 Months (texture separates)', days: 45 },
    storageTips: 'Always use a clean spoon. Clear liquid on top is whey (protein & water)—simply stir it back in.',
    spoilageGuide: {
      look: 'Pink, blue, dark mold spots on surface or underneath lid rim.',
      smell: 'Pungent yeast-like, alcoholic or putrid smell.',
      touch: 'Curdled, separated into gritty watery lumps.',
      tasteWarning: 'Discard immediately if mold is visible anywhere in the container.'
    },
    pathogenRisk: 'Mold & Yeast Spoilage',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Live active cultures in yogurt produce lactic acid, creating an acidic barrier (pH ~4.4) that suppresses many pathogenic bacteria.'
  },
  {
    id: 'eggs_fresh',
    name: 'Fresh Shell Eggs',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥚',
    modelKey: 'eggs',
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store (US)', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-5 Weeks', unopenedDays: 35, opened: '2-4 Days (cracked)', openedDays: 4 },
    freezeLife: { duration: '1 Year (beat whole or whites only)', days: 365 },
    storageTips: 'Keep in original carton on an inner shelf (40°F/4°C or below). Do not wash before storing—washing strips the protective natural bloom.',
    spoilageGuide: {
      look: 'Float test: bad eggs float to the surface in water. Pink or iridescent egg white/yolk indicates Pseudomonas bacteria.',
      smell: 'Sulfurous, rotten, foul stench when cracked.',
      touch: 'Shell feels slimy or powdery with mold.',
      tasteWarning: 'Risk of Salmonella enteritidis. Cook until both white and yolk are firm.'
    },
    pathogenRisk: 'Salmonella enteritidis',
    safetyRating: 'high_risk',
    dateType: 'Sell By',
    funFact: 'The float test works because as eggs age, moisture evaporates through microscopic shell pores, expanding the internal air pocket.'
  },
  {
    id: 'egg_whites_liquid',
    name: 'Liquid Egg Whites (Carton)',
    category: 'dairy',
    categoryName: 'Dairy & Eggs',
    icon: '🥚',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: 'Use By date', unopenedDays: 30, opened: '3-4 Days', openedDays: 4 },
    freezeLife: { duration: '1 Year', days: 365 },
    storageTips: 'Pasteurized in the carton, but once opened, use within 3-4 days as raw egg protein spoils rapidly.',
    spoilageGuide: {
      look: 'Cloudy, discolored, or greenish tint.',
      smell: 'Sulfur, rotten or sour odor.',
      touch: 'Excessively thick or stringy slime.',
      tasteWarning: 'High risk of bacterial multiplication after 4 days opened.'
    },
    pathogenRisk: 'Salmonella & Spoilage Bacteria',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Commercial liquid egg whites are flash-pasteurized at 134°F to destroy Salmonella without cooking the egg proteins.'
  },

  // ==========================================
  // 2. MEAT & POULTRY (12 items)
  // ==========================================
  {
    id: 'raw_ground_beef',
    name: 'Fresh Ground Beef',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥩',
    modelKey: 'ground_beef',
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '3-4 Months', days: 120 },
    storageTips: 'Store on the bottom shelf of the fridge on a plate or tray to prevent raw juices from dripping onto other food.',
    spoilageGuide: {
      look: 'Grayish-brown exterior with green hue or dull surface. (Note: slight interior graying from oxygen starvation inside thick meat is normal, but slimy sheen is bad).',
      smell: 'Sour, pungent, sulfurous or ammonia-like smell.',
      touch: 'Tacky, sticky, or slimy texture on fingers.',
      tasteWarning: 'High risk for E. coli, Salmonella, and Staphylococcus aureus. Must be cooked to internal 160°F (71°C).'
    },
    pathogenRisk: 'E. coli O157:H7, Salmonella',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Grinding meat mixes surface bacteria throughout the entire batch, which is why ground beef must be cooked well-done (160°F), unlike whole steaks.'
  },
  {
    id: 'ribeye_steak',
    name: 'Raw Beef Steaks / Roasts',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥩',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-5 Days', unopenedDays: 5, opened: '3-5 Days', openedDays: 5 },
    freezeLife: { duration: '6-12 Months', days: 270 },
    storageTips: 'Keep in coldest part of fridge. Freeze in airtight vacuum seal to avoid freezer burn.',
    spoilageGuide: {
      look: 'Greenish-black discoloration, slimy slick surface.',
      smell: 'Rotten, sour, or ammonia scent.',
      touch: 'Slimy coating that leaves residue on hands.',
      tasteWarning: 'Whole beef muscle bacteria reside on the surface; sear outside thoroughly to 145°F with 3 min rest.'
    },
    pathogenRisk: 'E. coli & Salmonella',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'A steak can be safely eaten medium-rare because dense muscle fibers prevent bacteria from penetrating inside the meat.'
  },
  {
    id: 'pork_chops_raw',
    name: 'Raw Pork Chops / Tenderloin',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥩',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-5 Days', unopenedDays: 5, opened: '3-5 Days', openedDays: 5 },
    freezeLife: { duration: '4-6 Months', days: 150 },
    storageTips: 'Refrigerate immediately. Cook to minimum internal 145°F with a 3-minute rest.',
    spoilageGuide: {
      look: 'Dull gray or green hue, dried dark patches.',
      smell: 'Pungent sour, sulfur or rotten odor.',
      touch: 'Sticky, tacky or slimy wet feel.',
      tasteWarning: 'Risk of Yersinia enterocolitica and Salmonella.'
    },
    pathogenRisk: 'Yersinia enterocolitica, Salmonella',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'USDA updated pork cooking guidelines to 145°F (medium with slight pink blush), debunking the myth that pork must be cooked dry to 160°F.'
  },
  {
    id: 'chicken_breasts',
    name: 'Raw Chicken Breasts / Thighs',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🍗',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '9 Months', days: 270 },
    storageTips: 'Never wash raw chicken in the sink (it aerosolizes Campylobacter & Salmonella bacteria up to 3 feet across your kitchen).',
    spoilageGuide: {
      look: 'Faded gray or greenish tint instead of translucent pink.',
      smell: 'Rotten egg, sour ammonia, or sweet sickly decay aroma.',
      touch: 'Very slimy or slippery coating that stays on hands.',
      tasteWarning: 'Severe risk of Salmonella and Campylobacteriosis. Cook chicken to internal 165°F (74°C).'
    },
    pathogenRisk: 'Campylobacter, Salmonella',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Freezing poultry preserves safety indefinitely; 9 months is simply the USDA limit for optimal flavor and texture before freezer burn.'
  },
  {
    id: 'whole_turkey_raw',
    name: 'Whole Raw Turkey',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🦃',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '1 Year', days: 365 },
    storageTips: 'Thaw in refrigerator allowing 24 hours for every 4-5 pounds. Never thaw on the kitchen counter!',
    spoilageGuide: {
      look: 'Grayish skin, bruised green discoloration around cavities.',
      smell: 'Sour, sulfur or gamey rotten odor.',
      touch: 'Slimy skin texture.',
      tasteWarning: 'Cook thoroughly to internal 165°F in deepest part of thigh, wing, and breast.'
    },
    pathogenRisk: 'Salmonella & Clostridium perfringens',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'A 20-pound frozen turkey takes a full 4 to 5 days to safely thaw inside a refrigerator at 38°F.'
  },
  {
    id: 'bacon_cured',
    name: 'Cured Bacon (Vacuum Packed)',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥓',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '2 Weeks past date', unopenedDays: 14, opened: '7 Days', openedDays: 7 },
    freezeLife: { duration: '1 Month (quality drops due to salt)', days: 30 },
    storageTips: 'Wrap leftover slices tightly in aluminum foil or airtight plastic bag.',
    spoilageGuide: {
      look: 'Green, gray, or brown discoloration on the pink fat/meat.',
      smell: 'Sour, rancid, fishy or foul smell.',
      touch: 'Slimy coating or sticky mucus film.',
      tasteWarning: 'Sodium nitrite curing salts prevent Botulism, but spoilage bacteria can still flourish after 7 days opened.'
    },
    pathogenRisk: 'Staphylococcus aureus, Spoilage Bacteria',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Curing with salt and nitrites lowers water activity and inhibits Clostridium botulinum, giving bacon a longer shelf life than fresh pork.'
  },
  {
    id: 'hot_dogs_opened',
    name: 'Beef Hot Dogs (Packaged)',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🌭',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '2 Weeks (sealed)', unopenedDays: 14, opened: '1 Week', openedDays: 7 },
    freezeLife: { duration: '1-2 Months', days: 45 },
    storageTips: 'Keep sealed in plastic wrap or zip bag once the vacuum package is cut open.',
    spoilageGuide: {
      look: 'Milky slimy coating inside package, dull brownish color.',
      smell: 'Sour, fermented or chemical odor.',
      touch: 'Excessive sticky slime on hot dog skins.',
      tasteWarning: 'High risk for Listeria monocytogenes. Always reheat hot dogs until steaming hot (165°F).'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Pregnant women are advised to always reheat hot dogs to steaming hot (165°F) because Listeria can grow even at refrigeration temperatures.'
  },
  {
    id: 'deli_sliced_turkey',
    name: 'Sliced Deli Meat (Turkey / Ham)',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥪',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '2 Weeks (sealed pack)', unopenedDays: 14, opened: '3-5 Days', openedDays: 5 },
    freezeLife: { duration: '1-2 Months', days: 45 },
    storageTips: 'Keep at 40°F (4°C) or lower. Deli counter cuts expire faster than sealed prepackaged cold cuts.',
    spoilageGuide: {
      look: 'Iridescent oily shine is often safe physics of light diffraction, but grayness or mold spots are spoilage.',
      smell: 'Sour, vinegar-like or yeasty smell.',
      touch: 'Slimy film or slick wet coating.',
      tasteWarning: 'Listeria monocytogenes can grow at refrigerator temperatures. High risk for pregnant individuals.'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Listeria is one of the few foodborne bacteria that can continue multiplying even at freezing refrigerator temperatures (34-38°F).'
  },
  {
    id: 'salami_hard',
    name: 'Hard Dry Salami (Unopened / Sliced)',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥩',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '6 Weeks (cool pantry)', unopenedDays: 42, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '6 Months', unopenedDays: 180, opened: '3 Weeks', openedDays: 21 },
    freezeLife: { duration: '1-2 Months', days: 45 },
    storageTips: 'Fermented and dried with low water activity. Keep wrapped in butcher paper in the fridge.',
    spoilageGuide: {
      look: 'White powdery casing is beneficial Penicillium mold! Green/black fuzzy mold or brown discoloration is spoilage.',
      smell: 'Rancid paint smell or foul ammonia.',
      touch: 'Excessively slimy, wet or mushy.',
      tasteWarning: 'Hard salami has high salt and low pH (~5.0), making bacterial spoilage slow.'
    },
    pathogenRisk: 'Low Pathogen Risk (Fermented)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'The white bloom on traditional Italian salami is an intentional edible mold that prevents pathogenic bacteria from colonizing the meat.'
  },
  {
    id: 'raw_pork_sausage',
    name: 'Raw Pork Sausage Links',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🌭',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '1-2 Months', days: 45 },
    storageTips: 'Cook thoroughly within 48 hours of purchase or freeze immediately.',
    spoilageGuide: {
      look: 'Grayish casing, green tint, mold spots.',
      smell: 'Sour, pungent or sulfurous odor.',
      touch: 'Slimy or sticky skin.',
      tasteWarning: 'Cook to minimum 160°F internal temperature.'
    },
    pathogenRisk: 'Salmonella & Trichinella',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Sausage spices like sage, rosemary, and black pepper actually have mild antimicrobial properties.'
  },
  {
    id: 'cooked_leftover_meat',
    name: 'Cooked Meat Leftovers',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🍲',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store (>2 hours)', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-4 Days', unopenedDays: 4, opened: '3-4 Days', openedDays: 4 },
    freezeLife: { duration: '2-6 Months', days: 90 },
    storageTips: 'Refrigerate within 2 hours of cooking. Divide large roasts or stews into shallow containers for rapid chilling.',
    spoilageGuide: {
      look: 'White fuzz or fuzzy mold colonies, slimy sheen.',
      smell: 'Sour, unpleasant or stale rancid odor.',
      touch: 'Slimy surface.',
      tasteWarning: 'Clostridium perfringens multiplies rapidly in stews cooled slowly at room temperature. Reheat to 165°F.'
    },
    pathogenRisk: 'Clostridium perfringens, Bacillus cereus',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Putting a hot pot of stew directly into a shallow container speeds cooling and prevents the middle from remaining in the Danger Zone (40-140°F).'
  },
  {
    id: 'canned_spam_meat',
    name: 'Canned Meat (Spam / Ham)',
    category: 'meat',
    categoryName: 'Meat & Poultry',
    icon: '🥫',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-5 Years past date', unopenedDays: 1000, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '5 Years', unopenedDays: 1825, opened: '3-4 Days (in plastic container)', openedDays: 4 },
    freezeLife: { duration: '1-2 Months (opened)', days: 45 },
    storageTips: 'Store in cool dry pantry. Transfer leftovers out of tin can into a glass container before refrigerating.',
    spoilageGuide: {
      look: 'Bulging can, spurting gelatin upon opening, rusted seams.',
      smell: 'Foul rancid or sour smell.',
      touch: 'Mushy or slimy texture.',
      tasteWarning: 'Botulinum toxin risk if can is swollen or damaged.'
    },
    pathogenRisk: 'Clostridium botulinum (if can damaged)',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'SPAM stands for "Specially Processed American Meat" and was invented in 1937 to feed Allied troops during World War II.'
  },

  // ==========================================
  // 3. SEAFOOD (10 items)
  // ==========================================
  {
    id: 'salmon_fresh',
    name: 'Wild Atlantic Salmon Fillet',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🐟',
    modelKey: 'salmon',
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '2-3 Months', days: 75 },
    storageTips: 'Place over a bowl of crushed ice in the coldest part of your fridge if cooking within 24 hours.',
    spoilageGuide: {
      look: 'Dull brown/gray flesh, cloudy appearance, yellowing fat lines.',
      smell: 'Strong fishy, ammonia-like, or rotten seaweed odor. Fresh fish smells like clean ocean brine.',
      touch: 'Mushy flesh that does not spring back when pressed with a finger, or sticky slime.',
      tasteWarning: 'Scombroid poisoning and histamine buildup occur when finfish is stored improperly.'
    },
    pathogenRisk: 'Histamine (Scombroid), Vibrio, Salmonella',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Fresh fish has virtually no "fishy" smell; trimethylamine oxide (TMAO) only breaks down into fishy-smelling trimethylamine (TMA) as bacteria decompose the flesh.'
  },
  {
    id: 'tuna_steak_fresh',
    name: 'Fresh Ahi / Yellowfin Tuna Steak',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🐟',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '2-3 Months', days: 75 },
    storageTips: 'Store on ice in the fridge. Cook or sear within 24 hours of purchase.',
    spoilageGuide: {
      look: 'Dark brown oxidation throughout, dry dull surface or rainbow oily film.',
      smell: 'Pungent ammonia or chemical sour fish odor.',
      touch: 'Soft, mushy flesh that tears easily.',
      tasteWarning: 'High risk of Scombroid fish poisoning if temperature exceeds 40°F.'
    },
    pathogenRisk: 'Scombroid Histamine Toxicity',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Histamine poisoning cannot be destroyed by cooking or freezing once bacteria have converted histidine into histamine in the fish.'
  },
  {
    id: 'shrimp_raw',
    name: 'Raw Shrimp (Peeled / Shell-on)',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🦐',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '6-9 Months', days: 240 },
    storageTips: 'Thaw frozen shrimp under cold running water right before cooking, not on the counter at room temp.',
    spoilageGuide: {
      look: 'Black spots on shells (melanosis), yellow or faded flesh.',
      smell: 'Bleach, ammonia or pungent rotten odor.',
      touch: 'Soft, mushy, slimy shell or flesh.',
      tasteWarning: 'Seafood spoilage accelerates rapidly above 40°F.'
    },
    pathogenRisk: 'Vibrio parahaemolyticus',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Most "fresh" shrimp at the seafood counter was actually flash-frozen at sea on the boat and thawed at the store.'
  },
  {
    id: 'scallops_fresh',
    name: 'Fresh Sea Scallops',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🦪',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '3-6 Months', days: 120 },
    storageTips: 'Dry-packed scallops (without sodium tripolyphosphate soak) sear better and have a fresher sweet ocean flavor.',
    spoilageGuide: {
      look: 'Dull yellow or gray discoloration, cloudy milky liquid.',
      smell: 'Sour, ammonia or rotten seaweed odor.',
      touch: 'Slimy or mushy texture.',
      tasteWarning: 'Cook to opaque white center (145°F).'
    },
    pathogenRisk: 'Vibrio species',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Fresh scallops should smell sweet and briny like a clean ocean breeze, never fishy or chemical.'
  },
  {
    id: 'mussels_live',
    name: 'Live Fresh Mussels / Clams',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🦪',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: 'Do Not Store Once Cooked >2 Days', openedDays: 2 },
    freezeLife: { duration: '3 Months (cooked out of shell)', days: 90 },
    storageTips: 'Store in an open bowl covered with a damp towel. Never submerge live shellfish in freshwater or seal in plastic bags (they will suffocate!).',
    spoilageGuide: {
      look: 'Broken shells. Tap open shells on counter: if they do not close tightly, the mussel is dead and must be discarded!',
      smell: 'Foul sulfur or putrid sewer smell.',
      touch: 'Dry, gaping open shells.',
      tasteWarning: 'Never cook or eat dead bivalves. Discard any shells that remain closed after cooking.'
    },
    pathogenRisk: 'Vibrio vulnificus, Paralytic Shellfish Toxins',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Live bivalves breathe through the air in the fridge. Sealing them in an airtight plastic bag suffocates and kills them in hours.'
  },
  {
    id: 'canned_tuna',
    name: 'Canned Albacore Tuna',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🐟',
    modelKey: 'tuna_can',
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-5 Years past date', unopenedDays: 1460, opened: 'Do Not Store in Open Can', openedDays: 0 },
    refrigLife: { unopened: '5 Years', unopenedDays: 1825, opened: '3-4 Days (in glass container)', openedDays: 4 },
    freezeLife: { duration: '2-3 Months (out of can in freezer bag)', days: 75 },
    storageTips: 'Store in a cool dry pantry. Never buy or store cans that are swollen, heavily dented along seams, or rusted.',
    spoilageGuide: {
      look: 'Swollen can domes (GAS from Clostridium botulinum!), spurting liquid upon opening, rusted seams, black discoloration inside.',
      smell: 'Sharp metallic, sour, or rancid rotten fish smell.',
      touch: 'Mushy, foamy, or slimy contents.',
      tasteWarning: 'NEVER taste food from a bulging or leaking can! Botulinum neurotoxin is the deadliest toxin known to science.'
    },
    pathogenRisk: 'Clostridium botulinum (Damaged Cans)',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Commercial canning involves heating food under pressure to 240-250°F (116-121°C), which destroys all bacterial spores, sterilizing the interior for decades.'
  },
  {
    id: 'smoked_salmon',
    name: 'Smoked Salmon (Vacuum Packed)',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🐟',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '2-3 Weeks', unopenedDays: 21, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '2 Months', days: 60 },
    storageTips: 'Cold-smoked salmon is cured and smoked at low temp (under 90°F), so it remains raw and perishable. Keep refrigerated.',
    spoilageGuide: {
      look: 'Dull brown edges, slimy wet film, white mold spots.',
      smell: 'Sour, ammonia or rancid fish smell.',
      touch: 'Mushy, sticky or slimy texture.',
      tasteWarning: 'Listeria monocytogenes risk in cold-smoked fish.'
    },
    pathogenRisk: 'Listeria monocytogenes',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Hot-smoked salmon is cooked to 145°F and has a flaky texture, while cold-smoked salmon (lox) remains silky and raw.'
  },
  {
    id: 'crab_meat_fresh',
    name: 'Lump Crab Meat (Tub)',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🦀',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: 'Use By Date', unopenedDays: 14, opened: '2-3 Days', openedDays: 3 },
    freezeLife: { duration: '3-4 Months', days: 100 },
    storageTips: 'Store in coldest section of fridge. Pasteurized canned crab lasts months unopened, but fresh tub crab lasts only 2-3 days opened.',
    spoilageGuide: {
      look: 'Bluish-gray discoloration, dried yellow crust.',
      smell: 'Sharp ammonia, bleach, or sour odor.',
      touch: 'Slimy coating on crab meat pieces.',
      tasteWarning: 'Discard at first hint of ammonia odor.'
    },
    pathogenRisk: 'Vibrio & Spoilage Bacteria',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Fresh crab has natural blue blood pigments (hemocyanin based on copper), which can cause slight blue tinting during cooking.'
  },
  {
    id: 'cooked_shrimp_cocktail',
    name: 'Cooked Cocktail Shrimp',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🦐',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-4 Days', unopenedDays: 4, opened: '3-4 Days', openedDays: 4 },
    freezeLife: { duration: '2-3 Months', days: 75 },
    storageTips: 'Keep chilled over ice. Never leave out on party buffet tables longer than 2 hours (1 hour if over 90°F).',
    spoilageGuide: {
      look: 'Slimy coating, yellow discoloration on tail.',
      smell: 'Ammonia, sour or fishy stench.',
      touch: 'Slick or slimy feel.',
      tasteWarning: 'Cross contamination from raw seafood during buffets is a top food poisoning cause.'
    },
    pathogenRisk: 'Staphylococcus aureus, Vibrio',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Shrimp turns pink/orange when cooked because heat denatures crustacyanin protein, freeing the red carotenoid pigment astaxanthin.'
  },
  {
    id: 'cod_fillets_whitefish',
    name: 'Fresh Cod / Whitefish Fillets',
    category: 'seafood',
    categoryName: 'Seafood',
    icon: '🐟',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '4-6 Months', days: 150 },
    storageTips: 'Pat dry with paper towels and wrap tightly in parchment before storing on ice in the fridge.',
    spoilageGuide: {
      look: 'Yellowing, milky liquid, dull translucent flesh.',
      smell: 'Sharp ammonia or rotten cabbage smell.',
      touch: 'Soft, mushy flesh that breaks apart when handled.',
      tasteWarning: 'Cook to opaque white flake texture (145°F).'
    },
    pathogenRisk: 'Anisakis Nematodes (kill via cooking or freezing)',
    safetyRating: 'high_risk',
    dateType: 'Use By',
    funFact: 'Cod and wild whitefish must be cooked to 145°F or deep-frozen to -4°F for 7 days to eliminate naturally occurring marine parasites.'
  },

  // ==========================================
  // 4. PRODUCE (18 items)
  // ==========================================
  {
    id: 'strawberries_fresh',
    name: 'Fresh Strawberries',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍓',
    modelKey: 'strawberries',
    idealStorage: 'fridge',
    pantryLife: { unopened: '1 Day', unopenedDays: 1, opened: '1 Day', openedDays: 1 },
    refrigLife: { unopened: '5-7 Days', unopenedDays: 7, opened: '3-5 Days', openedDays: 5 },
    freezeLife: { duration: '1 Year (hull and freeze on baking sheet)', days: 365 },
    storageTips: 'Do NOT wash until right before eating. Store in a paper-towel lined container to absorb moisture.',
    spoilageGuide: {
      look: 'White or gray fuzz (Botrytis cinerea mold), bruised dark soggy patches, mushy weeping bottom.',
      smell: 'Fermented, alcoholic, or vinegary smell.',
      touch: 'Extremely soft, collapsed, slimy surface.',
      tasteWarning: 'Mold spores spread rapidly between touching berries; remove molded berries immediately to save the rest.'
    },
    pathogenRisk: 'Botrytis cinerea (Gray Mold)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'A quick 30-second vinegar-water wash (1 part white vinegar to 3 parts water) kills mold spores and doubles strawberry shelf life if thoroughly dried after.'
  },
  {
    id: 'blueberries_fresh',
    name: 'Fresh Blueberries',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🫐',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1-2 Days', openedDays: 2 },
    refrigLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '1 Week', openedDays: 7 },
    freezeLife: { duration: '10-12 Months', days: 300 },
    storageTips: 'Keep in original vented clamshell. Discard any crushed berries immediately.',
    spoilageGuide: {
      look: 'White fuzzy mold at the stem end, shriveled wrinkled skins.',
      smell: 'Fermented wine odor.',
      touch: 'Mushy, leaking juice.',
      tasteWarning: 'White powdery coating on fresh blueberries is natural protective epicuticular wax (bloom), not mold!'
    },
    pathogenRisk: 'Mold Spores',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'The silvery-white film on blueberries is called "bloom"—a natural wax the plant produces to protect the fruit from insects and moisture loss.'
  },
  {
    id: 'honeycrisp_apple',
    name: 'Honeycrisp Apples',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍎',
    modelKey: 'apple',
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '1-2 Days (sliced)', openedDays: 2 },
    refrigLife: { unopened: '1-2 Months (in crisper drawer)', unopenedDays: 45, opened: '3-5 Days (sliced with lemon)', openedDays: 5 },
    freezeLife: { duration: '8 Months (cooked or peeled slices in syrup)', days: 240 },
    storageTips: 'Refrigerate in the high-humidity crisper drawer. Keep away from ethylene-sensitive vegetables like carrots and broccoli.',
    spoilageGuide: {
      look: 'Deep brown soft spots, wrinkled skin, core rot.',
      smell: 'Fermented cider aroma or musty basement smell.',
      touch: 'Mushy, spongy yield when squeezed.',
      tasteWarning: 'Enzymatic browning of sliced apples is harmless polyphenol oxidase reaction, not microbial rot.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Apples emit ethylene gas as they ripen, which will cause nearby leafy greens, potatoes, and bananas to spoil up to 3x faster!'
  },
  {
    id: 'ripe_bananas',
    name: 'Bananas',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍌',
    modelKey: 'banana',
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-5 Days (ripe)', unopenedDays: 5, opened: '1 Day (peeled)', openedDays: 1 },
    refrigLife: { unopened: '5-7 Days (skin blackens, flesh stays firm)', unopenedDays: 7, opened: '1-2 Days', openedDays: 2 },
    freezeLife: { duration: '3-6 Months (peeled in zip bag for smoothies)', days: 120 },
    storageTips: 'Hang on a banana hook at room temp. Wrap the crown/stems in plastic foil to slow ethylene release.',
    spoilageGuide: {
      look: 'Entirely black skin with liquid leaking, mold on stem, brown mushy interior.',
      smell: 'Strong alcohol, acetone or fermented stench.',
      touch: 'Liquefied or oozing brown pulp.',
      tasteWarning: 'Overripe speckled brown bananas are sweet and ideal for banana bread; only throw out if moldy or fermented.'
    },
    pathogenRisk: 'Low Risk (Quality Spoilage)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Putting bananas in the fridge turns the peel black quickly due to polyphenol oxidase enzyme chilling injury, but the fruit inside stays firm for days longer!'
  },
  {
    id: 'avocado_haas',
    name: 'Hass Avocado',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥑',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-4 Days (to ripen)', unopenedDays: 4, opened: '1-2 Days (with pit & lime)', openedDays: 2 },
    refrigLife: { unopened: '7-10 Days (once ripe)', unopenedDays: 10, opened: '2-3 Days', openedDays: 3 },
    freezeLife: { duration: '3-6 Months (mashed with lemon juice)', days: 120 },
    storageTips: 'Ripen at room temperature; once ripe, transfer to the fridge to pause ripening for up to a week.',
    spoilageGuide: {
      look: 'Black, sunken skin, dark gray stringy flesh throughout, mold around the stem button.',
      smell: 'Rancid oil or chemical smell.',
      touch: 'Squishy hollow feel under the skin with deep indentations.',
      tasteWarning: 'Minor surface browning from oxygen exposure is safe to eat or scrape away.'
    },
    pathogenRisk: 'Listeria on skin (Wash before cutting!)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Submerging half an avocado in water in the fridge is a dangerous viral hack that can harbor Listeria on the skin; instead, use cling wrap tightly pressed against the flesh with a squeeze of citrus.'
  },
  {
    id: 'lemons_fresh',
    name: 'Fresh Lemons / Limes',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍋',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '2-3 Days (halved)', openedDays: 3 },
    refrigLife: { unopened: '3-4 Weeks (in sealed bag)', unopenedDays: 28, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '3-4 Months (juice or zest)', days: 100 },
    storageTips: 'Store in a sealed plastic bag in the fridge crisper. Counter storage dries out citrus juice in 10 days.',
    spoilageGuide: {
      look: 'Green powdery mold (Penicillium digitatum), hard brown shriveled rind, sunken soft spots.',
      smell: 'Fermented or musty mold odor.',
      touch: 'Spongy, mushy or rock-hard dried out.',
      tasteWarning: 'Citrus mold can release mycotoxins into soft pulp.'
    },
    pathogenRisk: 'Penicillium Mold',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Sealing whole lemons in a ziplock bag in the fridge prevents moisture evaporation, keeping them juicy for over 4 weeks!'
  },
  {
    id: 'oranges_navel',
    name: 'Navel Oranges',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍊',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '2-3 Days', openedDays: 3 },
    refrigLife: { unopened: '3-4 Weeks', unopenedDays: 28, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '6 Months (peeled sections or juice)', days: 180 },
    storageTips: 'Refrigerate in mesh bag or crisper drawer for airflow.',
    spoilageGuide: {
      look: 'White and green powdery mold, soft collapsed spots on rind.',
      smell: 'Sour, fermented alcohol smell.',
      touch: 'Squishy wet spots.',
      tasteWarning: 'Discard if mold has penetrated through the rind into fruit sections.'
    },
    pathogenRisk: 'Citrus Molds',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Oranges do not continue ripening after being picked from the tree; what you buy in store is at peak sweetness.'
  },
  {
    id: 'tomatoes_fresh',
    name: 'Fresh Vine Tomatoes',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍅',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '5-7 Days (stem side down)', unopenedDays: 7, opened: '1-2 Days (sliced)', openedDays: 2 },
    refrigLife: { unopened: '1-2 Weeks (chilling degrades aroma enzymes)', unopenedDays: 14, opened: '2-3 Days', openedDays: 3 },
    freezeLife: { duration: '2-3 Months (blanched & peeled for sauce)', days: 75 },
    storageTips: 'Store stem-side down at room temperature out of direct sunlight. Never refrigerate unripe tomatoes as cold destroys flavor volatiles.',
    spoilageGuide: {
      look: 'Wrinkled skin, black mold spots around stem, liquid leaking from bottom.',
      smell: 'Sour, fermented or decaying odor.',
      touch: 'Soft, collapsing mush or slimy skin.',
      tasteWarning: 'Overripe soft tomatoes are excellent for tomato sauce; discard only if moldy.'
    },
    pathogenRisk: 'Salmonella on skin (wash thoroughly)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Refrigerating tomatoes below 54°F permanently disables the (Z)-3-hexenal aroma enzyme genes, turning their texture mealy and flavor bland!'
  },
  {
    id: 'spinach_fresh',
    name: 'Baby Spinach (Clamshell)',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥬',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '7-10 Days', unopenedDays: 10, opened: '5 Days', openedDays: 5 },
    freezeLife: { duration: '10-12 Months (blanched)', days: 300 },
    storageTips: 'Place a dry paper towel inside the plastic tub to absorb condensation and keep leaves crisp.',
    spoilageGuide: {
      look: 'Dark green wet mush, liquefied rotting leaves, yellowing.',
      smell: 'Musty, foul swampy odor.',
      touch: 'Slimy wet leaves that disintegrate between fingers.',
      tasteWarning: 'Discard immediately when leaves become slimy to prevent gastrointestinal illness.'
    },
    pathogenRisk: 'E. coli O157:H7, Salmonella',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Pre-washed bagged salad greens are washed with a mild chlorine/water sanitizer bath before packaging; washing again at home often introduces sink bacteria!'
  },
  {
    id: 'romaine_lettuce',
    name: 'Romaine Lettuce Hearts',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥬',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Wrap the base in a damp paper towel and store in high-humidity crisper drawer. Keep away from apples and bananas.',
    spoilageGuide: {
      look: 'Red/rust coloring on ribs is harmless oxidation; slimy brown rotting leaves are spoilage.',
      smell: 'Foul decaying plant odor.',
      touch: 'Limp, slimy or mushy leaves.',
      tasteWarning: 'Wash whole heads under cold running water before chopping.'
    },
    pathogenRisk: 'E. coli & Norovirus',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'The pink/reddish color on cut lettuce stems is "russet spotting"—a harmless reaction between ethylene gas and lettuce polyphenols.'
  },
  {
    id: 'broccoli_fresh',
    name: 'Fresh Broccoli Crowns',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥦',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Days', unopenedDays: 2, opened: '1 Day', openedDays: 1 },
    refrigLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '3-5 Days (chopped)', openedDays: 5 },
    freezeLife: { duration: '10-12 Months (blanched in florets)', days: 300 },
    storageTips: 'Store loose in crisper drawer. Do not seal tightly in a plastic bag—broccoli needs to release respiration gases.',
    spoilageGuide: {
      look: 'Yellowing florets (loss of chlorophyll), black mold spots, slimy stems.',
      smell: 'Strong sulfur or rotting cabbage odor.',
      touch: 'Limp, rubbery or soft mushy stalk.',
      tasteWarning: 'Yellow broccoli is safe but bitter and nutritionally degraded; slimy broccoli must be thrown out.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Broccoli florets are actually hundreds of tiny immature flower buds; yellowing means the buds are attempting to bloom into flowers!'
  },
  {
    id: 'carrots_whole',
    name: 'Whole Raw Carrots',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥕',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '3-5 Days', unopenedDays: 5, opened: '2-3 Days', openedDays: 3 },
    refrigLife: { unopened: '4-5 Weeks', unopenedDays: 35, opened: '2-3 Weeks', openedDays: 21 },
    freezeLife: { duration: '10-12 Months (blanched slices)', days: 300 },
    storageTips: 'Cut off green leafy tops immediately (they suck moisture out of the roots). Store in a plastic bag in crisper drawer.',
    spoilageGuide: {
      look: 'White powdery blush on surface is harmless dehydration; black rot spots or slimy coating is spoilage.',
      smell: 'Sour or decaying smell.',
      touch: 'Rubbery, bendable, or slimy to touch.',
      tasteWarning: 'White blush on peeled carrots disappears when soaked in cold water!'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'The "white blush" on baby carrots is simply dehydrated carrot surface cells, not mold or chlorine residue.'
  },
  {
    id: 'russet_potatoes',
    name: 'Russet / Yukon Gold Potatoes',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥔',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Months (cool, dark & dry)', unopenedDays: 45, opened: '3-4 Days (cooked in fridge)', openedDays: 4 },
    refrigLife: { unopened: 'Do Not Refrigerate Raw! (converts starch to toxic acrylamide precursor)', unopenedDays: 30, opened: '3-4 Days (cooked)', openedDays: 4 },
    freezeLife: { duration: '10-12 Months (cooked/mashed only)', days: 300 },
    storageTips: 'Store in a dark, ventilated cardboard box or paper bag (45-50°F). Keep away from onions (they emit gases that cause sprouting).',
    spoilageGuide: {
      look: 'Green skin or sprouts (SOLANINE neurotoxin!). Small sprouts can be carved out, but green bitter potatoes must be thrown away.',
      smell: 'Rotten, putrid foul odor.',
      touch: 'Soft, squishy, wrinkled or leaking liquid.',
      tasteWarning: 'Never eat green potatoes! Solanine causes gastrointestinal and neurological toxicity.'
    },
    pathogenRisk: 'Solanine Glycoalkaloid Poisoning',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Refrigerating raw potatoes causes "cold-induced sweetening"—cold temperatures convert starches into reducing sugars, which turn dark and form acrylamide when fried.'
  },
  {
    id: 'yellow_onions',
    name: 'Yellow / Red Onions',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🧅',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Months (cool, dark & dry)', unopenedDays: 45, opened: 'Do Not Leave Cut at Room Temp', openedDays: 0 },
    refrigLife: { unopened: '2-3 Months', unopenedDays: 75, opened: '7-10 Days (chopped in airtight container)', openedDays: 10 },
    freezeLife: { duration: '8 Months (chopped raw in freezer bag)', days: 240 },
    storageTips: 'Store in a mesh bag in a cool, well-ventilated dry pantry. Never store next to potatoes.',
    spoilageGuide: {
      look: 'Black mold (Aspergillus niger) beneath papery skin, green sprouting stems, dark soft neck rot.',
      smell: 'Foul rotten or putrid sulfur odor.',
      touch: 'Mushy, spongy center, wet rotting layers.',
      tasteWarning: 'Cut onions absorb bacteria and must be kept in airtight container in fridge.'
    },
    pathogenRisk: 'Aspergillus niger (Black Mold)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Storing onions and potatoes together causes onions to absorb potato moisture and rot, while potato ethylene causes onions to sprout.'
  },
  {
    id: 'garlic_whole_bulb',
    name: 'Garlic (Whole Bulb)',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🧄',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-5 Months (cool dark pantry)', unopenedDays: 120, opened: '3-4 Weeks (individual cloves)', openedDays: 28 },
    refrigLife: { unopened: 'Not Recommended (triggers sprouting)', unopenedDays: 60, opened: '1-2 Weeks (peeled cloves)', openedDays: 14 },
    freezeLife: { duration: '10-12 Months (peeled/pureed)', days: 300 },
    storageTips: 'Keep whole bulbs in a mesh wire basket or terracotta garlic keeper at room temperature with plenty of air circulation.',
    spoilageGuide: {
      look: 'Brown spots, green center sprout (safe to eat but bitter), white fuzzy mold.',
      smell: 'Musty, sour or loss of pungent garlic aroma.',
      touch: 'Soft, dried out, hollow or rubbery cloves.',
      tasteWarning: 'NEVER store raw garlic in oil at room temperature! Garlic in oil creates an anaerobic environment ideal for lethal Clostridium botulinum.'
    },
    pathogenRisk: 'Botulism (Garlic in Oil at Room Temp)',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Raw garlic cloves submerged in oil on the counter have caused fatal Botulism outbreaks; commercial garlic in oil is strictly acidified with citric acid.'
  },
  {
    id: 'mushrooms_cremini',
    name: 'Fresh Cremini / Button Mushrooms',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🍄',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1 Day', unopenedDays: 1, opened: '1 Day', openedDays: 1 },
    refrigLife: { unopened: '7-10 Days (in paper bag)', unopenedDays: 10, opened: '4-7 Days', openedDays: 7 },
    freezeLife: { duration: '10-12 Months (sautéed before freezing)', days: 300 },
    storageTips: 'Transfer out of plastic wrap into a breathable brown paper bag. Plastic traps moisture, causing rapid slime.',
    spoilageGuide: {
      look: 'Dark brown slimy spots, shriveled wrinkled caps, mold fuzz.',
      smell: 'Sour, ammonia or foul rotting smell instead of earthy mushroom aroma.',
      touch: 'Slimy, slippery or spongy texture.',
      tasteWarning: 'Slimy mushrooms are colonized by bacterial rot—never wash and eat slimy mushrooms!'
    },
    pathogenRisk: 'Pseudomonas Bacteria',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Brown paper bags absorb excess mushroom moisture while allowing airflow, tripling mushroom fridge lifespan compared to plastic cling wrap.'
  },
  {
    id: 'cucumbers_fresh',
    name: 'English / Persian Cucumbers',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🥒',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '2-3 Days', unopenedDays: 3, opened: '1 Day', openedDays: 1 },
    refrigLife: { unopened: '1-2 Weeks (upper shelf/door)', unopenedDays: 10, opened: '3-5 Days (wrapped tightly)', openedDays: 5 },
    freezeLife: { duration: 'Not Recommended (turns to water)', days: 30 },
    storageTips: 'Wrap in paper towel inside a plastic bag. Keep in front or top of fridge (cucumbers suffer chilling injury below 50°F).',
    spoilageGuide: {
      look: 'Sunken yellowed pits, white translucent mush, mold spots.',
      smell: 'Sour or foul odor.',
      touch: 'Soft, squishy, hollow or slimy wet skin.',
      tasteWarning: 'Chilling injury accelerates fungal rotting.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Cucumbers are 96% water and are actually sensitive to chilling injury; placing them in the coldest back of the fridge causes rapid water-soaking rot.'
  },
  {
    id: 'bell_peppers_crisp',
    name: 'Bell Peppers (Red / Green / Yellow)',
    category: 'produce',
    categoryName: 'Fruits & Veggies',
    icon: '🫑',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '2-3 Days', unopenedDays: 3, opened: '1 Day', openedDays: 1 },
    refrigLife: { unopened: '1-2 Weeks (in crisper drawer)', unopenedDays: 14, opened: '4-5 Days (chopped)', openedDays: 5 },
    freezeLife: { duration: '10-12 Months (chopped raw without blanching)', days: 300 },
    storageTips: 'Store unwashed in the crisper drawer. Green peppers last longer than fully ripened red/yellow peppers.',
    spoilageGuide: {
      look: 'Sunken soft spots, wrinkled skin, black/gray mold inside cavity around seeds.',
      smell: 'Musty or rotting smell.',
      touch: 'Squishy, soft or slimy texture.',
      tasteWarning: 'Always cut open and inspect inner seed core for hidden mold before cooking.'
    },
    pathogenRisk: 'Alternaria Rot',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Green bell peppers are simply unripe red, yellow, or orange peppers; they have less sugar and double the shelf life of ripe red peppers.'
  },

  // ==========================================
  // 5. GRAINS & BAKERY (10 items)
  // ==========================================
  {
    id: 'artisan_bread',
    name: 'Artisan Sliced Bread',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🍞',
    modelKey: 'bread',
    idealStorage: 'pantry',
    pantryLife: { unopened: '5-7 Days', unopenedDays: 7, opened: '3-5 Days', openedDays: 5 },
    refrigLife: { unopened: 'Not Recommended (stales faster)', unopenedDays: 7, opened: '7-14 Days (delays mold but retrogrades starch)', openedDays: 10 },
    freezeLife: { duration: '3 Months (slice before freezing for instant toaster use)', days: 90 },
    storageTips: 'Store in a bread box or paper bag in the pantry. Never refrigerate fresh bread as starch retrogradation accelerates at 35-40°F.',
    spoilageGuide: {
      look: 'Green, white, black, or blue fuzzy mold patches (Penicillium / Rhizopus). If one slice has mold, microscopic roots have penetrated the whole loaf.',
      smell: 'Musty, damp, or medicinal chemical smell.',
      touch: 'Hard as stone (stale, still safe for breadcrumbs/croutons) vs slimy wet patches (bacterial ropy bread—discard!).',
      tasteWarning: 'Never eat molded bread! Bread is soft and porous, allowing mycotoxins to travel deep beneath visible mold.'
    },
    pathogenRisk: 'Mycotoxins from Spoilage Molds',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Refrigerating bread makes it go stale 6 times faster than keeping it at room temperature due to accelerated starch crystallization!'
  },
  {
    id: 'sandwich_bread_sliced',
    name: 'Commercial Sliced Bread (Preservatives)',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🍞',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '7-14 Days past date', unopenedDays: 14, opened: '5-7 Days', openedDays: 7 },
    refrigLife: { unopened: 'Not Recommended', unopenedDays: 14, opened: '2 Weeks (dries out)', openedDays: 14 },
    freezeLife: { duration: '3 Months', days: 90 },
    storageTips: 'Keep twist-tied tightly in its plastic bag in a cool, dry pantry out of sunlight.',
    spoilageGuide: {
      look: 'Fuzzy green or white mold dots on crust or crumb.',
      smell: 'Musty or sour yeast odor.',
      touch: 'Damp or mushy spots.',
      tasteWarning: 'Discard entire loaf if mold is detected on any slice.'
    },
    pathogenRisk: 'Penicillium Molds',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Calcium propionate is added to commercial sandwich bread to inhibit mold spores, allowing it to stay soft for weeks.'
  },
  {
    id: 'bagels_fresh',
    name: 'Fresh Bakery Bagels',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🥯',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-5 Days', unopenedDays: 5, opened: '2-3 Days', openedDays: 3 },
    refrigLife: { unopened: 'Not Recommended (stales)', unopenedDays: 5, opened: '1-2 Weeks', openedDays: 10 },
    freezeLife: { duration: '6 Months (slice in half before freezing)', days: 180 },
    storageTips: 'Slice bagels in half before freezing; pop frozen halves directly into toaster for bakery-fresh taste.',
    spoilageGuide: {
      look: 'White or bluish-green mold patches in the center crevice.',
      smell: 'Musty, foul odor.',
      touch: 'Hard, rubbery or chalky.',
      tasteWarning: 'Never scrape mold off bread or bagels.'
    },
    pathogenRisk: 'Mold Spores',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Authentic bagels are boiled in lye/malt water for 60 seconds before baking, which gelatinizes surface starch to produce their glossy, chewy crust.'
  },
  {
    id: 'croissants_butter',
    name: 'Butter Croissants & Pastries',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🥐',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Days', unopenedDays: 3, opened: '1-2 Days', openedDays: 2 },
    refrigLife: { unopened: '1 Week', unopenedDays: 7, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '2-3 Months', days: 75 },
    storageTips: 'Store in paper bakery bag in pantry. Reheat in toaster oven at 350°F for 3 minutes to recrisp butter layers.',
    spoilageGuide: {
      look: 'Mold fuzz inside flaky layers.',
      smell: 'Rancid butter smell or sour odor.',
      touch: 'Soggy, greasy or hard as a brick.',
      tasteWarning: 'Rancid butter fats create bitter off-flavors.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'A traditional croissant has up to 81 laminated micro-layers of butter and dough created through repeated folding and rolling.'
  },
  {
    id: 'white_rice_dry',
    name: 'Dry White Rice (Jasmine / Basmati)',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🍚',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '4-5 Years (indefinite if oxygen-sealed)', unopenedDays: 1825, opened: '1-2 Years', openedDays: 730 },
    refrigLife: { unopened: 'Indefinite', unopenedDays: 3000, opened: '2 Years', openedDays: 730 },
    freezeLife: { duration: 'Indefinite (kills any weevil eggs)', days: 3000 },
    storageTips: 'Store in an airtight food-grade container with a bay leaf to deter pantry weevils.',
    spoilageGuide: {
      look: 'Small pantry beetles/weevils, webbing, discoloration, or moisture clumping.',
      smell: 'Musty, damp, or foul odor.',
      touch: 'Powdery residue or damp grains.',
      tasteWarning: 'COOKED rice must be refrigerated within 1 hour! Bacillus cereus spores survive boiling and produce heat-stable emetic toxins at room temp.'
    },
    pathogenRisk: 'Bacillus cereus (in COOKED rice)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Dry white rice has an almost infinite shelf life if kept dry, but COOKED rice left on the counter overnight is a top cause of severe food poisoning (Fried Rice Syndrome)!'
  },
  {
    id: 'brown_rice_whole',
    name: 'Whole Grain Brown Rice',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🌾',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '6 Months', unopenedDays: 180, opened: '3-6 Months', openedDays: 120 },
    refrigLife: { unopened: '12 Months (prevents oil rancidity)', unopenedDays: 365, opened: '6-12 Months', openedDays: 240 },
    freezeLife: { duration: '2 Years', days: 730 },
    storageTips: 'Brown rice retains its natural bran and germ oils, which oxidize over time. Store in fridge or freezer for maximum freshness.',
    spoilageGuide: {
      look: 'Oily sheen, clumping, insect infestation.',
      smell: 'Rancid, bitter paint or stale cardboard smell.',
      touch: 'Oily or sticky grain surface.',
      tasteWarning: 'Cooked brown rice must be refrigerated within 1 hour.'
    },
    pathogenRisk: 'Bacillus cereus (Cooked)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Brown rice spoils 10x faster than white rice because the intact bran layer contains 3% natural polyunsaturated oils that oxidize in contact with air.'
  },
  {
    id: 'rolled_oats',
    name: 'Old Fashioned Rolled Oats',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🥣',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years past date', unopenedDays: 500, opened: '1 Year', openedDays: 365 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '1-2 Years', openedDays: 500 },
    freezeLife: { duration: '2-3 Years', days: 900 },
    storageTips: 'Keep in an airtight container in a dark, dry pantry away from heat sources.',
    spoilageGuide: {
      look: 'Insect activity, mold from moisture intrusion, clumping.',
      smell: 'Rancid, bitter or cardboard-like stale smell.',
      touch: 'Damp or sticky flakes.',
      tasteWarning: 'Low risk of poisoning; mainly lipid rancidity and stale flavor.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Oats contain natural antioxidants that resist rancidity, giving them superior storage stability compared to other whole grains.'
  },
  {
    id: 'dry_pasta_durum',
    name: 'Dry Semolina Pasta (Spaghetti / Penne)',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🍝',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Years past date', unopenedDays: 1000, opened: '1-2 Years', openedDays: 500 },
    refrigLife: { unopened: 'Not Necessary', unopenedDays: 1000, opened: 'Not Recommended', openedDays: 500 },
    freezeLife: { duration: 'Not Necessary', days: 1000 },
    storageTips: 'Store in airtight containers to keep dry and prevent pantry moth larvae.',
    spoilageGuide: {
      look: 'Discoloration, tiny holes from grain beetles, moisture mold.',
      smell: 'Musty or sour odor.',
      touch: 'Crumbly, brittle or damp.',
      tasteWarning: 'Cooked pasta must be chilled in fridge and consumed in 3-5 days.'
    },
    pathogenRisk: 'Low Pathogen Risk (Dry)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Dry durum wheat semolina pasta has under 12% moisture content, making it biologically stable on the shelf for years.'
  },
  {
    id: 'quinoa_dry_grain',
    name: 'Dry Quinoa Grain',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🌾',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Years', unopenedDays: 900, opened: '1-2 Years', openedDays: 500 },
    refrigLife: { unopened: '3 Years', unopenedDays: 1095, opened: '2 Years', openedDays: 730 },
    freezeLife: { duration: '3+ Years', days: 1200 },
    storageTips: 'Keep in glass jar in dry pantry. Rinse before cooking to remove natural bitter saponin coating.',
    spoilageGuide: {
      look: 'Insect webbing, moisture mold, clumping.',
      smell: 'Rancid, grassy or sour smell.',
      touch: 'Damp or oily grains.',
      tasteWarning: 'Refrigerate cooked quinoa within 2 hours.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Quinoa is botanically not a grain, but a pseudocereal seed related to spinach and Swiss chard, packed with all 9 essential amino acids.'
  },
  {
    id: 'flour_all_purpose',
    name: 'All-Purpose White Flour',
    category: 'bakery',
    categoryName: 'Bakery & Grains',
    icon: '🌾',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '6-8 Months', openedDays: 200 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '1 Year', openedDays: 365 },
    freezeLife: { duration: '2 Years (kills weevil eggs)', days: 730 },
    storageTips: 'Freeze new bags of flour for 48 hours upon purchase to kill any microscopic insect eggs before storing in airtight bins.',
    spoilageGuide: {
      look: 'Weevils (tiny brown beetles), webbing, gray color, clumping.',
      smell: 'Rancid, oily or stale playdough odor.',
      touch: 'Damp or clumpy powder.',
      tasteWarning: 'NEVER eat raw flour dough/batter! Raw flour is an untreated agricultural product that can carry E. coli and Salmonella.'
    },
    pathogenRisk: 'Shiga-toxin producing E. coli (in RAW flour)',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'The FDA warns that raw flour in cake batter or cookie dough causes more foodborne illness outbreaks than raw eggs!'
  },

  // ==========================================
  // 6. CONDIMENTS & SAUCES (10 items)
  // ==========================================
  {
    id: 'ketchup_heinz',
    name: 'Tomato Ketchup',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🍅',
    modelKey: 'ketchup',
    idealStorage: 'pantry',
    pantryLife: { unopened: '1 Year past date', unopenedDays: 365, opened: '1 Month', openedDays: 30 },
    refrigLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '6 Months', openedDays: 180 },
    freezeLife: { duration: 'Not Recommended (separates)', days: 30 },
    storageTips: 'High acidity (vinegar) and sugar make it pantry stable, but refrigeration preserves optimal bright red color and zesty flavor for 6 months.',
    spoilageGuide: {
      look: 'Dark brown/black discoloration, mold around the bottle cap rim, excessive gas bubbling.',
      smell: 'Fermented, alcoholic, or pungent sour smell.',
      touch: 'Watery separation is normal (just shake well); slimy sediment is bad.',
      tasteWarning: 'Ketchup rarely grows harmful toxins due to low pH (~3.8), but quality degrades.'
    },
    pathogenRisk: 'Low Pathogen Risk (Acidic pH ~3.8)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Restaurants keep ketchup on tables because its high acidity prevents rapid microbial growth, but at home, the fridge prevents flavor oxidation over months.'
  },
  {
    id: 'mayonnaise_real',
    name: 'Real Mayonnaise',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🫙',
    modelKey: 'mayo',
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Months past date', unopenedDays: 90, opened: 'Do Not Store at Room Temp (max 2 hrs)', openedDays: 0 },
    refrigLife: { unopened: '1 Year', unopenedDays: 365, opened: '2-3 Months', openedDays: 75 },
    freezeLife: { duration: 'Do Not Freeze (emulsion breaks into oil)', days: 0 },
    storageTips: 'Always refrigerate immediately after opening. Never double-dip dirty knives or spoons into the jar.',
    spoilageGuide: {
      look: 'Yellowish-brown oil separation that won\'t mix back, mold colonies on the rim.',
      smell: 'Putrid, rancid, paint-like or acidic stale odor.',
      touch: 'Lumpy curdled texture.',
      tasteWarning: 'Commercial mayo contains pasteurized eggs and acid, so homemade mayo spoils 10x faster than store-bought.'
    },
    pathogenRisk: 'Staphylococcus aureus',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Contrary to popular myth, commercial mayonnaise rarely causes picnic food poisoning; it is usually the potatoes, chicken, or eggs mixed into the salad that spoil.'
  },
  {
    id: 'mustard_dijon',
    name: 'Dijon / Yellow Mustard',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🌭',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '1-2 Months (loses punch)', openedDays: 60 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '1 Year', openedDays: 365 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Store in the fridge after opening to preserve its pungent spicy kick.',
    spoilageGuide: {
      look: 'Darkening color, dried crusted layer on top (safe to scrape off).',
      smell: 'Loss of aroma or foul sour smell.',
      touch: 'Water separation is normal; stir to recombine.',
      tasteWarning: 'Mustard has natural antibacterial properties from glucosinolates and vinegar.'
    },
    pathogenRisk: 'Extremely Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Mustard seeds naturally contain sinigrin and myrosinase, which create allyl isothiocyanate—a potent natural antimicrobial compound.'
  },
  {
    id: 'soy_sauce',
    name: 'Soy Sauce (Naturally Brewed)',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🥢',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3 Years', unopenedDays: 1095, opened: '1 Year', openedDays: 365 },
    refrigLife: { unopened: '3+ Years', unopenedDays: 1095, opened: '2-3 Years', openedDays: 800 },
    freezeLife: { duration: 'Not Necessary (high salt prevents freezing)', days: 1000 },
    storageTips: 'Keep in a cool dark pantry or fridge. Refrigeration prevents flavor oxidation over long periods.',
    spoilageGuide: {
      look: 'White film or sediment on surface (film yeast).',
      smell: 'Harsh alcoholic or chemical smell.',
      touch: 'Salt crystals around cap are normal and harmless.',
      tasteWarning: 'Extremely high salt concentration (>14%) makes bacterial pathogens incapable of surviving.'
    },
    pathogenRisk: 'Extremely Low (High Osmotic Pressure)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Soy sauce is so salt-dense that it creates high osmotic pressure, dehydrating and killing any bacteria that enter the bottle.'
  },
  {
    id: 'sriracha_hot_sauce',
    name: 'Sriracha / Chili Hot Sauce',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🌶️',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2 Years', unopenedDays: 730, opened: '6-9 Months (darkens in pantry)', openedDays: 200 },
    refrigLife: { unopened: '2-3 Years', unopenedDays: 800, opened: '1-2 Years (preserves bright red color)', openedDays: 500 },
    freezeLife: { duration: 'Not Necessary', days: 500 },
    storageTips: 'Pantry safe due to high capsaicin, vinegar, and salt. Refrigerate if you want to keep the bright red chili color from turning brownish.',
    spoilageGuide: {
      look: 'Brownish color change is harmless oxygen exposure; bubbling gas or mold spores on cap is bad.',
      smell: 'Sour or fermented alcohol smell.',
      touch: 'Excessive frothing upon opening.',
      tasteWarning: 'Capsaicin and acetic acid inhibit microbial life.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Capsaicin—the chemical that makes chili peppers spicy—evolved in plants as a natural antifungal and antimicrobial defense mechanism.'
  },
  {
    id: 'bbq_sauce_smoky',
    name: 'Barbecue Sauce (Sweet & Smoky)',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🥫',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '1 Month', openedDays: 30 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '4-6 Months', openedDays: 150 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Refrigerate after opening. High sugar and vinegar preserve it for months in the fridge.',
    spoilageGuide: {
      look: 'White, green or gray mold around inside of cap, bubbling sauce.',
      smell: 'Sour, fermented or alcoholic smell.',
      touch: 'Slimy or curdled texture.',
      tasteWarning: 'Mold spores can colonize the bottle neck.'
    },
    pathogenRisk: 'Mold Spoilage',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Molasses and sugar in BBQ sauce lower its water activity, while vinegar brings the pH down to around 3.6, making it remarkably stable.'
  },
  {
    id: 'ranch_dressing_bottled',
    name: 'Ranch Salad Dressing (Dairy Based)',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🥗',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1 Year', unopenedDays: 365, opened: 'Do Not Store at Room Temp', openedDays: 0 },
    refrigLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '2 Months', openedDays: 60 },
    freezeLife: { duration: 'Do Not Freeze (emulsion breaks)', days: 0 },
    storageTips: 'Must be refrigerated immediately after opening. Keep cap wiped clean.',
    spoilageGuide: {
      look: 'Yellow oil separation, mold dots on inner cap.',
      smell: 'Sour, rancid buttermilk or chemical odor.',
      touch: 'Lumpy or curdled consistency.',
      tasteWarning: 'Dairy-based dressings spoil much faster than clear oil-and-vinegar vinaigrettes.'
    },
    pathogenRisk: 'Listeria & Spoilage Bacteria',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Clear oil-and-vinegar vinaigrettes last 6-9 months opened in the fridge, while creamy dairy dressings only last 1-2 months.'
  },
  {
    id: 'salsa_fresh_jarred',
    name: 'Tomato Salsa (Jarred)',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🍅',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: 'Do Not Store in Pantry', openedDays: 0 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '2-3 Weeks', openedDays: 21 },
    freezeLife: { duration: '2 Months (watery texture upon thawing)', days: 60 },
    storageTips: 'Refrigerate immediately after opening. Always use a clean spoon (never dip chips directly into jar).',
    spoilageGuide: {
      look: 'White or green mold floating on surface, bubbling effervescence.',
      smell: 'Fermented, boozy, or sour stench.',
      touch: 'Slimy or fizzy upon tasting.',
      tasteWarning: 'Double-dipping chips introduces salivary enzymes and mouth bacteria that cause salsa to ferment in days.'
    },
    pathogenRisk: 'Mold & Fermentation Yeasts',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Double-dipping chips transfers approximately 10,000 bacteria from mouth to dip in just a few seconds!'
  },
  {
    id: 'pesto_basil_jar',
    name: 'Basil Pesto (In Olive Oil)',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🌿',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1 Year (unopened jar)', unopenedDays: 365, opened: 'Do Not Store in Pantry', openedDays: 0 },
    refrigLife: { unopened: '1 Year', unopenedDays: 365, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '3-6 Months (freeze in ice cube trays)', days: 120 },
    storageTips: 'After spooning pesto, pour a thin layer of olive oil over the top surface before returning jar to fridge to block oxygen.',
    spoilageGuide: {
      look: 'Black/brown surface oxidation is normal air exposure, but white/green mold colonies mean spoilage.',
      smell: 'Rancid pine nuts or sour moldy smell.',
      touch: 'Slimy separation.',
      tasteWarning: 'Garlic and herbs submerged in oil carry Botulism risks if left at room temperature.'
    },
    pathogenRisk: 'Clostridium botulinum / Mold',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Freezing pesto in standard ice cube trays creates single-serving flavor bombs ready to drop directly into hot pasta!'
  },
  {
    id: 'maple_syrup_pure',
    name: '100% Pure Maple Syrup',
    category: 'condiments',
    categoryName: 'Condiments & Sauces',
    icon: '🍁',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years (unopened bottle)', unopenedDays: 500, opened: 'Do Not Store in Pantry (grows mold!)', openedDays: 0 },
    refrigLife: { unopened: '2+ Years', unopenedDays: 730, opened: '1 Year', openedDays: 365 },
    freezeLife: { duration: 'Indefinite (does not freeze solid)', days: 2000 },
    storageTips: 'PURE maple syrup must be refrigerated after opening! Fake pancake syrup (corn syrup) is pantry stable, but real maple sap grows surface mold if kept on counter.',
    spoilageGuide: {
      look: 'White, green or gray mold floating on syrup surface.',
      smell: 'Sour, fermented or alcoholic smell.',
      touch: 'Cloudy liquid or stringy syrup.',
      tasteWarning: 'Artificial pancake syrup has preservatives; pure tree syrup has none and will mold at room temp.'
    },
    pathogenRisk: 'Xerophilic Spoilage Molds',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Pure maple syrup does not freeze solid in household freezers due to its 66% sugar density; storing it in the freezer keeps it fresh for years!'
  },

  // ==========================================
  // 7. CANNED & JARRED GOODS (10 items)
  // ==========================================
  {
    id: 'canned_tomatoes',
    name: 'Canned San Marzano Tomatoes',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🍅',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '18-24 Months', unopenedDays: 550, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '5-7 Days (in glass jar)', openedDays: 7 },
    freezeLife: { duration: '2-3 Months', days: 75 },
    storageTips: 'High-acid canned foods (tomatoes, pineapple) have a shorter shelf life than low-acid foods (beans, corn) because acid slowly reacts with can linings.',
    spoilageGuide: {
      look: 'Corroded interior can lining, pinhole leaks, bubbling sauce.',
      smell: 'Fermented, vinegary or harsh chemical aroma.',
      touch: 'Excessive frothing or slimy separation.',
      tasteWarning: 'Do not eat if tomato sauce tastes intensely metallic.'
    },
    pathogenRisk: 'Can Corrosion / Acid Degradation',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'High-acid foods last 18-24 months in cans, while low-acid canned vegetables can remain safe for 3-5+ years if the seal is intact.'
  },
  {
    id: 'canned_black_beans',
    name: 'Canned Black Beans',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🥫',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-5 Years', unopenedDays: 1460, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '5 Years', unopenedDays: 1825, opened: '3-5 Days (in sealed container)', openedDays: 5 },
    freezeLife: { duration: '1-2 Months (drained in freezer container)', days: 45 },
    storageTips: 'Once opened, transfer leftover beans to a glass or plastic container before refrigerating.',
    spoilageGuide: {
      look: 'White foam, bubbling liquid, bulging can lid.',
      smell: 'Sour, fermented or putrid odor.',
      touch: 'Slimy beans, cloudy liquid with stringy residue.',
      tasteWarning: 'Discard can immediately if the lid clicks or pops before opening.'
    },
    pathogenRisk: 'Clostridium botulinum (if seal broken)',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Leaving acidic or high-moisture food in an opened tin can can cause tin and iron to leach into the food, creating a bitter metallic taste.'
  },
  {
    id: 'canned_chickpeas',
    name: 'Canned Chickpeas (Garbanzo)',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🥫',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-5 Years', unopenedDays: 1460, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '5 Years', unopenedDays: 1825, opened: '3-4 Days (in glass container)', openedDays: 4 },
    freezeLife: { duration: '2-3 Months', days: 75 },
    storageTips: 'The viscous liquid in chickpea cans is "Aquafaba"—save it to whip into vegan meringues and mayonnaise!',
    spoilageGuide: {
      look: 'Bulging can end, spurting liquid upon puncture, cloudy slime.',
      smell: 'Sour, fermented or foul odor.',
      touch: 'Mushy or disintegrated beans.',
      tasteWarning: 'Do not eat from damaged or rusty cans.'
    },
    pathogenRisk: 'Clostridium botulinum',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Aquafaba (canned chickpea brine) has the exact same foaming and emulsifying proteins as egg whites!'
  },
  {
    id: 'canned_soup_chicken',
    name: 'Canned Chicken Noodle Soup',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🍲',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Years', unopenedDays: 800, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '3 Years', unopenedDays: 1000, opened: '3-4 Days (in container)', openedDays: 4 },
    freezeLife: { duration: '2-3 Months (out of can)', days: 75 },
    storageTips: 'Low-acid canned food. Transfer to a bowl or microwave-safe container after opening.',
    spoilageGuide: {
      look: 'Bulging can ends, spurting broth upon opening, rust along inner seams.',
      smell: 'Sour, rancid chicken or foul chemical odor.',
      touch: 'Cloudy, curdled or slimy broth.',
      tasteWarning: 'Never taste from bulging or deeply dented cans.'
    },
    pathogenRisk: 'Clostridium botulinum',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Commercially canned soups are sterile inside and can technically remain microbiologically safe for decades if the seal never corrodes.'
  },
  {
    id: 'peanut_butter_creamy',
    name: 'Creamy Peanut Butter (Commercial)',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🥜',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '3-4 Months', openedDays: 100 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '6-9 Months (prevents rancidity in natural styles)', openedDays: 200 },
    freezeLife: { duration: 'Not Necessary', days: 365 },
    storageTips: 'Commercial peanut butter is pantry stable. Natural peanut butter (peanuts + salt only) should be refrigerated after stirring.',
    spoilageGuide: {
      look: 'Dark hard dry texture or mold colonies.',
      smell: 'Rancid paint, bitter or sour smell.',
      touch: 'Hard, rubbery separation.',
      tasteWarning: 'Aflatoxin risk from Aspergillus mold on peanuts; discard if mold is detected.'
    },
    pathogenRisk: 'Aflatoxin / Salmonella in contaminated lots',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Hydrogenated oils in commercial peanut butter keep the oil suspended for months at room temperature, whereas natural peanut butter separates in days.'
  },
  {
    id: 'strawberry_jam',
    name: 'Strawberry Fruit Jam / Jelly',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🍓',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: 'Do Not Store at Room Temp', openedDays: 0 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '6-9 Months', openedDays: 200 },
    freezeLife: { duration: '1 Year', days: 365 },
    storageTips: 'Refrigerate after breaking the lid seal. Always use a clean butter knife to prevent crumb contamination.',
    spoilageGuide: {
      look: 'White, green, or gray mold fuzz on top surface or under lid rim.',
      smell: 'Alcohol, yeast, or fermented wine odor.',
      touch: 'Watery breakdown or slimy surface.',
      tasteWarning: 'High sugar content prevents bacteria, but osmophilic molds and wild yeasts can still grow.'
    },
    pathogenRisk: 'Osmophilic Molds',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Pectin and 65% sugar content create high osmotic pressure that preserves fruit flavors for nearly a year in the fridge.'
  },
  {
    id: 'dill_pickles_jar',
    name: 'Dill Pickles (In Vinegar Brine)',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🥒',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: 'Do Not Store at Room Temp', openedDays: 0 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '1 Year (submerged in brine)', openedDays: 365 },
    freezeLife: { duration: 'Not Recommended (mushy cucumbers)', days: 30 },
    storageTips: 'Keep cucumbers fully submerged under the acidic brine. Use clean tongs to extract pickles.',
    spoilageGuide: {
      look: 'Cloudy, milky brine with slimy white sediment, mold on pickles projecting above water line.',
      smell: 'Putrid, rotten or foul odor instead of sharp dill vinegar.',
      touch: 'Extremely soft, slimy, or hollow mush.',
      tasteWarning: 'Low pH (under 4.0) prevents botulism and food poisoning pathogens.'
    },
    pathogenRisk: 'Low Pathogen Risk (Acidic Brine)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Pickling in acetic acid (vinegar) drops pH below 4.0, which naturally destroys over 99.9% of harmful food bacteria.'
  },
  {
    id: 'kalamata_olives',
    name: 'Kalamata Olives (In Brine)',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🫒',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: 'Do Not Store in Pantry', openedDays: 0 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '3-4 Months', openedDays: 100 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Keep submerged in original brine or olive oil. Always use clean dry utensils.',
    spoilageGuide: {
      look: 'White film yeast on top (harmless film yeast can be skimmed off, but fuzzy blue mold is spoilage).',
      smell: 'Rancid oil, foul or chemical smell.',
      touch: 'Soft, mushy, or disintegrating olives.',
      tasteWarning: 'Salinity and oil barrier protect olives against harmful pathogens.'
    },
    pathogenRisk: 'Film Yeasts / Mold',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Raw olives straight off the tree are completely inedible due to the intense bitterness of the glucoside oleuropein, which is cured out in salt brine.'
  },
  {
    id: 'canned_sweet_corn',
    name: 'Canned Whole Kernel Sweet Corn',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🌽',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '3-5 Years', unopenedDays: 1460, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '5 Years', unopenedDays: 1825, opened: '3-4 Days (in plastic container)', openedDays: 4 },
    freezeLife: { duration: '2 Months (drained)', days: 60 },
    storageTips: 'Low-acid canned food. Check that the can has no dents along top or side seams.',
    spoilageGuide: {
      look: 'Bulging can ends, sour foam or bubbling liquid upon opening.',
      smell: 'Sour, fermented or putrid odor.',
      touch: 'Slimy corn kernels with cloudy thick liquid.',
      tasteWarning: 'Never consume from bulging cans.'
    },
    pathogenRisk: 'Clostridium botulinum',
    safetyRating: 'high_risk',
    dateType: 'Best If Used By',
    funFact: 'Sweet corn is canned within hours of harvest, locking in Vitamin C and lutein antioxidants better than fresh corn shipped across country!'
  },
  {
    id: 'canned_coconut_milk',
    name: 'Canned Full-Fat Coconut Milk',
    category: 'canned',
    categoryName: 'Canned & Jarred',
    icon: '🥥',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Years', unopenedDays: 800, opened: 'Do Not Store in Can', openedDays: 0 },
    refrigLife: { unopened: '3 Years', unopenedDays: 1000, opened: '4-6 Days (in glass container)', openedDays: 5 },
    freezeLife: { duration: '3 Months (whisk after thawing)', days: 90 },
    storageTips: 'Separation of thick white coconut cream and clear water is natural! Warm slightly and whisk to recombine.',
    spoilageGuide: {
      look: 'Pinkish or gray mold spots, rusted interior lining.',
      smell: 'Sour, rancid oil or curdled odor.',
      touch: 'Lumpy or curdled chunks that will not melt smooth.',
      tasteWarning: 'Refrigerate immediately after opening.'
    },
    pathogenRisk: 'Mold & Spoilage Bacteria',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Coconut cream solidifies at temperatures below 75°F (24°C), which is why the top layer forms a thick solid puck in cool pantries.'
  },

  // ==========================================
  // 8. PANTRY STAPLES (11 items)
  // ==========================================
  {
    id: 'olive_oil_evoo',
    name: 'Extra Virgin Olive Oil',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🫒',
    modelKey: 'olive_oil',
    idealStorage: 'pantry',
    pantryLife: { unopened: '18-24 Months', unopenedDays: 600, opened: '3-6 Months', openedDays: 120 },
    refrigLife: { unopened: 'Not Necessary (solidifies and clouds)', unopenedDays: 600, opened: 'Not Recommended', openedDays: 120 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Store in a dark glass bottle away from stovetop heat, sunlight, and oxygen. Close cap tightly after every use.',
    spoilageGuide: {
      look: 'Cloudiness in cold pantry is normal (fats solidifying). Spoilage shows as loss of vibrant green/gold hue.',
      smell: 'Crayons, rancid walnuts, putty, or stale oil smell.',
      touch: 'Sticky greasy residue that leaves a greasy coating on tongue.',
      tasteWarning: 'Rancid oil won\'t cause acute food poisoning, but free radicals and lipid peroxides destroy antioxidants and create off flavors.'
    },
    pathogenRisk: 'Lipid Peroxidation (Low Pathogen)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Heat, Light, and Air are the three mortal enemies of olive oil. Storing your EVOO right next to your hot stove will spoil it in weeks!'
  },
  {
    id: 'canola_oil',
    name: 'Canola / Vegetable Cooking Oil',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🌻',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '6 Months-1 Year', openedDays: 240 },
    refrigLife: { unopened: '2 Years', unopenedDays: 730, opened: '1 Year', openedDays: 365 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Keep tightly sealed in a cool, dark cabinet away from the oven.',
    spoilageGuide: {
      look: 'Darkening color, thick sticky varnish texture.',
      smell: 'Harsh, rancid, paint-like or metallic odor.',
      touch: 'Sticky coating on bottle.',
      tasteWarning: 'Rancid oil smokes at much lower cooking temperatures.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'The name "Canola" is a portmanteau of "Canada" and "Oil, Low Acid", bred from natural rapeseed in the 1970s.'
  },
  {
    id: 'pure_honey',
    name: 'Pure Clover Honey',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🍯',
    modelKey: 'honey',
    idealStorage: 'pantry',
    pantryLife: { unopened: 'Indefinite (Decades)', unopenedDays: 36500, opened: 'Indefinite (Keep Dry)', openedDays: 36500 },
    refrigLife: { unopened: 'Do Not Refrigerate (accelerates crystallization)', unopenedDays: 36500, opened: 'Do Not Refrigerate', openedDays: 36500 },
    freezeLife: { duration: 'Not Necessary', days: 36500 },
    storageTips: 'Keep tightly sealed in a dry pantry. If it crystallizes into hard white sugar, place the glass jar in a warm water bath to reliquefy.',
    spoilageGuide: {
      look: 'Crystallization is 100% natural and NOT spoilage! Only discard if it smells fermented or grows yeast mold due to added water contamination.',
      smell: 'Alcoholic, sour beer-like fermentation (only happens if moisture gets in).',
      touch: 'Frothy bubbling on surface.',
      tasteWarning: 'Honey never spoils on its own due to low moisture (<18%) and low pH (3.9). Never feed honey to infants under 1 year old (infant botulism risk).'
    },
    pathogenRisk: 'Clostridium botulinum (INFANTS ONLY <1 yr)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Archaeologists exploring ancient Egyptian tombs have discovered 3,000-year-old pots of honey that are still perfectly edible!'
  },
  {
    id: 'granulated_sugar',
    name: 'Granulated White Sugar',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🍬',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: 'Indefinite', unopenedDays: 36500, opened: 'Indefinite (Keep Dry)', openedDays: 36500 },
    refrigLife: { unopened: 'Do Not Refrigerate', unopenedDays: 36500, opened: 'Do Not Refrigerate', openedDays: 36500 },
    freezeLife: { duration: 'Not Necessary', days: 36500 },
    storageTips: 'Keep in an airtight container to keep out humidity and ants.',
    spoilageGuide: {
      look: 'Insect intrusion or moisture hardening into solid rock blocks.',
      smell: 'Absorbed odors from strong pantry spices.',
      touch: 'Hard clumps (can be broken apart).',
      tasteWarning: 'Sugar has virtually 0% water content and cannot support bacterial life.'
    },
    pathogenRisk: 'Extremely Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Sugar acts as a natural desiccant; any bacterium landing on pure sugar has its cellular water pulled out by osmosis, killing it instantly.'
  },
  {
    id: 'brown_sugar_dark',
    name: 'Brown Sugar (Moist)',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🍬',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2 Years', unopenedDays: 730, opened: '6 Months (dries into hard rock)', openedDays: 180 },
    refrigLife: { unopened: 'Not Recommended', unopenedDays: 730, opened: 'Not Recommended', openedDays: 180 },
    freezeLife: { duration: 'Indefinite', days: 1000 },
    storageTips: 'Store in an airtight container with a terracotta brown sugar saver disc or a slice of bread to maintain moisture.',
    spoilageGuide: {
      look: 'Hard as a brick (can be softened in microwave with a damp paper towel).',
      smell: 'Normal molasses scent.',
      touch: 'Rock hard.',
      tasteWarning: 'Hard brown sugar is not spoiled—it has just lost its molasses surface moisture.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Putting a slice of fresh apple or a piece of bread inside a hardened brown sugar container will restore its soft texture overnight!'
  },
  {
    id: 'kosher_salt_pure',
    name: 'Kosher / Sea Salt',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🧂',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: 'Indefinite (Forever)', unopenedDays: 36500, opened: 'Indefinite', openedDays: 36500 },
    refrigLife: { unopened: 'Do Not Refrigerate', unopenedDays: 36500, opened: 'Do Not Refrigerate', openedDays: 36500 },
    freezeLife: { duration: 'Not Necessary', days: 36500 },
    storageTips: 'Store in a dry salt cellar or pantry cupboard. Pure sodium chloride is a mineral that never degrades.',
    spoilageGuide: {
      look: 'Pure white crystals. Moisture clumping is normal; add a few grains of uncooked rice to absorb humidity.',
      smell: 'Odorless.',
      touch: 'Hard clumping from humidity.',
      tasteWarning: 'Pure salt cannot spoil or expire.'
    },
    pathogenRisk: 'Zero Pathogen Risk (Mineral)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Salt is a pure crystalline mineral that is millions of years old; any printed expiration date is purely for the plastic packaging, not the salt itself!'
  },
  {
    id: 'baking_powder',
    name: 'Double-Acting Baking Powder',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🥫',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years past date', unopenedDays: 500, opened: '3-6 Months (loses leavening gas)', openedDays: 120 },
    refrigLife: { unopened: 'Do Not Refrigerate (condensation ruins potency)', unopenedDays: 500, opened: 'Do Not Refrigerate', openedDays: 120 },
    freezeLife: { duration: 'Not Recommended', days: 30 },
    storageTips: 'Store in a cool dry pantry. Test potency: stir 1 tsp of powder into 1/3 cup warm water; if it fizzes vigorously, it is active!',
    spoilageGuide: {
      look: 'Clumping or moisture caking.',
      smell: 'Neutral.',
      touch: 'Lumpy instead of fine powder.',
      tasteWarning: 'Expired baking powder is safe to eat, but your cakes and cookies will turn out flat as pancakes.'
    },
    pathogenRisk: 'Zero Pathogen (Chemical Leavener)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Double-acting baking powder produces carbon dioxide gas twice: first when mixed with liquid batter, and second when heated in the oven!'
  },
  {
    id: 'coffee_beans_whole',
    name: 'Whole Roasted Coffee Beans',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '☕',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '6-9 Months (valve bag)', unopenedDays: 240, opened: '3-4 Weeks (peak crema & aroma)', openedDays: 28 },
    refrigLife: { unopened: 'Not Recommended (absorbs fridge odors & condensation)', unopenedDays: 240, opened: 'Do Not Refrigerate', openedDays: 28 },
    freezeLife: { duration: '1-2 Years (airtight vacuum sealed)', days: 500 },
    storageTips: 'Store in an opaque, airtight canister at room temperature. Grind immediately before brewing.',
    spoilageGuide: {
      look: 'Loss of surface luster, dry matte appearance.',
      smell: 'Stale cardboard, rancid oil, or lack of roasted aroma.',
      touch: 'Dry and crumbly.',
      tasteWarning: 'Old coffee is harmless to drink, but lacks crema, acidity, and aromatic floral/fruity notes.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Coffee degassing: freshly roasted beans release carbon dioxide for 2 weeks; the one-way plastic valve on coffee bags lets CO2 out without letting oxygen in.'
  },
  {
    id: 'ground_coffee',
    name: 'Ground Coffee (Airtight Bag)',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '☕',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '2-4 Weeks (peak flavor)', openedDays: 25 },
    refrigLife: { unopened: 'Not Recommended (absorbs odors & moisture)', unopenedDays: 365, opened: 'Do Not Refrigerate', openedDays: 25 },
    freezeLife: { duration: '1 Year (vacuum sealed, thaw completely before opening)', days: 365 },
    storageTips: 'Store in an opaque, airtight container in a dark cabinet. Keep away from humidity and freezer condensation.',
    spoilageGuide: {
      look: 'Loss of rich dark brown luster, clumping from dampness.',
      smell: 'Flat, stale cardboard or woody odor instead of aromatic roasted beans.',
      touch: 'Damp or powdery residue.',
      tasteWarning: 'Old coffee is safe to drink, but lacks aromatic crema and tastes unpleasantly bitter and flat.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Coffee grounds are a powerful natural deodorizer; placing an open bag in your fridge means your morning espresso will taste like leftover onion and garlic!'
  },
  {
    id: 'black_tea_bags',
    name: 'Black / Green Tea Bags',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🫖',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '18-24 Months', unopenedDays: 600, opened: '6-12 Months', openedDays: 300 },
    refrigLife: { unopened: 'Not Recommended', unopenedDays: 600, opened: 'Do Not Refrigerate', openedDays: 300 },
    freezeLife: { duration: 'Not Necessary', days: 600 },
    storageTips: 'Store in an airtight tin canister away from heat, sunlight, and strong spices.',
    spoilageGuide: {
      look: 'Moisture mold on paper bags, fading tea leaf color.',
      smell: 'Loss of aroma or musty odor.',
      touch: 'Damp or clumping leaves.',
      tasteWarning: 'Old tea is safe but brews flat and flavorless.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Black, Green, White, and Oolong teas all come from the exact same plant (Camellia sinensis); difference in color and shelf life is determined by leaf oxidation.'
  },
  {
    id: 'dark_chocolate_bar',
    name: 'Dark Chocolate (70%+ Cacao)',
    category: 'staples',
    categoryName: 'Pantry Staples',
    icon: '🍫',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2 Years', unopenedDays: 730, opened: '1 Year', openedDays: 365 },
    refrigLife: { unopened: '2+ Years', unopenedDays: 730, opened: '1-2 Years', openedDays: 500 },
    freezeLife: { duration: '2 Years', days: 730 },
    storageTips: 'Store in cool dry pantry (60-65°F / 15-18°C). Avoid temperature swings that cause cocoa butter fat bloom.',
    spoilageGuide: {
      look: 'White chalky film is "FAT BLOOM" (cocoa butter recrystallizing) and is 100% safe to eat! Only discard if infested by pests.',
      smell: 'Stale or absorbed pantry odors.',
      touch: 'Crumbly or grainy texture.',
      tasteWarning: 'Bloomed chocolate melts in your mouth slightly less smoothly but is completely safe for eating and baking.'
    },
    pathogenRisk: 'Extremely Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'The white powdery film on old chocolate is called "fat bloom"—cocoa butter crystals melting and recrystallizing on the surface; it is completely harmless.'
  },

  // ==========================================
  // 9. FROZEN FOODS (6 items)
  // ==========================================
  {
    id: 'ice_cream_tub',
    name: 'Vanilla Ice Cream',
    category: 'frozen',
    categoryName: 'Frozen Foods',
    icon: '🍨',
    modelKey: null,
    idealStorage: 'freezer',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: 'Do Not Store (melts)', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    freezeLife: { duration: '2-4 Months (opened)', days: 90 },
    storageTips: 'Press a piece of wax paper or plastic cling wrap directly onto the ice cream surface before putting the lid on to prevent icy freezer burn.',
    spoilageGuide: {
      look: 'Thick crunchy ice crystals on surface (freezer burn), shrinkage, icy grainy texture.',
      smell: 'Absorbed freezer odors.',
      touch: 'Gummy, icy or crunchy.',
      tasteWarning: 'Thawed and refrozen ice cream can harbor Listeria. Never refreeze completely melted ice cream.'
    },
    pathogenRisk: 'Listeria (if melted and refrozen)',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Ice cream freezer burn occurs when water molecules sublime out of the creamy emulsion and refreeze as large jagged ice crystals on the surface.'
  },
  {
    id: 'frozen_green_peas',
    name: 'Frozen Green Peas',
    category: 'frozen',
    categoryName: 'Frozen Foods',
    icon: '🫛',
    modelKey: null,
    idealStorage: 'freezer',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-4 Days (once thawed)', unopenedDays: 4, opened: '3-4 Days', openedDays: 4 },
    freezeLife: { duration: '12-18 Months', days: 450 },
    storageTips: 'Keep at 0°F (-18°C). Reseal bag tightly with a bag clip to prevent freezer burn dehydration.',
    spoilageGuide: {
      look: 'Faded white frost-burned peas, ice crystal blocks.',
      smell: 'Stale freezer aroma.',
      touch: 'Dry, leathery peas.',
      tasteWarning: 'Safe indefinitely in freezer; freezer burn merely reduces sweetness and tenderness.'
    },
    pathogenRisk: 'Zero Pathogen Risk (at 0°F)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Commercially frozen peas are flash-frozen within 2 hours of picking, making them sweeter and higher in vitamin C than "fresh" peas that took a week to reach the grocery store.'
  },
  {
    id: 'frozen_blueberries',
    name: 'Frozen Blueberries / Berries',
    category: 'frozen',
    categoryName: 'Frozen Foods',
    icon: '🫐',
    modelKey: null,
    idealStorage: 'freezer',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-5 Days (once thawed)', unopenedDays: 5, opened: '3-5 Days', openedDays: 5 },
    freezeLife: { duration: '12-18 Months', days: 450 },
    storageTips: 'Keep sealed. Add frozen directly to smoothies, pancakes, and oatmeal without thawing.',
    spoilageGuide: {
      look: 'Heavy ice encrustation, bleached white patches from sublimation.',
      smell: 'Freezer burn odor.',
      touch: 'Hard ice clump.',
      tasteWarning: 'Cook thoroughly if using imported frozen berries in non-cooked recipes.'
    },
    pathogenRisk: 'Norovirus / Hepatitis A in rare uninspected lots',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Individually Quick Frozen (IQF) berries are frozen in 3 minutes on blast chill belts, preventing cellular damage from large ice crystals.'
  },
  {
    id: 'frozen_pizza_cheese',
    name: 'Frozen Cheese Pizza',
    category: 'frozen',
    categoryName: 'Frozen Foods',
    icon: '🍕',
    modelKey: null,
    idealStorage: 'freezer',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-4 Days (once baked/thawed)', unopenedDays: 4, opened: '3-4 Days', openedDays: 4 },
    freezeLife: { duration: '6-9 Months', days: 240 },
    storageTips: 'Keep wrapped in plastic barrier film until baking. Bake directly from frozen on hot oven rack.',
    spoilageGuide: {
      look: 'Heavy white frost across cheese, discolored dry crust.',
      smell: 'Stale cardboard smell.',
      touch: 'Dry, chalky crust.',
      tasteWarning: 'Bake thoroughly to minimum 165°F internal temperature.'
    },
    pathogenRisk: 'Zero Pathogen Risk in Freezer',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Baking frozen pizza directly on a preheated oven rack or pizza stone gives a crisp crust by evaporating bottom frost instantly.'
  },
  {
    id: 'frozen_waffles',
    name: 'Homestyle Frozen Waffles',
    category: 'frozen',
    categoryName: 'Frozen Foods',
    icon: '🧇',
    modelKey: null,
    idealStorage: 'freezer',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '5-7 Days (opened in plastic bag)', unopenedDays: 7, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: '6-9 Months', days: 240 },
    storageTips: 'Keep inside plastic inner sleeve sealed with a clip inside freezer box.',
    spoilageGuide: {
      look: 'Ice crystals filling waffle grids, pale dehydrated patches.',
      smell: 'Freezer burn smell.',
      touch: 'Dry and brittle.',
      tasteWarning: 'Toast directly from frozen for crispy exterior.'
    },
    pathogenRisk: 'Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Frozen waffles were invented in 1953 under the name "Froffles" before being renamed Eggo in 1955.'
  },
  {
    id: 'frozen_french_fries',
    name: 'Frozen Cut French Fries',
    category: 'frozen',
    categoryName: 'Frozen Foods',
    icon: '🍟',
    modelKey: null,
    idealStorage: 'freezer',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '3-4 Days (once fried/cooked)', unopenedDays: 4, opened: '3-4 Days', openedDays: 4 },
    freezeLife: { duration: '12 Months', days: 365 },
    storageTips: 'Do not thaw before frying or air-frying. Cook straight from frozen to achieve crispy potato crust.',
    spoilageGuide: {
      look: 'Ice buildup inside bag, shriveled gray potato strips.',
      smell: 'Rancid oil smell.',
      touch: 'Limp, thawed mush.',
      tasteWarning: 'Never deep fry heavily frosted fries (ice causes boiling oil to violently splatter).'
    },
    pathogenRisk: 'Low Risk in Freezer',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Commercial frozen fries are blanched, par-fried in oil, and flash-frozen so they achieve a golden restaurant crunch in minutes.'
  },

  // ==========================================
  // 10. BEVERAGES (8 items)
  // ==========================================
  {
    id: 'orange_juice_fresh',
    name: '100% Orange Juice (Refrigerated)',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🍊',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks past date', unopenedDays: 14, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: '8-12 Months', days: 300 },
    storageTips: 'Store in the refrigerator at 38°F (3°C). Shake well before pouring.',
    spoilageGuide: {
      look: 'Swollen bloated plastic jug, carbonation bubbles upon pouring, brown discoloration.',
      smell: 'Fizzy alcoholic, yeasty, or vinegary smell.',
      touch: 'Effervescent fizzing on the tongue.',
      tasteWarning: 'Fermented juice won\'t usually kill you, but can cause severe stomach cramps.'
    },
    pathogenRisk: 'Wild Yeast Fermentation',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'When orange juice goes bad, wild yeasts ferment the natural fructose sugars into alcohol and carbon dioxide, causing the carton to balloon like a balloon.'
  },
  {
    id: 'apple_cider_fresh',
    name: 'Fresh Apple Cider (Pasteurized)',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🍎',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '1-2 Weeks', unopenedDays: 14, opened: '7-10 Days', openedDays: 10 },
    freezeLife: { duration: '8-12 Months (pour out 1 inch for expansion)', days: 300 },
    storageTips: 'Keep refrigerated. If freezing, pour out 2 inches of liquid from plastic jug to prevent expanding ice from bursting the container.',
    spoilageGuide: {
      look: 'Bloated plastic jug, fizzing bubbles upon opening.',
      smell: 'Strong alcohol, vinegar, or sour yeast aroma.',
      touch: 'Carbonated effervescent prickle on tongue.',
      tasteWarning: 'Always choose pasteurized cider to avoid E. coli O157:H7 contamination.'
    },
    pathogenRisk: 'E. coli in unpasteurized raw cider',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Apple juice is filtered and clarified to remove all pectin and pulp, while apple cider is raw, unfiltered, and cloudy with aromatic solids.'
  },
  {
    id: 'craft_beer',
    name: 'Craft IPA / Pale Ale',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🍺',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '4-6 Months (loses hop aroma)', unopenedDays: 150, opened: '1 Day (goes flat)', openedDays: 1 },
    refrigLife: { unopened: '6-9 Months', unopenedDays: 240, opened: '1 Day', openedDays: 1 },
    freezeLife: { duration: 'Do Not Freeze (exploding cans/bottles)', days: 0 },
    storageTips: 'Keep cold and upright in the fridge. Light and heat are beer\'s worst enemies.',
    spoilageGuide: {
      look: 'Murky brown oxidation in light-colored beers, sediment at bottom.',
      smell: '"Skunked" smell (light-struck isohumulones) or cardboard/sherry oxidation smell.',
      touch: 'Flat, zero head retention.',
      tasteWarning: 'Skunked beer is harmless to drink, but tastes bitter and repulsive.'
    },
    pathogenRisk: 'Zero Pathogen Risk (Alcohol & Hops)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Brown glass bottles block 98% of harmful UV light wavelengths, while green bottles block only 20% and clear bottles block none—which is why green bottle beers frequently taste skunked!'
  },
  {
    id: 'red_wine_cabernet',
    name: 'Red Wine (Cabernet Sauvignon)',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🍷',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2-3 Years (standard table wine)', unopenedDays: 900, opened: '3-5 Days (corked)', openedDays: 5 },
    refrigLife: { unopened: '3-5 Years', unopenedDays: 1400, opened: '5-7 Days (slows oxidation)', openedDays: 7 },
    freezeLife: { duration: '6 Months (frozen in cubes for cooking)', days: 180 },
    storageTips: 'Store unopened bottles on their side in a cool, dark cabinet (55°F) so cork remains moist. Put opened red wine in the fridge to slow oxidation.',
    spoilageGuide: {
      look: 'Brownish-brick tint in young red wine, cloudiness.',
      smell: 'Sharp vinegar (acetic acid) or acetone nail polish remover odor.',
      touch: 'Sour, harsh acidic taste.',
      tasteWarning: 'Oxidized wine turns into wine vinegar; harmless to drink or cook with, but unpalatable as a beverage.'
    },
    pathogenRisk: 'Zero Pathogen Risk (Alcohol & Low pH)',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Acetobacter bacteria convert the ethanol in opened wine into acetic acid (vinegar) in the presence of oxygen.'
  },
  {
    id: 'white_wine_chardonnay',
    name: 'Dry White Wine (Chardonnay / Pinot)',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🥂',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: '1-2 Years', unopenedDays: 500, opened: '1-2 Days (warm)', openedDays: 2 },
    refrigLife: { unopened: '2-3 Years', unopenedDays: 800, opened: '5-7 Days (corked in fridge)', openedDays: 7 },
    freezeLife: { duration: '6 Months (for cooking sauces)', days: 180 },
    storageTips: 'Keep corked tightly in the refrigerator after opening. Use a vacuum wine stopper to pump out headspace oxygen.',
    spoilageGuide: {
      look: 'Deep brownish-amber color, cloudy sediment.',
      smell: 'Vinegar, bruised cider apples, or sherry smell.',
      touch: 'Flat and sour taste.',
      tasteWarning: 'Oxidized white wine is harmless but loses crisp fruity acidity.'
    },
    pathogenRisk: 'Zero Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'A vacuum pump wine stopper extracts up to 80% of oxygen from an opened wine bottle, doubling its fresh lifespan in the fridge.'
  },
  {
    id: 'coconut_water_tetra',
    name: 'Pure Coconut Water (Tetra Pak)',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🥥',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '9-12 Months', unopenedDays: 300, opened: 'Do Not Store in Pantry', openedDays: 0 },
    refrigLife: { unopened: '1 Year', unopenedDays: 365, opened: '2-3 Days', openedDays: 3 },
    freezeLife: { duration: '3 Months (freeze into ice cubes)', days: 90 },
    storageTips: 'Refrigerate immediately after opening and consume within 48-72 hours. Natural electrolytes support rapid bacterial growth once exposed to air.',
    spoilageGuide: {
      look: 'Cloudy, gray or pinkish discoloration, slimy floating bits.',
      smell: 'Sour, fermented or pungent odor.',
      touch: 'Slimy or thick texture.',
      tasteWarning: 'Discard immediately after 3 days opened in fridge.'
    },
    pathogenRisk: 'Rapid Spoilage Bacteria',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'Inside an undamaged green coconut, coconut water is 100% sterile and has the same electrolyte balance as human blood plasma.'
  },
  {
    id: 'kombucha_raw',
    name: 'Raw Living Kombucha',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '🫙',
    modelKey: null,
    idealStorage: 'fridge',
    pantryLife: { unopened: 'Do Not Store at Room Temp (bottles can explode!)', unopenedDays: 0, opened: 'Do Not Store', openedDays: 0 },
    refrigLife: { unopened: '6-8 Months', unopenedDays: 200, opened: '5-7 Days', openedDays: 7 },
    freezeLife: { duration: 'Do Not Freeze (kills probiotic SCOBY)', days: 0 },
    storageTips: 'Always store upright in the refrigerator! Keeping raw kombucha at room temperature allows live cultures to continue fermenting sugar into CO2 gas, leading to bottle explosions.',
    spoilageGuide: {
      look: 'Floating jellyfish-like cellulose strands are healthy SCOBY baby cultures! Black, green or blue fuzzy mold on surface is true spoilage.',
      smell: 'Overwhelming acetone or harsh acid smell.',
      touch: 'Over-carbonated geyser upon opening.',
      tasteWarning: 'Discard only if true fuzzy mold appears on top of the liquid.'
    },
    pathogenRisk: 'Exploding Glass Hazard (if left warm)',
    safetyRating: 'moderate_risk',
    dateType: 'Best If Used By',
    funFact: 'The gelatinous pancake inside kombucha is a SCOBY: Symbiotic Culture Of Bacteria and Yeast, which produces beneficial acetic and gluconic acids.'
  },
  {
    id: 'bottled_spring_water',
    name: 'Bottled Spring Water',
    category: 'beverages',
    categoryName: 'Beverages',
    icon: '💧',
    modelKey: null,
    idealStorage: 'pantry',
    pantryLife: { unopened: '2 Years (FDA: Indefinite if sealed)', unopenedDays: 730, opened: 'Do Not Store Indefinitely', openedDays: 0 },
    refrigLife: { unopened: 'Indefinite', unopenedDays: 730, opened: '1-2 Weeks', openedDays: 14 },
    freezeLife: { duration: 'Indefinite', days: 2000 },
    storageTips: 'Store in a cool dark pantry away from direct sunlight, gasoline, paint, and cleaning chemicals (plastic bottles are semi-permeable and absorb chemical fumes).',
    spoilageGuide: {
      look: 'Green algae growth from direct sunlight exposure.',
      smell: 'Plastic, chemical or stale odor.',
      touch: 'Odorless and clear.',
      tasteWarning: 'Water itself does not expire; expiration dates are for the polyethylene terephthalate (PET) plastic container leaching over years.'
    },
    pathogenRisk: 'Extremely Low Pathogen Risk',
    safetyRating: 'low_risk',
    dateType: 'Best If Used By',
    funFact: 'Water never expires! The expiration date stamped on water bottles is required by New Jersey state packaging laws and refers to the plastic bottle, not the water.'
  }
];

/**
 * Helper to find food item by ID
 */
export function getFoodById(id) {
  return FOOD_ITEMS.find(item => item.id === id);
}

/**
 * Helper to filter food items by search query, category, and storage
 */
export function searchFoodItems(query = '', categoryId = 'all', storageFilter = 'all') {
  const cleanQuery = query.toLowerCase().trim();
  
  return FOOD_ITEMS.filter(item => {
    // Category filter
    if (categoryId !== 'all' && item.category !== categoryId) {
      return false;
    }
    
    // Storage filter
    if (storageFilter !== 'all' && item.idealStorage !== storageFilter) {
      return false;
    }
    
    // Text search
    if (!cleanQuery) return true;
    
    const nameMatch = item.name.toLowerCase().includes(cleanQuery);
    const categoryMatch = item.categoryName.toLowerCase().includes(cleanQuery);
    const tipMatch = item.storageTips.toLowerCase().includes(cleanQuery);
    const pathogenMatch = (item.pathogenRisk || '').toLowerCase().includes(cleanQuery);
    const spoilageMatch = Object.values(item.spoilageGuide).some(val => val.toLowerCase().includes(cleanQuery));
    
    return nameMatch || categoryMatch || tipMatch || pathogenMatch || spoilageMatch;
  });
}
