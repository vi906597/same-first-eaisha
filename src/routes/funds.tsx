import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell, useInvest } from "@/components/SiteShell";
import { SITE_CONFIG, EASE, riskColor } from "@/lib/site-config";

export const Route = createFileRoute("/funds")({
  component: FundsPage,
  head: () => ({
    meta: [
      { title: `Top Funds — ${SITE_CONFIG.brand.name}` },
      { name: "description", content: SITE_CONFIG.funds.subtitle },
      { property: "og:title", content: `Top Funds — ${SITE_CONFIG.brand.name}` },
      { property: "og:description", content: SITE_CONFIG.funds.subtitle },
    ],
  }),
});

function FundsPage() {
  return (
    <SiteShell>
      <FundsContent />
    </SiteShell>
  );
}

function FundsContent() {
  const cfg = SITE_CONFIG;
  const { openInvest } = useInvest();

  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{cfg.funds.title}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{cfg.funds.subtitle}</p>
        </motion.div>

        <div className="space-y-4">
          {cfg.funds.items.map((fund, i) => (
            <motion.div
              key={fund.name}
              initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
              whileHover={{ x: 8, scale: 1.01 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-border bg-card p-5 gap-4"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{fund.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{fund.category}</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">1Y Return</p>
                  <p className="font-bold" style={{ color: "var(--color-success)" }}>
                    {fund.returns1y}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">3Y Return</p>
                  <p className="font-bold" style={{ color: "var(--color-success)" }}>
                    {fund.returns3y}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Risk</p>
                  <p className="font-bold text-xs" style={{ color: riskColor[fund.risk] }}>
                    {fund.risk}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  onClick={() => openInvest(fund.name)}
                  className="rounded-full px-5 py-2 text-xs font-semibold text-primary-foreground shrink-0"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  Invest
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
