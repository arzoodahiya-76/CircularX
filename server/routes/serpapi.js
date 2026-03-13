const express = require('express');
const router = express.Router();

// Google Cloud Vision setup
let visionClient = null;
try {
  const vision = require('@google-cloud/vision');
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    visionClient = new vision.ImageAnnotatorClient();
    console.log('Google Cloud Vision initialized');
  }
} catch (e) {
  console.log('Google Cloud Vision not configured:', e.message);
}

const IMGBB_API_KEY = process.env.IMGBB_API_KEY || 'e5e5c74b4e2c5c47a3c0b2f3a1d4e5f6';

const CATEGORY_KEYWORDS = {
  smartphone: ['phone', 'mobile', 'iphone', 'samsung', 'oneplus', 'pixel', 'redmi', 'realme', 'oppo', 'vivo'],
  laptop: ['laptop', 'notebook', 'macbook', 'dell', 'hp', 'lenovo', 'thinkpad', 'asus', 'acer'],
  tablet: ['tablet', 'ipad', 'galaxy tab'],
  smartwatch: ['watch', 'apple watch', 'galaxy watch', 'fitbit'],
  headphones: ['headphone', 'airpod', 'earphone', 'earbud', 'speaker', 'sony wh', 'buds'],
  tv: ['tv', 'television', 'smart tv', 'led tv', 'oled tv', 'lg tv', 'samsung tv', 'sony tv'],
  car: ['car', 'vehicle', 'automobile', 'honda', 'maruti', 'hyundai', 'toyota', 'bmw', 'mercedes', 'audi'],
  bike: ['bike', 'bicycle', 'scooter', 'motorcycle', 'activa', 'jupiter', 'bullet', 'ktm'],
  camera: ['camera', 'dslr', 'canon', 'nikon', 'sony alpha', 'fujifilm'],
  gaming: ['playstation', 'ps5', 'xbox', 'nintendo', 'gaming console'],
  drone: ['drone', 'dj mavic', 'dj mini'],
  appliance: ['refrigerator', 'washing machine', 'ac', 'air conditioner', 'microwave']
};

