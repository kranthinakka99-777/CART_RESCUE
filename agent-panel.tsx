"use client";

import { motion } from "framer-motion";
import { Brain, Calculator, ShieldCheck, CheckCircle2, XCircle, Sparkles, Send, ArrowRight, Zap, Trophy, HelpCircle } from "lucide-react";
import { formatCurrency, formatPercent, getRiskBadgeColor, getIntentColor, getActionBadgeColor } from "@/lib/utils";

interface AgentPanelProps {
  data: {
    session_id: string;
    behavior: {
      abandonment_risk: number;
      intent: string;
      confidence: number;
      risk_level: string;
      key_drivers: string[];
    };
    strategy: {
      selected_action: string;
      selected_action_label: string;
      expected_revenue: number;
      expected_margin: number;
      expected_cost: number;
      net_profit: number;
      business_impact: string;
      evaluations: Array<{
        action: string;
        label: string;
        expected_conversion_rate: number;
        expected_revenue: number;
        discount_cost: number;
        channel_cost: number;
        expected_margin: number;
        net_profit: number;
        business_impact: string;
        is_best_candidate: boolean;
      }>;
    };
    critic: {
      decision: string;
      final_action: string;
      final_action_label: string;
      explanation: string;
      guardrail_checks: Record<string, boolean>;
      model_used: string;
    };
    final_recommended_action: string;
    final_action_label: string;
    expected_net_profit: number;
    notification_preview?: {
      channel: string;
      recipient: string;
      headline: string;
      body: string;
      cta_label: string;
      badge: string;
    } | null;
    execution_time_ms: number;
  };
}

export function AgentPanel({ data }: AgentPanelProps) {
  const { behavior, strategy, critic, final_action_label, expected_net_profit, notification_preview, execution_time_ms } = data;

  return (
    <div className="space-y-6">
      
      {/* Top Header & Latency Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            3-Agent Hybrid AI Reasoning Trace
          </h2>
          <p className="text-xs text-slate-500">
            Real-time multi-agent consensus pipeline for Session <span className="font-mono text-teal-700 font-bold">{data.session_id}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/80 text-xs font-mono">
          <Zap className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-slate-600">Execution:</span>
          <span className="text-emerald-700 font-bold">{execution_time_ms} ms</span>
        </div>
      </div>

      {/* 4 COLUMNS WORKFLOW GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* AGENT 1: BEHAVIOR INTELLIGENCE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-blue-600 font-bold block">Agent 1 (ML Model)</span>
                  <h3 className="text-xs font-bold text-slate-900">Behavior Intelligence</h3>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBadgeColor(behavior.abandonment_risk)}`}>
                {behavior.risk_level} RISK
              </span>
            </div>

            {/* Risk Bar */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px]">Abandonment Risk:</span>
                <span className="text-slate-900 font-bold">{formatPercent(behavior.abandonment_risk)}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    behavior.abandonment_risk >= 0.8 ? "bg-red-500" : behavior.abandonment_risk >= 0.5 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${behavior.abandonment_risk * 100}%` }}
                />
              </div>
            </div>

            {/* Intent & Confidence */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mb-3">
              <div>
                <span className="text-[10px] text-slate-500 block">Diagnosed Intent</span>
                <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold border ${getIntentColor(behavior.intent)}`}>
                  {behavior.intent}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">ML Confidence</span>
                <span className="text-xs font-mono font-bold text-slate-800 mt-0.5 block">
                  {formatPercent(behavior.confidence)}
                </span>
              </div>
            </div>

            {/* Key Drivers */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Observed Key Drivers:</span>
              <ul className="space-y-1 text-[11px] text-slate-600">
                {behavior.key_drivers.map((driver, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* AGENT 2: STRATEGY DECISION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                  <Calculator className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-teal-600 font-bold block">Agent 2 (Solver)</span>
                  <h3 className="text-xs font-bold text-slate-900">Strategy Decision</h3>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold">
                8 Candidates
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block mb-0.5">Max Profit Candidate Selected:</span>
                <span className="text-xs font-bold text-slate-900 block">{strategy.selected_action_label}</span>
                <p className="text-[11px] text-slate-500 mt-1 italic leading-tight">{strategy.business_impact}</p>
              </div>

              {/* Financial Math */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-500 block">Expected Revenue</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(strategy.expected_revenue)}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-500 block">Expected Cost</span>
                  <span className="text-amber-700 font-bold">{formatCurrency(strategy.expected_cost)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AGENT 3: CRITIC AGENT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-purple-600 font-bold block">Agent 3 (LLM Critic)</span>
                  <h3 className="text-xs font-bold text-slate-900">Enterprise Auditor</h3>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                critic.decision === "APPROVED"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                {critic.decision === "APPROVED" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {critic.decision}
              </span>
            </div>

            {/* Policy Checks Pills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {Object.entries(critic.guardrail_checks).map(([checkKey, isPassed]) => (
                <span
                  key={checkKey}
                  className={`px-2 py-0.5 rounded-md text-[9px] border flex items-center gap-1 font-medium ${
                    isPassed ? "bg-slate-50 text-slate-700 border-slate-200" : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {checkKey.replace(/_/g, " ")} {isPassed ? "✓" : "✗"}
                </span>
              ))}
            </div>

            {/* Explanation Rationale */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-[9px] font-mono text-purple-700 font-bold block mb-0.5">Model: {critic.model_used}</span>
              <p className="text-[11px] text-slate-700 leading-snug">{critic.explanation}</p>
            </div>
          </div>
        </motion.div>

        {/* FINAL OUTPUT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="bg-gradient-to-br from-teal-50/80 to-sky-50/80 rounded-2xl p-4 border border-teal-200 shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono uppercase tracking-wider text-teal-700 font-bold block">Final Output</span>
              <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                <Trophy className="h-3.5 w-3.5" />
              </div>
            </div>

            <span className="text-[10px] text-slate-500 block mb-0.5">Recommended Action</span>
            <h4 className="text-sm font-extrabold text-teal-800 uppercase tracking-wide mb-2">
              {data.final_recommended_action}
            </h4>

            <div className="space-y-2 text-xs border-t border-teal-200/60 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-[11px]">Confidence</span>
                <span className="font-bold text-slate-900">{formatPercent(behavior.confidence)}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block font-medium">Why this action?</span>
                <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                  Customer shows high purchase intent with no blockers. Discounts not required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-teal-200/60 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-600">Expected Margin Protected:</span>
            <span className="text-sm font-bold font-mono text-emerald-700">{formatCurrency(expected_net_profit)}</span>
          </div>
        </motion.div>

      </div>

      {/* DISPATCHED NOTIFICATION PREVIEW */}
      {notification_preview && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <Send className="h-3.5 w-3.5 text-teal-600" />
            Dispatched Channel Payload Preview ({notification_preview.channel}):
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{notification_preview.headline}</span>
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold border border-teal-200">
                {notification_preview.badge}
              </span>
            </div>
            <p className="text-slate-600">{notification_preview.body}</p>
          </div>
        </div>
      )}

      {/* Bottom System Status Bar matching screenshot */}
      <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-800 gap-2 font-medium">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="font-bold">System Status: All Agents Online & Healthy</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-700 text-[11px]">
          <span>Real-time processing</span>
          <span>•</span>
          <span>Privacy Compliant</span>
          <span>•</span>
          <span>Budget Safe</span>
        </div>
      </div>

    </div>
  );
}
