"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/store-context";
import { MessageSquare, Bell, Mail, Send, X, ArrowRight, CheckCircle2 } from "lucide-react";

export function NotificationModal() {
  const { activeNotification, dismissNotification } = useStore();

  if (!activeNotification) return null;

  const isWhatsApp = activeNotification.channel?.includes("WHATSAPP");
  const isPush = activeNotification.channel?.includes("PUSH");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-4 space-y-3"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            {isWhatsApp ? (
              <div className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                <MessageSquare className="h-4 w-4" />
              </div>
            ) : isPush ? (
              <div className="h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                <Bell className="h-4 w-4" />
              </div>
            ) : (
              <div className="h-7 w-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">
                <Mail className="h-4 w-4" />
              </div>
            )}
            <div>
              <span className="text-xs font-bold text-slate-900 block">{activeNotification.channel} Alert</span>
              <span className="text-[10px] text-slate-500 font-mono block">Recipient: {activeNotification.recipient}</span>
            </div>
          </div>

          <button
            onClick={dismissNotification}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-900">{activeNotification.headline}</h4>
          <p className="text-xs text-slate-600 leading-normal">{activeNotification.body}</p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-200">
            {activeNotification.badge}
          </span>

          <Link
            href="/store/recovery"
            onClick={dismissNotification}
            className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-all active:scale-95"
          >
            {activeNotification.cta_label || "Claim Offer"}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
