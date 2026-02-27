# Component Architecture

## 🏗️ Component Hierarchy

```
WorkspaceBuilder (Main Container)
├── DndContext (Drag & Drop Provider)
│   ├── Header
│   │   ├── Logo & Title
│   │   └── Clear All Button
│   │
│   ├── Sidebar (Product Catalog)
│   │   └── Category Sections
│   │       └── DraggableProduct (Each Product)
│   │
│   ├── Main Canvas Area
│   │   ├── PresetTemplates
│   │   └── WorkspaceCanvas (Drop Zone)
│   │       └── CanvasItemComponent (Dropped Items)
│   │
│   ├── PriceSummary (Right Panel)
│   │   ├── Price Display
│   │   ├── Items List
│   │   └── Rent Button
│   │
│   └── DragOverlay (Floating Preview)
│
└── RentModal (Checkout Dialog)
    ├── Items Summary
    ├── Pricing Breakdown
    ├── Rental Details
    └── Action Buttons
```

## 📦 Component Descriptions

### `workspace-builder.tsx`
**Purpose**: Main orchestrator component that manages drag & drop context

**Responsibilities**:
- Initialize DnD context and sensors
- Handle drag start/end events
- Coordinate between all child components
- Manage rental modal state

**Key Functions**:
- `handleDragStart()` - Captures dragged item
- `handleDragEnd()` - Processes drop location and updates store

**State**:
- `activeProduct` - Currently dragged product
- `isRentModalOpen` - Modal visibility

---

### `sidebar.tsx`
**Purpose**: Product catalog with collapsible categories

**Features**:
- Expandable/collapsible category sections
- Category item counts
- Helpful tips at bottom

**State**:
- `expandedCategories` - Set of open categories (default: desk, chair, monitor, accessory)

**Props**: None (uses global product data)

---

### `draggable-product.tsx`
**Purpose**: Individual product card in sidebar (draggable source)

**Features**:
- Drag indicator cursor
- Hover animation
- Product info display (image, name, description, price)
- Visual feedback when dragging

**Props**:
- `product: Product` - Product data
- `className?: string` - Optional styling

**Hooks**:
- `useDraggable()` - DnD kit hook for drag source

---

### `workspace-canvas.tsx`
**Purpose**: Main drop zone where users build their workspace

**Features**:
- Drop indicator overlay
- Empty state with instructions
- Background grid pattern
- Visual feedback on hover

**Hooks**:
- `useDroppable()` - DnD kit hook for drop target
- `useWorkspaceStore()` - Access canvas items and actions

**State**: None (uses Zustand store)

---

### `canvas-item.tsx`
**Purpose**: Individual item placed on canvas (draggable for repositioning)

**Features**:
- Repositionable on canvas
- Remove button (shows on hover)
- Scale animation on hover
- Entrance/exit animations

**Props**:
- `item: CanvasItem` - Canvas item with position
- `onRemove: (id: string) => void` - Removal callback

**Hooks**:
- `useDraggable()` - DnD kit hook for drag source

---

### `price-summary.tsx`
**Purpose**: Real-time pricing display and rent button

**Features**:
- Animated price updates
- Monthly and quarterly totals
- Item count
- Scrollable items list
- Rent button (disabled when empty)

**Props**:
- `onRentClick: () => void` - Callback for rent button

**State**: None (uses Zustand store)

**Computed Values**:
- `monthly` - Sum of all item prices
- `quarterly` - Monthly × 3

---

### `preset-templates.tsx`
**Purpose**: Quick-start template cards

**Features**:
- 3 preset templates (Minimal Developer, Startup Team, Creative Studio)
- One-click load
- Shows item count
- Hover effects

**Actions**:
- Loads preset items into canvas with auto-positioning

**Data Source**: `presetTemplates` from `data/products.ts`

---

### `rent-modal.tsx`
**Purpose**: Checkout/confirmation modal

**Features**:
- Items summary with images
- Pricing breakdown
- Rental details (location, delivery, payment)
- Terms and conditions
- Confirm/cancel actions

**Props**:
- `open: boolean` - Modal visibility
- `onOpenChange: (open: boolean) => void` - Toggle callback

**Actions**:
- `handleConfirmRental()` - Logs order and shows alert (MVP only)

---

## 🗄️ State Management

### Zustand Store (`workspace-store.ts`)

**State**:
```typescript
{
  canvasItems: CanvasItem[]  // Items on canvas
}
```

**Actions**:
- `addItem(product, position)` - Add item to canvas
  - Special rule: Only 1 desk allowed (replaces existing)
- `removeItem(id)` - Remove item from canvas
- `updateItemPosition(id, position)` - Move item on canvas
- `clearCanvas()` - Remove all items
- `loadPreset(itemIds)` - Load preset template
- `getTotalPrice()` - Calculate pricing

**Design Decisions**:
- Single source of truth for canvas state
- Immutable updates (create new arrays)
- Computed values via getters
- No persistence (MVP - resets on refresh)

