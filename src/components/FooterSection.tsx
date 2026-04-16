import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="py-16 px-6 bg-foreground text-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">Zypeus</h2>
          <p className="mt-2 text-sm opacity-60">Smart SIP · Mutual Funds · Wealth Growth</p>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm opacity-70">
            <span className="hover:opacity-100 cursor-pointer transition-opacity">About</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Features</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Calculator</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Top Funds</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Contact</span>
          </div>

          <p className="mt-10 text-xs opacity-40">
            Mutual fund investments are subject to market risks. Read all scheme related documents carefully. © 2026 Zypeus.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
