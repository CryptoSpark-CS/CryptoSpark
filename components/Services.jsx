import ServiceCard from "./ServiceCard";

const SERVICES = [
  {
    id: "fintech",
    index: "01 / FINTECH",
    title: "Financial platforms",
    description:
      "Core banking flows, ledgering, payment orchestration, and compliance tooling built to move real money without surprises.",
    tags: [
      "double-entry ledgers",
      "payment rails",
      "KYC/AML",
      "fraud rules engines",
    ],
  },
  {
    id: "web",
    index: "02 / WEB & MOBILE",
    title: "Web & mobile applications",
    description:
      "Product engineering for iOS, Android, and web — from the first click-through prototype to an app carrying real daily users.",
    tags: [
      "React / Next.js",
      "Swift / Kotlin",
      "React Native",
      "design systems",
    ],
  },
  {
    id: "ecommerce",
    index: "03 / COMMERCE",
    title: "E-commerce websites",
    description:
      "Storefronts, checkout flows, and inventory systems tuned for conversion and built to survive your busiest sale day.",
    tags: [
      "headless commerce",
      "custom checkout",
      "inventory sync",
      "Shopify / custom stack",
    ],
  },
  {
    id: "blockchain",
    index: "04 / BLOCKCHAIN",
    title: "Smart contracts & protocols",
    description:
      "Solidity and Rust contracts, audited and gas-conscious, plus the tooling to monitor and upgrade them once they're live.",
    tags: [
      "Solidity / EVM",
      "Rust / Solana",
      "contract audits",
      "on-chain monitoring",
    ],
  },
  {
    id: "signals",
    index: "05 / TRADING SIGNALS",
    title: "Market signal systems",
    description:
      "Quant models that turn raw market data into actionable entries and exits — delivered through a dashboard, an API, or straight into your bot.",
    tags: [
      "real-time alerts",
      "backtested strategies",
      "signal API / webhooks",
      "risk & position sizing",
    ],
  },
  {
    id: "marketing",
    index: "06 / MARKETING",
    title: "Growth & performance marketing",
    description:
      "Positioning, content, and paid acquisition built alongside the product — so launch day has a funnel, not just a URL.",
    tags: [
      "SEO / content",
      "paid acquisition",
      "lifecycle & CRM",
      "analytics & attribution",
    ],
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-tag">// Services</div>
        <h2 className="section-title">Five domains, one engineering bar.</h2>
        <p className="section-desc">
          We don&apos;t hand you off between teams per specialty — the same
          senior engineers who architect your fintech ledger can wire your smart
          contract to it.
        </p>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
