"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/store-context";
import { ShoppingCart, Search, Activity, Zap, Play, ArrowRight, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function StoreNavbar() {
  const pathname = usePathname();
  const { itemCount, cartTotal, triggerDemoScenario, sessionId } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white shadow-md">
      
      {/* Top Banner: Telemetry & Demo Controls */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-2 text-teal-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span>Behavioral Event Telemetry Stream Active ({sessionId})</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-400 hidden sm:inline">Simulate Scenarios:</span>
          <button
            onClick={() => triggerDemoScenario("PAYMENT_FAIL")}
            className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
          >
            1. Payment Failure
          </button>
          <button
            onClick={() => triggerDemoScenario("SHIPPING_COST")}
            className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
          >
            2. Shipping Friction
          </button>
          <button
            onClick={() => triggerDemoScenario("PRICE_COMPARE")}
            className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
          >
            3. Price Compare
          </button>
          <button
            onClick={() => triggerDemoScenario("RETURNING_VIP")}
            className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
          >
            4. Returning VIP
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Store Logo */}
        <Link href="/store" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-xs">
            A
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white text-lg block">ApexStore</span>
            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block -mt-1">E-Commerce Demo Site</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder="Search products (Electronics, Wearables, Peripherals)..."
            className="w-full bg-slate-800 border border-slate-700 rounded-full pl-4 pr-10 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
          <Search className="h-4 w-4 text-slate-400 absolute right-3" />
        </div>

        {/* Action Buttons: Cart Counter & Admin Dashboard Link */}
        <div className="flex items-center gap-4">
          
          <Link
            href="/store/cart"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-full border border-slate-700 text-xs text-slate-200 transition-all relative"
          >
            <ShoppingCart className="h-4 w-4 text-teal-400" />
            <span className="font-bold font-mono">{formatCurrency(cartTotal)}</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-teal-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-slate-900">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xs"
          >
            <Activity className="h-3.5 w-3.5" />
            Admin Dashboard
          </Link>
        </div>

      </div>

    </header>
  );
}