---

## 🎨 UI Components (shadcn/ui)

### `button.tsx`
Customizable button component with variants:
- `default` - Primary style
- `outline` - Bordered
- `ghost` - Transparent
- `secondary` - Muted
- `destructive` - Red/warning

Sizes: `sm`, `default`, `lg`, `icon`

### `dialog.tsx`
Modal dialog with:
- Backdrop overlay
- Close button
- Header/footer sections
- Scrollable content
- Animations

---

## 🎭 Animations (Framer Motion)

### Entry Animations
- Canvas items: Scale from 0 + fade in
- Preset cards: Staggered delay
- Price changes: Slide up/down

### Hover Effects
- Scale 1.05 on products
- Opacity changes
- Shadow transitions

### Exit Animations
- Scale to 0 + fade out
- Remove from DOM after animation

---

## 🔌 Data Flow

### Adding Item to Canvas
```
1. User drags item from Sidebar
   ↓
2. handleDragStart captures product
   ↓
3. User drops on Canvas
   ↓
4. handleDragEnd calculates position
   ↓
5. store.addItem() updates state
   ↓
6. Canvas re-renders with new item
   ↓
7. PriceSummary updates automatically
```

### Removing Item
```
1. User clicks X on canvas item
   ↓
2. onRemove callback triggered
   ↓
3. store.removeItem() updates state
   ↓
4. Exit animation plays
   ↓
5. Item removed from canvas
   ↓
6. PriceSummary updates
```

### Loading Preset
```
1. User clicks "Load Setup" on template
   ↓
2. store.loadPreset(itemIds)
   ↓
3. Clear existing items
   ↓
4. Add all preset items with positions
   ↓
5. Canvas updates with new items
   ↓
6. PriceSummary shows new total
```

---

## 🎯 Key Design Patterns

### 1. Composition
Components are highly composable and reusable:
- UI components (Button, Dialog) used everywhere
- DraggableProduct works in any context
- CanvasItem is self-contained

### 2. Single Responsibility
Each component has one main job:
- Sidebar = show products
- Canvas = receive drops
- PriceSummary = show pricing

### 3. Props Over Context
Minimal prop drilling:
- Callbacks passed directly
- Store accessed via hooks
- No unnecessary context providers

### 4. Optimistic UI
Changes appear instantly:
- No loading states for local operations
- Animations provide feedback
- Store updates are synchronous

### 5. Type Safety
Full TypeScript coverage:
- Product types defined
- Store typed
- Component props typed
- Event handlers typed

---

## 📐 Layout Structure

### Responsive Breakpoints
- Sidebar: Fixed 320px (80 units)
- Canvas: Flexible (flex-1)
- Right panel: Fixed 384px (96 units)
- Mobile: Stack vertically (future enhancement)

### Z-Index Layers
```
Header:            z-10
Canvas Items:      z-0 (default)
Dragging Item:     z-50
Drop Indicator:    z-0 (default)
Modal Backdrop:    z-50
Modal Content:     z-50
```

### Spacing Scale
- Component padding: 16-24px
- Item gaps: 8-16px
- Section spacing: 24px
- Page margins: 24px

---

## 🔧 Extension Points

### Adding New Product Category
1. Add to `ProductCategory` type in `data/products.ts`
2. Add label to `categoryLabels`
3. Add products with new category
4. Sidebar automatically includes it

### Custom Drag Constraints
Modify `handleDragEnd` in workspace-builder.tsx:
```typescript
// Add boundaries, snapping, collision detection, etc.
```

### Custom Pricing Logic
Update `getTotalPrice` in workspace-store.ts:
```typescript
// Add discounts, minimum fees, delivery costs, etc.
```

### Persistence
Add to workspace-store.ts:
```typescript
// localStorage sync
// API calls
// Database operations
```

---

## 🐛 Error Handling

### Current Approach
- TypeScript prevents type errors
- Null checks on DOM elements
- Optional chaining on data access
- Console errors in dev mode

### Future Enhancements
- Error boundaries for component crashes
- Toast notifications for user errors
- Sentry integration for tracking
- Graceful degradation for missing data

---

## 🚀 Performance Considerations

### Current Optimizations
- Zustand for efficient re-renders
- Framer Motion uses GPU acceleration
- CSS transitions over JS animations
- Lazy loading (none needed yet)

### Future Optimizations
- Virtual scrolling for large product lists
- Memoization for expensive calculations
- Code splitting by route
- Image optimization (when using real images)

---

## 📚 Dependencies Reference

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.6 | Framework |
| react | 19.2.3 | UI library |
| zustand | 5.0.11 | State management |
| @dnd-kit/* | 6.3.1+ | Drag & drop |
| framer-motion | 12.34.3 | Animations |
| tailwindcss | 4 | Styling |
| lucide-react | 0.575.0 | Icons |
| @radix-ui/* | Latest | UI primitives |

---

**For detailed implementation, refer to the actual component files.**
