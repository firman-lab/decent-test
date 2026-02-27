'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Sofa } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Button } from './ui/button';

interface PriceSummaryProps {
  onRentClick: () => void;
}

export function PriceSummary({ onRentClick }: PriceSummaryProps) {
  const { selectedDesk, placedItems, getTotalPrice } = useWorkspaceStore();
  const { monthly, quarterly } = getTotalPrice();

  const itemCount = placedItems.length;
  const hasDesk = selectedDesk !== null;
  const totalItems = hasDesk ? itemCount + 1 : itemCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-neutral-600 to-gray-600 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-bold">Your Setup</h3>
        </div>
        <p className="text-blue-100 text-sm">Real-time pricing</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-600">Monthly Total</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={monthly}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-3xl font-bold text-zinc-900"
              >
                ${monthly}
                <span className="text-sm font-normal text-zinc-500">/mo</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">3-Month Plan</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={quarterly}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold text-green-700"
              >
                ${quarterly}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Total items</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.3, color: '#3b82f6' }}
                  animate={{ scale: 1, color: '#18181b' }}
                  className="font-semibold"
                >
                  {totalItems}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Desk */}
            {selectedDesk && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center gap-2">
                  <Sofa className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-zinc-900">{selectedDesk.name}</span>
                </div>
                <span className="text-sm font-bold text-blue-600">${selectedDesk.pricePerMonth}</span>
              </motion.div>
            )}

            {/* Items List */}
            {placedItems.length > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-1.5 text-xs text-zinc-500">
                {placedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between py-1.5 px-2 bg-zinc-50 rounded"
                  >
                    <span className="truncate flex-1">{item.product.name}</span>
                    <span className="font-medium text-zinc-700 ml-2">
                      ${item.product.pricePerMonth}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={onRentClick}
          disabled={!hasDesk}
          size="lg"
          className="w-full bg-black hover:bg-black/80 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {!hasDesk ? 'Select a Desk First' : 'Rent Your Setup'}
        </Button>

        {hasDesk && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-zinc-500"
          >
            Free delivery in Bali • Flexible rental terms
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
