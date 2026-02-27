import { create } from 'zustand';
import { Product, products, Desk, desks } from '@/data/products';

export interface PlacedItem {
  id: string;
  productId: string;
  product: Product;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface WorkspaceStore {
  selectedDesk: Desk | null;
  placedItems: PlacedItem[];
  
  // Desk actions
  selectDesk: (desk: Desk) => void;
  
  // Item actions
  addItem: (product: Product, position?: { x: number; y: number }) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<PlacedItem>) => void;
  bringToFront: (id: string) => void;
  
  // Utility actions
  clearItems: () => void;
  loadPreset: (deskId: string, itemIds: string[]) => void;
  
  // Computed values
  getTotalPrice: () => { monthly: number; quarterly: number };
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  selectedDesk: null,
  placedItems: [],

  selectDesk: (desk) => {
    set({ selectedDesk: desk });
  },

  addItem: (product, position) => {
    set((state) => {
      const maxZIndex = state.placedItems.length > 0 
        ? Math.max(...state.placedItems.map(item => item.zIndex))
        : 0;

      const newItem: PlacedItem = {
        id: `item-${Date.now()}-${Math.random()}`,
        productId: product.id,
        product,
        x: position?.x ?? 100,
        y: position?.y ?? 100,
        width: product.defaultWidth,
        height: product.defaultHeight,
        zIndex: maxZIndex + 1,
      };

      return {
        placedItems: [...state.placedItems, newItem],
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      placedItems: state.placedItems.filter((item) => item.id !== id),
    }));
  },

  updateItem: (id, updates) => {
    set((state) => ({
      placedItems: state.placedItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  bringToFront: (id) => {
    set((state) => {
      const maxZIndex = Math.max(...state.placedItems.map(item => item.zIndex));
      return {
        placedItems: state.placedItems.map((item) =>
          item.id === id ? { ...item, zIndex: maxZIndex + 1 } : item
        ),
      };
    });
  },

  clearItems: () => {
    set({ placedItems: [] });
  },

  loadPreset: (deskId, itemIds) => {
    const desk = desks.find((d) => d.id === deskId);
    if (!desk) return;

    set(() => {
      const presetItems: PlacedItem[] = itemIds
        .map((productId, index) => {
          const product = products.find((p) => p.id === productId);
          if (!product) return null;

          return {
            id: `item-${Date.now()}-${index}`,
            productId: product.id,
            product,
            x: 150 + (index * 100) % 500,
            y: 150 + Math.floor(index / 3) * 150,
            width: product.defaultWidth,
            height: product.defaultHeight,
            zIndex: index + 1,
          };
        })
        .filter((item): item is PlacedItem => item !== null);

      return { 
        selectedDesk: desk,
        placedItems: presetItems 
      };
    });
  },

  getTotalPrice: () => {
    const { selectedDesk, placedItems } = get();
    const deskPrice = selectedDesk?.pricePerMonth ?? 0;
    const itemsPrice = placedItems.reduce((sum, item) => sum + item.product.pricePerMonth, 0);
    const monthly = deskPrice + itemsPrice;
    
    return {
      monthly,
      quarterly: monthly * 3,
    };
  },
}));
