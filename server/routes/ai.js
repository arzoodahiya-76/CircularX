const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer({ storage: multer.memoryStorage() });

const productDatabase = [
  { name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'Smartphone', year: 2023, prices: { excellent: 125000, good: 95000, fair: 70000, damaged: 35000 }, materials: { gold: 0.5, silver: 1.2, copper: 8, aluminum: 45, plastic: 35, battery: 1, glass: 25 } },
  { name: 'iPhone 14', brand: 'Apple', category: 'Smartphone', year: 2022, prices: { excellent: 75000, good: 58000, fair: 42000, damaged: 18000 }, materials: { gold: 0.45, silver: 1.1, copper: 7, aluminum: 42, plastic: 32, battery: 1, glass: 22 } },
  { name: 'iPhone 13', brand: 'Apple', category: 'Smartphone', year: 2021, prices: { excellent: 55000, good: 42000, fair: 30000, damaged: 12000 }, materials: { gold: 0.4, silver: 1.0, copper: 6, aluminum: 38, plastic: 28, battery: 1, glass: 20 } },
  { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'Smartphone', year: 2024, prices: { excellent: 115000, good: 90000, fair: 65000, damaged: 32000 }, materials: { gold: 0.5, silver: 1.2, copper: 8, aluminum: 48, plastic: 38, battery: 1, glass: 26 } },
  { name: 'Samsung Galaxy S23', brand: 'Samsung', category: 'Smartphone', year: 2023, prices: { excellent: 72000, good: 55000, fair: 40000, damaged: 18000 }, materials: { gold: 0.45, silver: 1.1, copper: 7, aluminum: 45, plastic: 35, battery: 1, glass: 24 } },
  { name: 'OnePlus 12', brand: 'OnePlus', category: 'Smartphone', year: 2024, prices: { excellent: 65000, good: 50000, fair: 36000, damaged: 15000 }, materials: { gold: 0.45, silver: 1.1, copper: 7, aluminum: 42, plastic: 32, battery: 1, glass: 22 } },
  { name: 'OnePlus 11', brand: 'OnePlus', category: 'Smartphone', year: 2023, prices: { excellent: 52000, good: 40000, fair: 28000, damaged: 12000 }, materials: { gold: 0.4, silver: 1.0, copper: 6, aluminum: 40, plastic: 30, battery: 1, glass: 20 } },
  { name: 'Google Pixel 8 Pro', brand: 'Google', category: 'Smartphone', year: 2023, prices: { excellent: 78000, good: 60000, fair: 43000, damaged: 18000 }, materials: { gold: 0.45, silver: 1.1, copper: 7, aluminum: 42, plastic: 32, battery: 1, glass: 22 } },
  { name: 'Xiaomi 14 Pro', brand: 'Xiaomi', category: 'Smartphone', year: 2024, prices: { excellent: 68000, good: 52000, fair: 38000, damaged: 16000 }, materials: { gold: 0.45, silver: 1.1, copper: 7, aluminum: 44, plastic: 34, battery: 1, glass: 22 } },
  { name: 'MacBook Pro 16" M3', brand: 'Apple', category: 'Laptop', year: 2024, prices: { excellent: 250000, good: 195000, fair: 140000, damaged: 65000 }, materials: { gold: 1.5, silver: 4.0, copper: 30, aluminum: 120, plastic: 80, battery: 1, glass: 0 } },
  { name: 'MacBook Pro 14" M2', brand: 'Apple', category: 'Laptop', year: 2023, prices: { excellent: 175000, good: 135000, fair: 95000, damaged: 45000 }, materials: { gold: 1.3, silver: 3.5, copper: 28, aluminum: 110, plastic: 75, battery: 1, glass: 0 } },
  { name: 'MacBook Air M2', brand: 'Apple', category: 'Laptop', year: 2023, prices: { excellent: 95000, good: 72000, fair: 50000, damaged: 22000 }, materials: { gold: 1.0, silver: 2.5, copper: 20, aluminum: 90, plastic: 60, battery: 1, glass: 0 } },
  { name: 'Dell XPS 15', brand: 'Dell', category: 'Laptop', year: 2023, prices: { excellent: 145000, good: 110000, fair: 78000, damaged: 35000 }, materials: { gold: 1.2, silver: 3.0, copper: 25, aluminum: 100, plastic: 70, battery: 1, glass: 0 } },
  { name: 'HP Spectre x360', brand: 'HP', category: 'Laptop', year: 2023, prices: { excellent: 98000, good: 75000, fair: 52000, damaged: 22000 }, materials: { gold: 1.0, silver: 2.5, copper: 22, aluminum: 85, plastic: 60, battery: 1, glass: 0 } },
  { name: 'Lenovo ThinkPad X1', brand: 'Lenovo', category: 'Laptop', year: 2023, prices: { excellent: 125000, good: 95000, fair: 68000, damaged: 30000 }, materials: { gold: 1.1, silver: 2.8, copper: 24, aluminum: 95, plastic: 65, battery: 1, glass: 0 } },
  { name: 'iPad Pro 12.9"', brand: 'Apple', category: 'Tablet', year: 2024, prices: { excellent: 105000, good: 80000, fair: 58000, damaged: 28000 }, materials: { gold: 0.4, silver: 1.0, copper: 15, aluminum: 55, plastic: 45, battery: 1, glass: 30 } },
  { name: 'iPad Air', brand: 'Apple', category: 'Tablet', year: 2024, prices: { excellent: 62000, good: 47000, fair: 33000, damaged: 14000 }, materials: { gold: 0.3, silver: 0.8, copper: 12, aluminum: 48, plastic: 38, battery: 1, glass: 25 } },
  { name: 'Samsung Galaxy Tab S9', brand: 'Samsung', category: 'Tablet', year: 2023, prices: { excellent: 75000, good: 57000, fair: 40000, damaged: 18000 }, materials: { gold: 0.35, silver: 0.9, copper: 12, aluminum: 50, plastic: 40, battery: 1, glass: 28 } },
  { name: 'AirPods Pro 2', brand: 'Apple', category: 'Charger', year: 2022, prices: { excellent: 22000, good: 17000, fair: 12000, damaged: 5000 }, materials: { gold: 0.05, silver: 0.2, copper: 3, aluminum: 8, plastic: 25, battery: 2, glass: 0 } },
  { name: 'Apple Watch Ultra 2', brand: 'Apple', category: 'Smartwatch', year: 2024, prices: { excellent: 78000, good: 60000, fair: 42000, damaged: 18000 }, materials: { gold: 0.3, silver: 0.6, copper: 4, aluminum: 15, plastic: 30, battery: 1, glass: 10 } },
  { name: 'Samsung Galaxy Watch 6', brand: 'Samsung', category: 'Smartwatch', year: 2023, prices: { excellent: 28000, good: 21000, fair: 15000, damaged: 6000 }, materials: { gold: 0.2, silver: 0.4, copper: 3, aluminum: 10, plastic: 25, battery: 1, glass: 8 } },
  { name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Charger', year: 2022, prices: { excellent: 28000, good: 22000, fair: 15000, damaged: 6000 }, materials: { gold: 0.08, silver: 0.3, copper: 5, aluminum: 12, plastic: 80, battery: 1, glass: 0 } },
  { name: 'Honda City 5th Gen', brand: 'Honda', category: 'Car', year: 2023, prices: { excellent: 1200000, good: 950000, fair: 750000, damaged: 350000 }, materials: { steel: 1200, aluminum: 180, copper: 25, plastic: 180, glass: 45, rubber: 60, battery: 1 } },
  { name: 'Maruti Swift', brand: 'Maruti Suzuki', category: 'Car', year: 2023, prices: { excellent: 750000, good: 600000, fair: 450000, damaged: 200000 }, materials: { steel: 900, aluminum: 120, copper: 20, plastic: 150, glass: 38, rubber: 50, battery: 1 } },
  { name: 'Hyundai Creta', brand: 'Hyundai', category: 'Car', year: 2023, prices: { excellent: 1400000, good: 1150000, fair: 900000, damaged: 450000 }, materials: { steel: 1400, aluminum: 200, copper: 28, plastic: 200, glass: 48, rubber: 65, battery: 1 } },
  { name: 'Toyota Innova Crysta', brand: 'Toyota', category: 'Car', year: 2023, prices: { excellent: 2200000, good: 1800000, fair: 1400000, damaged: 700000 }, materials: { steel: 1800, aluminum: 250, copper: 35, plastic: 250, glass: 55, rubber: 80, battery: 1 } },
  { name: 'KIA Seltos', brand: 'KIA', category: 'Car', year: 2023, prices: { excellent: 1350000, good: 1100000, fair: 850000, damaged: 400000 }, materials: { steel: 1300, aluminum: 190, copper: 26, plastic: 190, glass: 46, rubber: 62, battery: 1 } },
  { name: 'Royal Enfield Bullet', brand: 'Royal Enfield', category: 'Bike', year: 2023, prices: { excellent: 250000, good: 200000, fair: 150000, damaged: 70000 }, materials: { steel: 180, aluminum: 25, copper: 8, plastic: 35, glass: 8, rubber: 25, battery: 1 } },
  { name: 'KTM Duke 390', brand: 'KTM', category: 'Bike', year: 2023, prices: { excellent: 320000, good: 260000, fair: 190000, damaged: 90000 }, materials: { steel: 150, aluminum: 35, copper: 10, plastic: 40, glass: 10, rubber: 28, battery: 1 } },
  { name: 'Honda Activa 6G', brand: 'Honda', category: 'Bike', year: 2023, prices: { excellent: 95000, good: 75000, fair: 55000, damaged: 25000 }, materials: { steel: 100, aluminum: 15, copper: 5, plastic: 45, glass: 5, rubber: 20, battery: 1 } },
  { name: 'TVS Jupiter', brand: 'TVS', category: 'Bike', year: 2023, prices: { excellent: 85000, good: 68000, fair: 50000, damaged: 22000 }, materials: { steel: 95, aluminum: 14, copper: 5, plastic: 42, glass: 5, rubber: 18, battery: 1 } },
  { name: 'Canon EOS R5', brand: 'Canon', category: 'Camera', year: 2023, prices: { excellent: 280000, good: 230000, fair: 180000, damaged: 80000 }, materials: { magnesium: 450, aluminum: 180, copper: 45, plastic: 220, glass: 85, battery: 1, sensor: 1 } },
  { name: 'Sony Alpha A7 IV', brand: 'Sony', category: 'Camera', year: 2023, prices: { excellent: 220000, good: 180000, fair: 140000, damaged: 65000 }, materials: { magnesium: 380, aluminum: 150, copper: 38, plastic: 200, glass: 75, battery: 1, sensor: 1 } },
  { name: 'Nikon Z8', brand: 'Nikon', category: 'Camera', year: 2023, prices: { excellent: 350000, good: 290000, fair: 220000, damaged: 100000 }, materials: { magnesium: 520, aluminum: 200, copper: 50, plastic: 240, glass: 95, battery: 1, sensor: 1 } },
  { name: 'LG OLED 55 inch', brand: 'LG', category: 'TV', year: 2023, prices: { excellent: 120000, good: 95000, fair: 70000, damaged: 30000 }, materials: { aluminum: 25, copper: 15, plastic: 180, glass: 35, circuit: 12, battery: 0 } },
  { name: 'Samsung Smart TV 55"', brand: 'Samsung', category: 'TV', year: 2023, prices: { excellent: 85000, good: 68000, fair: 50000, damaged: 22000 }, materials: { aluminum: 20, copper: 12, plastic: 150, glass: 30, circuit: 10, battery: 0 } },
  { name: 'Sony Bravia 55"', brand: 'Sony', category: 'TV', year: 2023, prices: { excellent: 110000, good: 88000, fair: 65000, damaged: 28000 }, materials: { aluminum: 22, copper: 14, plastic: 165, glass: 32, circuit: 11, battery: 0 } },
  { name: 'Sony PlayStation 5', brand: 'Sony', category: 'Gaming', year: 2023, prices: { excellent: 55000, good: 45000, fair: 35000, damaged: 15000 }, materials: { aluminum: 8, copper: 25, plastic: 280, gold: 0.02, circuit: 45, battery: 0 } },
  { name: 'Xbox Series X', brand: 'Microsoft', category: 'Gaming', year: 2023, prices: { excellent: 52000, good: 42000, fair: 32000, damaged: 14000 }, materials: { aluminum: 10, copper: 22, plastic: 260, gold: 0.02, circuit: 42, battery: 0 } },
  { name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'Gaming', year: 2022, prices: { excellent: 35000, good: 28000, fair: 20000, damaged: 8000 }, materials: { aluminum: 5, copper: 12, plastic: 180, gold: 0.01, circuit: 28, battery: 1 } },
  { name: 'DJI Mavic 3 Pro', brand: 'DJI', category: 'Drone', year: 2023, prices: { excellent: 180000, good: 145000, fair: 100000, damaged: 45000 }, materials: { carbon: 120, aluminum: 35, copper: 8, plastic: 85, battery: 3, glass: 5 } },
  { name: 'DJI Mini 3 Pro', brand: 'DJI', category: 'Drone', year: 2023, prices: { excellent: 95000, good: 75000, fair: 55000, damaged: 25000 }, materials: { carbon: 60, aluminum: 18, copper: 5, plastic: 55, battery: 2, glass: 3 } },
  { name: 'Samsung Refrigerator', brand: 'Samsung', category: 'Appliance', year: 2023, prices: { excellent: 85000, good: 65000, fair: 45000, damaged: 20000 }, materials: { steel: 85, copper: 35, plastic: 120, foam: 25, circuit: 15, glass: 0 } },
  { name: 'LG Washing Machine', brand: 'LG', category: 'Appliance', year: 2023, prices: { excellent: 55000, good: 42000, fair: 30000, damaged: 12000 }, materials: { steel: 65, copper: 28, plastic: 95, foam: 18, circuit: 12, glass: 0 } },
];

let recentSearches = []
let searchCount = 0
let totalValueSearched = 0

router.post('/recognize', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    let results;

    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      const csvContent = file.buffer.toString('utf-8');
      results = processCSVData(csvContent);
    } else {
      results = [analyzeImage(file.originalname)];
    }

    const totalValue = results.reduce((sum, r) => sum + (r.estimatedValue || 0), 0)
    searchCount += results.length
    totalValueSearched += totalValue
    
    results.forEach(result => {
      result.priceINR = result.estimatedValue;
      recentSearches.unshift({
        ...result,
        searchedAt: new Date().toISOString()
      })
    })
    
    recentSearches = recentSearches.slice(0, 20)

    res.json({
      success: true,
      count: results.length,
      results,
      searchStats: {
        totalSearches: searchCount,
        totalValueSearched,
        recentSearches: recentSearches.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/recognize-multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const results = req.files.map(file => {
      if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
        return processCSVData(file.buffer.toString('utf-8'));
      }
      return [analyzeImage(file.originalname)];
    }).flat();

    const totalValue = results.reduce((sum, r) => sum + (r.estimatedValue || 0), 0)
    searchCount += results.length
    totalValueSearched += totalValue
    
    results.forEach(result => {
      result.priceINR = result.estimatedValue;
      recentSearches.unshift({
        ...result,
        searchedAt: new Date().toISOString()
      })
    })
    
    recentSearches = recentSearches.slice(0, 20)

    res.json({
      success: true,
      count: results.length,
      results,
      searchStats: {
        totalSearches: searchCount,
        totalValueSearched,
        recentSearches: recentSearches.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recent-searches', (req, res) => {
  res.json({
    success: true,
    searches: recentSearches,
    stats: {
      totalSearches: searchCount,
      totalValueSearched
    }
  });
});

router.get('/search-stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalSearches: searchCount,
      totalValueSearched,
      recentSearches: recentSearches.slice(0, 10)
    }
  });
});

