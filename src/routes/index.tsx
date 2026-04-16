import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NeonPay — The Future of Payments" },
      { name: "description", content: "NeonPay is the future of payments. Fast, secure, and simple." },
    ],
  }),
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-primary md:text-7xl">
          NeonPay
        </h1>
        <p className="mt-4 text-sm tracking-[0.3em] uppercase text-muted-foreground">
          The Future of Payments
        </p>
        <div className="mt-10">
          <button
            className="rounded-full px-10 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-cta)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_-8px_oklch(0.55_0.25_280_/_50%)]"
            style={{ background: "var(--gradient-cta)" }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
