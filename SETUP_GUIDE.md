# Quick Setup Guide - monis.rent Workspace Builder

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

## ✅ What Works Now

- ✅ Drag and drop workspace builder
- ✅ Real-time pricing calculations
- ✅ Product catalog with 8 categories
- ✅ Preset templates (Minimal Developer, Startup Team, Creative Studio)
- ✅ Smooth animations and transitions
- ✅ Responsive layout
- ✅ Rent confirmation modal

## 🎯 How to Test

1. **Drag Items**: Click and drag any item from the left sidebar onto the canvas
2. **Move Items**: Drag items around on the canvas to reposition
3. **Remove Items**: Hover over items and click the red X button
4. **Try Presets**: Click "Load Setup" on any preset template
5. **Check Pricing**: Watch the right panel update in real-time
6. **Rent Setup**: Click "Rent Your Setup" button to see the confirmation modal

## 📝 Key Features to Showcase

### Smart Rules
- **Only 1 desk allowed**: Adding a new desk automatically replaces the existing one
- **Multiple monitors OK**: Add as many monitors as needed
- **Live pricing**: Prices update instantly as you add/remove items

### User Experience
- Smooth drag and drop with visual feedback
- Drop indicator when hovering over canvas
- Animated item additions and removals
- Empty state with helpful instructions
- Hover effects on all interactive elements

### Product Categories
- 🪑 **Desks** (3 items): $35-65/month
- 💺 **Chairs** (3 items): $28-42/month
- 🖥️ **Monitors** (3 items): $25-52/month
- 💡 **Accessories** (4 items): $6-22/month
- ☕ **Coffee Station** (2 items): $28-32/month
- 🏄 **Outdoor Gear** (2 items): $35-42/month
- 🛋️ **Relax Zone** (2 items): $12-18/month
- 🔧 **Garage Space** (2 items): $15-45/month

## 🎨 Design Highlights

- **Color Scheme**: Blue/purple gradients with zinc neutrals
- **Typography**: Geist Sans font family
- **Spacing**: Generous padding with rounded corners
- **Shadows**: Layered shadows for depth
- **Animations**: Framer Motion for smooth transitions

## 🔍 Where to Look

### Main Files
- `components/workspace-builder.tsx` - Main orchestrator with DnD context
- `components/workspace-canvas.tsx` - Drop zone for items
- `components/sidebar.tsx` - Product catalog
- `components/price-summary.tsx` - Pricing panel
- `components/rent-modal.tsx` - Checkout modal
- `store/workspace-store.ts` - Zustand state management
- `data/products.ts` - Mock product data (easily editable)

## 🐛 Troubleshooting

### Canvas not showing?
- Check console for errors
- Verify all dependencies installed: `pnpm install`

### Drag not working?
- Clear browser cache
- Try different browser
- Check console for errors

### Items overlapping?
- This is by design - items can be freely positioned
- Drag items to rearrange

### Price not updating?
- Check browser console for errors
- Refresh the page

## 🎯 Next Steps (Post-MVP)

### Phase 1: Backend
- [ ] Set up API endpoints for products
- [ ] Database schema for products and rentals
- [ ] User authentication

### Phase 2: Features
- [ ] Save workspace to account
- [ ] Share workspace via link
- [ ] Generate workspace screenshot
- [ ] Email confirmation

### Phase 3: Polish
- [ ] Item rotation/resizing
- [ ] Snap-to-grid alignment
- [ ] Undo/redo functionality
- [ ] Mobile touch optimization

## 💡 Tips for Demo

1. **Start with a preset** - Show how quick it is to get started
2. **Add custom items** - Demonstrate drag and drop
3. **Show the rules** - Try adding two desks to show replacement
4. **Highlight pricing** - Point out the live updates
5. **Complete rental** - Go through the full flow

## 📊 Sample Workspace Scenarios

### Developer Setup
- Minimal Standing Desk ($45)
- Ergonomic Chair ($35)
- 27" 4K Display ($38)
- Desk Lamp ($12)
- **Total: $130/month**

### Startup Team
- Executive L-Desk ($65)
- Gaming Chair Pro ($42)
- 34" Ultrawide ($52)
- Coffee Machine ($28)
- Bean Bag ($18)
- **Total: $205/month**

### Creative Studio
- Minimal Standing Desk ($45)
- Gaming Chair Pro ($42)
- 34" Ultrawide ($52)
- Desk Lamp ($12)
- Potted Plant ($8)
- Floor Cushion ($12)
- **Total: $171/month**

## 🚀 Production Checklist

Before deploying to production:
- [ ] Set up proper API endpoints
- [ ] Add authentication
- [ ] Integrate payment gateway
- [ ] Add analytics tracking
- [ ] Set up error monitoring (Sentry)
- [ ] Configure SEO meta tags
- [ ] Add sitemap
- [ ] Set up CDN for assets
- [ ] Configure caching
- [ ] Add rate limiting

---

**Questions? Issues?**
Check the main README.md or review the component files.
