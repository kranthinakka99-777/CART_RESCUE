"use client";

import Link from "next/link";
import { StoreNavbar } from "@/components/store/store-navbar";
import { CheckCircle2, ArrowRight, ShoppingBag, Activity } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <StoreNavbar />

      <main className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order Placed Successfully!</h1>
            <p className="text-xs text-slate-500 mt-2">
              Thank you for your purchase. Your order confirmation has been generated and dispatched.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/store"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs"
            >
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>

            <Link
              href="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs"
            >
              <Activity className="h-4 w-4" />
              View Admin Dashboard
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
