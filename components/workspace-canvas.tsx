'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import Image from 'next/image';
import { useWorkspaceStore } from '@/store/workspace-store';
import { DraggableResizableItem } from './draggable-resizable-item';
import { cn } from '@/lib/utils';

export function WorkspaceCanvas() {
  const { selectedDesk, placedItems, updateItem, removeItem, bringToFront } = useWorkspaceStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasBounds, setCanvasBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasBounds({ width: rect.width, height: rect.height });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Show empty state if no desk selected
  if (!selectedDesk) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl border-2 border-dashed border-zinc-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-md px-8"
        >
          <div className="text-8xl mb-4 opacity-20">🪑</div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">
            Select a Desk to Start
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Choose a desk style from the sidebar to begin building your perfect workspace.
            <br />
            <span className="font-medium text-zinc-700">Your journey starts here!</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative w-full h-full overflow-hidden rounded-2xl shadow-2xl',
        'border-2 border-zinc-200'
      )}
    >
      {/* Desk Background Image */}
      <div className="absolute inset-0">
        <Image
          src={selectedDesk.backgroundImage}
          alt={selectedDesk.name}
          fill
          className="object-cover"
          sizes="(max-width: 1400px) 100vw, 1400px"
          priority
        />
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Desk Info Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-zinc-200 z-10"
      >
        <p className="text-xs text-zinc-500">Current Desk</p>
        <p className="font-semibold text-zinc-900">{selectedDesk.name}</p>
      </motion.div>

      {/* Items Layer Info */}
      {placedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-zinc-200 z-10 flex items-center gap-2"
        >
          <Layers className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-zinc-900">{placedItems.length} items</span>
        </motion.div>
      )}

      {/* Placed Items (Draggable & Resizable) */}
      <AnimatePresence>
        {placedItems.map((item) => (
          <DraggableResizableItem
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onRemove={removeItem}
            onBringToFront={bringToFront}
            canvasBounds={canvasBounds}
          />
        ))}
      </AnimatePresence>

      {/* Empty Items Prompt */}
      {placedItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl border border-zinc-200 max-w-md">
            <div className="text-5xl mb-3">✨</div>
            <h4 className="text-lg font-bold text-zinc-900 mb-2">
              Add Items to Your Desk
            </h4>
            <p className="text-sm text-zinc-600">
              Drag monitors, lamps, plants, and accessories from the sidebar onto your workspace
            </p>
          </div>
        </motion.div>
      )}

      {/* Grid Overlay (subtle) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </motion.div>
  );
}
