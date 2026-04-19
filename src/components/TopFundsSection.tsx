import { useState } from "react";
import { motion } from "framer-motion";
import TermsModal from "./TermsModal";
import InvestmentConfirmation from "./InvestmentConfirmation";

const funds = [
  { name: "Axis Bluechip Fund", category: "Large Cap", returns1y: "18.4%", returns3y: "15.2%", risk: "Low" },
  { name: "Mirae Asset Emerging Bluechip", category: "Large & Mid Cap", returns1y: "22.1%", returns3y: "17.8%", risk: "Medium" },
  { name: "Parag Parikh Flexi Cap", category: "Flexi Cap", returns1y: "19.7%", returns3y: "16.5%", risk: "Medium" },
  { name: "SBI Small Cap Fund", category: "Small Cap", returns1y: "28.3%", returns3y: "22.1%", risk: "High" },
  { name: "HDFC Mid-Cap Opportunities", category: "Mid Cap", returns1y: "24.6%", returns3y: "19.4%", risk: "Medium" },
];

const riskColor: Record<string, string> = {
  Low: "var(--color-success)",
  Medium: "var(--color-gold)",
  High: "oklch(0.65 0.22 25)",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TopFundsSection() {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);
  const [confirmFund, setConfirmFund] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Top Performing Funds</h2>
          <p className="mt-4 text-muted-foreground text-lg">India's best mutual funds, curated for you</p>
        </motion.div>

        <div className="space-y-4">
          {funds.map((fund, i) => (
            <motion.div
              key={fund.name}
              initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
              whileHover={{ x: 8, scale: 1.01 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-border bg-card p-5 gap-4"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{fund.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{fund.category}</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">1Y Return</p>
                  <p className="font-bold" style={{ color: "var(--color-success)" }}>{fund.returns1y}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">3Y Return</p>
                  <p className="font-bold" style={{ color: "var(--color-success)" }}>{fund.returns3y}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Risk</p>
                  <p className="font-bold text-xs" style={{ color: riskColor[fund.risk] }}>{fund.risk}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  onClick={() => setSelectedFund(fund.name)}
                  className="rounded-full px-5 py-2 text-xs font-semibold text-primary-foreground shrink-0"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  Invest
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <TermsModal
        open={selectedFund !== null}
        fundName={selectedFund ?? undefined}
        onClose={() => setSelectedFund(null)}
        onAccept={() => {
          setConfirmFund(selectedFund);
          setSelectedFund(null);
        }}
      />

      <InvestmentConfirmation
        open={confirmFund !== null}
        fundName={confirmFund ?? undefined}
        onClose={() => setConfirmFund(null)}
      />
    </section>
  );
}
