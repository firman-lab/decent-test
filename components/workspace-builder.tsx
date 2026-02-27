'use client';

import { useState } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Sidebar } from './sidebar';
import { WorkspaceCanvas } from './workspace-canvas';
import { PriceSummary } from './price-summary';
import { RentModal } from './rent-modal';
import { PresetTemplates } from './preset-templates';
import { Button } from './ui/button';

export function WorkspaceBuilder() {
  const { selectedDesk, placedItems, clearItems, selectDesk } = useWorkspaceStore();
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);

  const handleResetWorkspace = () => {
    if (confirm('Reset entire workspace? This will clear the desk and all items.')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selectDesk(null as any);
      clearItems();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 shadow-sm z-10">
        <div className="max-w-[2000px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                monis.rent
              </h1>
              <p className="text-sm text-zinc-500">Design Your Perfect Workspace in Bali</p>
            </div>
            
            <div className="flex items-center gap-3">
              {placedItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearItems}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Items
                </Button>
              )}
              {selectedDesk && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetWorkspace}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-96 shrink-0">
          <Sidebar />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-[1400px] mx-auto space-y-6">
              {/* Preset Templates */}
              {!selectedDesk && <PresetTemplates />}

              {/* Canvas */}
              <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-zinc-50 to-zinc-100 border-b border-zinc-200">
                  <h2 className="font-semibold text-zinc-900">Your Workspace Canvas</h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    {selectedDesk 
                      ? 'Add items and customize your setup' 
                      : 'Select a desk from sidebar to begin'}
                  </p>
                </div>
                <div
                  id="workspace-canvas"
                  className="relative bg-zinc-100 w-full"
                  style={{ 
                    height: 'calc(100vh - 280px)',
                    minHeight: '500px',
                    maxHeight: '900px'
                  }}
                >
                  <WorkspaceCanvas />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Price Summary */}
        <div className="w-96 shrink-0 p-6 bg-zinc-50 border-l border-zinc-200 overflow-y-auto">
          <PriceSummary onRentClick={() => setIsRentModalOpen(true)} />
        </div>
      </div>

      {/* Rent Modal */}
      <RentModal open={isRentModalOpen} onOpenChange={setIsRentModalOpen} />
    </div>
  );
}
