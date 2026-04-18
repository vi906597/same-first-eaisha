import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  fundName?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TermsModal({ open, onClose, onAccept, fundName }: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!open) setAgreed(false);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl border border-border bg-card overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-4">
              <div>
                <h3 id="terms-title" className="text-xl font-bold text-foreground">
                  Terms &amp; Conditions
                </h3>
                {fundName && (
                  <p className="mt-1 text-xs text-muted-foreground">For: {fundName}</p>
                )}
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
            <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>
                Please read the following terms carefully before proceeding with your
                investment. By accepting, you confirm that you understand the risks
                involved.
              </p>

              <div>
                <h4 className="font-semibold text-foreground mb-1">1. Market Risk</h4>
                <p>
                  Mutual fund investments are subject to market risks. The value of
                  your investment can go up or down based on market conditions and
                  past performance is not indicative of future returns.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1">2. KYC Requirement</h4>
                <p>
                  You must complete your KYC verification using a valid PAN and
                  Aadhaar before any investment is processed. Incomplete KYC may
                  result in delays or cancellation of your SIP.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1">3. SIP Auto-Debit</h4>
                <p>
                  By starting a SIP, you authorize Zypeus to auto-debit the agreed
                  monthly amount from your registered bank account on the scheduled
                  date until you choose to pause or cancel the SIP.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1">4. Charges &amp; Fees</h4>
                <p>
                  All applicable fund expense ratios, exit loads and statutory taxes
                  will apply as per the scheme documents. Zypeus does not charge any
                  hidden fees on your investments.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1">5. Read Scheme Documents</h4>
                <p>
                  You are advised to read all scheme related documents carefully
                  before investing. Returns shown anywhere on this platform are
                  illustrative and not guaranteed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1">6. No Investment Advice</h4>
                <p>
                  Information provided on Zypeus is for general purposes and does
                  not constitute personalized financial advice. Please consult a
                  certified financial advisor before making investment decisions.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border bg-secondary/30 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-xs text-foreground leading-relaxed">
                  I have read and agree to the Terms &amp; Conditions, and I understand
                  that mutual fund investments are subject to market risks.
                </span>
              </label>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={agreed ? { scale: 1.04 } : undefined}
                  whileTap={agreed ? { scale: 0.96 } : undefined}
                  disabled={!agreed}
                  onClick={() => {
                    if (agreed) onAccept();
                  }}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--gradient-cta)",
                    boxShadow: agreed ? "var(--shadow-cta)" : "none",
                  }}
                >
                  Accept &amp; Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
