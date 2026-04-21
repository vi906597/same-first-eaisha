import {
  Home,
  TrendingUp,
  Calculator,
  Briefcase,
  HelpCircle,
  User,
  Shield,
  Leaf,
  Zap,
  Star,
  Rocket,
  FileCheck,
  Building2,
  CreditCard,
  Sparkles,
  Receipt,
  type LucideIcon,
} from "lucide-react";

/* ╔══════════════════════════════════════════════════════════════════╗
   ║                                                                  ║
   ║   🎨  SITE CONFIG  —  ISSE EDIT KARO, BAAKI KUCH MAT CHHEDO       ║
   ║                                                                  ║
   ║   Niche diya hua object hi pura site control karta hai.          ║
   ║   Brand name, colors, text, sections, menu — sab yahan se.       ║
   ║   Koi bhi apni website me ye site directly use kar sakta hai.    ║
   ║                                                                  ║
   ╚══════════════════════════════════════════════════════════════════╝ */

export const SITE_CONFIG = {
  // ─── Brand ───
  brand: {
    name: "Zypeus",
    logoLetter: "Z",
    tagline: "Smart SIP · Mutual Funds · Wealth Growth",
    badge: "SEBI Registered",
  },

  // ─── Hero (home page) ───
  hero: {
    eyebrow: "Smart SIP · Mutual Funds · Wealth Growth",
    titlePart1: "Zy",
    titlePart2: "peus",
    subtitle:
      "Invest your money smartly through SIPs in top mutual funds. A little every month, a lot in the future.",
    primaryCta: "Start SIP Now",
    secondaryCta: "Learn More",
    stats: [
      { label: "Active SIPs", value: "2.4L+" },
      { label: "Assets Under Management", value: "₹1200 Cr" },
      { label: "Avg. Annual Returns", value: "14.2%" },
    ],
  },

  // ─── Features (home page) ───
  features: {
    title: "Everything you need, in one place",
    subtitle:
      "Powerful tools and features designed to make mutual fund investing simple, smart and rewarding for everyone.",
    items: [
      { icon: "📈", title: "SIP Calculator", desc: "See exactly how your monthly investment can grow — with real-time projections." },
      { icon: "🛡️", title: "Risk Analysis", desc: "Understand your risk profile and choose funds that match your goals perfectly." },
      { icon: "⚡", title: "Auto-Invest", desc: "Set it once and forget it — your SIP runs automatically every month, hassle-free." },
      { icon: "🏆", title: "Top Funds", desc: "Discover India's best performing mutual funds — handpicked, ranked and reviewed." },
      { icon: "📊", title: "Portfolio Tracker", desc: "Track your entire portfolio in one place — returns, allocation and performance." },
      { icon: "🔔", title: "Smart Alerts", desc: "Get instant updates on market moves, NAV changes and SIP reminders." },
    ],
  },

  // ─── SIP Calculator ───
  calculator: {
    title: "SIP Calculator",
    subtitle: "See how your wealth can grow over time",
    defaultMonthly: 5000,
    defaultYears: 10,
    expectedReturnRate: 12,
    minMonthly: 500,
    maxMonthly: 100000,
    minYears: 1,
    maxYears: 30,
  },

  // ─── Top Funds ───
  funds: {
    title: "Top Performing Funds",
    subtitle: "India's best mutual funds, curated for you",
    items: [
      { name: "Axis Bluechip Fund", category: "Large Cap", returns1y: "18.4%", returns3y: "15.2%", risk: "Low" },
      { name: "Mirae Asset Emerging Bluechip", category: "Large & Mid Cap", returns1y: "22.1%", returns3y: "17.8%", risk: "Medium" },
      { name: "Parag Parikh Flexi Cap", category: "Flexi Cap", returns1y: "19.7%", returns3y: "16.5%", risk: "Medium" },
      { name: "SBI Small Cap Fund", category: "Small Cap", returns1y: "28.3%", returns3y: "22.1%", risk: "High" },
      { name: "HDFC Mid-Cap Opportunities", category: "Mid Cap", returns1y: "24.6%", returns3y: "19.4%", risk: "Medium" },
    ],
  },

  // ─── Dashboard / SIP Plans ───
  dashboard: {
    title: "Choose Your SIP Plan",
    subtitle: "Pre-built plans for every goal — start from just ₹100/month",
    greeting: "Hello, Investor 👋",
    quickStats: [
      { label: "Total Invested", value: "₹0" },
      { label: "Current Value", value: "₹0" },
      { label: "Active SIPs", value: "0" },
    ],
    plans: [
      { id: 1, name: "Stability SIP", amount: 100, returns: "8-12%", risk: "Low", icon: "shield", popular: false, color: "var(--color-success)" },
      { id: 2, name: "Starter SIP", amount: 500, returns: "12-15%", risk: "Low", icon: "leaf", popular: false, color: "var(--color-success)" },
      { id: 3, name: "Growth SIP", amount: 1000, returns: "15-18%", risk: "Medium", icon: "trending", popular: true, color: "var(--color-gold)" },
      { id: 4, name: "Power SIP", amount: 2500, returns: "18-22%", risk: "Medium-High", icon: "zap", popular: false, color: "var(--color-gold)" },
      { id: 5, name: "Premium SIP", amount: 5000, returns: "20-25%", risk: "High", icon: "star", popular: false, color: "oklch(0.65 0.22 25)" },
      { id: 6, name: "Booster SIP", amount: 10000, returns: "23-28%", risk: "High", icon: "rocket", popular: false, color: "oklch(0.65 0.22 25)" },
    ],
    customPlaceholder: "Or enter custom amount (₹100+)",
    investCta: "Invest Now",
  },

  // ─── Portfolio (demo data) ───
  portfolio: {
    title: "My Portfolio",
    subtitle: "Track your investments and watch them grow",
    summary: {
      totalValue: 245680,
      invested: 180000,
      gains: 65680,
      gainPercent: 36.5,
      todayChange: 2840,
      todayChangePercent: 1.17,
    },
    holdings: [
      { name: "Growth SIP", invested: 60000, current: 84200, units: 1245.8, nav: 67.62, change: 2.4 },
      { name: "Premium SIP", invested: 75000, current: 102480, units: 982.4, nav: 104.31, change: 1.8 },
      { name: "Starter SIP", invested: 30000, current: 38500, units: 654.2, nav: 58.85, change: -0.6 },
      { name: "Stability SIP", invested: 15000, current: 20500, units: 320.1, nav: 64.04, change: 0.9 },
    ],
  },

  // ─── Transaction History (demo) ───
  transactions: {
    title: "Recent Transactions",
    subtitle: "All your SIP investments and withdrawals in one place",
    items: [
      { id: "TXN-2410001", type: "SIP Investment", plan: "Growth SIP", amount: 1000, date: "5 Apr 2026", status: "Success" },
      { id: "TXN-2403021", type: "SIP Investment", plan: "Premium SIP", amount: 5000, date: "5 Apr 2026", status: "Success" },
      { id: "TXN-2403020", type: "SIP Investment", plan: "Starter SIP", amount: 500, date: "5 Mar 2026", status: "Success" },
      { id: "TXN-2402019", type: "Withdrawal", plan: "Stability SIP", amount: 2000, date: "12 Feb 2026", status: "Processing" },
      { id: "TXN-2402018", type: "SIP Investment", plan: "Growth SIP", amount: 1000, date: "5 Feb 2026", status: "Success" },
    ],
  },

  // ─── More / Account ───
  more: {
    title: "Account & Settings",
    subtitle: "Manage your profile, KYC, bank details and cards",
    items: [
      { icon: "fileCheck", title: "Complete KYC", desc: "Verify your identity using Aadhaar & PAN", badge: "Pending" },
      { icon: "building", title: "Bank Accounts", desc: "Manage linked bank accounts for SIPs", badge: "1 Linked" },
      { icon: "creditCard", title: "Eaisha Card", desc: "Apply for the Zypeus prepaid investment card", badge: "Apply" },
      { icon: "user", title: "Profile Settings", desc: "Update name, email, phone & preferences", badge: "" },
      { icon: "shield", title: "Security", desc: "Password, 2FA and device sessions", badge: "" },
      { icon: "receipt", title: "Tax Statements", desc: "Download capital gains reports for ITR filing", badge: "FY 2025-26" },
    ],
  },

  // ─── How It Works ───
  howItWorks: {
    title: "How It Works",
    subtitle: "Start investing in just 4 simple steps",
    steps: [
      { step: "01", title: "Sign Up", desc: "Create your account in just 2 minutes — quick and easy." },
      { step: "02", title: "Complete KYC", desc: "Instant e-KYC using your Aadhaar and PAN card." },
      { step: "03", title: "Choose a Fund", desc: "Pick the best fund that aligns with your financial goals." },
      { step: "04", title: "Start Your SIP", desc: "Set your monthly amount and let auto-invest do the rest." },
    ],
  },

  // ─── Footer ───
  footer: {
    links: ["About", "Features", "Calculator", "Top Funds", "Contact"],
    disclaimer:
      "Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.",
    copyright: "© 2026 Zypeus. All rights reserved.",
  },

  // ─── Side Menu ───
  // `path` = TanStack Router route to navigate to
  menu: [
    { icon: Home, label: "Home", path: "/" },
    { icon: Sparkles, label: "Dashboard", path: "/dashboard" },
    { icon: TrendingUp, label: "Top Funds", path: "/funds" },
    { icon: Calculator, label: "SIP Calculator", path: "/calculator" },
    { icon: Briefcase, label: "My Portfolio", path: "/portfolio" },
    { icon: Receipt, label: "Transactions", path: "/transactions" },
    { icon: HelpCircle, label: "How It Works", path: "/how-it-works" },
    { icon: User, label: "Account", path: "/account" },
  ] as { icon: LucideIcon; label: string; path: string }[],
};

/* ╔══════════════════════════════════════════════════════════════════╗
   ║   👇  HELPERS  —  Iske niche kuch edit karne ki zaroorat nahi.    ║
   ╚══════════════════════════════════════════════════════════════════╝ */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatCurrency = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

export const riskColor: Record<string, string> = {
  Low: "var(--color-success)",
  Medium: "var(--color-gold)",
  High: "oklch(0.65 0.22 25)",
};

export const txStatusColor: Record<string, string> = {
  Success: "var(--color-success)",
  Processing: "var(--color-gold)",
  Failed: "oklch(0.65 0.22 25)",
};

export const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  leaf: Leaf,
  trending: TrendingUp,
  zap: Zap,
  star: Star,
  rocket: Rocket,
  fileCheck: FileCheck,
  building: Building2,
  creditCard: CreditCard,
  user: User,
  receipt: Receipt,
};

export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

export const cardVariant = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.75, ease: EASE },
  }),
};

// Page-level wrapper used by every secondary route to keep header spacing consistent
export const PAGE_CLASS = "min-h-screen bg-background pt-28 md:pt-32 pb-20 px-6";
