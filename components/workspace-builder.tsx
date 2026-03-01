'use client';

import { useState } from 'react';
import { Trash2, RotateCcw, Menu, X, ShoppingCart } from 'lucide-react';
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
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

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
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-black bg-clip-text text-transparent">
                  monis.rent
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 hidden sm:block">Design Your Perfect Workspace in Bali</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {placedItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearItems}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200 hidden sm:flex"
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
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hidden sm:flex"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
              )}
              
              {/* Mobile Cart Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                className="lg:hidden relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {placedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {placedItems.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Backdrop for mobile */}
        {(isLeftSidebarOpen || isRightSidebarOpen) && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => {
              setIsLeftSidebarOpen(false);
              setIsRightSidebarOpen(false);
            }}
          />
        )}

        {/* Left Sidebar */}
        <div className={`
          w-80 sm:w-96 shrink-0 bg-white z-50
          fixed lg:static inset-y-0 left-0
          transform transition-transform duration-300 ease-in-out
          ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}>
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-200">
            <h2 className="font-semibold text-zinc-900">Products</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLeftSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Sidebar />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-3 sm:p-6 overflow-auto">
            <div className="max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
              {/* Preset Templates */}
              {!selectedDesk && <PresetTemplates />}

              {/* Canvas */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-zinc-50 to-zinc-100 border-b border-zinc-200">
                  <h2 className="font-semibold text-sm sm:text-base text-zinc-900">Your Workspace Canvas</h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    {selectedDesk 
                      ? 'Add items and customize your setup' 
                      : 'Select a desk to begin'}
                  </p>
                </div>
                <div
                  id="workspace-canvas"
                  className="relative bg-zinc-100 w-full"
                  style={{ 
                    height: 'calc(100vh - 200px)',
                    minHeight: '400px',
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
        <div className={`
          w-80 sm:w-96 shrink-0 bg-zinc-50 border-l border-zinc-200 z-50
          fixed lg:static inset-y-0 right-0
          transform transition-transform duration-300 ease-in-out
          ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}>
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white">
            <h2 className="font-semibold text-zinc-900">Cart Summary</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRightSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-4 sm:p-6">
            <PriceSummary onRentClick={() => setIsRentModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* Rent Modal */}
      <RentModal open={isRentModalOpen} onOpenChange={setIsRentModalOpen} />
    </div>
  );
}
