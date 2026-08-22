/* NEXUS-UI v1.0.0 — terminal behaviours: boot seq, typewriter, live clock, konami */
(function () {
  "use strict";

  /* ── typewriter: <span data-type="text"></span> ── */
  function typeInto(el) {
    const text = el.getAttribute("data-type") || "";
    const speed = parseInt(el.getAttribute("data-speed") || "28", 10);
    let i = 0;
    el.classList.add("nx-typing");
    (function tick() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i++);
        setTimeout(tick, speed + Math.random() * 40);
      } else {
        el.classList.remove("nx-typing");
      }
    })();
  }
  document.querySelectorAll("[data-type]").forEach(typeInto);

  /* ── boot sequence overlay: <div class="nx-boot"><pre></pre></div> ── */
  const boot = document.querySelector(".nx-boot pre");
  if (boot) {
    const lines = [
      "[ OK ] Reached target k8s control plane",
      "[ OK ] Started containerd.service",
      "[ OK ] Mounted /dev/vaporwave on /retro",
      '[ OK ] Loaded kernel module: synthwave.ko',
      "[ OK ] flux-system healthy — 12 reconciled",
      "[ OK ] argocd app-of-apps synced",
      "[WARN] caffeine.service low — refill recommended",
      "",
      "access granted. welcome back, kenichi.",
    ];
    let i = 0;
    const t = setInterval(() => {
      boot.textContent += lines[i] + "\n";
      if (++i >= lines.length) {
        clearInterval(t);
        setTimeout(() => {
          const wrap = boot.closest(".nx-boot");
          wrap.classList.add("done");
          setTimeout(() => wrap.remove(), 600);
        }, 500);
      }
    }, 160);
  }

  /* ── statusline UTC clock ─────────────────────── */
  function clock() {
    document.querySelectorAll("[data-clock]").forEach((el) => {
      const d = new Date();
      el.textContent =
        d.toTimeString().slice(0, 8) + " BST";
    });
  }
  clock();
  setInterval(clock, 1000);

  /* ── fake uptime counter ──────────────────────── */
  const up = document.querySelector("[data-uptime]");
  if (up) {
    const start = Date.now() - parseInt(up.getAttribute("data-uptime"), 10) * 1000;
    setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
      up.textContent = `${d}d ${h}h ${m}m`;
    }, 1000);
  }

  /* ── konami → glitch storm ───────────────────── */
  const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let pos = 0;
  document.addEventListener("keydown", (e) => {
    pos = e.key === seq[pos] ? pos + 1 : e.key === seq[0] ? 1 : 0;
    if (pos === seq.length) {
      document.body.animate(
        [{ filter: "hue-rotate(0deg)" }, { filter: "hue-rotate(360deg)" }],
        { duration: 1200 }
      );
      console.log("%c⚡ NICE TRY, OPERATOR.", "color:#ff2d95;font-size:20px");
      pos = 0;
    }
  });
})();
