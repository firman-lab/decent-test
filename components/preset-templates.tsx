'use client';

import { motion } from 'framer-motion';
import { presetTemplates } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Button } from './ui/button';

export function PresetTemplates() {
  const { loadPreset } = useWorkspaceStore();

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900">Quick Start Templates</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {presetTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-xl border border-zinc-200 p-4 sm:p-5 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => loadPreset(template.deskId, template.items)}
          >
            <div className="space-y-2 sm:space-y-3">
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  {template.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {template.items.length} items + desk
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    loadPreset(template.deskId, template.items);
                  }}
                >
                  Load Setup
                </Button>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
