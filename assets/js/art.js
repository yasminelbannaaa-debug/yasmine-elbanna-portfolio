/*
  Placeholder artwork generator. Draws simple illustrated SVG compositions so the
  site looks finished before real images are added. Each motif is seeded, so the
  same project always gets the same picture.
*/
(function () {
  "use strict";

  const DEFAULT = ["#F3EEE4", "#E5482B", "#F2B33D", "#171512"];
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function rng(seed) {
    let s = 2166136261;
    for (const c of String(seed)) s = Math.imul(s ^ c.charCodeAt(0), 16777619) >>> 0;
    return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
  }
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  const f = (n) => n.toFixed(1);

  // Smooth closed path through points (Catmull-Rom converted to cubic Béziers).
  function smooth(pts) {
    const n = pts.length;
    let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d + "Z";
  }

  function blobPath(r, cx, cy, rad, n, wob) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rr = rad * (1 - wob + r() * wob * 2);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    return smooth(pts);
  }

  const M = {
    // Bauhaus-style tiles: circles, quarter circles, stripes, triangles.
    grid(w, h, p, r) {
      const s = h / 3, cols = Math.ceil(w / s);
      let o = "";
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < cols; x++) {
          const X = x * s, Y = y * s, cx = X + s / 2, cy = Y + s / 2;
          const bg = pick(r, p), fg = pick(r, p.filter((c) => c !== bg));
          o += `<rect x="${f(X)}" y="${f(Y)}" width="${f(s + 1)}" height="${f(s + 1)}" fill="${bg}"/>`;
          o += `<g transform="rotate(${Math.floor(r() * 4) * 90} ${f(cx)} ${f(cy)})">`;
          const t = Math.floor(r() * 6);
          if (t === 0) o += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s * 0.38)}" fill="${fg}"/>`;
          else if (t === 1) o += `<path d="M${f(X)},${f(Y)}L${f(X + s)},${f(Y)}A${f(s)},${f(s)} 0 0 1 ${f(X)},${f(Y + s)}Z" fill="${fg}"/>`;
          else if (t === 2) o += `<path d="M${f(X)},${f(cy)}A${f(s / 2)},${f(s / 2)} 0 0 1 ${f(X + s)},${f(cy)}Z" fill="${fg}"/>`;
          else if (t === 3) o += `<path d="M${f(X)},${f(Y + s)}L${f(X + s)},${f(Y + s)}L${f(X)},${f(Y)}Z" fill="${fg}"/>`;
          else if (t === 4) for (let i = 0; i < 4; i++) o += `<rect x="${f(X)}" y="${f(Y + (i * s) / 4)}" width="${f(s)}" height="${f(s / 8)}" fill="${fg}"/>`;
          else o += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s * 0.32)}" fill="none" stroke="${fg}" stroke-width="${f(s * 0.12)}"/>`;
          o += `</g>`;
        }
      }
      return o;
    },

    // Retro moon/sun setting behind a striped horizon.
    sun(w, h, p, r) {
      const hy = h * 0.64, R = Math.min(w, h) * 0.3, cx = w * (0.32 + r() * 0.36);
      let o = `<rect width="${w}" height="${h}" fill="${p[0]}"/>`;
      for (let i = 0; i < 22; i++) o += `<circle cx="${f(r() * w)}" cy="${f(r() * hy * 0.85)}" r="${f(1.2 + r() * 2.8)}" fill="${p[3]}" opacity="${f(0.4 + r() * 0.6)}"/>`;
      o += `<circle cx="${f(cx)}" cy="${f(hy - R * 0.3)}" r="${f(R)}" fill="${p[1]}"/>`;
      o += `<rect y="${f(hy)}" width="${w}" height="${f(h - hy)}" fill="${p[0]}"/>`;
      for (let i = 0, y = hy; y < h; i++) {
        const th = 5 + i * 5;
        o += `<rect y="${f(y)}" width="${w}" height="${th}" fill="${p[2]}"/>`;
        y += th + 9 + i * 3;
      }
      return o;
    },

    // Layered waves with a low sun.
    wave(w, h, p, r) {
      let o = `<rect width="${w}" height="${h}" fill="${p[0]}"/>`;
      o += `<circle cx="${f(w * (0.6 + r() * 0.25))}" cy="${f(h * 0.3)}" r="${f(Math.min(w, h) * 0.15)}" fill="${p[3]}"/>`;
      const fills = [p[2], p[1], p[2], p[1]];
      for (let i = 0; i < 4; i++) {
        const y0 = h * (0.42 + i * 0.15), a = h * (0.025 + r() * 0.03), fr = ((2 + r() * 2) * Math.PI * 2) / w, ph = r() * 6.28;
        let line = "";
        for (let x = 0; x <= w + 10; x += 10) line += `L${x},${f(y0 + Math.sin(x * fr + ph) * a)}`;
        o += `<path d="M0,${h}${line}L${w},${h}Z" fill="${fills[i]}"/>`;
        o += `<path d="M${line.slice(1)}" fill="none" stroke="${p[0]}" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;
      }
      return o;
    },

    // A big italic letterform with shapes — reads as identity work.
    letter(w, h, p, r, label) {
      const m = Math.min(w, h), ch = esc((label || "A").slice(0, 2));
      let o = `<rect width="${w}" height="${h}" fill="${p[0]}"/>`;
      o += `<circle cx="${f(w * (0.32 + r() * 0.36))}" cy="${f(h * 0.5)}" r="${f(m * 0.36)}" fill="${p[2]}"/>`;
      o += `<text x="${f(w / 2)}" y="${f(h / 2)}" dy=".34em" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="${f(m * (ch.length > 1 ? 0.6 : 0.82))}" font-weight="600" font-style="italic" fill="${p[1]}" style="font-variation-settings:'SOFT' 100,'WONK' 1">${ch}</text>`;
      o += `<circle cx="${f(w * 0.84)}" cy="${f(h * 0.2)}" r="${f(m * 0.045)}" fill="${p[3]}"/>`;
      o += `<g stroke="${p[1]}" stroke-width="2" opacity=".45"><path d="M24 40H56M40 24V56"/><path d="M${w - 56} ${h - 40}H${w - 24}M${w - 40} ${h - 56}V${h - 24}"/></g>`;
      return o;
    },

    // A friendly character.
    blob(w, h, p, r) {
      const R = Math.min(w, h) * 0.28, cx = w / 2, cy = h * 0.55, gap = Math.min(w, h) / 9;
      let o = `<rect width="${w}" height="${h}" fill="${p[0]}"/>`;
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) if (r() > 0.5) o += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(gap * 0.07)}" fill="${p[3]}" opacity=".22"/>`;
      o += `<ellipse cx="${f(cx)}" cy="${f(cy + R * 1.08)}" rx="${f(R * 0.95)}" ry="${f(R * 0.12)}" fill="${p[3]}" opacity=".14"/>`;
      [-1, 1].forEach((s) => (o += `<ellipse cx="${f(cx + s * R * 0.38)}" cy="${f(cy + R * 0.98)}" rx="${f(R * 0.22)}" ry="${f(R * 0.13)}" fill="${p[3]}"/>`));
      o += `<path d="M${f(cx)},${f(cy - R * 0.9)}q${f(R * 0.1)},${f(-R * 0.38)} ${f(R * 0.4)},${f(-R * 0.42)}q${f(-R * 0.04)},${f(R * 0.32)} ${f(-R * 0.4)},${f(R * 0.42)}z" fill="${p[2]}"/>`;
      o += `<path d="${blobPath(r, cx, cy, R, 9, 0.11)}" fill="${p[1]}"/>`;
      const ey = cy - R * 0.15, ex = R * 0.32, er = R * 0.17, lx = (r() - 0.5) * er * 0.7, ly = (r() - 0.5) * er * 0.5;
      [-1, 1].forEach((s) => {
        o += `<circle cx="${f(cx + s * ex)}" cy="${f(ey)}" r="${f(er)}" fill="#fff"/>`;
        o += `<circle cx="${f(cx + s * ex + lx)}" cy="${f(ey + ly)}" r="${f(er * 0.52)}" fill="${p[3]}"/>`;
        o += `<ellipse cx="${f(cx + s * R * 0.58)}" cy="${f(cy + R * 0.2)}" rx="${f(R * 0.12)}" ry="${f(R * 0.07)}" fill="${p[2]}"/>`;
      });
      o += `<path d="M${f(cx - R * 0.14)},${f(cy + R * 0.16)}Q${f(cx)},${f(cy + R * 0.34)} ${f(cx + R * 0.14)},${f(cy + R * 0.16)}" fill="none" stroke="${p[3]}" stroke-width="${f(R * 0.05)}" stroke-linecap="round"/>`;
      const sx = cx + R * 1.3 * (r() > 0.5 ? 1 : -1), sy = cy - R * 0.85, ss = R * 0.22;
      o += `<path d="M${f(sx)},${f(sy - ss)}Q${f(sx)},${f(sy)} ${f(sx + ss)},${f(sy)}Q${f(sx)},${f(sy)} ${f(sx)},${f(sy + ss)}Q${f(sx)},${f(sy)} ${f(sx - ss)},${f(sy)}Q${f(sx)},${f(sy)} ${f(sx)},${f(sy - ss)}Z" fill="${p[2]}"/>`;
      return o;
    },

    // Stems, leaves and flowers.
    botanical(w, h, p, r) {
      const m = Math.min(w, h);
      let o = `<rect width="${w}" height="${h}" fill="${p[0]}"/>`;
      o += `<circle cx="${f(w * (0.2 + r() * 0.6))}" cy="${f(h * 0.3)}" r="${f(m * 0.24)}" fill="${p[2]}" opacity=".35"/>`;
      const n = 5;
      for (let k = 0; k < n; k++) {
        const x0 = w * (0.12 + (k / (n - 1)) * 0.76) + (r() - 0.5) * w * 0.05, y0 = h + 10;
        const y2 = h * (0.16 + r() * 0.3), bend = (r() - 0.5) * w * 0.18;
        const x1 = x0 + bend, y1 = (y0 + y2) / 2, x2 = x0 + bend * 0.4;
        o += `<path d="M${f(x0)},${y0}Q${f(x1)},${f(y1)} ${f(x2)},${f(y2)}" fill="none" stroke="${p[1]}" stroke-width="${f(Math.max(3, m * 0.008))}" stroke-linecap="round"/>`;
        const leaves = 4 + Math.floor(r() * 3);
        for (let i = 1; i <= leaves; i++) {
          const t = i / (leaves + 1), mt = 1 - t;
          const px = mt * mt * x0 + 2 * mt * t * x1 + t * t * x2, py = mt * mt * y0 + 2 * mt * t * y1 + t * t * y2;
          const side = i % 2 ? 1 : -1, L = h * (0.065 + r() * 0.03) * (1 - t * 0.4);
          o += `<ellipse cx="${f(px + side * L * 0.9)}" cy="${f(py)}" rx="${f(L)}" ry="${f(L * 0.36)}" transform="rotate(${side * -30} ${f(px)} ${f(py)})" fill="${i % 3 ? p[1] : p[2]}"/>`;
        }
        if (r() > 0.3) {
          const fr = m * 0.045;
          for (let j = 0; j < 6; j++) {
            const a = (j / 6) * Math.PI * 2;
            o += `<circle cx="${f(x2 + Math.cos(a) * fr)}" cy="${f(y2 + Math.sin(a) * fr)}" r="${f(fr * 0.75)}" fill="${p[3]}"/>`;
          }
          o += `<circle cx="${f(x2)}" cy="${f(y2)}" r="${f(fr * 0.55)}" fill="${p[0]}"/>`;
        }
      }
      return o;
    },
  };

  // Point on a rounded rectangle (centred on 0,0) at distance d along its edge, with its outward normal.
  function rrPoint(a, b, R, d) {
    const sw = 2 * (a - R), sh = 2 * (b - R), q = (Math.PI * R) / 2, segs = [sw, q, sh, q, sw, q, sh, q];
    let i = 0;
    while (d > segs[i] && i < 7) d -= segs[i++];
    const arc = (cx, cy, t0) => { const t = t0 + d / R; return [cx + Math.cos(t) * R, cy + Math.sin(t) * R, Math.cos(t), Math.sin(t)]; };
    switch (i) {
      case 0: return [-a + R + d, -b, 0, -1];
      case 1: return arc(a - R, -b + R, -Math.PI / 2);
      case 2: return [a, -b + R + d, 1, 0];
      case 3: return arc(a - R, b - R, 0);
      case 4: return [a - R - d, b, 0, 1];
      case 5: return arc(-a + R, b - R, Math.PI / 2);
      case 6: return [-a, b - R - d, -1, 0];
      default: return arc(-a + R, -b + R, Math.PI);
    }
  }

  /* Hand-drawn blob outline sized in real pixels.
     style: "cloud" (scalloped bumps), "wobble" (wonky rounded block), "pill" (wonky capsule). */
  function blob(w, h, { seed = "blob", style = "wobble" } = {}) {
    const r = rng(seed + style), m = Math.min(w, h), cloud = style === "cloud";
    // A soft, squarish potato that fills its box, for cutting images into blobs.
    if (style === "organic") {
      const n = 7, pts = [];
      const sq = (v) => Math.sign(v) * Math.pow(Math.abs(v), 0.78);
      for (let i = 0; i < n; i++) {
        const t = ((i + r() * 0.4) / n) * Math.PI * 2, k = 0.84 + r() * 0.16;
        pts.push([w / 2 + sq(Math.cos(t)) * (w / 2) * k, h / 2 + sq(Math.sin(t)) * (h / 2) * k]);
      }
      return smooth(pts);
    }
    const amp = cloud ? Math.min(30, m * 0.06) : Math.min(14, m * 0.03);
    const a = w / 2 - amp * 1.4, b = h / 2 - amp * 1.4;
    const R = Math.min(a, b) * (style === "pill" ? 0.6 : cloud ? 0.4 : 0.25);
    const total = 4 * (a - R) + 4 * (b - R) + 2 * Math.PI * R;
    const n = cloud ? Math.max(10, Math.round(total / 190) * 2) : Math.max(12, Math.round(total / 120));
    const pts = [];
    for (let i = 0; i < n; i++) {
      const [x, y, nx, ny] = rrPoint(a, b, R, (total * i) / n);
      // Cloud bumps are biggest on the left and right ends, gentler along the top and bottom.
      const side = 0.3 + 0.7 * Math.abs(nx);
      const off = cloud ? ((i % 2 ? amp : -amp * 0.3) + (r() - 0.5) * amp * 0.4) * side : (r() * 2 - 1) * amp;
      pts.push([w / 2 + x + nx * off, h / 2 + y + ny * off]);
    }
    return smooth(pts);
  }

  window.Art = {
    blob,
    svg({ motif = "grid", palette, seed = "x", w = 800, h = 600, label = "", title = "" }) {
      const p = palette && palette.length >= 4 ? palette : DEFAULT;
      const draw = M[motif] || M.grid;
      return `<div class="art"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(title || "Placeholder artwork")}">${draw(w, h, p, rng(seed + motif + w + h), label)}</svg></div>`;
    },
  };
})();