// Product database with prices
const PRODUCT_DB = {
  'iphone 15 pro max': { name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'smartphone', price: 125000 },
  'iphone 15': { name: 'iPhone 15', brand: 'Apple', category: 'smartphone', price: 79900 },
  'iphone 14': { name: 'iPhone 14', brand: 'Apple', category: 'smartphone', price: 65000 },
  'iphone 13': { name: 'iPhone 13', brand: 'Apple', category: 'smartphone', price: 50000 },
  'samsung galaxy s24': { name: 'Samsung Galaxy S24', brand: 'Samsung', category: 'smartphone', price: 80000 },
  'samsung galaxy s23': { name: 'Samsung Galaxy S23', brand: 'Samsung', category: 'smartphone', price: 65000 },
  'oneplus 12': { name: 'OnePlus 12', brand: 'OnePlus', category: 'smartphone', price: 64999 },
  'oneplus 11': { name: 'OnePlus 11', brand: 'OnePlus', category: 'smartphone', price: 50000 },
  'google pixel 8': { name: 'Google Pixel 8', brand: 'Google', category: 'smartphone', price: 65000 },
  'xiaomi 14': { name: 'Xiaomi 14', brand: 'Xiaomi', category: 'smartphone', price: 55000 },
  'redmi note 13': { name: 'Redmi Note 13', brand: 'Xiaomi', category: 'smartphone', price: 18000 },
  'realme gt': { name: 'Realme GT', brand: 'Realme', category: 'smartphone', price: 25000 },
  'macbook pro': { name: 'MacBook Pro', brand: 'Apple', category: 'laptop', price: 200000 },
  'macbook air': { name: 'MacBook Air', brand: 'Apple', category: 'laptop', price: 90000 },
  'dell xps': { name: 'Dell XPS 15', brand: 'Dell', category: 'laptop', price: 140000 },
  'hp spectre': { name: 'HP Spectre x360', brand: 'HP', category: 'laptop', price: 90000 },
  'lenovo thinkpad': { name: 'Lenovo ThinkPad X1', brand: 'Lenovo', category: 'laptop', price: 120000 },
  'asus zenbook': { name: 'ASUS ZenBook', brand: 'Asus', category: 'laptop', price: 80000 },
  'ipad pro': { name: 'iPad Pro', brand: 'Apple', category: 'tablet', price: 100000 },
  'ipad air': { name: 'iPad Air', brand: 'Apple', category: 'tablet', price: 55000 },
  'ipad': { name: 'iPad', brand: 'Apple', category: 'tablet', price: 35000 },
  'galaxy tab': { name: 'Samsung Galaxy Tab S9', brand: 'Samsung', category: 'tablet', price: 70000 },
  'apple watch': { name: 'Apple Watch', brand: 'Apple', category: 'smartwatch', price: 40000 },
  'galaxy watch': { name: 'Samsung Galaxy Watch', brand: 'Samsung', category: 'smartwatch', price: 25000 },
  'fitbit': { name: 'Fitbit', brand: 'Fitbit', category: 'smartwatch', price: 15000 },
  'airpods': { name: 'AirPods Pro', brand: 'Apple', category: 'headphones', price: 22000 },
  'sony wh-1000xm': { name: 'Sony WH-1000XM5', brand: 'Sony', category: 'headphones', price: 28000 },
  'airpods max': { name: 'AirPods Max', brand: 'Apple', category: 'headphones', price: 55000 },
  'playstation 5': { name: 'PlayStation 5', brand: 'Sony', category: 'gaming', price: 50000 },
  'ps5': { name: 'PlayStation 5', brand: 'Sony', category: 'gaming', price: 50000 },
  'xbox series x': { name: 'Xbox Series X', brand: 'Microsoft', category: 'gaming', price: 50000 },
  'nintendo switch': { name: 'Nintendo Switch', brand: 'Nintendo', category: 'gaming', price: 35000 },
  'canon eos': { name: 'Canon EOS R5', brand: 'Canon', category: 'camera', price: 250000 },
  'sony alpha': { name: 'Sony Alpha A7 IV', brand: 'Sony', category: 'camera', price: 200000 },
  'nikon z': { name: 'Nikon Z8', brand: 'Nikon', category: 'camera', price: 300000 },
  'lg oled': { name: 'LG OLED TV', brand: 'LG', category: 'tv', price: 100000 },
  'samsung tv': { name: 'Samsung Smart TV', brand: 'Samsung', category: 'tv', price: 70000 },
  'sony bravia': { name: 'Sony Bravia', brand: 'Sony', category: 'tv', price: 90000 },
  'dji mavic': { name: 'DJI Mavic 3', brand: 'DJI', category: 'drone', price: 150000 },
  'dji mini': { name: 'DJI Mini 3', brand: 'DJI', category: 'drone', price: 80000 },
  'honda city': { name: 'Honda City', brand: 'Honda', category: 'car', price: 1100000 },
  'maruti swift': { name: 'Maruti Swift', brand: 'Maruti', category: 'car', price: 650000 },
  'hyundai creta': { name: 'Hyundai Creta', brand: 'Hyundai', category: 'car', price: 1100000 },
  'activa': { name: 'Honda Activa', brand: 'Honda', category: 'bike', price: 90000 },
  'jupiter': { name: 'TVS Jupiter', brand: 'TVS', category: 'bike', price: 80000 },
  'bullet': { name: 'Royal Enfield Bullet', brand: 'Royal Enfield', category: 'bike', price: 200000 },
  'refrigerator': { name: 'Refrigerator', brand: 'Samsung', category: 'appliance', price: 40000 },
  'washing machine': { name: 'Washing Machine', brand: 'LG', category: 'appliance', price: 35000 }
};

const DEFAULT_PRICES = {
  smartphone: 25000,
  laptop: 80000,
  tablet: 40000,
  smartwatch: 20000,
  headphones: 15000,
  tv: 60000,
  car: 800000,
  bike: 80000,
  camera: 60000,
  gaming: 40000,
  drone: 60000,
  appliance: 30000
};

function detectCategory(query) {
  const lower = query.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return category;
    }
  }
  return 'smartphone';
}

function findProductInDB(labels) {
  for (const label of labels) {
    const labelLower = label.toLowerCase();
    if (PRODUCT_DB[labelLower]) {
      return PRODUCT_DB[labelLower];
    }
    for (const [key, product] of Object.entries(PRODUCT_DB)) {
      if (labelLower.includes(key) || key.includes(labelLower)) {
        return product;
      }
    }
  }
  return null;
}

