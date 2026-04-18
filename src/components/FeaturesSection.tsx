import { motion } from "framer-motion";

const features = [
  {
    icon: "📈",
    title: "SIP Calculator",
    desc: "See exactly how your monthly investment can grow — with real-time projections.",
  },
  {
    icon: "🛡️",
    title: "Risk Analysis",
    desc: "Understand your risk profile and choose funds that match your goals perfectly.",
  },
  {
    icon: "⚡",
    title: "Auto-Invest",
    desc: "Set it once and forget it — your SIP runs automatically every month, hassle-free.",
  },
  {
    icon: "🏆",
    title: "Top Funds",
    desc: "Discover India's best performing mutual funds — handpicked, ranked and reviewed.",
  },
  {
    icon: "📊",
    title: "Portfolio Tracker",
    desc: "Track your entire portfolio in one place — returns, allocation and performance.",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "Get instant updates on market moves, NAV changes and SIP reminders.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariant = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.75, ease: EASE },
  }),
};

export default function FeaturesSection() {
  return (
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
            Everything you need, in one place
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Powerful tools and features designed to make mutual fund investing simple,
            smart and rewarding for everyone.
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
  );
}