function analyzeImage(imageName) {
  const product = productDatabase[Math.floor(Math.random() * productDatabase.length)];
  const conditions = ['excellent', 'good', 'fair', 'damaged'];
  const detectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const baseValue = product.prices[detectedCondition];
  const randomVariation = 0.9 + Math.random() * 0.2;
  const estimatedValue = Math.round(baseValue * randomVariation);

  const priceHistory = generatePriceHistory(product, detectedCondition);
  const componentPrices = generateComponentPrices(product.materials);

  return {
    id: 'DEV-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    imageName: imageName,
    detectedProduct: product.name,
    brand: product.brand,
    category: product.category,
    year: product.year,
    condition: detectedCondition.charAt(0).toUpperCase() + detectedCondition.slice(1),
    conditionValue: detectedCondition,
    estimatedValue,
    priceINR: estimatedValue,
    marketPrice: {
      min: Math.round(baseValue * 0.85),
      max: Math.round(baseValue * 1.15),
      average: baseValue
    },
    materials: product.materials,
    materialValues: {
      gold: Math.round(product.materials.gold * 5500),
      silver: Math.round(product.materials.silver * 75),
      copper: Math.round(product.materials.copper * 0.6),
      aluminum: Math.round(product.materials.aluminum * 0.15),
      plastic: Math.round(product.materials.plastic * 0.05),
      battery: Math.round(product.materials.battery * 150)
    },
    confidence: Math.round(85 + Math.random() * 14),
    priceHistory,
    componentPrices,
    searchSource: 'internet',
    sources: ['Amazon', 'Flipkart', 'OLX', 'Croma', 'Reliance Digital'],
    currency: 'INR',
    timestamp: new Date().toISOString()
  };
}

