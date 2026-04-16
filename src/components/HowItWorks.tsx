import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Sign Up", desc: "Apna account banao — sirf 2 minute lagenge." },
  { step: "02", title: "KYC Complete Karo", desc: "Aadhaar aur PAN se instant e-KYC." },
  { step: "03", title: "Fund Choose Karo", desc: "Apne goals ke hisaab se best fund select karo." },
  { step: "04", title: "SIP Start Karo", desc: "Monthly amount set karo aur auto-invest chalu!" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Kaise Kaam Karta Hai?</h2>
          <p className="mt-4 text-muted-foreground text-lg">Sirf 4 simple steps mein investing shuru</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -3 }}
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
