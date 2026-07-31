"use client";

import { useEffect, useRef, useState } from "react";

const DOMAINS = [
  {
    id: "fintech",
    num: "01",
    label: "Fintech",
    sub: "Ledgers, payments, KYC and fraud rules built to move real money.",
    solid: true,
  },
  {
    id: "web",
    num: "02",
    label: "Web / Mobile",
    sub: "Product engineering across iOS, Android and the web.",
    solid: true,
  },
  {
    id: "ecommerce",
    num: "03",
    label: "E-commerce",
    sub: "Storefronts, checkout and inventory tuned for conversion.",
    solid: false,
  },
  {
    id: "blockchain",
    num: "04",
    label: "Smart Contracts",
    sub: "Audited Solidity and Rust contracts with on-chain monitoring.",
    solid: false,
  },
  {
    id: "signals",
    num: "05",
    label: "Trading Signals",
    sub: "Quant models delivering real-time entries and exits via API.",
    solid: true,
  },
  {
    id: "marketing",
    num: "06",
    label: "Marketing",
    sub: "Positioning, content, and paid acquisition built alongside the product.",
    solid: false,
  },
];

export default function OrbitMap() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const stateRef = useRef({
    rotation: 0,
    rotationSpeed: 0.0022,
    paused: false,
    hovered: -1,
    selected: -1,
    pulseT: 0,
    pts: [],
    W: 0,
    H: 0,
    cx: 0,
    cy: 0,
    radiusX: 0,
    radiusY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      s.W = rect.width;
      s.H = rect.height;
      canvas.width = s.W * dpr;
      canvas.height = s.H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.cx = s.W / 2;
      s.cy = s.H / 2;
      s.radiusX = Math.min(s.W * 0.42, 340);
      s.radiusY = Math.min(s.H * 0.38, 120);
    }

    function nodePos(i, rot) {
      const angle = rot + (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: s.cx + Math.cos(angle) * s.radiusX,
        y: s.cy + Math.sin(angle) * s.radiusY,
        z: Math.sin(angle),
      };
    }

    function draw() {
      ctx.clearRect(0, 0, s.W, s.H);
      const ink = "#0A0A0A";
      const line = "#D6D6D3";
      const soft = "#5C5C5C";
      const accent2 = "#7A7A76";

      const pts = DOMAINS.map((_, i) => nodePos(i, s.rotation));
      s.pts = pts;

      // connectors: core -> each node
      pts.forEach((p, i) => {
        ctx.beginPath();
        ctx.moveTo(s.cx, s.cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = s.hovered === i || s.selected === i ? ink : line;
        ctx.lineWidth = s.hovered === i || s.selected === i ? 1.5 : 1;
        ctx.setLineDash(DOMAINS[i].solid ? [] : [4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // data pulses traveling along each connector
      s.pulseT += 0.012;
      pts.forEach((p, i) => {
        const t = (s.pulseT + i * 0.18) % 1;
        const px = s.cx + (p.x - s.cx) * t;
        const py = s.cy + (p.y - s.cy) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // core
      const coreR = 26 + Math.sin(s.pulseT * 1.4) * 2;
      ctx.beginPath();
      ctx.arc(s.cx, s.cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = ink;
      ctx.fill();
      ctx.fillStyle = "#F2F2F0";
      ctx.font = '600 9px "IBM Plex Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("CORE", s.cx, s.cy - 2);
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.fillText("ENGINE", s.cx, s.cy + 9);

      // nodes, farthest drawn first so nearer ones sit on top
      const order = pts.map((_, i) => i).sort((a, b) => pts[a].z - pts[b].z);
      order.forEach((i) => {
        const p = pts[i];
        const d = DOMAINS[i];
        const isActive = s.hovered === i || s.selected === i;
        const depthScale = 0.82 + ((p.z + 1) / 2) * 0.35;
        const r = (isActive ? 9 * 1.35 : 9) * depthScale;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.lineWidth = isActive ? 2 : 1.5;
        ctx.strokeStyle = isActive ? ink : d.solid ? ink : accent2;
        ctx.setLineDash(d.solid ? [] : [3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font =
          (isActive ? "600 " : "500 ") + '10px "IBM Plex Mono", monospace';
        ctx.fillStyle = isActive ? ink : soft;
        const labelY = p.y < s.cy ? p.y - r - 10 : p.y + r + 16;
        ctx.fillText(d.label.toUpperCase(), p.x, labelY);
      });
    }

    function hitTest(mx, my) {
      let best = -1;
      let bestDist = 22;
      s.pts.forEach((p, i) => {
        const dist = Math.hypot(mx - p.x, my - p.y);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    }

    function loop() {
      if (!s.paused && !reducedRef.current) s.rotation += s.rotationSpeed;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hit = hitTest(mx, my);
      canvas.style.cursor = hit >= 0 ? "pointer" : "default";
      if (hit !== s.hovered) {
        s.hovered = hit;
        s.paused = true;
        setActiveIndex(s.selected >= 0 ? s.selected : hit);
      }
    }

    function handleMouseLeave() {
      s.hovered = -1;
      s.paused = false;
      setActiveIndex(s.selected);
    }

    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hit = hitTest(mx, my);
      if (hit >= 0) {
        s.selected = hit;
        setActiveIndex(hit);
        const target = document.getElementById(`service-${DOMAINS[hit].id}`);
        if (target) {
          target.scrollIntoView({
            behavior: reducedRef.current ? "auto" : "smooth",
            block: "center",
          });
          target.classList.remove("module-flash");
          // force reflow so the animation can restart on repeat clicks
          void target.offsetWidth;
          target.classList.add("module-flash");
        }
      }
    }

    function handleTouchStart(e) {
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mx = t.clientX - rect.left;
      const my = t.clientY - rect.top;
      const hit = hitTest(mx, my);
      if (hit >= 0) {
        s.hovered = hit;
        setActiveIndex(hit);
      }
    }

    resize();
    draw();
    rafRef.current = requestAnimationFrame(loop);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const active = activeIndex >= 0 ? DOMAINS[activeIndex] : null;

  return (
    <div className="orbit-panel">
      <div className="schematic-label">
        <span>SYSTEM MAP — 06 ACTIVE DOMAINS</span>
        <span id="orbitStatus">LIVE</span>
      </div>
      <div className="orbit-stage">
        <canvas ref={canvasRef} id="orbitCanvas" />
        <div className="orbit-detail">
          <div className="orbit-detail-num">{active ? active.num : "00"}</div>
          <h4>{active ? active.label : "Engineering core"}</h4>
          <p>
            {active
              ? active.sub
              : "Hover a node to inspect the domain. Click one to jump to it below."}
          </p>
          <a
            href={active ? `#service-${active.id}` : "#services"}
            className="orbit-link"
          >
            {active ? `View ${active.label} ↓` : "Browse all services ↓"}
          </a>
        </div>
      </div>
    </div>
  );
}
