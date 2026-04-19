import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  TrendingUp,
  Calculator,
  Briefcase,
  HelpCircle,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useEffect } from "react";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const items = [
  { icon: Home, label: "Home" },
  { icon: TrendingUp, label: "Top Funds" },
  { icon: Calculator, label: "SIP Calculator" },
  { icon: Briefcase, label: "My Portfolio" },
  { icon: HelpCircle, label: "How It Works" },
  { icon: User, label: "Profile" },
];

export default function SideMenu({ open, onClose }: SideMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
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
            {/* Header */}
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground font-bold"
                  style={{
                    background: "var(--gradient-cta)",
                    boxShadow: "var(--shadow-cta)",
                  }}
                >
                  Z
                </div>
                <div>
                  <p className="font-semibold text-foreground leading-tight">Zypeus</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Smart SIP
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {items.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: EASE }}
                  whileHover={{ x: 4 }}
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors text-left"
                >
                  <item.icon size={18} className="text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-medium">Log Out</span>
              </button>
              <p className="text-[10px] text-center text-muted-foreground tracking-wider uppercase">
                v1.0 &middot; SEBI Registered
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
