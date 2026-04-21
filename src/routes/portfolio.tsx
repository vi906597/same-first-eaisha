import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SITE_CONFIG, EASE, formatINR, formatCurrency } from "@/lib/site-config";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: `My Portfolio — ${SITE_CONFIG.brand.name}` },
      { name: "description", content: SITE_CONFIG.portfolio.subtitle },
      { property: "og:title", content: `My Portfolio — ${SITE_CONFIG.brand.name}` },
      { property: "og:description", content: SITE_CONFIG.portfolio.subtitle },
    ],
  }),
});

function PortfolioPage() {
  return (
    <SiteShell>
      <PortfolioContent />
    </SiteShell>
  );
}

function PortfolioContent() {
  const cfg = SITE_CONFIG;
  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{cfg.portfolio.title}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{cfg.portfolio.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-3xl p-8 md:p-10 text-primary-foreground"
          style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
        >
          <p className="text-sm opacity-80 tracking-wider uppercase">Total Portfolio Value</p>
          <p className="mt-2 text-4xl md:text-5xl font-bold">
            {formatINR(cfg.portfolio.summary.totalValue)}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm bg-white/15 rounded-full px-3 py-1">
            {cfg.portfolio.summary.todayChange >= 0 ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            <span className="font-semibold">
              {formatCurrency(Math.abs(cfg.portfolio.summary.todayChange))} (
              {cfg.portfolio.summary.todayChangePercent}%) today
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wider">Invested</p>
              <p className="mt-1 text-lg md:text-xl font-bold">
                {formatINR(cfg.portfolio.summary.invested)}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wider">Gains</p>
              <p className="mt-1 text-lg md:text-xl font-bold">
                +{formatINR(cfg.portfolio.summary.gains)}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wider">Returns</p>
              <p className="mt-1 text-lg md:text-xl font-bold">
                +{cfg.portfolio.summary.gainPercent}%
              </p>
            </div>
          </div>
        </motion.div>

        <h2 className="mt-10 mb-4 text-lg font-semibold text-foreground">My Holdings</h2>
        <div className="space-y-3">
          {cfg.portfolio.holdings.map((h, i) => {
            const gain = h.current - h.invested;
            const gainPct = (gain / h.invested) * 100;
            const isUp = h.change >= 0;
            return (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
                whileHover={{ x: 6, scale: 1.005 }}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{h.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {h.units.toFixed(2)} units · NAV {formatCurrency(h.nav)}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Invested</p>
                    <p className="font-semibold text-foreground text-sm">
                      {formatCurrency(h.invested)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="font-bold text-foreground">{formatCurrency(h.current)}</p>
                  </div>
                  <div
                    className="text-right font-semibold text-sm flex items-center gap-1"
                    style={{ color: isUp ? "var(--color-success)" : "oklch(0.65 0.22 25)" }}
                  >
                    {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>
                      {isUp ? "+" : ""}
                      {gainPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
