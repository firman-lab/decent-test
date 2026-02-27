'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import Image from 'next/image';

interface RentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RentModal({ open, onOpenChange }: RentModalProps) {
  const { selectedDesk, placedItems, getTotalPrice } = useWorkspaceStore();
  const { monthly, quarterly } = getTotalPrice();

  const handleConfirmRental = () => {
    console.log('Rental Confirmed!');
    console.log('Desk:', selectedDesk?.name, '$', selectedDesk?.pricePerMonth);
    console.log('Items:', placedItems.map(item => ({
      name: item.product.name,
      price: item.product.pricePerMonth,
    })));
    console.log('Total Monthly:', monthly);
    console.log('Total Quarterly:', quarterly);
    
    // In a real app, this would send data to backend
    alert(`✅ Setup confirmed! Total: $${monthly}/month\n\nCheck console for details.`);
    onOpenChange(false);
  };

  const totalItems = (selectedDesk ? 1 : 0) + placedItems.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Confirm Your Rental
          </DialogTitle>
          <DialogDescription>
            Review your workspace setup before confirming
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Selected Items */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Selected Items ({totalItems})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              {/* Desk */}
              {selectedDesk && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-16 rounded overflow-hidden bg-zinc-100">
                      <Image 
                        src={selectedDesk.thumbnail} 
                        alt={selectedDesk.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-zinc-900">
                        {selectedDesk.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {selectedDesk.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-zinc-900">
                      ${selectedDesk.pricePerMonth}
                    </p>
                    <p className="text-xs text-zinc-500">per month</p>
                  </div>
                </motion.div>
              )}
              
              {/* Items */}
              {placedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-zinc-200"
                >
                  <div className="flex items-center gap-3">
                    {/* <span className="text-3xl">{item.product.image}</span> */}
                    <Image src={item.product.image} alt={item.product.name} width={100} height={100}/>
                    <div>
                      <p className="font-medium text-sm text-zinc-900">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {item.product.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-zinc-900">
                      ${item.product.pricePerMonth}
                    </p>
                    <p className="text-xs text-zinc-500">per month</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-lg mb-4">Pricing Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-700">Monthly Payment</span>
                <span className="text-2xl font-bold text-zinc-900">
                  ${monthly}
                  <span className="text-sm font-normal text-zinc-500">/mo</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-blue-200">
                <span className="text-zinc-700">3-Month Total</span>
                <span className="text-xl font-bold text-green-600">
                  ${quarterly}
                </span>
              </div>
            </div>
          </div>

          {/* Rental Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-zinc-900">Location</p>
                <p className="text-xs text-zinc-500">Bali, Indonesia</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-zinc-900">Delivery</p>
                <p className="text-xs text-zinc-500">Within 2-3 days</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200">
              <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-zinc-900">Payment</p>
                <p className="text-xs text-zinc-500">Secure checkout</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="text-xs text-zinc-500 space-y-1 bg-zinc-50 p-4 rounded-xl">
            <p>✓ Free delivery and setup in Bali area</p>
            <p>✓ Flexible rental terms - cancel anytime</p>
            <p>✓ 24/7 customer support</p>
            <p>✓ Maintenance included</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Continue Editing
          </Button>
          <Button
            onClick={handleConfirmRental}
            className="bg-black hover:bg-black/80 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Confirm Rental - ${monthly}/mo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
