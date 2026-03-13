const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const base44ApiKey = process.env.BASE44_API_KEY;
const base44AppId = process.env.BASE44_APP_ID;

const PROMPT = `You are an e-waste valuation expert with internet access. Analyze the uploaded e-waste image and:

1. Search the internet to identify the EXACT product name and model
2. Find current market prices in India (INR)
3. Provide detailed analysis

For each item return ONLY valid JSON (no other text):
{
  "items": [
    {
      "product_name": "Full product name with model",
      "device_type": "smartphone, laptop, tablet, charger, battery, monitor, printer, keyboard, mouse, cable, headphones, router, car, bike, tv, camera, gaming, drone, appliance, other",
      "brand": "Exact brand name",
      "condition": "working, partially_working, non_working, damaged",
      "estimated_value_inr": Current resale/recycling value in INR (number),
      "weight_kg": Estimated weight in kg (number),
      "quantity": How many detected (number),
      "materials": [
        {
          "name": "Material name (Copper, Gold, Silver, Palladium, Aluminum, Lithium, Cobalt, Plastic, Glass, Steel, Circuit Board)",
          "percentage": Percentage in the device (number),
          "value_per_kg_inr": Value per kg in INR (number)
        }
      ]
    }
  ]
}

IMPORTANT: 
- Return ONLY valid JSON, no explanations
- Search internet for accurate current pricing in India
- If image is not e-waste, return empty items array
- Include all detected items`;

router.post('/search-internet', async (req, res) => {
  try {
    const { imageUrls, query } = req.body;
    
    if (!base44ApiKey || !base44AppId) {
      return res.status(500).json({ error: 'Base44 credentials not configured' });
    }

    const searchQuery = query || 'What is in this image? Provide product details, price in INR, and materials.';
    
    const requestBody = {
      prompt: PROMPT + '\n\nUser query: ' + searchQuery,
      file_urls: imageUrls || [],
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                product_name: { type: "string" },
                device_type: { type: "string" },
                brand: { type: "string" },
                condition: { type: "string" },
                estimated_value_inr: { type: "number" },
                weight_kg: { type: "number" },
                quantity: { type: "number" },
                materials: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      percentage: { type: "number" },
                      value_per_kg_inr: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const response = await fetch(`https://app.base44.com/api/integrations/core/invoke_llm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': base44ApiKey,
        'x-app-id': base44AppId
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Base44 API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      results: result.items || [],
      source: 'base44-internet'
    });

  } catch (error) {
    console.error('Base44 API Error:', error.message);
    res.status(500).json({ 
      error: error.message,
      fallback: true 
    });
  }
});

module.exports = router;

    res.json({
      success: true,
      results: result.items || [],
      source: 'base44-internet'
    });

  } catch (error) {
    console.error('Base44 API Error:', error.message);
    res.status(500).json({ 
      error: error.message,
      fallback: true 
    });
  }
});

module.exports = router;
