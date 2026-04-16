import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Gradient orb */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero-bg)" }}
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
          Apna paisa smartly invest karo — SIP ke through mutual funds mein.
          Har mahine thoda thoda, future mein bahut zyada.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4">
          <button
            className="rounded-full px-10 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--gradient-cta)",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            Start SIP Now
          </button>
          <button className="rounded-full border border-border bg-background px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-secondary">
            Learn More
          </button>
        </motion.div>

        {/* Animated counter chips */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: "Active SIPs", value: "2.4L+" },
            { label: "AUM", value: "₹1200 Cr" },
            { label: "Avg Returns", value: "14.2%" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -4 }}
              className="rounded-2xl border border-border bg-card px-6 py-4 text-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
