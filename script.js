// Grid de nós pulsando — representa atividade ao vivo (jogadores/servidores
// conectados). É o único elemento animado por conta própria na página; tudo
// mais só reage a interação do usuário (hover/focus).
(function () {
  const canvas = document.getElementById("signalCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const SIZE = 420;
  canvas.width = SIZE * DPR;
  canvas.height = SIZE * DPR;
  ctx.scale(DPR, DPR);

  const COLS = 7;
  const ROWS = 7;
  const PADDING = 40;
  const cellW = (SIZE - PADDING * 2) / (COLS - 1);
  const cellH = (SIZE - PADDING * 2) / (ROWS - 1);

  const nodes = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const distFromCenter = Math.hypot(c - (COLS - 1) / 2, r - (ROWS - 1) / 2);
      nodes.push({
        x: PADDING + c * cellW,
        y: PADDING + r * cellH,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.6,
        baseR: Math.max(1, 3 - distFromCenter * 0.35),
      });
    }
  }

  // Algumas conexões fixas entre nós próximos, pra sugerir uma rede real
  const links = [];
  nodes.forEach((n, i) => {
    nodes.forEach((m, j) => {
      if (j <= i) return;
      const d = Math.hypot(n.x - m.x, n.y - m.y);
      if (d < cellW * 1.05 && Math.random() > 0.55) links.push([i, j]);
    });
  });

  function draw(t) {
    ctx.clearRect(0, 0, SIZE, SIZE);

    ctx.strokeStyle = "rgba(107, 162, 255, 0.10)";
    ctx.lineWidth = 1;
    links.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    });

    nodes.forEach((n) => {
      const pulse = prefersReducedMotion ? 0.5 : (Math.sin(t * 0.001 * n.speed + n.phase) + 1) / 2;
      const r = n.baseR + pulse * 2.2;
      const alpha = 0.25 + pulse * 0.65;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(107, 162, 255, ${alpha})`;
      ctx.fill();
    });
  }

  if (prefersReducedMotion) {
    draw(0);
    return;
  }

  function loop(t) {
    draw(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
