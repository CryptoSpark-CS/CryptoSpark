const FAQS = [
  {
    q: "How is CryptoSpark different from a typical dev agency?",
    a: "Most agencies specialize in one domain and subcontract the rest. We keep senior engineers across fintech, web/mobile, e-commerce, blockchain, trading signals, and marketing on one team, so the systems your business runs on are architected together instead of stitched across vendors.",
  },
  {
    q: "Can you work with our existing engineering team, or do you take over the whole build?",
    a: "Either. We regularly embed alongside in-house teams to cover a specific domain — smart contracts or fintech compliance, for example — and just as often run a project end to end when a client doesn't have that capability yet.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope, but you'll see a working demo within the first two weeks regardless of size. From there, most builds land somewhere between six and sixteen weeks before their first production release, with weekly checkpoints the whole way.",
  },
  {
    q: "Do you handle security audits for smart contracts?",
    a: "Yes — every contract we ship goes through a formal audit before it touches mainnet, and we also take on audit-only engagements for contracts we didn't build, if you need a second set of eyes before launch.",
  },
  {
    q: "What happens after launch?",
    a: "We don't hand off and disappear. Monitoring, incident response, and ongoing iteration are part of the engagement, so the system keeps evolving with your business instead of going stale the day it ships.",
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="wrap">
        <div className="section-tag">// FAQ</div>
        <h2 className="section-title">
          Questions we get before the scoping call.
        </h2>
        <p className="section-desc">
          If yours isn&apos;t here, that&apos;s what the scoping call is for —
          but these cover the ones we hear most.
        </p>

        <div className="faq-list">
          {FAQS.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Structured data so search engines can render this as an FAQ rich snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