function getMaterialsForCategory(category) {
  const materials = {
    smartphone: [
      { name: 'Gold', percentage: 0.02, value_per_kg_inr: 5500000 },
      { name: 'Silver', percentage: 0.05, value_per_kg_inr: 75000 },
      { name: 'Copper', percentage: 0.3, value_per_kg_inr: 600 },
      { name: 'Aluminum', percentage: 2, value_per_kg_inr: 150 },
      { name: 'Plastic', percentage: 15, value_per_kg_inr: 50 },
      { name: 'Circuit Board', percentage: 5, value_per_kg_inr: 2000 },
    ],
    laptop: [
      { name: 'Gold', percentage: 0.05, value_per_kg_inr: 5500000 },
      { name: 'Silver', percentage: 0.15, value_per_kg_inr: 75000 },
      { name: 'Copper', percentage: 1.5, value_per_kg_inr: 600 },
      { name: 'Aluminum', percentage: 8, value_per_kg_inr: 150 },
    ],
    car: [
      { name: 'Steel', percentage: 60, value_per_kg_inr: 80 },
      { name: 'Aluminum', percentage: 10, value_per_kg_inr: 150 },
      { name: 'Copper', percentage: 1.5, value_per_kg_inr: 600 },
      { name: 'Plastic', percentage: 12, value_per_kg_inr: 50 },
      { name: 'Glass', percentage: 3, value_per_kg_inr: 300 },
    ]
  };
  return materials[category] || materials.smartphone;
}

router.post('/google-lens', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'No image provided' });
    }
    
    console.log('Processing image with Google Cloud Vision...');
    
    let imageBuffer;
    
    if (imageUrl.startsWith('data:')) {
      const base64Data = imageUrl.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else if (imageUrl.startsWith('http')) {
      try {
        const response = await fetch(imageUrl);
        imageBuffer = Buffer.from(await response.arrayBuffer());
      } catch (e) {
        try {
          const formData = new URLSearchParams();
          formData.append('image', imageUrl);
          const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
          });
          const imgbbData = await imgbbResponse.json();
          if (imgbbData.success) {
            const imgResponse = await fetch(imgbbData.data.url);
            imageBuffer = Buffer.from(await imgResponse.arrayBuffer());
          }
        } catch (uploadError) {
          console.log('Image upload failed:', uploadError.message);
        }
      }
    }
    
    let labels = [];
    let productName = 'Unknown Product';
    let detectedCategory = 'smartphone';
    let productBrand = 'Unknown';
    let estimatedValue = 25000;
    
    if (visionClient && imageBuffer) {
      try {
        const [result] = await visionClient.labelDetection(imageBuffer);
        labels = result.labelAnnotations.map(label => label.description);
        console.log('Vision labels:', labels);
        
        const matchedProduct = findProductInDB(labels);
        
        if (matchedProduct) {
          productName = matchedProduct.name;
          productBrand = matchedProduct.brand;
          detectedCategory = matchedProduct.category;
          estimatedValue = matchedProduct.price;
        } else {
          productName = labels[0] || 'Electronic Device';
          detectedCategory = detectCategory(productName);
          estimatedValue = DEFAULT_PRICES[detectedCategory] || 25000;
        }
        
        try {
          const [webResult] = await visionClient.webDetection(imageBuffer);
          if (webResult.webEntities) {
            for (const entity of webResult.webEntities) {
              if (entity.description && entity.description.length > 3) {
                const matched = findProductInDB([entity.description]);
                if (matched && !productName.includes(matched.name)) {
                  productName = matched.name;
                  productBrand = matched.brand;
                  detectedCategory = matched.category;
                  estimatedValue = matched.price;
                  break;
                }
              }
            }
          }
        } catch (webError) {
          console.log('Web detection skipped:', webError.message);
        }
        
      } catch (visionError) {
        console.log('Vision API error:', visionError.message);
      }
    } else {
      const hint = imageUrl.split('/').pop() || '';
      const matchedProduct = findProductInDB([hint]);
      
      if (matchedProduct) {
        productName = matchedProduct.name;
        productBrand = matchedProduct.brand;
        detectedCategory = matchedProduct.category;
        estimatedValue = matchedProduct.price;
      } else {
        productName = 'Electronic Device';
        detectedCategory = 'smartphone';
        estimatedValue = 25000;
      }
    }
    
    console.log('Final result:', { productName, productBrand, detectedCategory, estimatedValue });
    
    res.json({
      success: true,
      identified_product: productName,
      category: detectedCategory,
      brand: productBrand,
      labels: labels,
      estimated_value_inr: estimatedValue,
      price_source: visionClient ? 'google_cloud_vision' : 'local_db',
      materials: getMaterialsForCategory(detectedCategory),
      weight_kg: detectedCategory === 'car' ? 1000 : detectedCategory === 'laptop' ? 2 : 0.3,
      marketPrice: {
        min: Math.round(estimatedValue * 0.6),
        max: Math.round(estimatedValue * 1.3),
        average: estimatedValue
      },
      sources: ['Local Database', 'Estimated']
    });
    
  } catch (error) {
    console.error('Image Search Error:', error.message);
    res.json({
      success: false,
      error: error.message,
      identified_product: 'Unknown Product',
      estimated_value_inr: 25000,
      category: 'smartphone',
      brand: 'Unknown'
    });
  }
});

module.exports = router;
