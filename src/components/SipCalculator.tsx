import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate] = useState(12);

  const months = years * 12;
  const r = rate / 100 / 12;
  const futureValue = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const invested = monthly * months;
  const returns = futureValue - invested;

  const formatCurrency = (n: number) =>
    "₹" + Math.round(n).toLocaleString("en-IN");

  const investedPercent = (invested / futureValue) * 100;

  return (
    <section className="py-24 px-6 bg-secondary/40">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            SIP Calculator
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            See how your wealth can grow over time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-3xl border border-border bg-card p-8 md:p-12"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="grid md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Monthly Investment</label>
                  <motion.span
                    key={monthly}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm font-bold text-primary"
                  >
                    {formatCurrency(monthly)}
                  </motion.span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={100000}
                  step={500}
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Time Period</label>
                  <motion.span
                    key={years}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm font-bold text-primary"
                  >
                    {years} {years === 1 ? "year" : "years"}
                  </motion.span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 yr</span>
                  <span>30 yrs</span>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/60 p-4">
                <p className="text-xs text-muted-foreground">Expected Annual Return</p>
                <p className="text-2xl font-bold text-primary">{rate}% p.a.</p>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col items-center justify-center">
              {/* Progress bar */}
              <div className="w-full mb-8">
                <div className="h-4 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-cta)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${investedPercent}%` }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary" /> Invested
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary" /> Returns
                  </span>
                </div>
              </div>

              <div className="space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Invested Amount</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={invested}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-lg font-semibold text-foreground"
                    >
                      {formatCurrency(invested)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated Returns</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={returns}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-lg font-semibold"
                      style={{ color: "var(--color-success)" }}
                    >
                      {formatCurrency(returns)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Total Value</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={futureValue}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="text-2xl font-bold text-primary"
                    >
                      {formatCurrency(futureValue)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
