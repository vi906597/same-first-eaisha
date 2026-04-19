import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface InvestmentConfirmationProps {
  open: boolean;
  onClose: () => void;
  fundName?: string;
  defaultAmount?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function InvestmentConfirmation({
  open,
  onClose,
  fundName,
  defaultAmount = 5000,
}: InvestmentConfirmationProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [sipDate, setSipDate] = useState(5);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount(defaultAmount);
      setSipDate(5);
      setConfirmed(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, defaultAmount]);

  // Projection: 12% annual return over 10 years with monthly SIP
  const months = 12 * 10;
  const monthlyRate = 0.12 / 12;
  const futureValue =
    amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const invested = amount * months;
  const gains = Math.max(0, futureValue - invested);

  const referenceId = `ZYP-${Date.now().toString().slice(-8)}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl border border-border bg-card overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {!confirmed ? (
              <>
                {/* Header */}
                <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-4">
                  <div>
                    <h3 id="confirm-title" className="text-xl font-bold text-foreground">
                      Confirm Your Investment
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Review the details before starting your SIP
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  {/* Fund card */}
                  <div
                    className="rounded-2xl border border-border p-4 bg-secondary/40"
                  >
                    <p className="text-xs text-muted-foreground">Selected Fund</p>
                    <p className="mt-1 font-semibold text-foreground">
                      {fundName ?? "Zypeus Smart SIP"}
                    </p>
                  </div>

                  {/* SIP amount */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        Monthly SIP Amount
                      </label>
                      <span className="text-sm font-bold text-primary">
                        {formatINR(amount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={100000}
                      step={500}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>₹500</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  {/* SIP date */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Monthly SIP Date
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 5, 10, 15, 20, 25].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSipDate(d)}
                          className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-colors ${
                            sipDate === d
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:bg-secondary"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Projection */}
                  <div className="rounded-2xl border border-border p-4 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      10-Year Projection (12% p.a.)
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Invested</p>
                        <p className="text-sm font-bold text-foreground mt-1">
                          {formatINR(invested)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Est. Gains</p>
                        <p
                          className="text-sm font-bold mt-1"
                          style={{ color: "var(--color-success)" }}
                        >
                          {formatINR(gains)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Total Value</p>
                        <p className="text-sm font-bold text-primary mt-1">
                          {formatINR(futureValue)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="rounded-2xl bg-secondary/40 p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency</span>
                      <span className="text-foreground font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auto-debit on</span>
                      <span className="text-foreground font-medium">
                        {sipDate}
                        {sipDate === 1 ? "st" : sipDate === 2 ? "nd" : sipDate === 3 ? "rd" : "th"} of every month
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment mode</span>
                      <span className="text-foreground font-medium">UPI / Net Banking</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border bg-secondary/30 flex gap-3 justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setConfirmed(true)}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                    style={{
                      background: "var(--gradient-cta)",
                      boxShadow: "var(--shadow-cta)",
                    }}
                  >
                    Confirm &amp; Start SIP
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-2xl font-bold text-foreground"
                >
                  SIP Started Successfully!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 text-sm text-muted-foreground"
                >
                  Your investment journey with Zypeus has officially begun.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5 text-left space-y-3"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fund</span>
                    <span className="font-semibold text-foreground text-right max-w-[60%]">
                      {fundName ?? "Zypeus Smart SIP"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Amount</span>
                    <span className="font-semibold text-primary">{formatINR(amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auto-debit Date</span>
                    <span className="font-semibold text-foreground">{sipDate} of every month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reference ID</span>
                    <span className="font-mono text-xs text-foreground">{referenceId}</span>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onClose}
                  className="mt-6 rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground"
                  style={{
                    background: "var(--gradient-cta)",
                    boxShadow: "var(--shadow-cta)",
                  }}
                >
                  Done
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
