import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, IndianRupee } from "lucide-react";
import { SiteShell, useInvest } from "@/components/SiteShell";
import {
  SITE_CONFIG,
  EASE,
  formatCurrency,
  ICON_MAP,
  cardVariant,
} from "@/lib/site-config";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: `Dashboard — ${SITE_CONFIG.brand.name}` },
      {
        name: "description",
        content: SITE_CONFIG.dashboard.subtitle,
      },
      { property: "og:title", content: `Dashboard — ${SITE_CONFIG.brand.name}` },
      { property: "og:description", content: SITE_CONFIG.dashboard.subtitle },
    ],
  }),
});

function DashboardPage() {
  return (
    <SiteShell>
      <DashboardContent />
    </SiteShell>
  );
}

function DashboardContent() {
  const cfg = SITE_CONFIG;
  const { openInvest } = useInvest();
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            {cfg.dashboard.greeting}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">
            {cfg.dashboard.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            {cfg.dashboard.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto"
        >
          {cfg.dashboard.quickStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card px-4 py-4 text-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <p className="text-lg md:text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cfg.dashboard.plans.map((plan, i) => {
            const Icon = ICON_MAP[plan.icon] ?? Sparkles;
            const isSelected = selectedPlanId === plan.id;
            return (
              <motion.button
                key={plan.id}
                type="button"
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="show"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative text-left rounded-2xl border bg-card p-6 transition-colors ${
                  isSelected ? "border-primary" : "border-border"
                }`}
                style={{
                  boxShadow: isSelected ? "var(--shadow-cta)" : "var(--shadow-card)",
                }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-2 right-4 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full text-primary-foreground"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    Popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-primary-foreground"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground leading-tight">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      From {formatCurrency(plan.amount)}/month
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                      Expected Returns
                    </p>
                    <p className="text-2xl font-bold text-foreground">{plan.returns}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                      Risk
                    </p>
                    <p className="text-sm font-semibold" style={{ color: plan.color }}>
                      {plan.risk}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          className="mt-10 max-w-xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch"
        >
          <div className="relative flex-1">
            <IndianRupee
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="number"
              inputMode="numeric"
              min={100}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder={cfg.dashboard.customPlaceholder}
              className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const plan = cfg.dashboard.plans.find((p) => p.id === selectedPlanId);
              const amt = customAmount
                ? Number(customAmount)
                : plan?.amount ?? cfg.calculator.defaultMonthly;
              openInvest(plan?.name ?? `${cfg.brand.name} Custom SIP`, Math.max(100, amt));
            }}
            className="rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
          >
            {cfg.dashboard.investCta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
