"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Zap,
  Building2,
  Crown,
  ArrowUpRight,
  Download,
  Calendar,
} from "lucide-react";

const currentPlan = {
  name: "Professional",
  price: "₹4,999",
  period: "/month",
  icon: Building2,
  gradient: "from-electric to-purple",
  renewDate: "June 15, 2026",
};

const invoices = [
  { id: "INV-2026-005", date: "May 15, 2026", amount: "₹4,999", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 15, 2026", amount: "₹4,999", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 15, 2026", amount: "₹4,999", status: "Paid" },
  { id: "INV-2026-002", date: "Feb 15, 2026", amount: "₹4,999", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 15, 2026", amount: "₹4,999", status: "Paid" },
];

const usageLimits = [
  { label: "Active Projects", used: 6, limit: "Unlimited", percentage: 0 },
  { label: "Storage", used: 12.4, limit: 50, unit: "GB", percentage: 24.8 },
  { label: "Team Members", used: 5, limit: 5, percentage: 100 },
  { label: "Tour Views", used: 8078, limit: 50000, percentage: 16.2 },
];

export default function BillingPage() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-1">
          Billing & Subscription
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your plan, payment methods, and invoices.
        </p>
      </div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl p-6 mb-6 gradient-border"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentPlan.gradient} flex items-center justify-center shadow-glow`}
            >
              <currentPlan.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-xl font-bold text-white">
                  {currentPlan.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-electric/10 text-electric text-xs font-semibold">
                  Active
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                <span className="text-white font-semibold text-lg">
                  {currentPlan.price}
                </span>
                {currentPlan.period}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                <Calendar className="inline w-3 h-3 mr-1" />
                Renews on {currentPlan.renewDate}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowUpgrade(!showUpgrade)}
              className="btn-primary text-sm !py-2 !px-4 flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Upgrade</span>
            </button>
            <button className="btn-secondary text-sm !py-2 !px-4">
              Manage
            </button>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Options */}
      {showUpgrade && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-card rounded-2xl p-6 mb-6 overflow-hidden"
        >
          <h3 className="font-display text-base font-semibold text-white mb-4">
            Upgrade to Enterprise
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <ul className="space-y-2 text-sm text-slate-400">
                {[
                  "Unlimited team members",
                  "White-label & custom domain",
                  "SSO (SAML/OAuth)",
                  "Dedicated account manager",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn-primary text-sm !py-2.5 !px-6">
              <span>Contact Sales</span>
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-5">
            Usage
          </h2>
          <div className="space-y-5">
            {usageLimits.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <span className="text-sm text-slate-400">
                    {item.used}
                    {item.unit ? ` ${item.unit}` : ""} /{" "}
                    {typeof item.limit === "string" ? item.limit : `${item.limit}${item.unit ? ` ${item.unit}` : ""}`}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.percentage >= 90
                        ? "bg-red-500"
                        : item.percentage >= 70
                        ? "bg-amber-500"
                        : "bg-electric"
                    }`}
                    style={{
                      width: `${
                        typeof item.limit === "string" ? 5 : item.percentage
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-5">
            Payment Method
          </h2>
          <div className="glass rounded-xl p-4 flex items-center gap-4 mb-4">
            <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">
                •••• •••• •••• 4242
              </p>
              <p className="text-xs text-slate-500">Expires 12/2028</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald/10 text-emerald text-xs font-medium">
              Default
            </span>
          </div>
          <button className="btn-secondary text-sm w-full">
            Update Payment Method
          </button>

          <div className="mt-5 pt-5 border-t border-white/5">
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Supported payment methods
            </p>
            <div className="flex gap-2">
              {["Razorpay", "Stripe", "UPI", "Cards"].map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-slate-400"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Invoices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="font-display text-base font-semibold text-white">
            Invoice History
          </h2>
          <button className="text-sm text-electric hover:text-electric-light transition-colors flex items-center gap-1">
            Download All <Download className="w-3.5 h-3.5" />
          </button>
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                Invoice
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                Date
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="w-10 px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4 text-sm text-white font-mono">
                  {inv.id}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{inv.date}</td>
                <td className="px-6 py-4 text-sm text-white font-semibold">
                  {inv.amount}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald text-xs font-medium">
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