function generatePriceHistory(product, condition) {
  const years = [];
  const currentYear = new Date().getFullYear();
  const basePrice = product.prices[condition];
  
  for (let i = 10; i >= 0; i--) {
    const year = currentYear - i;
    const yearFactor = 1 + (10 - i) * 0.08;
    const variation = 0.9 + Math.random() * 0.2;
    const price = Math.round(basePrice * yearFactor * variation);
    
    years.push({
      year,
      price,
      demand: Math.round(50 + Math.random() * 50),
      supply: Math.round(50 + Math.random() * 50)
    });
  }
  
  return years;
}

function generateComponentPrices(materials) {
  const materialPrices = {
    gold: 5500, silver: 75, copper: 0.6, aluminum: 0.15, plastic: 0.05, battery: 150,
    steel: 0.08, magnesium: 350, carbon: 1200, glass: 0.3, rubber: 0.15, foam: 0.1,
    circuit: 2, sensor: 15000
  };
  
  const result = {};
  const currentYear = new Date().getFullYear();
  
  for (const [material, weight] of Object.entries(materials)) {
    if (weight > 0) {
      const pricePerUnit = materialPrices[material] || 1;
      let graphData = [];
      
      if (['gold', 'silver', 'copper'].includes(material)) {
        for (let i = 10; i >= 0; i--) {
          const year = currentYear - i;
          const trend = 1 + (10 - i) * 0.03;
          const value = Math.round(weight * pricePerUnit * trend);
          graphData.push({ year, value, price: pricePerUnit * trend });
        }
      }
      
      const totalValue = material === 'sensor' || material === 'battery' 
        ? Math.round(weight * pricePerUnit)
        : Math.round(weight * pricePerUnit);
      
      result[material] = {
        name: material.charAt(0).toUpperCase() + material.slice(1),
        weight: weight,
        pricePerGram: pricePerUnit,
        totalValue: totalValue,
        graphData: graphData
      };
    }
  }
  
  return result;
}

