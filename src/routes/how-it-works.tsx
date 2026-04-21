import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { SITE_CONFIG, EASE } from "@/lib/site-config";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: `How It Works — ${SITE_CONFIG.brand.name}` },
      { name: "description", content: SITE_CONFIG.howItWorks.subtitle },
      { property: "og:title", content: `How It Works — ${SITE_CONFIG.brand.name}` },
      { property: "og:description", content: SITE_CONFIG.howItWorks.subtitle },
    ],
  }),
});

function HowItWorksPage() {
  return (
    <SiteShell>
      <HowItWorksContent />
    </SiteShell>
  );
}

function HowItWorksContent() {
  const cfg = SITE_CONFIG;
  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{cfg.howItWorks.title}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{cfg.howItWorks.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cfg.howItWorks.steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.12, duration: 0.75, ease: EASE }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-primary-foreground mb-5"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
              >
                {s.step}
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
