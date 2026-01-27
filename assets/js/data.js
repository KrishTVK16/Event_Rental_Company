window.ER = window.ER || {};

ER.inventory = [
  { id: "chairs-banquet", name: "Banquet Chairs", category: "Seating", stock: 500, priceType: "per_day", price: 1.5, unit: "pc" },
  { id: "tables-round", name: "Round Tables (60\")", category: "Tables", stock: 120, priceType: "per_day", price: 8, unit: "pc" },
  { id: "linens-white", name: "White Linens", category: "Linens", stock: 300, priceType: "per_day", price: 2.25, unit: "pc" },
  { id: "led-wall", name: "LED Wall (12x7)", category: "AV", stock: 6, priceType: "per_event", price: 450, unit: "set" },
  { id: "pa-system", name: "PA Sound System", category: "AV", stock: 10, priceType: "per_event", price: 180, unit: "set" },
  { id: "stage-20x16", name: "Stage (20x16)", category: "Stages", stock: 4, priceType: "per_event", price: 320, unit: "set" },
  { id: "tent-20x40", name: "Tent (20x40)", category: "Tents", stock: 5, priceType: "per_day", price: 220, unit: "set" },
  { id: "uplights", name: "LED Uplights", category: "Lighting", stock: 60, priceType: "per_event", price: 6, unit: "pc" }
];

ER.categories = ["All", ...Array.from(new Set(ER.inventory.map(x => x.category)))];

// Booked quantities per date (YYYY-MM-DD)
ER.bookings = {
  "2026-02-12": { "chairs-banquet": 300, "tables-round": 40, "linens-white": 120 },
  "2026-03-01": { "led-wall": 2, "pa-system": 3, "uplights": 18 },
  "2026-03-14": { "tent-20x40": 2, "chairs-banquet": 160, "stage-20x16": 1 }
};

ER.maintenance = {
  // Example: temporarily unavailable due to maintenance
  "chairs-banquet": 0,
  "led-wall": 1
};

ER.currency = "USD";
ER.taxRate = 0.08; // 8%