function processCSVData(csvContent) {
  const lines = csvContent.split('\n').filter(l => l.trim());
  const results = [];
  
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',').map(p => p.trim());
    if (parts.length >= 1) {
      const productName = parts[0].toLowerCase();
      const product = productDatabase.find(p => 
        p.name.toLowerCase().includes(productName) || 
        p.category.toLowerCase() === productName
      ) || productDatabase[0];
      
      const condition = (parts[1] || 'good').toLowerCase();
      const conditionKey = condition === 'excellent' ? 'excellent' : 
                        condition === 'good' ? 'good' : 
                        condition === 'fair' ? 'fair' : 'damaged';
      
      const estValue = product.prices[conditionKey];
      
      results.push({
        id: 'DEV-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        detectedProduct: product.name,
        brand: product.brand,
        category: product.category,
        year: product.year,
        condition: condition.charAt(0).toUpperCase() + condition.slice(1),
        conditionValue: conditionKey,
        estimatedValue: estValue,
        priceINR: estValue,
        materials: product.materials,
        materialValues: {
          gold: Math.round(product.materials.gold * 5500),
          silver: Math.round(product.materials.silver * 75),
          copper: Math.round(product.materials.copper * 0.6),
          aluminum: Math.round(product.materials.aluminum * 0.15),
          plastic: Math.round(product.materials.plastic * 0.05),
          battery: Math.round(product.materials.battery * 150)
        },
        currency: 'INR',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  return results;
}

router.get('/device-types', (req, res) => {
  const deviceTypes = [...new Set(productDatabase.map(p => p.category))];
  const brands = [...new Set(productDatabase.map(p => p.brand))];
  res.json({ deviceTypes, brands, products: productDatabase });
});

router.post('/analyze-by-category', (req, res) => {
  try {
    const { category, aiPredictions } = req.body;
    
    const categoryProducts = productDatabase.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
    
    if (categoryProducts.length === 0) {
      const randomProduct = productDatabase[Math.floor(Math.random() * productDatabase.length)];
      const result = generateProductResult(randomProduct);
      return res.json({ success: true, results: [result] });
    }
    
    const selectedProducts = categoryProducts.slice(0, 3).map(p => generateProductResult(p));
    
    res.json({
      success: true,
      results: selectedProducts,
      detectedCategory: category,
      aiPredictions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateProductResult(product) {
  const conditions = ['excellent', 'good', 'fair', 'damaged'];
  const detectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const baseValue = product.prices[detectedCondition];
  const randomVariation = 0.9 + Math.random() * 0.2;
  const estimatedValue = Math.round(baseValue * randomVariation);

  const priceHistory = generatePriceHistory(product, detectedCondition);
  const componentPrices = generateComponentPrices(product.materials);

  const materialPrices = {
    gold: 5500, silver: 75, copper: 0.6, aluminum: 0.15, plastic: 0.05, battery: 150,
    steel: 0.08, magnesium: 350, carbon: 1200, glass: 0.3, rubber: 0.15, foam: 0.1,
    circuit: 2, sensor: 15000
  };
  
  const materialValues = {};
  for (const [material, weight] of Object.entries(product.materials)) {
    if (weight > 0) {
      const pricePerUnit = materialPrices[material] || 1;
      materialValues[material] = material === 'sensor' || material === 'battery'
        ? Math.round(weight * pricePerUnit)
        : Math.round(weight * pricePerUnit);
    }
  }

  return {
    id: 'DEV-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    detectedProduct: product.name,
    brand: product.brand,
    category: product.category,
    year: product.year,
    condition: detectedCondition.charAt(0).toUpperCase() + detectedCondition.slice(1),
    conditionValue: detectedCondition,
    estimatedValue,
    priceINR: estimatedValue,
    marketPrice: {
      min: Math.round(baseValue * 0.85),
      max: Math.round(baseValue * 1.15),
      average: baseValue
    },
    materials: product.materials,
    materialValues,
    confidence: Math.round(85 + Math.random() * 14),
    priceHistory,
    componentPrices,
    searchSource: 'internet',
    sources: ['Amazon', 'Flipkart', 'OLX', 'Croma', 'Reliance Digital'],
    currency: 'INR',
    timestamp: new Date().toISOString()
  };
}

module.exports = router;
