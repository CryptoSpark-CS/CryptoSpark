const STATS = [
  { num: "120+", label: "PROJECTS SHIPPED" },
  { num: "5", label: "DOMAINS OF DEPTH" },
  { num: "99.95%", label: "AVG. UPTIME DELIVERED" },
  { num: "18d", label: "AVG. TIME TO FIRST DEMO" },
];

export default function Stats() {
  return (
    <section className="section stats" style={{ padding: 0 }}>
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <div className="num">{s.num}</div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
