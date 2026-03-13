# CircularX Platform - Technical Specification

## 1. Project Overview

**Project Name:** CircularX - E-Waste Management Platform  
**Type:** Full-stack Web Application (React + Node.js)  
**Core Functionality:** AI-powered e-waste recognition, smart pickup scheduling, and marketplace for recycled electronics  
**Target Users:** Households, bulk e-waste producers, recycling hubs, bulk buyers

---

## 2. UI/UX Specification

### Layout Structure

**Navigation:** Fixed top navbar with logo, module tabs, and user menu  
**Page Sections:** Hero banner → Main content area → Footer  
**Responsive Breakpoints:** Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

### Visual Design

**Color Palette:**
- Primary: `#0D4F4F` (Deep Teal - sustainability theme)
- Secondary: `#F5A623` (Amber - value/highlight)
- Accent: `#2ECC71` (Green - eco-friendly)
- Background: `#FAFBFC` (Light gray)
- Dark Background: `#1A1A2E` (Dark navy)
- Text Primary: `#2C3E50`
- Text Light: `#FFFFFF`
- Border: `#E1E8ED`
- Error: `#E74C3C`
- Success: `#27AE60`

**Typography:**
- Headings: "Sora", sans-serif (weights: 600, 700)
- Body: "DM Sans", sans-serif (weights: 400, 500)
- Monospace: "JetBrains Mono" (for values/numbers)

**Font Sizes:**
- H1: 2.5rem
- H2: 2rem
- H3: 1.5rem
- Body: 1rem
- Small: 0.875rem

**Spacing System:** 4px base unit (4, 8, 12, 16, 24, 32, 48, 64)

**Visual Effects:**
- Card shadows: `0 4px 20px rgba(13, 79, 79, 0.08)`
- Hover lift: `translateY(-4px)` with shadow increase
- Border radius: 12px (cards), 8px (buttons), 50% (avatars)
- Transitions: 0.3s ease for all interactive elements

### Components

**1. Navigation Bar**
- Logo (left), Module tabs (center), User avatar dropdown (right)
- Active tab: underline with primary color
- Mobile: hamburger menu

**2. Upload Zone**
- Dashed border, drag-and-drop area
- Accepted: .jpg, .png, .csv
- States: default, hover (border solid), processing (spinner)

**3. Device Card**
- Image thumbnail, device name, condition badge
- Material breakdown (gold, silver, copper, etc.)
- Estimated value with currency
- "Schedule Pickup" CTA button

**4. Calendar Scheduler**
- Month view grid with available dates highlighted
- Time slot selector (morning/afternoon)
- Location dropdown with map preview
- QR code display after confirmation

**5. Dashboard Cards**
- Metric value (large number)
- Label and trend indicator
- Icon representation

**6. Inventory Table**
- Sortable columns
- Status badges (Available, Sold, In-Transit)
- Action buttons

**7. Marketplace Grid**
- Product cards with image, price, quantity
- Bulk buyer quantity selector
- "Request Purchase" modal

---

## 3. Functionality Specification

### Module 1: AI E-Waste Recognition + Valuation

**Features:**
- Image upload (drag-drop or file picker)
- CSV batch upload for bulk items
- AI-powered device type detection (mock ML model)
- Material composition prediction (gold, silver, copper, plastic, etc.)
- Market value estimation based on material + condition
- Bulk valuation summary for multiple items

**User Flow:**
1. User uploads image(s) or CSV file
2. System processes and displays detected items
3. Each item shows: device type, condition, materials, estimated value
4. User can add items to pickup queue
5. Bulk users see total estimated value

**Mock AI Response Data:**
- Device types: Smartphone, Laptop, Tablet, Charger, Battery, Monitor, Smartwatch
- Conditions: Excellent, Good, Fair, Damaged
- Materials: Gold (g), Silver (g), Copper (g), Aluminum (g), Plastic (g), Battery (unit)

### Module 2: Smart Pickup & Drop Scheduler

**Features:**
- Doorstep pickup or hub drop-off selection
- Interactive calendar for date selection
- Time slot selection (9AM-12PM, 2PM-5PM)
- Location search with map integration
- QR code generation for hub check-in
- Confirmation email/SMS (mock)

**User Flow:**
1. User selects pickup type (doorstep/hub)
2. User selects date from calendar
3. User selects time slot
4. User enters/confirms location address
5. System generates booking confirmation + QR code
6. For hub: QR code for faster check-in

**Mock Data:**
- Hub locations: 5 predefined partner hubs
- Available slots: weekdays, 2 slots per day

### Module 3: Marketplace & Inventory Dashboard

**Features:**
- Admin dashboard with key metrics
- Inventory table with sorting/filtering
- Item categorization (phones, chargers, batteries, etc.)
- Material recovery tracking
- Available stock display for bulk buyers
- Purchase request workflow

**Dashboard Metrics:**
- Total items collected
- Material recovered (kg)
- Items available for sale
- Revenue generated

**Inventory Fields:**
- Item ID, Type, Condition, Weight, Materials, Status, Price

---

## 4. API Endpoints

### Backend (Express.js)

```
POST /api/ai/recognize - Image/CSV upload for AI recognition
POST /api/ai/batch-recognize - Batch CSV processing
GET /api/devices - List all recognized devices
POST /api/schedule/create - Create pickup/drop booking
GET /api/schedule/bookings - Get user bookings
GET /api/hubs - Get partner hub locations
GET /api/inventory - Get inventory items
POST /api/inventory/add - Add item to inventory
PUT /api/inventory/:id - Update item status
GET /api/dashboard/metrics - Get dashboard metrics
POST /api/marketplace/request - Request purchase
```

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Navigation is fixed, responsive, and highlights active module
- [ ] Upload zone accepts drag-drop and shows processing state
- [ ] Device cards display all required information
- [ ] Calendar shows available dates and allows selection
- [ ] Dashboard displays 4 key metrics with icons
- [ ] Inventory table is sortable and shows status badges

### Functional Checkpoints
- [ ] Image upload triggers AI recognition and returns mock results
- [ ] CSV upload processes and returns multiple items
- [ ] Scheduling flow completes with confirmation
- [ ] QR code generates for hub bookings
- [ ] Inventory can be filtered by status
- [ ] Marketplace shows available items

---

## 6. Project Structure

```
/hackathon
├── server/
│   ├── index.js          # Express server entry
│   ├── routes/
│   │   ├── ai.js         # AI recognition endpoints
│   │   ├── schedule.js   # Scheduling endpoints
│   │   ├── inventory.js  # Inventory endpoints
│   │   └── marketplace.js # Marketplace endpoints
│   ├── data/
│   │   └── mockData.js   # Mock data for AI, inventory
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```
