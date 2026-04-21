import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LogOut, X } from "lucide-react";
import {
  SITE_CONFIG,
  EASE,
  formatINR,
  formatCurrency,
} from "@/lib/site-config";

/* ─── Invest modal context ─────────────────────────────────────────
   Any page can call `openInvest("Growth SIP", 1000)` to launch
   the Terms → Confirmation flow. The shell owns the modal state.
   ───────────────────────────────────────────────────────────────── */

type InvestContextValue = {
  openInvest: (fundName: string, suggestedAmount?: number) => void;
};

const InvestContext = createContext<InvestContextValue | null>(null);

export function useInvest() {
  const ctx = useContext(InvestContext);
  if (!ctx) {
    throw new Error("useInvest must be used inside <SiteShell>");
  }
  return ctx;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const cfg = SITE_CONFIG;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [activeFund, setActiveFund] = useState(`${cfg.brand.name} Smart SIP Starter`);
  const [amount, setAmount] = useState(cfg.calculator.defaultMonthly);
  const [sipDate, setSipDate] = useState(5);

  const openInvest = useCallback(
    (fundName: string, suggestedAmount?: number) => {
      setActiveFund(fundName);
      if (typeof suggestedAmount === "number" && suggestedAmount > 0) {
        setAmount(Math.max(cfg.calculator.minMonthly, suggestedAmount));
      } else {
        setAmount(cfg.calculator.defaultMonthly);
      }
      setAgreed(false);
      setConfirmed(false);
      setConfirmOpen(false);
      setTermsOpen(true);
    },
    [cfg.calculator.defaultMonthly, cfg.calculator.minMonthly],
  );

  // Reset agreement whenever Terms modal closes
  useEffect(() => {
    if (!termsOpen) setAgreed(false);
  }, [termsOpen]);

  // Reset confirmation state when confirm modal opens
  useEffect(() => {
    if (confirmOpen) {
      setSipDate(5);
      setConfirmed(false);
    }
  }, [confirmOpen]);

  // Lock body scroll when any overlay is open
  useEffect(() => {
    const lock = termsOpen || confirmOpen || menuOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [termsOpen, confirmOpen, menuOpen]);

  // 10-yr projection for confirmation modal
  const cMonths = 12 * 10;
  const cMonthlyRate = 0.12 / 12;
  const cFutureValue =
    amount * ((Math.pow(1 + cMonthlyRate, cMonths) - 1) / cMonthlyRate) * (1 + cMonthlyRate);
  const cInvested = amount * cMonths;
  const cGains = Math.max(0, cFutureValue - cInvested);
  const referenceId = useMemo(
    () => `${cfg.brand.name.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-8)}`,
    [cfg.brand.name, confirmed],
  );

  const ctxValue = useMemo(() => ({ openInvest }), [openInvest]);

  return (
    <InvestContext.Provider value={ctxValue}>
      <div className="min-h-screen bg-background">
        {/* ============== TOP BRAND BAR (shared) ============== */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed top-0 left-0 right-0 z-30 px-6 py-5 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/40"
        >
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-sm"
              style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
            >
              {cfg.brand.logoLetter}
            </div>
            <span className="font-semibold text-foreground text-base tracking-tight">
              {cfg.brand.name}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hidden sm:inline">
              {cfg.brand.badge}
            </span>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="w-11 h-11 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <Menu size={28} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>

        {/* ============== PAGE CONTENT ============== */}
        {children}

        {/* ============== FOOTER (shared) ============== */}
        <footer className="py-16 px-6 bg-foreground text-background">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold">{cfg.brand.name}</h2>
              <p className="mt-2 text-sm opacity-60">{cfg.brand.tagline}</p>

              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm opacity-70">
                {cfg.footer.links.map((item) => (
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
                {cfg.footer.disclaimer} {cfg.footer.copyright}
              </p>
            </motion.div>
          </div>
        </footer>

        {/* ============== SIDE MENU ============== */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-foreground/60 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.aside
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
                className="fixed top-0 right-0 bottom-0 z-50 w-[84%] max-w-sm bg-card border-l border-border flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground font-bold"
                      style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
                    >
                      {cfg.brand.logoLetter}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground leading-tight">{cfg.brand.name}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        {cfg.brand.tagline.split("·")[0].trim()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                  {cfg.menu.map((item, i) => (
                    <motion.button
                      key={item.label}
                      type="button"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: EASE }}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setMenuOpen(false);
                        // small delay for close animation
                        setTimeout(() => {
                          navigate({ to: item.path });
                        }, 220);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors text-left"
                    >
                      <item.icon size={18} className="text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                <div className="px-6 py-5 border-t border-border space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors">
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Log Out</span>
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground tracking-wider uppercase">
                    v1.0 &middot; {cfg.brand.badge}
                  </p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ============== TERMS MODAL ============== */}
        <AnimatePresence>
          {termsOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
                onClick={() => setTermsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
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
                <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-4">
                  <div>
                    <h3 id="terms-title" className="text-xl font-bold text-foreground">
                      Terms &amp; Conditions
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">For: {activeFund}</p>
                  </div>
                  <button
                    onClick={() => setTermsOpen(false)}
                    aria-label="Close"
                    className="rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Please read the following terms carefully before proceeding with your investment.
                    By accepting, you confirm that you understand the risks involved.
                  </p>
                  {[
                    { t: "1. Market Risk", d: "Mutual fund investments are subject to market risks. The value of your investment can go up or down based on market conditions and past performance is not indicative of future returns." },
                    { t: "2. KYC Requirement", d: "You must complete your KYC verification using a valid PAN and Aadhaar before any investment is processed. Incomplete KYC may result in delays or cancellation of your SIP." },
                    { t: "3. SIP Auto-Debit", d: `By starting a SIP, you authorize ${cfg.brand.name} to auto-debit the agreed monthly amount from your registered bank account on the scheduled date until you choose to pause or cancel the SIP.` },
                    { t: "4. Charges & Fees", d: `All applicable fund expense ratios, exit loads and statutory taxes will apply as per the scheme documents. ${cfg.brand.name} does not charge any hidden fees on your investments.` },
                    { t: "5. Read Scheme Documents", d: "You are advised to read all scheme related documents carefully before investing. Returns shown anywhere on this platform are illustrative and not guaranteed." },
                    { t: "6. No Investment Advice", d: `Information provided on ${cfg.brand.name} is for general purposes and does not constitute personalized financial advice. Please consult a certified financial advisor before making investment decisions.` },
                  ].map((s) => (
                    <div key={s.t}>
                      <h4 className="font-semibold text-foreground mb-1">{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-border bg-secondary/30 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span className="text-xs text-foreground leading-relaxed">
                      I have read and agree to the Terms &amp; Conditions, and I understand that mutual fund investments are subject to market risks.
                    </span>
                  </label>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setTermsOpen(false)}
                      className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={agreed ? { scale: 1.04 } : undefined}
                      whileTap={agreed ? { scale: 0.96 } : undefined}
                      disabled={!agreed}
                      onClick={() => {
                        if (agreed) {
                          setTermsOpen(false);
                          setConfirmOpen(true);
                        }
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

        {/* ============== INVESTMENT CONFIRMATION ============== */}
        <AnimatePresence>
          {confirmOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
                onClick={() => setConfirmOpen(false)}
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
                        onClick={() => setConfirmOpen(false)}
                        aria-label="Close"
                        className="rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                      <div className="rounded-2xl border border-border p-4 bg-secondary/40">
                        <p className="text-xs text-muted-foreground">Selected Fund</p>
                        <p className="mt-1 font-semibold text-foreground">{activeFund}</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-foreground">Monthly SIP Amount</label>
                          <span className="text-sm font-bold text-primary">{formatINR(amount)}</span>
                        </div>
                        <input
                          type="range"
                          min={cfg.calculator.minMonthly}
                          max={cfg.calculator.maxMonthly}
                          step={500}
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>{formatCurrency(cfg.calculator.minMonthly)}</span>
                          <span>{formatCurrency(cfg.calculator.maxMonthly)}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Monthly SIP Date</label>
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

                      <div className="rounded-2xl border border-border p-4 space-y-3">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          10-Year Projection (12% p.a.)
                        </p>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <p className="text-[10px] text-muted-foreground">Invested</p>
                            <p className="text-sm font-bold text-foreground mt-1">{formatINR(cInvested)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Est. Gains</p>
                            <p className="text-sm font-bold mt-1" style={{ color: "var(--color-success)" }}>
                              {formatINR(cGains)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Total Value</p>
                            <p className="text-sm font-bold text-primary mt-1">{formatINR(cFutureValue)}</p>
                          </div>
                        </div>
                      </div>

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

                    <div className="px-6 py-4 border-t border-border bg-secondary/30 flex gap-3 justify-end">
                      <button
                        onClick={() => setConfirmOpen(false)}
                        className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setConfirmed(true)}
                        className="rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                        style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
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
                      Your investment journey with {cfg.brand.name} has officially begun.
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
                          {activeFund}
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
                      onClick={() => setConfirmOpen(false)}
                      className="mt-6 rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground"
                      style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
                    >
                      Done
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </InvestContext.Provider>
  );
}
