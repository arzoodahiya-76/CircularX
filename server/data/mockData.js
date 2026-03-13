const deviceTypes = ['Smartphone', 'Laptop', 'Tablet', 'Charger', 'Battery', 'Monitor', 'Smartwatch'];
const conditions = ['Excellent', 'Good', 'Fair', 'Damaged'];

const materials = {
  Smartphone: { gold: 0.5, silver: 1.2, copper: 8, aluminum: 15, plastic: 45 },
  Laptop: { gold: 1.2, silver: 3.5, copper: 25, aluminum: 80, plastic: 120 },
  Tablet: { gold: 0.3, silver: 0.8, copper: 12, aluminum: 40, plastic: 80 },
  Charger: { gold: 0.1, silver: 0.3, copper: 15, aluminum: 25, plastic: 35 },
  Battery: { gold: 0, silver: 0.5, copper: 5, aluminum: 0, plastic: 20 },
  Monitor: { gold: 0.8, silver: 2, copper: 30, aluminum: 60, plastic: 200 },
  Smartwatch: { gold: 0.2, silver: 0.5, copper: 3, aluminum: 8, plastic: 25 }
};

const baseValuesINR = {
  Smartphone: 45000,
  Laptop: 85000,
  Tablet: 55000,
  Charger: 800,
  Battery: 1200,
  Monitor: 65000,
  Smartwatch: 28000
};

