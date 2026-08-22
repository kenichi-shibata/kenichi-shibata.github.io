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

  /* ── interactive REPL: <div class="nx-repl"><div class="nx-repl-out"></div><div class="nx-prompt-line">...<input></div></div> ── */
function initRepl(repl) {
  const out = repl.querySelector(".nx-repl-out");
  const input = repl.querySelector("input");
  const routes = JSON.parse(repl.getAttribute("data-routes") || "{}");
  const banner = repl.getAttribute("data-banner") || 'type "help" for available commands';

  function print(html) {
    const div = document.createElement("div");
    div.className = "nx-cmd";
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }
  print('<span class="o">' + banner + "</span>");

  const help = Object.keys(routes).map(
    (c) => '<span class="k">' + c.padEnd(10) + "</span>" + routes[c].desc
  ).join("\n");

  const commands = {
    help: { run: () => print('<span class="out" style="white-space:pre-wrap;color:var(--nx-dim)">' + help + "</span>") },
    clear: { run: () => { out.innerHTML = ""; } },
    whoami: { run: () => print('<span class="s">kenichi shibata — kubernetes platform engineer</span>') },
    ls: { run: () => print('<span class="n">' + Object.keys(routes).join("  ") + "  projects</span>") },
    date: { run: () => print('<span class="o">' + new Date().toString() + "</span>") },
  };
  Object.keys(routes).forEach((cmd) => {
    commands[cmd] = {
      run: () => {
        print('<span class="p">❯</span> <span class="k">' + cmd + "</span>");
        if (routes[cmd].url) window.open(routes[cmd].url, "_blank", "noopener");
        print('<span class="s">→ opening ' + cmd + "…</span>");
      },
    };
  });

  const history = [];
  let hIdx = -1;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const raw = input.value.trim();
      input.value = "";
      if (!raw) return;
      history.push(raw);
      hIdx = history.length;
      print('<span class="p">kenichi@shibata.co.uk</span> <span class="k">~ ❯</span> ' + raw.replace(/</g, "&lt;"));
      const [cmd, ...args] = raw.split(/\s+/);
      const c = commands[cmd.toLowerCase()];
      if (cmd === "echo") print('<span class="o">' + args.join(" ").replace(/</g, "&lt;") + "</span>");
      else if (c) c.run(args);
      else print('<span style="color:var(--nx-red)">command not found: ' + cmd.replace(/</g, "&lt;") + '</span> <span class="o">— try "help"</span>');
    } else if (e.key === "ArrowUp") {
      if (hIdx > 0) input.value = history[--hIdx];
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      input.value = hIdx < history.length - 1 ? history[++hIdx] : (hIdx = history.length, "");
      e.preventDefault();
    }
  });
  repl.addEventListener("click", () => input.focus());
}

document.querySelectorAll(".nx-repl").forEach(initRepl);

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
