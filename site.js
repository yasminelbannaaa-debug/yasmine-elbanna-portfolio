/*
  Renders the home page and case study pages from window.SITE (content.js).
  You shouldn't need to edit this file to change content.
*/
(function () {
  "use strict";

  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CATS = { brand: "Brand identity", illustration: "Illustration", "art-direction": "Art direction" };
  const RATIO = { tall: [600, 800], wide: [800, 560], square: [700, 700] };
  // A preset name, or a real image's own "width/height" so it isn't cropped.
  const ratio = (r) => RATIO[r] || (/^\d+\/\d+$/.test(r || "") ? r.split("/").map(Number) : RATIO.square);
  const COLORS = ["yellow", "lilac", "cream"];
  const SHAPES = ["cloud", "wobble", "pill"];
  const icon = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONS = {
    smile: icon(`<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/><path d="M8 14.2c1.1 1.5 2.4 2.2 4 2.2s2.9-.7 4-2.2"/>`),
    folder: icon(`<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2.2 2.2h7.3A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>`),
    mail: icon(`<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7.5 12 13l8.5-5.5"/>`),
  };
  const arrow = `<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // A real image when `src` is set, otherwise generated placeholder art.
  function media(item, palette, seed, w, h) {
    item = item || {};
    if (item.src) return `<img src="${esc(item.src)}" alt="${esc(item.alt || item.caption || "")}" loading="lazy">`;
    return Art.svg({ motif: item.motif, palette: item.palette || palette, seed, w, h, label: item.label, title: item.caption });
  }

  // An empty element that drawBlobs() fills with a hand-drawn blob at its real size.
  const blobEl = (style, seed, cls = "blob") => `<div class="${cls}" data-blob="${style}" data-seed="${esc(seed)}" aria-hidden="true"></div>`;

  /* ---------- Shared chrome ---------- */

  function header() {
    const links = [
      ["Work", "index.html#work"],
      ["Illustration", "index.html#illustration"],
      ["Working with me", "index.html#hire"],
      ["About", "index.html#about"],
    ];
    return `<header class="nav" id="nav"><div class="wrap nav-inner">
      <a class="logo" href="index.html">${esc(S.shortName || S.name)}</a>
      <ul class="nav-links" id="nav-links">${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
      <div class="nav-right">
        <a class="btn btn-primary btn-sm" href="index.html#contact">Hire me</a>
        <button class="menu-btn" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span><span></span></button>
      </div>
    </div></header>`;
  }

  function footer() {
    return `<footer class="footer"><div class="wrap footer-inner">
      <span>© ${new Date().getFullYear()} ${esc(S.name)}. ${esc(S.role)}.</span>
      <a href="#top">Back to top ↑</a>
    </div></footer>`;
  }

  /* ---------- Home ---------- */

  function hero() {
    const C = S.character;
    const poses = [...new Set([C.falling, ...C.spin, ...C.poses])];
    const clickMe = `<svg viewBox="0 0 120 120">
      <defs><path id="click-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
      <circle cx="60" cy="60" r="58" class="cm-bg"/>
      <g class="cm-ring"><text><textPath href="#click-circle" textLength="274" lengthAdjust="spacing">${esc(C.hint)}</textPath></text></g>
      <path d="M48 46 L76 74 M76 54 V74 H56" class="cm-arrow"/>
    </svg>`;

    // The name, word by word, so it wraps onto two lines on phones.
    const name = S.name
      .split(" ")
      .map((w) => `<span class="word">${[...w].map((ch) => `<span class="drop" aria-hidden="true">${esc(ch)}</span>`).join("")}</span>`)
      .join(" ");

    // Sticker resting spots (side, % from top) and how far into the fall each one pops out (0 to 1).
    const spots = [["left", 18, 0.15], ["right", 40, 0.48], ["left", 62, 0.8]];
    const stickers = S.introLinks
      .map((l, i) => {
        const [side, top, at] = spots[i % spots.length];
        return `<a class="sticker sticker-${side}" data-color="${COLORS[i % 3]}" data-at="${at}" href="${esc(l.href)}" style="top:${top}%">
          ${blobEl(SHAPES[i % 3], "sticker-" + l.label)}
          <span class="sticker-icon">${ICONS[l.icon] || ""}</span>
          <span class="sticker-label">${esc(l.label)}</span>
        </a>`;
      })
      .join("");

    return `<section class="fall" id="intro">
      <div class="fall-sticky">
        ${starField()}
        <div class="scroll-hint" aria-hidden="true"><span class="scroll-hint-in"><span class="mouse"><i></i></span>Scroll</span></div>
        <div class="wrap fall-inner">
          <h1 class="hero-name"><span class="sr-only">${esc(S.name)}, ${esc(S.role)}</span>${name}</h1>
          <div class="fall-area">
            ${blobEl("cloud", "hero", "ground")}
            <nav class="fall-icons" aria-label="Jump to">${stickers}</nav>
            <button class="char" type="button" aria-label="My character. Click to change pose.">
              <span class="char-tilt">
                <span class="char-shadow"></span>
                <span class="char-body">${poses
                  .map((p) => `<img src="${esc(C.path + p)}.webp" alt="" data-pose="${esc(p)}" decoding="async" draggable="false">`)
                  .join("")}</span>
                <span class="click-me" aria-hidden="true">${clickMe}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>`;
  }

  /* Stars behind the falling scene, in three depths. Each layer is taller than the screen by its speed, so
     character() can slide it up as she falls (near stars faster than far ones) without running out of sky. */
  const SPARK = `<svg viewBox="-10 -10 20 20"><path d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10Z"/></svg>`;
  function starField() {
    const tint = () => ["cream", "cream", "cream", "yellow", "lilac"][Math.floor(Math.random() * 5)];
    // [speed, dots, dot size range px, sparkles]
    const layers = [[0.25, 110, [1.6, 2.8], 2], [0.6, 60, [2.6, 4], 6], [1.1, 22, [3.5, 5.5], 9]];
    return `<div class="fall-stars" aria-hidden="true">${layers
      .map(([speed, dots, [lo, hi], sparks]) => {
        let o = "";
        for (let i = 0; i < dots; i++) {
          const d = (lo + Math.random() * (hi - lo)).toFixed(1);
          o += `<i class="st" data-color="${tint()}" style="left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;--d:${d}px;--t:${(-Math.random() * 4).toFixed(2)}s"></i>`;
        }
        for (let i = 0; i < sparks; i++) {
          const s = Math.round((speed > 1 ? 20 : speed > 0.5 ? 14 : 9) + Math.random() * (speed > 1 ? 18 : 8));
          o += `<i class="st-spark" data-color="${tint()}" style="left:${(4 + Math.random() * 92).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;--d:${s}px;--t:${(-Math.random() * 3).toFixed(2)}s">${SPARK}</i>`;
        }
        return `<div class="star-layer" data-speed="${speed}" style="height:${(1 + speed) * 100}%">${o}</div>`;
      })
      .join("")}</div>`;
  }

  /* "A little about me": a pinned scene modelled on nesilnoble.com's "Hello" section. */
  function hello() {
    const H = S.hello;
    const words = H.line
      .split(" ")
      .map((w) => `<span class="hi-word">${[...w].map((ch) => `<span class="hi-ch">${esc(ch)}</span>`).join("")}</span>`)
      .join(" ");
    const star = `<svg viewBox="-10 -10 20 20"><path d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10Z"/></svg>`;
    // [left %, top %, colour, size]
    const sparks = [[9, 16, "yellow", 1], [88, 12, "cream", 0.8], [15, 74, "lilac", 0.75], [82, 70, "yellow", 1.15], [52, 6, "cream", 0.6], [94, 44, "lilac", 0.65]]
      .map(([x, y, c, s]) => `<span class="hi-spark" data-color="${c}" style="left:${x}%;top:${y}%;--s:${s}">${star}</span>`)
      .join("");
    return `<section class="hello" id="hello">
      <div class="hi-sticky">
        <div class="hi-inner">
          <div class="hi-sparks" aria-hidden="true">${sparks}</div>
          <h2 class="hi-line"><span class="sr-only">${esc(H.line)}</span><span aria-hidden="true">${words}</span></h2>
          <svg class="hi-squig" viewBox="0 0 300 30" aria-hidden="true"><path pathLength="1" d="M6 15 Q 26 1 46 15 T 86 15 T 126 15 T 166 15 T 206 15 T 246 15 T 286 15"/></svg>
          <div class="hi-cap">${[].concat(H.caption).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
      </div>
    </section>`;
  }

  /* Bike wheels for the rider (Egypt scene and the About path), drawn in code so they can spin.
     Spokes at slightly uneven angles so the wheel looks hand-drawn. #eg-rough is defined in egypt(). */
  const SPOKES = Array.from({ length: 10 }, (_, i) => {
    const a = ((i * 36 + (i % 3) * 4) * Math.PI) / 180;
    return `<line x1="${(Math.cos(a) * 10).toFixed(1)}" y1="${(Math.sin(a) * 10).toFixed(1)}" x2="${(Math.cos(a) * 70).toFixed(1)}" y2="${(Math.sin(a) * 70).toFixed(1)}"/>`;
  }).join("");
  const wheel = (cls) => `<svg class="eg-wheel ${cls}" viewBox="-100 -100 200 200" aria-hidden="true">
      <g filter="url(#eg-rough)">
        <circle r="89" class="w-tyre"/><circle r="80" class="w-band"/><circle r="72" class="w-rim"/>
        <g class="w-spokes">${SPOKES}</g>
        <circle r="12" class="w-hub"/><circle r="6.5" class="w-hub-in"/>
      </g>
    </svg>`;

  /* "Rooted in Egypt": a pinned scene modelled on nesilnoble.com's "Based in" section. */
  function egypt() {
    const E = S.egypt, P = esc(E.path);
    const line = (text) =>
      `<span class="eg-line" aria-hidden="true">${[...text]
        .map((ch) => (ch === " " ? `<span class="eg-l eg-sp"> </span>` : `<span class="eg-l">${esc(ch)}</span>`))
        .join("")}</span>`;

    return `<section class="egypt" id="based">
      <svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="eg-rough"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></svg>
      <div class="eg-sticky">
        <div class="eg-scene" aria-hidden="true">
          <img class="eg-layer eg-sun" src="${P}sun.webp" alt="" draggable="false">
          <img class="eg-layer eg-skyline" src="${P}skyline.webp" alt="" draggable="false">
          <div class="eg-layer eg-ground" style="background-image:url('${P}ground.webp')"></div>
          <img class="eg-layer eg-palms" src="${P}palms.webp" alt="" draggable="false">
          <div class="eg-bike">${wheel("eg-wheel-back")}${wheel("eg-wheel-front")}<img src="${P}rider.webp" alt="" draggable="false"></div>
        </div>
        <div class="eg-copy">
          <h2 class="eg-title"><span class="sr-only">${esc(E.title.join(" "))}</span>${E.title.map(line).join("")}</h2>
          <p class="eg-cap">${esc(E.caption)}</p>
          <div class="eg-cta">
            <a class="btn btn-primary" href="#work">See my work ${arrow}</a>
            ${S.cv ? `<a class="btn" href="${esc(S.cv)}" download>Download CV</a>` : ""}
          </div>
        </div>
      </div>
    </section>`;
  }

  function marquee() {
    const item = (c, named) =>
      c.logo
        ? `<img class="client-logo" src="${esc(c.logo)}" alt="${named ? esc(c.name) : ""}" style="--h:${c.h || 44}px">`
        : `<span>${esc(c.name || c)}</span>`;
    // A short list is repeated so the strip never runs out; only the first copy is read out.
    const reps = Math.max(1, Math.ceil(8 / S.clients.length));
    const row = Array.from({ length: reps }, (_, r) => S.clients.map((c) => `${item(c, r === 0)}<i aria-hidden="true">*</i>`).join("")).join("");
    return `<section class="marquee" aria-label="Brands I've worked with">
      <div class="marquee-track"><div class="marquee-group">${row}</div><div class="marquee-group" aria-hidden="true">${row.replace(/alt="[^"]*"/g, 'alt=""')}</div></div>
    </section>`;
  }

  function work() {
    const counts = {};
    S.projects.forEach((p) => p.categories.forEach((c) => (counts[c] = (counts[c] || 0) + 1)));
    const filters = [["all", "All", S.projects.length], ...Object.keys(CATS).filter((k) => counts[k]).map((k) => [k, CATS[k], counts[k]])];
    return `<section class="section wrap" id="work">
      <div class="section-head">
        <div><p class="kicker">Selected work</p><h2 class="section-title reveal">Case studies</h2></div>
        <div class="filters" role="group" aria-label="Filter projects">
          ${filters.map(([k, l, n], i) => `<button class="filter" data-filter="${k}" aria-pressed="${i === 0}">${l}<sup>${n}</sup></button>`).join("")}
        </div>
      </div>
      <div class="projects" id="projects"></div>
    </section>`;
  }

  function project(p, i) {
    return `<a class="project reveal" data-color="${COLORS[i % 3]}" href="project.html?p=${encodeURIComponent(p.slug)}" data-cursor="View">
      ${blobEl(SHAPES[i % 3], p.slug)}
      <div class="project-text">
        <p class="project-num"><span>${String(i + 1).padStart(2, "0")}</span> ${esc(p.year)}</p>
        <h3>${esc(p.title)}</h3>
        <p class="project-summary">${esc(p.summary)}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <span class="project-link">View case study ${arrow}</span>
      </div>
      <div class="project-media" data-clip="organic" data-seed="${esc(p.slug)}-img">${media(p.card || p.cover, p.palette, p.slug, 800, 600)}<svg class="clip-line" preserveAspectRatio="none" aria-hidden="true"><path/></svg></div>
    </a>`;
  }

  function renderProjects(filter) {
    const list = S.projects.filter((p) => filter === "all" || p.categories.includes(filter));
    const box = $("#projects");
    box.innerHTML = list.map(project).join("");
    drawBlobs(box);
    observe(box);
  }

  function illustration() {
    return `<section class="section wrap" id="illustration">
      <div class="section-head">
        <div><p class="kicker">Illustration</p><h2 class="section-title reveal">Drawn by hand,<br><em>built for brands</em></h2></div>
        <p class="section-note reveal">${esc(S.illustrationIntro)}</p>
      </div>
      <div class="ill-grid">${S.illustrations
        .map((it, i) => {
          const [w, h] = ratio(it.ratio);
          return `<button class="ill reveal" data-index="${i}" data-cursor="Open" style="--ar:${w}/${h}" aria-label="Open ${esc(it.title)}">
            <span class="ill-frame">${media(it, it.palette, it.title, w, h)}</span>
            <span class="ill-cap">${esc(it.title)} <em>${esc(it.meta)}</em></span>
          </button>`;
        })
        .join("")}</div>
    </section>`;
  }

  function hire() {
    const H = S.hire;
    return `<section class="cd" id="hire">
      ${blobEl("wobble", "hire")}
      <div class="wrap section">
        <p class="kicker">For creative directors</p>
        <h2 class="section-title reveal">${H.title}</h2>
        <div class="services reveal">${H.services
          .map((s, i) => `<article class="service"><span class="num">0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`)
          .join("")}</div>
        <div class="cd-bottom">
          <div>
            <h3 class="sub">Working together</h3>
            <dl class="cd-facts">${H.facts.map((f) => `<div class="reveal"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}</dl>
            <h3 class="sub">Toolkit</h3>
            <ul class="chips">${S.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <figure class="quote reveal${H.quote.placeholder ? " is-placeholder" : ""}">
            <blockquote>"${esc(H.quote.text)}"</blockquote>
            <figcaption><strong>${esc(H.quote.name)}</strong>${H.quote.role ? `<span>${esc(H.quote.role)}</span>` : ""}</figcaption>
          </figure>
        </div>
      </div>
    </section>`;
  }

  /* About, modelled on sandracreates.com/about: a "Hi there!" intro, then a winding road she cycles along
     as you scroll (see rideScene()), then the quick facts. */
  function about() {
    const A = S.about;
    const list = (items) => items.map((e) => `<li class="reveal"><span>${esc(e.years)}</span><strong>${esc(e.role)}</strong><em>${esc(e.place)}</em></li>`).join("");
    const P = A.portrait;
    return `<section class="about" id="about">
      <div class="wrap section about-hi">
        <div class="about-hi-text">
          <p class="kicker">About</p>
          <p class="about-bubble reveal">${esc(A.bubble)}</p>
          <h2 class="about-title reveal">${A.title}</h2>
          <div class="bio">${A.bio.map((p) => `<p class="reveal">${esc(p)}</p>`).join("")}</div>
        </div>
        <div class="about-hi-art reveal" data-color="lilac">${blobEl("cloud", "about-hi")}${
          P.photo
            ? `<div class="about-photo" data-clip="organic" data-seed="about-photo"><img src="${esc(P.src)}" alt="${esc(P.alt || "")}" loading="lazy" draggable="false"><svg class="clip-line" preserveAspectRatio="none" aria-hidden="true"><path/></svg></div>`
            : P.src
              ? `<img src="${esc(P.src)}" alt="${esc(P.alt || "")}" loading="lazy" draggable="false">`
              : media(P, null, "portrait", 640, 800)
        }</div>
      </div>
      ${A.path?.length ? ride(A.path) : ""}
      <div class="wrap about-more">
        <div>
          <h3 class="sub">At a glance</h3>
          <dl class="facts about-facts">${S.facts.map((f) => `<div class="reveal"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}</dl>
        </div>
        <div>
          ${A.education?.length ? `<h3 class="sub">Education</h3><ul class="timeline">${list(A.education)}</ul>` : ""}
          ${A.recognition?.length ? `<h3 class="sub">Recognition</h3><ul class="timeline">${list(A.recognition)}</ul>` : ""}
          ${S.cv ? `<a class="btn" href="${esc(S.cv)}" download>Download full CV ${arrow}</a>` : ""}
        </div>
      </div>
    </section>`;
  }

  /* The winding road, in SVG units: runs of [y, x from, x to], joined by U-turns of radius r. */
  const ROAD = { w: 1000, h: 800, r: 125, runs: [[110, 70, 860], [360, 860, 140], [610, 140, 930]] };

  function roadPath() {
    const { r, runs } = ROAD;
    let d = `M${runs[0][1]} ${runs[0][0]}`;
    runs.forEach(([, x0, x1], i) => {
      d += ` H${x1}`;
      const next = runs[i + 1];
      if (next) d += ` A${r} ${r} 0 0 ${x1 > x0 ? 1 : 0} ${x1} ${next[0]}`;
    });
    return d;
  }

  // How many stops go on each run: as even as possible, earlier runs take the extras (7 stops: 3, 2, 2).
  const stopsPerRun = (n) => ROAD.runs.map((_, i) => Math.floor(n / ROAD.runs.length) + (i < n % ROAD.runs.length ? 1 : 0));

  // Where each stop sits: spread evenly along the straight runs, never on a bend. s = distance along the road.
  function roadStops(n) {
    const { r, runs } = ROAD, counts = stopsPerRun(n), out = [];
    let acc = 0;
    runs.forEach(([y, x0, x1], i) => {
      const len = Math.abs(x1 - x0);
      for (let j = 0; j < counts[i]; j++) {
        const f = (j + 0.5) / counts[i];
        out.push({ s: acc + len * f, x: x0 + (x1 - x0) * f, y });
      }
      acc += len + Math.PI * r;
    });
    return out;
  }

  function ride(stops) {
    const d = roadPath(), spots = roadStops(stops.length);
    // Narrower labels when a run holds three stops, so neighbours don't touch.
    const stopW = Math.max(...stopsPerRun(stops.length)) > 2 ? 23 : 27;
    const pct = (v, of) => ((v / of) * 100).toFixed(2) + "%";
    const stopText = (st) => `<b>${esc(st.year)}</b><strong>${esc(st.title)}</strong><span>${esc(st.learned)}</span>`;
    return `<div class="ride" id="path">
      <div class="ride-sticky">
        <div class="wrap ride-head"><h2 class="ride-title">The road so far</h2><p class="ride-note">Years, and what each one taught me.</p></div>
        <div class="ride-stage" style="--ar:${ROAD.w}/${ROAD.h}; --arw:${(ROAD.w / ROAD.h).toFixed(4)}; --stop-w:${stopW}%">
          <svg class="ride-road" viewBox="0 0 ${ROAD.w} ${ROAD.h}" aria-hidden="true">
            <path class="road-base" d="${d}"/><path class="road-done" d="${d}"/><path class="road-dash" d="${d}"/>
            ${spots.map((p) => `<circle class="road-stop" cx="${p.x}" cy="${p.y}" r="12"/>`).join("")}
          </svg>
          <ol class="ride-stops">${stops
            .map((st, i) => `<li class="ride-stop" data-s="${spots[i].s.toFixed(1)}" style="left:${pct(spots[i].x, ROAD.w)};top:${pct(spots[i].y + 40, ROAD.h)}">${stopText(st)}</li>`)
            .join("")}</ol>
          <div class="ride-bike" aria-hidden="true"><div class="ride-bike-in">${wheel("eg-wheel-back")}${wheel("eg-wheel-front")}<img src="${esc(S.egypt.path)}rider.webp" alt="" draggable="false"></div></div>
        </div>
        <div class="wrap ride-now" aria-hidden="true">${stops.map((st) => `<div class="ride-now-item">${stopText(st)}</div>`).join("")}</div>
      </div>
    </div>`;
  }

  function contact() {
    return `<section class="contact wrap" id="contact">
      <p class="kicker kicker-center">Contact</p>
      <h2 class="contact-title reveal">${S.contact.title}</h2>
      <p class="contact-note reveal">${esc(S.contact.note)}</p>
      <div class="email-row reveal">
        <a class="email" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
        <button class="copy" data-copy="${esc(S.email)}">Copy</button>
      </div>
      <ul class="socials">${S.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join("")}</ul>
    </section>`;
  }

  function lightbox() {
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Illustration viewer");
    dlg.innerHTML = `<button class="lb-btn lb-close" aria-label="Close">✕</button>
      <button class="lb-btn lb-prev" aria-label="Previous">←</button>
      <button class="lb-btn lb-next" aria-label="Next">→</button>
      <figure><div class="lb-media"></div><figcaption></figcaption></figure>`;
    document.body.appendChild(dlg);

    let idx = 0;
    const show = (i) => {
      const n = S.illustrations.length;
      idx = (i + n) % n;
      const it = S.illustrations[idx], [w, h] = ratio(it.ratio), m = $(".lb-media", dlg);
      m.style.setProperty("--ar", `${w}/${h}`);
      m.style.width = `min(84vw, calc(74vh * ${w / h}))`;
      m.innerHTML = media(it, it.palette, it.title, w, h);
      $("figcaption", dlg).innerHTML = `<strong>${esc(it.title)}</strong> <span>${esc(it.meta)}</span>`;
    };

    $$(".ill").forEach((b) => b.addEventListener("click", () => { show(+b.dataset.index); dlg.showModal(); }));
    $(".lb-close", dlg).addEventListener("click", () => dlg.close());
    $(".lb-prev", dlg).addEventListener("click", () => show(idx - 1));
    $(".lb-next", dlg).addEventListener("click", () => show(idx + 1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }

  /* ---------- Character: falls with the scroll, stickers pop out behind her, lands, swaps poses ---------- */

  function character() {
    const C = S.character, sec = $(".fall"), sticky = $(".fall-sticky"), area = $(".fall-area");
    const char = $(".char"), body = $(".char-body"), shadow = $(".char-shadow"), ground = $(".ground");
    const stickers = $$(".sticker"), starLayers = $$(".star-layer"), hint = $(".scroll-hint");
    const imgs = Object.fromEntries($$("img", body).map((img) => [img.dataset.pose, img]));
    const GRAVITY = "cubic-bezier(.55,0,1,.45)";

    const setPose = (name, flip = false) => {
      Object.values(imgs).forEach((img) => img.classList.remove("on"));
      imgs[name].classList.add("on");
      imgs[name].style.transform = flip ? "scaleX(-1)" : "";
    };

    let current = 0, busy = false, landed = null;

    const setLanded = (on) => {
      if (on === landed) return;
      landed = on;
      char.classList.toggle("is-landed", on);
      area.classList.toggle("landed", on);
      if (busy) return;
      setPose(on ? C.poses[current] : C.falling);
      if (on && !reduceMotion) {
        body.animate(
          [
            { transform: "scale(1.1, .86)" },
            { transform: "translateY(-6%) scale(.96, 1.05)", offset: 0.45 },
            { transform: "translateY(0) scale(1.02, .98)", offset: 0.75 },
            { transform: "none" },
          ],
          { duration: 520, easing: "ease-out" }
        );
      }
    };

    // Scroll progress through the scene (0 = top, 1 = landed) drives everything.
    function update() {
      const H = area.clientHeight, cw = char.offsetWidth, ch = char.offsetHeight;
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const rect = sec.getBoundingClientRect();
      const range = rect.height - sticky.offsetHeight;
      const p = reduceMotion || range <= 0 ? 1 : Math.min(1, Math.max(0, (top - rect.top) / range));
      const down = p >= 0.97;

      // The falling pose only fills the middle of its image: start with her body just under the name and drop it
      // down to the ground. Standing poses fill the image to the feet, so on landing the box sits higher (y1).
      const y0 = -ch * 0.24, yFall = H * 0.97 - ch * 0.74, y1 = H * 0.97 - ch;
      const y = down ? y1 : y0 + (yFall - y0) * Math.min(1, p / 0.97);
      const x = down ? 0 : Math.sin(p * Math.PI * 2) * cw * 0.12;
      const r = down ? 0 : -8 + Math.sin(p * Math.PI * 3) * 14;
      char.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg)`;
      shadow.style.opacity = Math.max(0, (p - 0.7) / 0.3).toFixed(2);

      // The sky streams up past her: each star layer rises by its speed times the screen height.
      const sh = sticky.offsetHeight;
      starLayers.forEach((l) => (l.style.transform = `translate3d(0, ${(-p * l.dataset.speed * sh).toFixed(1)}px, 0)`));
      // The scroll hint is only for people who haven't started scrolling yet.
      hint.classList.toggle("gone", p > 0.02);

      // Each sticker pops out once she's fallen far enough (none at the very start).
      stickers.forEach((s) => s.classList.toggle("in", down || p >= +s.dataset.at));
      // The landing blob only pops up to catch her near the end.
      ground.classList.toggle("in", p > 0.78);
      setLanded(down);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("load", onScroll);
    update();

    char.addEventListener("click", async () => {
      if (busy || !landed) return;
      busy = true;
      current = (current + 1) % C.poses.length;
      $(".click-me").classList.add("is-done");
      const hop = reduceMotion
        ? null
        : body.animate(
            [
              { transform: "none" },
              { transform: "translateY(-12%)", offset: 0.45, easing: "ease-in" },
              { transform: "translateY(0) scale(1.06, .92)", offset: 0.8, easing: "ease-out" },
              { transform: "none" },
            ],
            { duration: 560, easing: "ease-out" }
          );
      if (!reduceMotion) {
        for (const [i, p] of C.spin.entries()) {
          setPose(p, i === C.spin.length - 1);
          await wait(85);
        }
      }
      setPose(landed ? C.poses[current] : C.falling);
      if (hop) await hop.finished;
      busy = false;
    });

    if (reduceMotion || !char.animate) return;

    // First the letters of the name drop in one by one...
    const letters = $$(".hero-name .drop");
    letters.forEach((el, i) => {
      const a = el.animate(
        [
          { transform: `translateY(-120vh) rotate(${i % 2 ? 22 : -18}deg)`, easing: GRAVITY },
          { transform: "translateY(0) rotate(0)", offset: 0.68, easing: "ease-out" },
          { transform: "translateY(-14%) rotate(0)", offset: 0.84, easing: "ease-in" },
          { transform: "none" },
        ],
        { duration: 900, delay: 120 + i * 60, fill: "both" }
      );
      a.finished.then(() => a.cancel());
    });

    // ...then, once the name has landed, the character falls into her starting spot
    // (unless the page loaded already scrolled down).
    if (!landed) {
      const enter = body.animate(
        [{ transform: "translateY(-110vh) rotate(-20deg)", easing: GRAVITY }, { transform: "none" }],
        { duration: 850, delay: 120 + letters.length * 60 + 700, fill: "both" }
      );
      enter.finished.then(() => enter.cancel());
    }
  }

  /* Scroll timeline for "Rooted in Egypt" (p goes 0 to 1 while the scene is pinned):
     title slides in from the right letter by letter, the scenery rises from below, the sun comes up,
     she rides in from the left with spinning wheels, pauses in the middle while the caption fades in,
     then rides off to the right as the scene slides away to the left. Palms, skyline and road drift
     at different speeds so it feels like moving with her. */
  /* The About road: she cycles along it as you scroll through the pinned section. The ridden stretch turns
     yellow, each stop's year and lesson pops in as she reaches it, and the wheels turn with the distance. */
  function rideScene() {
    const sec = $(".ride");
    if (!sec) return;
    const sticky = $(".ride-sticky", sec), stage = $(".ride-stage", sec), bike = $(".ride-bike", sec), inner = $(".ride-bike-in", sec);
    const road = $(".road-base", sec), done = $(".road-done", sec), dots = $$(".road-stop", sec);
    const stops = $$(".ride-stop", sec), now = $$(".ride-now-item", sec), wheels = $$(".eg-wheel", sec);
    const L = road.getTotalLength();
    done.style.strokeDasharray = `${L} ${L}`;
    let facing = 1;

    function update() {
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const rect = sec.getBoundingClientRect();
      const range = rect.height - sticky.offsetHeight;
      const raw = reduceMotion || range <= 0 ? 1 : Math.min(1, Math.max(0, (top - rect.top) / range));
      const s = Math.min(1, Math.max(0, (raw - 0.04) / 0.9)) * L;

      done.style.strokeDashoffset = (L - s).toFixed(1);
      // Face the way she's riding: flip on the way back along the middle run.
      const pt = road.getPointAtLength(s);
      const dx = road.getPointAtLength(Math.min(L, s + 2)).x - road.getPointAtLength(Math.max(0, s - 2)).x;
      if (Math.abs(dx) > 0.5) facing = dx > 0 ? 1 : -1;
      const k = stage.clientWidth / ROAD.w; // px per road unit
      bike.style.transform = `translate(${(pt.x * k).toFixed(1)}px, ${(pt.y * k).toFixed(1)}px) translate(-50%, -100%)`;
      inner.style.transform = `scaleX(${facing})`;
      const r = (wheels[0].offsetWidth || 1) * 0.47;
      wheels.forEach((w) => (w.style.transform = `rotate(${(((s * k) / r) * 57.3).toFixed(1)}deg)`));

      let cur = 0;
      stops.forEach((el, i) => {
        const on = s >= +el.dataset.s - 1;
        el.classList.toggle("on", on);
        dots[i].classList.toggle("on", on);
        if (on) cur = i;
      });
      now.forEach((el, i) => el.classList.toggle("current", i === cur));
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
  }

  function egyptScene() {
    const sec = $(".egypt");
    if (!sec) return;
    const sticky = $(".eg-sticky", sec), scene = $(".eg-scene", sec), bike = $(".eg-bike", sec);
    const sun = $(".eg-sun", sec), skyline = $(".eg-skyline", sec), ground = $(".eg-ground", sec), palms = $(".eg-palms", sec);
    const wheels = $$(".eg-wheel", sec), lines = $$(".eg-line", sec), copy = $(".eg-copy", sec), cap = $(".eg-cap", sec), cta = $(".eg-cta", sec);
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const seg = (p, a, b) => clamp01((p - a) / (b - a));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easeIn = (t) => t * t * t;
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    function update() {
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const rect = sec.getBoundingClientRect();
      const range = rect.height - sticky.offsetHeight;
      // With reduced motion the scene isn't pinned; show it mid-way (everything in place, her in the middle).
      const p = reduceMotion || range <= 0 ? 0.5 : clamp01((top - rect.top) / range);
      const vw = sticky.clientWidth, sw = scene.offsetWidth;

      lines.forEach((ln, li) =>
        $$(".eg-l", ln).forEach((l, i) => {
          const start = 0.02 + li * 0.07 + i * 0.012;
          const e = easeOut(seg(p, start, start + 0.14));
          l.style.transform = `translateX(${((1 - e) * 70).toFixed(2)}vw)`;
          l.style.opacity = e.toFixed(3);
        })
      );

      const up = easeOut(seg(p, 0.06, 0.3));
      const drift = p * sw;
      palms.style.transform = `translate(${(-drift * 0.05).toFixed(1)}px, ${((1 - up) * 40).toFixed(1)}%)`;
      skyline.style.transform = `translate(${(-drift * 0.02).toFixed(1)}px, ${((1 - up) * 30).toFixed(1)}%)`;
      ground.style.transform = `translate(${((0.5 - p) * 0.26 * sw).toFixed(1)}px, ${((1 - up) * 25).toFixed(1)}%)`;
      [palms, skyline, ground].forEach((el) => (el.style.opacity = up.toFixed(3)));
      const rise = easeOut(seg(p, 0.2, 0.42));
      sun.style.transform = `translateY(${((1 - rise) * 60).toFixed(1)}%)`;
      sun.style.opacity = rise.toFixed(3);

      // The camera pans across the scene when it's wider than the screen (phones), then everything slides left on exit.
      const over = Math.max(0, sw - vw);
      const exit = easeIn(seg(p, 0.86, 1));
      const pan = -over * easeInOut(seg(p, 0.1, 0.9)) - (over ? 0 : (sw - vw) / 2) - exit * vw * 0.3;
      scene.style.transform = `translateX(${pan.toFixed(1)}px)`;

      // Bike, in screen space: in from off-screen left, crawl through the middle, off-screen right.
      // Mid-way she sits where she is in the illustration (or screen centre when the camera is panning on phones).
      const bw = bike.offsetWidth, natural = pan + bike.offsetLeft + bw * 0.52;
      const midX = over ? vw / 2 : natural, crawl = midX + vw * 0.03;
      const target = p < 0.5 ? lerp(-0.4 * bw, midX, easeOut(seg(p, 0.12, 0.5))) : p < 0.6 ? lerp(midX, crawl, seg(p, 0.5, 0.6)) : lerp(crawl, vw + 0.4 * bw, easeIn(seg(p, 0.6, 0.97)));
      const tx = target - natural;
      bike.style.transform = `translate(${tx.toFixed(1)}px, ${(Math.sin(tx / 20) * 1.5).toFixed(1)}px)`;
      const r = (wheels[0].offsetWidth || 1) * 0.47;
      wheels.forEach((w) => (w.style.transform = `rotate(${((tx / r) * 57.3).toFixed(1)}deg)`));

      const ce = easeOut(seg(p, 0.3, 0.44));
      cap.style.opacity = ce.toFixed(3);
      cap.style.transform = `translateY(${((1 - ce) * 24).toFixed(1)}px)`;
      // Buttons follow just after the caption; they're only clickable once visible.
      const be = easeOut(seg(p, 0.36, 0.5));
      cta.style.opacity = be.toFixed(3);
      cta.style.transform = `translateY(${((1 - be) * 24).toFixed(1)}px)`;
      cta.style.pointerEvents = be > 0.5 && exit < 0.5 ? "auto" : "none";
      copy.style.transform = `translateX(${(-exit * 30).toFixed(2)}vw)`;
      copy.style.opacity = (1 - exit * 0.8).toFixed(3);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("load", onScroll);
    update();
  }

  /* Scroll timeline for "A little about me" (p goes 0 to 1 while pinned): letters rise from below one by one,
     tumbling and settling slightly crooked; sparkles pop in, the squiggle draws, the caption fades in; then
     the whole line zooms toward you and fades into the next section. */
  function helloScene() {
    const sec = $(".hello");
    if (!sec) return;
    const sticky = $(".hi-sticky", sec), inner = $(".hi-inner", sec), cap = $(".hi-cap", sec);
    const chars = $$(".hi-ch", sec), sparks = $$(".hi-spark", sec), squig = $(".hi-squig path", sec);
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const seg = (p, a, b) => clamp01((p - a) / (b - a));
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easeIn = (t) => t * t * t;
    const back = (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
    // Each letter's start tilt and the small crooked tilt/lift it keeps once settled.
    const tilt = chars.map((_, i) => ({ from: (i % 2 ? 1 : -1) * (28 + ((i * 13) % 20)), rest: (((i * 37) % 9) - 4) * 0.9, lift: (((i * 53) % 7) - 3) * 1.6 }));

    function update() {
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const rect = sec.getBoundingClientRect();
      const range = rect.height - sticky.offsetHeight;
      const p = reduceMotion || range <= 0 ? 0.6 : clamp01((top - rect.top) / range);

      chars.forEach((c, i) => {
        const t = seg(p, i * 0.022, i * 0.022 + 0.18);
        const e = back(t);
        const rot = tilt[i].from + (tilt[i].rest - tilt[i].from) * easeOut(t);
        c.style.transform = `translateY(${((1 - e) * 120 + tilt[i].lift * e).toFixed(2)}%) rotate(${rot.toFixed(2)}deg)`;
        c.style.opacity = Math.min(1, t * 1.6).toFixed(3);
      });

      sparks.forEach((s, k) => {
        const e = back(seg(p, 0.24 + k * 0.035, 0.34 + k * 0.035));
        s.style.transform = `scale(${Math.max(0, e).toFixed(3)})`;
      });
      squig.style.strokeDashoffset = (1 - easeOut(seg(p, 0.3, 0.48))).toFixed(3);

      const leave = seg(p, 0.68, 0.76);
      const ce = easeOut(seg(p, 0.38, 0.5));
      cap.style.opacity = (ce * (1 - leave)).toFixed(3);
      cap.style.transform = `translateY(${((1 - ce) * 24).toFixed(1)}px)`;

      // Zoom toward the viewer on the way out.
      const z = easeIn(seg(p, 0.72, 1));
      inner.style.transform = `scale(${(1 + z * 7).toFixed(3)})`;
      inner.style.opacity = (1 - seg(p, 0.82, 1)).toFixed(3);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
  }

  function renderHome(app) {
    document.title = `${S.name} — ${S.role}`;
    app.innerHTML = hero() + hello() + egypt() + marquee() + work() + illustration() + hire() + about() + contact();
    renderProjects("all");

    $$(".filter").forEach((btn) =>
      btn.addEventListener("click", () => {
        $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        renderProjects(btn.dataset.filter);
      })
    );

    character();
    helloScene();
    egyptScene();
    rideScene();
    lightbox();

    $$(".copy").forEach((btn) =>
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          btn.textContent = "Copied ✓";
        } catch {
          btn.textContent = "Press ⌘C";
        }
        setTimeout(() => (btn.textContent = "Copy"), 2000);
      })
    );
  }

  /* ---------- Case study ---------- */

  function renderProject(app) {
    const slug = new URLSearchParams(location.search).get("p");
    const i = S.projects.findIndex((p) => p.slug === slug);
    if (i < 0) {
      app.innerHTML = `<section class="section wrap notfound"><p class="kicker">404</p><h1 class="section-title">That project isn't here.</h1><a class="btn btn-primary" href="index.html#work">Back to all work ${arrow}</a></section>`;
      return;
    }

    const p = S.projects[i], ni = (i + 1) % S.projects.length, next = S.projects[ni];
    document.title = `${p.title} — ${S.name}, ${S.role}`;

    const meta = [["Client", p.client], ["Year", p.year], ["My role", p.role], ["Deliverables", p.deliverables.join(", ")], ["Worked with", p.team]].filter(([, v]) => v);

    const fig = (g, k) => {
      const full = g.size !== "half", [w, h] = g.ratio ? ratio(g.ratio) : full ? [1600, 900] : [800, 1000];
      return `<figure class="${full ? "full" : "half"} reveal">
        <div class="frame" style="--ar:${w}/${h}">${media(g, p.palette, p.slug + k, w, h)}</div>
        ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
      </figure>`;
    };
    const figs = p.gallery.map(fig);
    const [cw, ch] = p.cover && p.cover.ratio ? ratio(p.cover.ratio) : [1600, 900];

    app.innerHTML = `<article class="cs">
      <header class="cs-head wrap">
        <a class="back" href="index.html#work">← All work</a>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <h1 class="cs-title reveal">${esc(p.title)}</h1>
        <p class="cs-lead reveal">${esc(p.summary)}</p>
        <dl class="cs-meta reveal">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        ${p.behance ? `<a class="btn btn-sm cs-behance" href="${esc(p.behance)}" target="_blank" rel="noopener">View on Behance ${arrow}</a>` : ""}
      </header>

      <div class="wrap cs-cover reveal"><div class="frame" style="--ar:${cw}/${ch}">${media(p.cover, p.palette, p.slug, cw, ch)}</div></div>

      <section class="wrap cs-section"><h2>The brief</h2><div class="cs-body reveal"><p>${esc(p.brief)}</p></div></section>
      <div class="wrap cs-gallery">${figs.slice(0, 1).join("")}</div>

      <section class="wrap cs-section"><h2>My approach</h2><div class="cs-body">${p.approach.map((t) => `<p class="reveal">${esc(t)}</p>`).join("")}</div></section>
      <div class="wrap cs-gallery">${figs.slice(1).join("")}</div>

      ${p.outcome && p.outcome.length ? `<section class="wrap cs-section cs-outcome"><h2>Outcome</h2>
        <div class="stats">${p.outcome.map((o) => `<div class="stat reveal"><strong>${esc(o.value)}</strong><span>${esc(o.label)}</span></div>`).join("")}</div>
      </section>` : ""}

      <div class="wrap">
        <a class="cs-next" data-color="${COLORS[ni % 3]}" href="project.html?p=${encodeURIComponent(next.slug)}" data-cursor="Next">
          ${blobEl("cloud", "next-" + next.slug)}
          <div><p class="kicker">Next project</p><h2 class="cs-next-title">${esc(next.title)} ${arrow}</h2></div>
          <div class="cs-next-media">${media(next.card || next.cover, next.palette, next.slug, 800, 600)}</div>
        </a>
      </div>
    </article>`;
  }

  /* ---------- Behaviour ---------- */

  const io =
    "IntersectionObserver" in window && !reduceMotion
      ? new IntersectionObserver(
          (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
          { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
        )
      : null;

  function observe(root = document) {
    $$(".reveal:not(.in)", root).forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  // Draw each [data-blob] at its real pixel size, and redraw when it resizes.
  // [data-clip] elements are cut into a blob instead, with an outline drawn along the edge.
  const blobRO = "ResizeObserver" in window ? new ResizeObserver((entries) => entries.forEach((e) => paintBlob(e.target))) : null;
  function paintBlob(el) {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const clip = el.dataset.clip, d = Art.blob(w, h, { seed: el.dataset.seed, style: clip || el.dataset.blob });
    const svg = clip ? el.querySelector(".clip-line") : el.firstElementChild;
    if (clip) el.style.clipPath = `path("${d}")`;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.firstElementChild.setAttribute("d", d);
  }
  function drawBlobs(root = document) {
    $$("[data-blob], [data-clip]", root).forEach((el) => {
      if (el.dataset.blob) {
        if (el.firstElementChild) return;
        el.innerHTML = `<svg preserveAspectRatio="none"><path/></svg>`;
      }
      paintBlob(el);
      if (blobRO) blobRO.observe(el);
    });
  }

  /* Rocket cursor (mouse/trackpad only). The rocket's nose sits exactly on the pointer, so clicks stay precise;
     it turns to face the direction of movement and eases back to its resting angle when the mouse stops.
     The native cursor is only hidden once the rocket image has loaded. */
  const ROCKET = "assets/images/rocket.png";
  const ROCKET_REST = -31; // the drawing points up-right at about -31°

  function cursor() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor";
    c.setAttribute("aria-hidden", "true");
    c.innerHTML = `<span class="rocket-turn"><img class="rocket" src="${ROCKET}" alt=""></span><span class="cursor-label"></span>`;
    document.body.appendChild(c);
    const turn = $(".rocket-turn", c), label = $(".cursor-label", c);
    $(".rocket", c).addEventListener("load", () => document.documentElement.classList.add("has-rocket"), { once: true });

    let x = -200, y = -200, px = x, py = y, angle = 0, target = 0, lastMove = 0;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; c.classList.add("visible"); }, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => c.classList.remove("visible"));
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor]");
      c.classList.toggle("on", !!t);
      if (t) label.textContent = t.dataset.cursor;
      c.classList.toggle("hover", !!e.target.closest("a, button, [data-cursor]"));
    });
    addEventListener("pointerdown", () => c.classList.add("boost"));
    addEventListener("pointerup", () => c.classList.remove("boost"));

    (function loop(now) {
      const dx = x - px, dy = y - py;
      if (Math.hypot(dx, dy) > 2) {
        target = (Math.atan2(dy, dx) * 180) / Math.PI - ROCKET_REST;
        lastMove = now;
      } else if (now - lastMove > 450) {
        target = 0;
      }
      angle += ((((target - angle + 540) % 360) - 180) * 0.16); // shortest way round
      px = x;
      py = y;
      c.style.transform = `translate(${x}px, ${y}px)`;
      turn.style.transform = `rotate(${angle.toFixed(1)}deg)`;
      requestAnimationFrame(loop);
    })(0);
  }

  function chrome() {
    const nav = $("#nav"), menu = $(".menu-btn");
    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }));
  }

  /* ---------- Boot ---------- */

  const app = $("#app");
  document.body.insertAdjacentHTML("afterbegin", header());
  if (document.body.dataset.page === "project") renderProject(app);
  else renderHome(app);
  app.insertAdjacentHTML("afterend", footer());
  chrome();
  drawBlobs();
  observe();
  cursor();

  // Content is rendered after load, so jump to #section links manually.
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
})();
