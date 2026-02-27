export type ProductCategory = "monitor" | "chair" | "lamp" | "plant" | "accessory";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  pricePerMonth: number;
  image: string;
  description?: string;
  defaultWidth: number;
  defaultHeight: number;
}

export interface Desk {
  id: string;
  name: string;
  pricePerMonth: number;
  backgroundImage: string;
  thumbnail: string;
  description?: string;
  style: "modern" | "industrial";
}

// Desk backgrounds (these become canvas backgrounds)
export const desks: Desk[] = [
  {
    id: "desk-1",
    name: "Minimal Modern Desk",
    pricePerMonth: 45,
    backgroundImage: "/product/desk1.png",
    thumbnail: "/product/desk1.png",
    description: "Clean white standing desk with modern aesthetic",
    style: "modern"
  },
  {
    id: "desk-2",
    name: "Industrial Desk",
    pricePerMonth: 35,
    backgroundImage: "/product/desk2.png",
    thumbnail: "/product/desk2.png",
    description: "Rustic wooden desk with brick wall background",
    style: "industrial"
  },
];

// Products that can be placed on desks
export const products: Product[] = [
  // Monitors
  {
    id: "monitor-1",
    name: "27\" 4K Display",
    category: "monitor",
    pricePerMonth: 38,
    image: "/product/monitor1.png",
    description: "Ultra HD workspace",
    defaultWidth: 180,
    defaultHeight: 120,
  },
  {
    id: "monitor-2",
    name: "34\" Ultrawide",
    category: "monitor",
    pricePerMonth: 52,
    image: "/product/monitor2.png",
    description: "Immersive wide screen",
    defaultWidth: 220,
    defaultHeight: 130,
  },
  {
    id: "monitor-3",
    name: "24\" Full HD",
    category: "monitor",
    pricePerMonth: 25,
    image: "/product/monitor3.png",
    description: "Essential display",
    defaultWidth: 160,
    defaultHeight: 100,
  },

   // chairs
  {
    id: "chair-1",
    name: "Chair Mat",
    category: "chair",
    pricePerMonth: 30,
    image: "/product/chair1.png",
    description: "Keep things tidy",
    defaultWidth: 150,
    defaultHeight: 120,
  },
  {
    id: "chair-2",
    name: "Chair Holder Set",
    category: "chair",
    pricePerMonth: 18,
    image: "/product/chair2.png",
    description: "Enjoy your sitting",
    defaultWidth: 180,
    defaultHeight: 140,
  },
  
  // Lamps
  {
    id: "lamp-1",
    name: "Desk Lamp Pro",
    category: "lamp",
    pricePerMonth: 5,
    image: "/product/lamp1.png",
    description: "Adjustable LED light",
    defaultWidth: 80,
    defaultHeight: 100,
  },
  {
    id: "lamp-2",
    name: "Modern Task Light",
    category: "lamp",
    pricePerMonth: 15,
    image: "/product/lamp2.png",
    description: "Sleek minimalist lamp",
    defaultWidth: 70,
    defaultHeight: 90,
  },
  
  // Plants
  {
    id: "plant-1",
    name: "Potted Succulent",
    category: "plant",
    pricePerMonth: 8,
    image: "/product/plant1.png",
    description: "Low maintenance greenery",
    defaultWidth: 60,
    defaultHeight: 70,
  },
  {
    id: "plant-2",
    name: "Desk Palm",
    category: "plant",
    pricePerMonth: 12,
    image: "/product/plant2.png",
    description: "Adds life to workspace",
    defaultWidth: 70,
    defaultHeight: 90,
  },
  
  // Accessories
//   {
//     id: "accessory-1",
//     name: "Desk Organizer",
//     category: "accessory",
//     pricePerMonth: 6,
//     image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop",
//     description: "Keep things tidy",
//     defaultWidth: 90,
//     defaultHeight: 60,
//   },
//   {
//     id: "accessory-2",
//     name: "Pen Holder Set",
//     category: "accessory",
//     pricePerMonth: 5,
//     image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop",
//     description: "Organize your tools",
//     defaultWidth: 50,
//     defaultHeight: 60,
//   },
];

export const categoryLabels: Record<ProductCategory, string> = {
  monitor: "Monitors",
  chair: "Chairs",
  lamp: "Lamps",
  plant: "Plants",
  accessory: "Accessories",
};

export const presetTemplates = [
  {
    id: "minimal-developer",
    name: "Minimal Developer",
    description: "Essential setup for focused coding",
    deskId: "desk-1",
    items: ["monitor-1", "lamp-1", "plant-1"],
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    description: "Inspiring workspace for creatives",
    deskId: "desk-2",
    items: ["monitor-2", "lamp-2", "plant-2", "accessory-1"],
  },
];

