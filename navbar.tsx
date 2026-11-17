"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Activity, Play, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/", icon: ShoppingBag },
    { label: "Dashboard", href: "/dashboard", icon: Activity },
    { label: "Live Simulator", href: "/sessions", icon: Play },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Audit Logs", href: "/audit-log", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-600 shadow-xs group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-teal-600/20" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-900 text-base">CART</span>
              <span className="font-extrabold tracking-tight text-teal-600 text-base">RESCUE</span>
            </div>
            <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-400 font-semibold">Autonomous AI Engine</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs transition-all duration-150 font-medium",
                  isActive
                    ? "bg-teal-50 text-teal-700 font-semibold border border-teal-200/60 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive ? "text-teal-600" : "text-slate-500")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Backend Status & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            FastAPI 3-Agent Active
          </div>

          <Link
            href="/sessions"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-xs transition-all active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            Live Playground
          </Link>
        </div>

      </div>
    </header>
  );
}
