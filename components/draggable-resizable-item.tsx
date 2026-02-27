'use client';

import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Move, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { PlacedItem } from '@/store/workspace-store';
import { cn } from '@/lib/utils';

interface DraggableResizableItemProps {
  item: PlacedItem;
  onUpdate: (id: string, updates: Partial<PlacedItem>) => void;
  onRemove: (id: string) => void;
  onBringToFront: (id: string) => void;
  canvasBounds: { width: number; height: number };
}

export function DraggableResizableItem({
  item,
  onUpdate,
  onRemove,
  onBringToFront,
}: DraggableResizableItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const minSize = {
    width: item.product.defaultWidth * 0.3,
    height: item.product.defaultHeight * 0.3,
  };

  const maxSize = {
    width: item.product.defaultWidth * 5,
    height: item.product.defaultHeight * 5,
  };

  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      onDragStart={() => {
        setIsDragging(true);
        onBringToFront(item.id);
      }}
      onDrag={(e, d) => {
        onUpdate(item.id, { x: d.x, y: d.y });
      }}
      onDragStop={() => {
        setIsDragging(false);
      }}
      onResizeStart={() => {
        setIsResizing(true);
        onBringToFront(item.id);
      }}
      onResize={(e, direction, ref, delta, position) => {
        onUpdate(item.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        });
      }}
      onResizeStop={() => {
        setIsResizing(false);
      }}
      minWidth={minSize.width}
      minHeight={minSize.height}
      maxWidth={maxSize.width}
      maxHeight={maxSize.height}
      lockAspectRatio
      className={cn(
        'group',
        (isDragging || isResizing) && 'cursor-grabbing'
      )}
      style={{ zIndex: item.zIndex }}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      resizeHandleStyles={{
        top: { cursor: 'ns-resize' },
        right: { cursor: 'ew-resize' },
        bottom: { cursor: 'ns-resize' },
        left: { cursor: 'ew-resize' },
        topRight: { cursor: 'nesw-resize' },
        bottomRight: { cursor: 'nwse-resize' },
        bottomLeft: { cursor: 'nesw-resize' },
        topLeft: { cursor: 'nwse-resize' },
      }}
      resizeHandleClasses={{
        top: 'resize-handle resize-handle-h',
        right: 'resize-handle resize-handle-v',
        bottom: 'resize-handle resize-handle-h',
        left: 'resize-handle resize-handle-v',
        topRight: 'resize-handle resize-handle-corner',
        bottomRight: 'resize-handle resize-handle-corner',
        bottomLeft: 'resize-handle resize-handle-corner',
        topLeft: 'resize-handle resize-handle-corner',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative w-full h-full rounded-lg overflow-hidden transition-all',
          'bg-white/0',
          (isHovered || isDragging || isResizing) && 'ring-1 ring-blue-500 shadow-lg',
          isDragging && 'opacity-80'
        )}
      >
        {/* Item Image */}
        <div className="relative w-full h-full">
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            className="object-contain p-2"
            sizes="400px"
            draggable={false}
          />
        </div>

        {/* Hover Controls */}
        <AnimatePresence>
          {isHovered && !isDragging && !isResizing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
            >
              {/* Item Info */}
              <div className="absolute bottom-0 left-0 right-0 p-2 text-white pointer-events-none">
                <p className="text-xs font-semibold truncate">{item.product.name}</p>
                <p className="text-xs opacity-80">${item.product.pricePerMonth}/mo</p>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-1 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors"
                  aria-label="Remove item"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Drag Indicator */}
              <div className="absolute top-2 left-2 pointer-events-none">
                <div className="p-1.5 bg-blue-500 text-white rounded-lg shadow-lg">
                  <Move className="w-3 h-3" />
                </div>
              </div>

              {/* Resize Indicator */}
              <div className="absolute bottom-2 right-2 pointer-events-none">
                <div className="p-1 bg-blue-500 text-white rounded shadow-lg">
                  <Maximize2 className="w-2.5 h-2.5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resizing/Dragging State Indicator */}
        {(isResizing || isDragging) && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg font-medium">
            {isResizing ? 'Resizing' : 'Moving'}
          </div>
        )}
      </motion.div>

      <style jsx global>{`
        .resize-handle {
          position: absolute;
          z-index: 10;
        }
        .resize-handle-h {
          left: 0;
          right: 0;
          height: 4px;
        }
        .resize-handle-v {
          top: 0;
          bottom: 0;
          width: 4px;
        }
        .resize-handle-corner {
          width: 8px;
          height: 8px;
        }
        .resize-handle:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        .group:hover .resize-handle {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </Rnd>
  );
}
