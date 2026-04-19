import { useState } from "react";
import { motion } from "framer-motion";
import TermsModal from "./TermsModal";
import InvestmentConfirmation from "./InvestmentConfirmation";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function HeroSection() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient orb */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero-bg)" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating subtle blobs */}
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
        <motion.h1
          variants={fadeUp}
          className="text-7xl md:text-8xl font-bold tracking-tight text-primary"
        >
          Zypeus
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm tracking-[0.35em] uppercase text-muted-foreground"
        >
          Smart SIP &middot; Mutual Funds &middot; Wealth Growth
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Invest your money smartly through SIPs in top mutual funds.
          A little every month, a lot in the future.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setTermsOpen(true)}
            className="rounded-full px-10 py-3.5 text-sm font-semibold text-primary-foreground"
            style={{
              background: "var(--gradient-cta)",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            Start SIP Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-full border border-border bg-background px-8 py-3.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Animated counter chips */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: "Active SIPs", value: "2.4L+" },
            { label: "Assets Under Management", value: "₹1200 Cr" },
            { label: "Avg. Annual Returns", value: "14.2%" },
          ].map((stat, i) => (
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

      <TermsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        onAccept={() => {
          alert("Welcome to Zypeus! Let's start your SIP journey.");
          setTermsOpen(false);
        }}
      />
    </section>
  );
}
