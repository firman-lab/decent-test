# monis.rent - Interactive Workspace Builder

A modern, interactive workspace builder for monis.rent - helping digital nomads and startups in Bali design and rent their perfect office setup.

## 🎯 Features

- **🎨 Visual Workspace Designer** - Drag and drop items to create your perfect setup
- **💰 Real-time Pricing** - See costs update instantly as you add items
- **📦 Product Categories** - Desks, chairs, monitors, accessories, and more
- **✨ Preset Templates** - Quick-start with pre-configured setups
- **🎭 Smooth Animations** - Powered by Framer Motion for delightful UX
- **📱 Responsive Design** - Works beautifully on all devices
- **🎯 Smart Rules** - Only 1 desk allowed, multiple monitors supported

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 How to Use

1. **Browse Items** - Explore products in the left sidebar, organized by category
2. **Drag to Canvas** - Drag items from sidebar onto the workspace canvas
3. **Arrange Setup** - Move items around to design your perfect layout
4. **View Pricing** - Watch the price update in real-time on the right panel
5. **Quick Start** - Use preset templates for instant workspace setups
6. **Rent Setup** - Click "Rent Your Setup" to review and confirm

### Features & Rules

- ✅ Add multiple monitors
- ⚠️ Only 1 desk allowed (adding new desk replaces existing)
- 🗑️ Click the X on items to remove them
- 🎯 Drag items on canvas to reposition
- 🧹 Use "Clear All" to start fresh

## 📁 Project Structure

```
decent-test/
├── app/                     # Next.js app directory
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── workspace-builder.tsx
│   ├── sidebar.tsx
│   ├── workspace-canvas.tsx
│   ├── price-summary.tsx
│   └── rent-modal.tsx
├── data/                   # Mock data
│   └── products.ts
├── store/                  # State management
│   └── workspace-store.ts
└── lib/                    # Utilities
    └── utils.ts
```

## 📦 Product Categories

- **Desks** - Standing desks, L-desks, compact workspaces
- **Chairs** - Ergonomic, gaming, mesh back chairs
- **Monitors** - 4K, ultrawide, Full HD displays
- **Accessories** - Lamps, plants, drawers, organizers
- **Coffee Station** - Coffee machines, mini fridges
- **Outdoor Gear** - Surfboards, bicycles
- **Relax Zone** - Bean bags, floor cushions
- **Garage Space** - Tool shelves, motorcycle gear

## 🔧 Customization

### Adding New Products

Edit `data/products.ts`:

```typescript
{
  id: "unique-id",
  name: "Product Name",
  category: "desk" | "chair" | "monitor" | "accessory",
  pricePerMonth: 50,
  image: "🎨",
  description: "Product description"
}
```

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Save workspace to account
- [ ] Payment processing
- [ ] Share workspace links
- [ ] Item rotation and resizing

## 📝 Notes

This is a **frontend-focused MVP** with:
- ✅ Full UI/UX implementation
- ✅ Mock product data
- ✅ No database (data in memory)
- ✅ Console logging for checkout

---

**Built with ❤️ for digital nomads in Bali**

