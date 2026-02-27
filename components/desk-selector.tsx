'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { desks } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspace-store';
import { cn } from '@/lib/utils';

export function DeskSelector() {
  const { selectedDesk, selectDesk } = useWorkspaceStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Choose Your Desk</h3>
        <p className="text-sm text-zinc-500">Select a workspace style to get started</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {desks.map((desk, index) => {
          const isSelected = selectedDesk?.id === desk.id;

          return (
            <motion.button
              key={desk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => selectDesk(desk)}
              className={cn(
                'group relative overflow-hidden rounded-xl border-2 transition-all text-left',
                isSelected
                  ? 'border-blue-600 ring-4 ring-blue-100'
                  : 'border-zinc-200 hover:border-blue-300'
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={desk.thumbnail}
                  alt={desk.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 400px) 100vw, 400px"
                />
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-2 shadow-lg"
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                )}
              </div>

              <div className="p-4 bg-white">
                <h4 className="font-semibold text-zinc-900 mb-1">{desk.name}</h4>
                <p className="text-xs text-zinc-500 mb-2">{desk.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">
                    ${desk.pricePerMonth}
                    <span className="text-xs font-normal text-zinc-500">/mo</span>
                  </span>
                  <span className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded-full capitalize">
                    {desk.style}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-600/10 to-transparent" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
