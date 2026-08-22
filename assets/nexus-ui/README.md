# NEXUS-UI

Vaporwave / cyberpunk terminal component library. Powerlevel10k powerline
prompts, neofetch panels, CRT scanlines, glitch headings — zero dependencies,
two files.

Used by [kenichi.shibata.co.uk](https://kenichi.shibata.co.uk).

## Usage

```html
<link rel="stylesheet" href="nexus-ui.css">
<script src="nexus-ui.js" defer></script>
```

## Components

| Class | Purpose |
|---|---|
| `.nx-terminal`, `.nx-titlebar`, `.nx-body` | Chrome window with traffic lights |
| `.nx-prompt` + `.nx-seg .nx-c1..c5` | p10k two-segment powerline prompt |
| `[data-type]` | Typewriter text (JS) |
| `.nx-neofetch` | Neofetch-style info panel |
| `.nx-cmd` (`.p .o .k .s .n`) | Command line w/ syntax colours |
| `.nx-grid` + `.nx-card` | Glowing card grid, hover sweep |
| `.nx-badge .ok/.info/.warn/.hot/.err` | kubectl-style pills |
| `.nx-bar > i[style=width:%]` | Gauge bar |
| `.nx-glitch[data-text]` | RGB-split glitch heading |
| `.nx-kbd` | Keycap |
| `.nx-table` | Terminal table |
| `.nx-h b` | Shell-comment section header |
| `.nx-statusline` + `[data-clock]` `[data-uptime]` | tmux statusline w/ live clock & uptime |
| `.nx-boot pre` | Boot sequence overlay (auto-removes) |
| `.nx-scanlines .nx-vignette` | CRT overlays on `<body>` |

Konami code enabled: `↑↑↓↓←→←→ba`.
