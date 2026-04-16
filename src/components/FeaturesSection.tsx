import { motion } from "framer-motion";

const features = [
  {
    icon: "📈",
    title: "SIP Calculator",
    desc: "Dekho kitna paisa banega monthly invest karne se — real-time projections.",
  },
  {
    icon: "🛡️",
    title: "Risk Analysis",
    desc: "Apna risk profile samjho aur ussi ke hisaab se funds choose karo.",
  },
  {
    icon: "⚡",
    title: "Auto-Invest",
    desc: "Ek baar set karo, har mahine automatically invest hoga — tension free.",
  },
  {
    icon: "🏆",
    title: "Top Funds",
    desc: "India ke best performing mutual funds — curated aur ranked.",
  },
  {
    icon: "📊",
    title: "Portfolio Tracker",
    desc: "Apna poora portfolio ek jagah dekho — returns, allocation sab kuch.",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "Market moves, NAV updates aur SIP reminders — sab notifications mein.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Sab kuch ek jagah
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Mutual fund investing ko simple aur powerful banane ke liye — yeh sab features tumhare liye.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-border bg-card p-8 transition-shadow duration-300"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
