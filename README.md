# Yasmine ElBanna — Portfolio

A personal portfolio for a brand designer and illustrator, written for creative directors who are hiring.
Plain HTML, CSS and JavaScript: no build step, no dependencies.

## View it

Double-click `index.html` to open it in your browser.

## Edit content

**Everything you'll want to change is in `assets/js/content.js`:** your name, headline, availability,
email, facts, clients, case studies, illustrations, experience, the "For creative directors" section and links.
The other files handle layout and behaviour.

All the current text is **sample content**. Replace the projects, numbers, clients, experience and
awards with your own before you publish.

### Add your real images

1. Put image files in `assets/images/` (JPG or WebP, around 2000px wide for full-width images).
2. In `content.js`, add `src` (and a short `alt` description) to the item you're replacing:

```js
cover: { src: "assets/images/hearth-cover.jpg", alt: "Honey jars with illustrated labels" },
```

Items without `src` show generated placeholder artwork.

Suggested sizes: case-study covers 16:9, project cards 4:3, half-width gallery images 4:5,
portrait 4:5. Other sizes still work; they're cropped to fit.

In a case study, add `behance: "https://..."` to show a "View on Behance" button. Leave out `outcome` if you
have no numbers to share and that section is skipped.

For illustrations, case-study covers and gallery images, set `ratio` to the image's own pixel size, written `"width/height"` (for example
`ratio: "2000/1126"`), so the whole artwork shows uncropped. `"tall"`, `"wide"` and `"square"` also work.

### Add your CV

Save it as `assets/Yasmine-ElBanna-CV.pdf`, or change the `cv` path in `content.js`. Set `cv: ""` to hide the buttons.

### The character

Poses are in `assets/character/` as `.webp` files. In `content.js` → `character`:

- `falling`: the pose shown while she falls. The first screen is pinned while you scroll, she falls with
  the scroll, and the `introLinks` stickers (About me, My work, Contact) pop out behind her as she passes.
  When she lands, she switches to the first pose in `poses`.
- `poses`: the order clicks cycle through. The first one is the resting pose.
- `spin`: the quick frames played between poses so the character turns around.

To add a pose, drop a new `.webp` in the folder (same 1352×2000 canvas, feet in the same spot) and add its file name to `poses`.

### "Rooted in Egypt" scene

The layers are in `assets/egypt/` (`sun`, `skyline`, `ground`, `palms`, `rider`). The title and caption are in
`content.js` → `egypt`. Positions are in the "Rooted in Egypt" block of `style.css`, as percentages of the
2000×1126 artwork, and the scroll timing is in `egyptScene()` in `site.js`. The spinning wheels are drawn in
code. Your `wheel-*.webp` files include frame tubes that would spin with them, so they aren't used.

### About: "The road so far"

The About section opens with the "Hi there! Have we met?" intro (`content.js` → `about.bubble`, `about.title`,
`about.bio`), then a winding road your character cycles along as you scroll. Each stop is in `about.path`:
a `year`, a `title` and what you `learned`. The stops spread themselves along the road, so you can add or
remove some. The road's shape is `ROAD` in `site.js`, and the ride is `rideScene()`. On phones the road
becomes a small map and the current stop shows underneath.

### Brand logos strip

The moving strip under "Rooted in Egypt" shows the brands you've worked with, from `content.js` → `clients`.
Each logo in `assets/images/clients/` is a cream (#F4F2EB) PNG on a see-through background, trimmed tight,
so they all match. `h` sets each logo's height in pixels, so tall and wide logos look balanced.

### Rocket cursor

On computers with a mouse, the cursor is `assets/images/rocket.png` (cropped tight, nose at the top right). The nose tip
is the click point. To swap it, replace the image and update the nose position in the `.rocket-turn` /
`.rocket` rules in `style.css` and `ROCKET_REST` (the drawing's resting angle) in `site.js`. Phones and tablets
keep their normal touch behaviour.

### Colours and fonts

Brand colours (`--black`, `--cream`, `--yellow`, `--lilac`) and fonts are at the top of `assets/css/style.css`.
Big headings use **Andre JT** (`assets/fonts/`). It only has English letters, numbers and
`. , ! ? - ' " : ; ( ) & @ # % / + * = _ ~`, so keep characters like em dashes, × or arrows out of
project titles, stats and section headings.

## Publish

The site is just files, so free static hosts work:

- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages / Vercel / Cloudflare Pages:** upload the folder as a static site

## Files

```
index.html          Home page
project.html        Case study page (project.html?p=<slug>)
assets/css/style.css
assets/js/content.js  ← your content
assets/js/art.js      placeholder artwork generator
assets/js/site.js     page rendering and interactions
assets/images/        your images go here
```
