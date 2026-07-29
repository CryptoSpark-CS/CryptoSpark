import OrbitMap from "./OrbitMap";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="eyebrow">Software engineering studio</div>
        <h1>
          We build the systems <span className="accent">underneath</span> your business.
        </h1>
        <p className="hero-sub">
          Fintech platforms, web & mobile products, commerce infrastructure, on-chain contracts, and
          trading signal systems — engineered by one team that ships across all five, from
          architecture to production.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Book a technical scoping call →
          </a>
          <a href="#services" className="btn-secondary">
            See what we build
          </a>
        </div>

        <OrbitMap />
      </div>
    </section>
  );
}
