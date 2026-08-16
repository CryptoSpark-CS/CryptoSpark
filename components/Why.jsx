const PILLARS = [
  {
    label: "01",
    title: "One senior team",
    description:
      "The same engineers who architect your fintech ledger can wire your smart contract to it — no handoffs between agencies, no context lost in translation.",
  },
  {
    label: "02",
    title: "Security-first by default",
    description:
      "Every system we ship goes through the same hardening pass, whether it's a checkout flow or a contract touching mainnet — not an afterthought bolted on later.",
  },
  {
    label: "03",
    title: "Ship weekly, not quarterly",
    description:
      "You see working software from week one. Weekly demos replace surprise reveals, so problems surface while they're still cheap to fix.",
  },
  {
    label: "04",
    title: "We stay after launch",
    description:
      "Monitoring, incident response, and the next iteration are part of the engagement — not a handoff and a wave goodbye once the system goes live.",
  },
];

export default function Why() {
  return (
    <section className="section why-section" id="why">
      <div className="wrap">
        <div className="section-tag">// Why CryptoSpark</div>
        <h2 className="section-title">
          One team, every system your business runs on.
        </h2>
        <p className="section-desc">
          Most software shops specialize narrowly, which forces growing
          companies to coordinate separate vendors for their fintech backend,
          their web product, their storefront, and their on-chain contracts —
          each with its own conventions, its own security posture, and its own
          idea of what "done" means. CryptoSpark keeps senior engineers embedded
          across all six domains, so the systems your business depends on are
          architected as one coherent whole from the start, not stitched
          together after the fact.
        </p>

        <div className="why-grid">
          {PILLARS.map((p) => (
            <div className="why-card" key={p.label}>
              <div className="why-label">{p.label}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