const conditionMultipliers = {
  Excellent: 1.0,
  Good: 0.75,
  Fair: 0.5,
  Damaged: 0.25
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMockAIResult(imageName) {
  const deviceType = getRandomItem(deviceTypes);
  const condition = getRandomItem(conditions);
  const material = materials[deviceType];
  const baseValue = baseValuesINR[deviceType] * conditionMultipliers[condition];
  const randomVariation = 0.8 + Math.random() * 0.4;
  const estimatedValue = Math.round(baseValue * randomVariation);

  return {
    id: 'DEV-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    imageName: imageName,
    detectedProduct: deviceType + ' ' + Math.floor(Math.random() * 100),
    brand: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Motorola'][Math.floor(Math.random() * 6)],
    category: deviceType,
    deviceType,
    condition,
    materials: material,
    estimatedValue,
    priceINR: estimatedValue,
    currency: 'INR',
    timestamp: new Date().toISOString()
  };
}

function parseCSVLine(line) {
  const parts = line.split(',').map(p => p.trim());
  if (parts.length < 2) return null;
  return {
    deviceType: parts[0],
    condition: parts[1] || 'Good',
    weight: parseFloat(parts[2]) || 100
  };
}

function processCSVData(csvContent) {
  const lines = csvContent.split('\n').filter(l => l.trim());
  const results = [];
  
  for (let i = 1; i < lines.length; i++) {
    const data = parseCSVLine(lines[i]);
    if (data) {
      const material = materials[data.deviceType] || materials.Smartphone;
      const baseValue = (baseValuesINR[data.deviceType] || 50000) * (conditionMultipliers[data.condition] || 0.75);
      const estValue = Math.round(baseValue);
      results.push({
        id: 'DEV-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        detectedProduct: data.deviceType + ' ' + Math.floor(Math.random() * 100),
        brand: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Motorola'][Math.floor(Math.random() * 6)],
        category: data.deviceType,
        deviceType: data.deviceType,
        condition: data.condition,
        weight: data.weight,
        materials: material,
        estimatedValue: estValue,
        priceINR: estValue,
        currency: 'INR',
        timestamp: new Date().toISOString()
      });
    }
  }
  return results;
}

const hubLocations = [
  { id: 'HUB-001', name: 'GreenTech Hub Downtown', address: '123 Main St, Downtown', lat: 28.6139, lng: 77.2090 },
  { id: 'HUB-002', name: 'EcoRecycle North', address: '456 North Ave, Northside', lat: 28.6328, lng: 77.2197 },
  { id: 'HUB-003', name: 'CircularHub East', address: '789 East Blvd, Eastside', lat: 28.5941, lng: 77.2295 },
  { id: 'HUB-004', name: 'TechRecover West', address: '321 West St, Westside', lat: 28.6280, lng: 77.2000 },
  { id: 'HUB-005', name: 'GreenLoop South', address: '654 South Ave, Southside', lat: 28.5700, lng: 77.2100 }
];

const mockInventory = [
  { id: 'INV-001', type: 'Smartphone', condition: 'Good', weight: 180, materials: materials.Smartphone, status: 'Available', price: 35000, quantity: 25 },
  { id: 'INV-002', type: 'Laptop', condition: 'Excellent', weight: 2200, materials: materials.Laptop, status: 'Available', price: 95000, quantity: 8 },
  { id: 'INV-003', type: 'Tablet', condition: 'Fair', weight: 450, materials: materials.Tablet, status: 'Sold', price: 28000, quantity: 0 },
  { id: 'INV-004', type: 'Charger', condition: 'Good', weight: 85, materials: materials.Charger, status: 'Available', price: 600, quantity: 150 },
  { id: 'INV-005', type: 'Battery', condition: 'Damaged', weight: 200, materials: materials.Battery, status: 'In-Transit', price: 800, quantity: 45 },
  { id: 'INV-006', type: 'Monitor', condition: 'Good', weight: 3500, materials: materials.Monitor, status: 'Available', price: 55000, quantity: 12 },
  { id: 'INV-007', type: 'Smartwatch', condition: 'Excellent', weight: 45, materials: materials.Smartwatch, status: 'Available', price: 32000, quantity: 18 },
  { id: 'INV-008', type: 'Smartphone', condition: 'Damaged', weight: 175, materials: materials.Smartphone, status: 'In-Transit', price: 10000, quantity: 30 }
];

const mockBookings = [];

let totalSearches = 0;
let totalValueSearched = 0;
let recentSearches = [];
let totalSales = 0;
let activePickups = 0;
let totalRevenue = 0;

function recordSearch(items) {
  totalSearches += items.length;
  const value = items.reduce((sum, item) => sum + (item.priceINR || item.estimatedValue || 0), 0);
  totalValueSearched += value;
  
  items.forEach(item => {
    recentSearches.unshift({
      ...item,
      searchedAt: new Date().toISOString()
    });
  });
  
  recentSearches = recentSearches.slice(0, 50);
}

function recordSale(items, amount) {
  totalSales += items.length;
  activePickups += items.length;
  totalRevenue += amount;
}

function generateDashboardMetrics() {
  const availableItems = mockInventory.filter(i => i.status === 'Available');
  const totalWeight = mockInventory.reduce((sum, i) => sum + i.weight * i.quantity, 0);
  
  const co2Saved = totalWeight * 2.5;
  const energySaved = totalWeight * 15;
  const landfillsDiverted = totalWeight / 1000;

  const totalMaterials = { gold: 0, silver: 0, copper: 0, aluminum: 0, plastic: 0 };
  
  mockInventory.forEach(item => {
    const qty = item.quantity;
    totalMaterials.gold += (item.materials.gold || 0) * qty;
    totalMaterials.silver += (item.materials.silver || 0) * qty;
    totalMaterials.copper += (item.materials.copper || 0) * qty;
    totalMaterials.aluminum += (item.materials.aluminum || 0) * qty;
    totalMaterials.plastic += (item.materials.plastic || 0) * qty;
  });

  return {
    totalItemsCollected: mockInventory.reduce((sum, i) => sum + i.quantity, 0),
    totalWeight: totalWeight,
    materialRecovered: {
      gold: Math.round(totalMaterials.gold / 1000 * 100) / 100,
      silver: Math.round(totalMaterials.silver / 1000 * 100) / 100,
      copper: Math.round(totalMaterials.copper / 1000 * 100) / 100,
      aluminum: Math.round(totalMaterials.aluminum / 1000 * 100) / 100,
      plastic: Math.round(totalMaterials.plastic / 1000 * 100) / 100
    },
    itemsAvailable: availableItems.reduce((sum, i) => sum + i.quantity, 0),
    revenue: totalRevenue,
    totalSearches,
    totalValueSearched,
    recentSearches: recentSearches.slice(0, 10),
    totalSales,
    activePickups,
    environmentalImpact: {
      co2Saved: co2Saved,
      energySaved: energySaved,
      landfillsDiverted: landfillsDiverted,
      treesEquivalent: Math.round(landfillsDiverted * 15),
      carsOffRoad: Math.round(co2Saved / 4600)
    }
  };
}

module.exports = {
  generateMockAIResult,
  processCSVData,
  hubLocations,
  mockInventory,
  mockBookings,
  generateDashboardMetrics,
  deviceTypes,
  conditions,
  recordSearch,
  recordSale
};
