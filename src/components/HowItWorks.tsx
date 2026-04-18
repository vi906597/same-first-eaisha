import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Sign Up", desc: "Create your account in just 2 minutes — quick and easy." },
  { step: "02", title: "Complete KYC", desc: "Instant e-KYC using your Aadhaar and PAN card." },
  { step: "03", title: "Choose a Fund", desc: "Pick the best fund that aligns with your financial goals." },
  { step: "04", title: "Start Your SIP", desc: "Set your monthly amount and let auto-invest do the rest." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
          <p className="mt-4 text-muted-foreground text-lg">Start investing in just 4 simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
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
