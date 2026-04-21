import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell, useInvest } from "@/components/SiteShell";
import {
  SITE_CONFIG,
  EASE,
  container,
  fadeUp,
  cardVariant,
} from "@/lib/site-config";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${SITE_CONFIG.brand.name} — Smart SIP & Mutual Fund Investment Platform` },
      {
        name: "description",
        content:
          "Start your mutual fund SIP. Smart investing, top performing funds, and real-time portfolio tracking — all in one place.",
      },
      {
        property: "og:title",
        content: `${SITE_CONFIG.brand.name} — Smart SIP & Mutual Fund Investment Platform`,
      },
      {
        property: "og:description",
        content: "Start your SIP, browse top funds and track your portfolio in real time.",
      },
    ],
  }),
});

function Index() {
  return (
    <SiteShell>
      <HomeContent />
    </SiteShell>
  );
}

function HomeContent() {
  const cfg = SITE_CONFIG;
  const { openInvest } = useInvest();

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-background pt-32 md:pt-40 pb-16">
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero-bg)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-cta)" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-cta)" }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm tracking-[0.35em] uppercase text-muted-foreground"
          >
            {cfg.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-7xl md:text-8xl font-bold tracking-tight"
          >
            <span className="text-foreground">{cfg.hero.titlePart1}</span>
            <span className="text-primary">{cfg.hero.titlePart2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {cfg.hero.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => openInvest(`${cfg.brand.name} Smart SIP Starter`)}
              className="rounded-full px-10 py-3.5 text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
            >
              {cfg.hero.primaryCta}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-full border border-border bg-background px-8 py-3.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {cfg.hero.secondaryCta}
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap justify-center gap-6"
          >
            {cfg.hero.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.7, ease: EASE }}
                whileHover={{ scale: 1.06, y: -6 }}
                className="rounded-2xl border border-border bg-card px-6 py-4 text-center transition-shadow"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {cfg.features.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              {cfg.features.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfg.features.items.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="rounded-2xl border border-border bg-card p-8"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <motion.span
                  className="text-4xl inline-block"
                  whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  {f.icon}
                </motion.span>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
