import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import {
  SITE_CONFIG,
  EASE,
  formatCurrency,
  txStatusColor,
} from "@/lib/site-config";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
  head: () => ({
    meta: [
      { title: `Transactions — ${SITE_CONFIG.brand.name}` },
      { name: "description", content: SITE_CONFIG.transactions.subtitle },
      { property: "og:title", content: `Transactions — ${SITE_CONFIG.brand.name}` },
      { property: "og:description", content: SITE_CONFIG.transactions.subtitle },
    ],
  }),
});

function TransactionsPage() {
  return (
    <SiteShell>
      <TransactionsContent />
    </SiteShell>
  );
}

function TransactionsContent() {
  const cfg = SITE_CONFIG;
  const [txFilter, setTxFilter] = useState<"All" | "SIP Investment" | "Withdrawal">("All");

  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{cfg.transactions.title}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{cfg.transactions.subtitle}</p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {(["All", "SIP Investment", "Withdrawal"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setTxFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${
                txFilter === f
                  ? "border-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
              style={txFilter === f ? { background: "var(--gradient-cta)" } : undefined}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          className="rounded-2xl border border-border bg-card overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {cfg.transactions.items
            .filter((t) => txFilter === "All" || t.type === txFilter)
            .map((tx, i, arr) => {
              const isWithdrawal = tx.type === "Withdrawal";
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                  className={`flex items-center gap-4 p-5 ${
                    i < arr.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: isWithdrawal
                        ? "color-mix(in oklab, oklch(0.65 0.22 25) 15%, transparent)"
                        : "color-mix(in oklab, var(--color-success) 15%, transparent)",
                      color: isWithdrawal ? "oklch(0.65 0.22 25)" : "var(--color-success)",
                    }}
                  >
                    {isWithdrawal ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{tx.plan}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tx.type} · {tx.date} · {tx.id}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-foreground">
                      {isWithdrawal ? "-" : "+"}
                      {formatCurrency(tx.amount)}
                    </p>
                    <p
                      className="text-[11px] font-semibold mt-0.5 inline-flex items-center gap-1"
                      style={{ color: txStatusColor[tx.status] }}
                    >
                      {tx.status === "Success" ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                      {tx.status}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
