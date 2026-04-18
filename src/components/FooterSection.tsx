import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FooterSection() {
  return (
    <footer className="py-16 px-6 bg-foreground text-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">Zypeus</h2>
          <p className="mt-2 text-sm opacity-60">Smart SIP · Mutual Funds · Wealth Growth</p>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm opacity-70">
            {["About", "Features", "Calculator", "Top Funds", "Contact"].map((item) => (
              <motion.span
                key={item}
                whileHover={{ y: -2, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="cursor-pointer"
              >
                {item}
              </motion.span>
            ))}
          </div>

          <p className="mt-10 text-xs opacity-40">
            Mutual fund investments are subject to market risks. Please read all scheme related documents carefully. © 2026 Zypeus. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
