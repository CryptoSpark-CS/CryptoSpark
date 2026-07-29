const STEPS = [
  {
    label: "Stage 01",
    title: "Scope",
    description:
      "We map the system, the constraints, and what \"done\" actually means before writing a line of code.",
  },
  {
    label: "Stage 02",
    title: "Architect",
    description: "Data models, integrations, and infra decisions get made on paper, where changing them is cheap.",
  },
  {
    label: "Stage 03",
    title: "Build",
    description: "Weekly demos, not monthly reveals. You see working software from week one.",
  },
  {
    label: "Stage 04",
    title: "Harden",
    description:
      "Load testing, security review, and — for contracts — a formal audit before anything touches mainnet.",
  },
  {
    label: "Stage 05",
    title: "Run",
    description:
      "We stay on for monitoring, incident response, and the next iteration — not a handoff and a wave goodbye.",
  },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="section-tag">// Process</div>
        <h2 className="section-title">Same five stages, whatever we&apos;re building.</h2>
        <p className="section-desc">The domain changes. The way we de-risk a build doesn&apos;t.</p>

        <div className="pipeline">
          <div className="pipeline-track">
            {STEPS.map((step) => (
              <div className="pstep" key={step.label}>
                <div className="pnode" />
                <div className="plabel">{step.label}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
