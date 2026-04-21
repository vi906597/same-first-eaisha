import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, User } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SITE_CONFIG, EASE, ICON_MAP } from "@/lib/site-config";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: `Account — ${SITE_CONFIG.brand.name}` },
      { name: "description", content: SITE_CONFIG.more.subtitle },
      { property: "og:title", content: `Account — ${SITE_CONFIG.brand.name}` },
      { property: "og:description", content: SITE_CONFIG.more.subtitle },
    ],
  }),
});

function AccountPage() {
  return (
    <SiteShell>
      <AccountContent />
    </SiteShell>
  );
}

function AccountContent() {
  const cfg = SITE_CONFIG;
  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{cfg.more.title}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{cfg.more.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cfg.more.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? User;
            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shrink-0"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-1 border border-border text-muted-foreground shrink-0">
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
