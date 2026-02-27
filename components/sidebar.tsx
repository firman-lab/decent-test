'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Image from 'next/image';
import { products, categoryLabels, ProductCategory, Product } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspace-store';
import { DeskSelector } from './desk-selector';
import { Button } from './ui/button';

const categoryOrder: ProductCategory[] = ['monitor', 'chair', 'lamp', 'plant', 'accessory'];

export function Sidebar() {
  const { selectedDesk, addItem } = useWorkspaceStore();
  const [expandedCategories, setExpandedCategories] = useState<Set<ProductCategory>>(
    new Set(['monitor', 'chair', 'lamp'])
  );

  const toggleCategory = (category: ProductCategory) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const productsByCategory = categoryOrder.map((category) => ({
    category,
    label: categoryLabels[category],
    items: products.filter((p) => p.category === category),
  }));

  const handleAddItem = (product: Product) => {
    if (!selectedDesk) {
      alert('Please select a desk first!');
      return;
    }
    // Add item to center of canvas
    addItem(product, { x: 250, y: 200 });
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 border-r border-zinc-200">
      <div className="p-6 border-b border-zinc-200 bg-white">
        <h2 className="text-xl font-bold text-zinc-900">Build Your Setup</h2>
        <p className="text-sm text-zinc-500 mt-1">Design your perfect workspace</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Desk Selector */}
        <DeskSelector />

        {/* Divider */}
        <div className="border-t border-zinc-300 pt-4">
          <h3 className="text-sm font-semibold text-zinc-700 mb-3">Add Items</h3>
        </div>

        {/* Product Categories */}
        {productsByCategory.map(({ category, label, items }) => {
          const isExpanded = expandedCategories.has(category);

          return (
            <div key={category} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-zinc-50 transition-colors"
              >
                <span className="font-semibold text-sm text-zinc-900">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 pt-0 space-y-2 bg-zinc-50">
                  {items.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-zinc-900 truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-500 truncate">{product.description}</p>
                          <p className="text-sm font-semibold text-zinc-900 mt-1">
                            ${product.pricePerMonth}
                            <span className="text-xs font-normal text-zinc-500">/mo</span>
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddItem(product)}
                        disabled={!selectedDesk}
                        size="sm"
                        className="w-full mt-2"
                        variant={selectedDesk ? 'default' : 'outline'}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add to Workspace
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-200 bg-white">
        <div className="text-xs text-zinc-500 space-y-1">
          <p><span className="font-medium">Tip:</span> Click items to add them</p>
          <p><span className="font-medium">Drag:</span> Move items around</p>
          <p><span className="font-medium">Resize:</span> Drag corners/edges</p>
        </div>
      </div>
    </div>
  );
}
