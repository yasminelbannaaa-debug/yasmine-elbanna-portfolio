/*
  ALL SITE CONTENT LIVES HERE.
  Edit the text below and the site updates. Everything is sample content for now —
  replace it with your real projects, clients, experience and links.

  Images: any item with `motif` shows generated placeholder art. To use a real image,
  add `src: "assets/images/your-file.jpg"` (and an `alt` description) to that item.
*/
window.SITE = {
  name: "Yasmine ElBanna",
  shortName: "Yasmine", // used for the logo in the nav
  role: "Brand Designer & Illustrator",
  email: "yasminelbannaaa@gmail.com",
  cv: "assets/Yasmine-ElBanna-CV.pdf", // drop your CV PDF at this path, or set to "" to hide the button

  availability: "Available for freelance & full-time roles — from January 2027",

  /* Big display text uses the Andre JT font, which only has English letters, numbers and
     . , ! ? - ' " : ; ( ) & @ # % / + * = _ ~  (no em dashes, ×, · or arrows). */

  // HTML allowed. <em> turns yellow.
  roleHtml: "Brand designer <em>&amp;</em> illustrator",
  intro:
    "I draw identities people remember: logos, characters, packaging and campaigns with a point of view, built as systems your team can run with.",

  /* Character poses live in assets/character/ as .webp files.
     falling: shown while dropping in. poses: clicked through in this order (first one is the default).
     spin: quick frames played between poses so the character turns around. */
  character: {
    path: "assets/character/",
    falling: "falling",
    spin: ["side", "back", "side"],
    poses: ["wave", "point", "thinking", "excited", "walk", "hello", "look", "glance"],
    hint: "CLICK ME * CLICK ME * ",
  },

  // Stickers that pop out behind the character as she falls (icon: "smile" | "folder" | "mail").
  introLinks: [
    { label: "About me", href: "#about", icon: "smile" },
    { label: "My work", href: "#work", icon: "folder" },
    { label: "Contact", href: "#contact", icon: "mail" },
  ],

  facts: [
    { label: "Expertise", value: "Brand identity · Packaging · Illustration · Campaigns & OOH · Art direction" },
    { label: "Experience", value: "5 years across agencies, in-house & freelance" },
    { label: "Based", value: "Cairo, Egypt" },
    { label: "Languages", value: "Arabic (native) · English & French (fluent)" },
  ],

  /* "Hello" scroll scene right after the falling character. Andre JT characters only. */
  hello: {
    line: "A little about me",
    // Each item is its own paragraph.
    caption: [
      "A coffee addict, a curious mind, a really, really good researcher, and a part-time people watcher.",
      "I love digging deep, connecting the dots, observing people, and turning random ideas and little details into meaningful creative concepts.",
    ],
  },

  /* "Rooted in Egypt" scroll scene. Layers live in assets/egypt/. Title and caption use Andre JT,
     so stick to its characters (no em dashes). */
  egypt: {
    path: "assets/egypt/",
    title: ["ROOTED IN", "EGYPT"],
    caption:
      "Born in Egypt, based in Cairo. When I'm not creating, you'll find me chasing stories, colors, old streets, good coffee and getting lost in conversations worth having.",
  },

  // Brands I've worked with, shown as logos in the moving strip. The files in assets/images/clients/ are
  // cream versions on a see-through background. `h` is the logo's height in pixels, to balance tall and wide logos.
  clients: [
    { name: "KidZania", logo: "assets/images/clients/kidzania.png", h: 40 },
    { name: "Cadbury", logo: "assets/images/clients/cadbury.png", h: 54 },
    { name: "Ninos Kids Wear", logo: "assets/images/clients/ninos.png", h: 64 },
    { name: "McVitie's", logo: "assets/images/clients/mcvities.png", h: 48 },
    { name: "Shifa Hospital", logo: "assets/images/clients/shifa.png", h: 72 },
    { name: "Cilantro", logo: "assets/images/clients/cilantro.png", h: 34 },
    { name: "EFG Hermes ONE", logo: "assets/images/clients/efg-hermes-one.png", h: 60 },
    { name: "Bebeto", logo: "assets/images/clients/bebeto.png", h: 32 },
    { name: "Nutty Scientists", logo: "assets/images/clients/nutty-scientists.png", h: 64 },
    { name: "SOS Children's Villages Egypt", logo: "assets/images/clients/sos-childrens-villages.png", h: 58 },
    { name: "Arafa", logo: "assets/images/clients/arafa.png", h: 72 },
  ],

  socials: [
    { label: "Behance", url: "https://www.behance.net/yasmimelbannaaa" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/yasmine-el-banna" },
    { label: "Instagram", url: "https://www.instagram.com/yasminelbanna" },
  ],

  /* ---------- Case studies ----------
     categories: "brand" | "illustration" | "art-direction" (used by the filters)
     gallery size: "full" (wide) or "half" (two side by side)
     card: optional image for the Work card if the cover doesn't crop well into a blob
  */
  projects: [
    {
      slug: "melon-market-cafe",
      title: "Melon Market & Cafe",
      client: "Melon Market & Cafe",
      year: "2026",
      behance: "https://www.behance.net/gallery/253078125/melon-market-cafe-I-Brand-identity",
      categories: ["brand", "illustration"],
      tags: ["Brand identity", "Logo design", "Illustration"],
      summary:
        "A warm, handcrafted identity for a market cafe built around slow mornings, afternoon pauses and cozy evenings.",
      role: "Brand designer & illustrator",
      deliverables: ["Logo & melon icon", "Colour palette", "Illustration set & pattern", "Packaging & labels", "Menus", "Merch & signage"],
      brief:
        "Melon is more than a cafe. It’s a place for slow mornings, afternoon pauses and cozy evenings, designed for people who look for beauty in everyday life. The challenge was to create a brand that moves seamlessly from morning to night while staying true to the idea of a market cafe: an identity that speaks to busy people looking for small moments of slow joy, and invites them to pause, reconnect and enjoy everyday rituals.",
      approach: [
        "Inspired by the simplicity of village markets, the brand embraces a raw, handcrafted feel that romanticizes everyday living through fresh ingredients and thoughtful experiences. Organic forms and illustrated details celebrate the imperfections of handmade things and the beauty of slowing down.",
        "The logo is built around a soft, approachable character, with the “O” turned into a signature melon seed, a distinctive element that ties straight back to the name and the idea of natural freshness. The palette of butter yellow, warm orange and earthy browns comes from sunlit markets, fresh ingredients and nostalgic village landscapes, for a sense of warmth and familiarity.",
        "Handcrafted illustrations sit alongside clean editorial typography and generous spacing, so the system feels authentic, timeless and full of character across menus, jars, bags, cups and merch.",
      ],
      palette: ["#F4E09F", "#E4913A", "#8E431A", "#69171F"],
      cover: { src: "assets/images/melon/melon-01.gif", alt: "Animated Melon logo: a cream wordmark and melon-slice icon on brown", ratio: "2800/1885" },
      gallery: [
        { src: "assets/images/melon/melon-03.webp", ratio: "2800/1885", alt: "Two friends at a Melon cafe table surrounded by melons and sunflowers, with the opening hours and taglines on the sign", caption: "A place for slow mornings, lunch breaks and cozy nights" },
        { src: "assets/images/melon/melon-04.webp", ratio: "2800/1885", alt: "Cream shopfront with the Melon market and cafe logo in brown 3D letters", caption: "Shopfront signage" },
        { src: "assets/images/melon/melon-08.webp", ratio: "2800/1140", alt: "Melon wordmark in orange on butter yellow with the line Fresh ingredients, honest flavors", caption: "The wordmark, with the “O” as a melon seed" },
        { src: "assets/images/melon/melon-12.webp", ratio: "2800/1140", alt: "Five colour swatches: carbon black, night bordeaux, golden apricot, saddle brown and vanilla custard", caption: "Colour palette" },
        { src: "assets/images/melon/melon-06.webp", ratio: "2800/1885", alt: "Block of butter on striped paper stamped with the Melon wordmark", caption: "The logo pressed into butter" },
        { src: "assets/images/melon/melon-07.webp", ratio: "2800/1885", alt: "Yellow apron with the Melon logo next to a brown pattern of hand-drawn food icons", caption: "Apron and the illustrated icon pattern" },
        { src: "assets/images/melon/melon-16.webp", ratio: "2800/1885", alt: "Slow Morning Club seal next to a server in a white Melon t-shirt carrying iced coffees", caption: "Slow Morning Club seal and staff tees" },
        { src: "assets/images/melon/melon-09.webp", ratio: "2800/1885", alt: "Striped Melon paper bags, a coffee cup, bread and milk bottles", caption: "Takeaway bags and cups" },
        { src: "assets/images/melon/melon-10.webp", ratio: "2800/1885", alt: "Pancakes, a croissant on an illustrated napkin and Melon coasters beside the line Start with fresh mornings, finish with memorable shared moments", caption: "Tableware and brand voice" },
        { src: "assets/images/melon/melon-11.gif", ratio: "1077/725", alt: "Animated pickle jar label in brown with the Melon wordmark and nutrition facts", caption: "Market jar labels" },
        { src: "assets/images/melon/melon-13.webp", ratio: "2800/1885", alt: "Yellow Melon tote bag holding baguettes, and a stack of Melon jam jars", caption: "Tote bag and jam jars" },
        { src: "assets/images/melon/melon-05.webp", ratio: "2800/1884", alt: "Two menu cards with hand-lettered titles and illustrations of a jam jar and melon slices", caption: "Market jar menu" },
        { src: "assets/images/melon/melon-15.webp", ratio: "2800/1885", alt: "Breakfast and coffee bar menu on a table next to a croissant", caption: "Breakfast and coffee bar menu" },
        { src: "assets/images/melon/melon-14.webp", ratio: "2800/1884", alt: "Espresso pouring into two mugs illustrated with pancakes and melon slices", caption: "Illustrated mugs" },
        { src: "assets/images/melon/melon-17.webp", ratio: "2800/1885", alt: "Three social posts: bag and cup in hand, the Melon logo on brown, and the tagline above a Melon market cart", caption: "Social posts and the market cart" },
      ],
    },
    {
      slug: "la-sirena",
      title: "La Sirena",
      client: "La Sirena, Mediterranean seafood",
      year: "2025",
      behance: "https://www.behance.net/gallery/255385999/La-Sirena-Brand-Identity",
      categories: ["brand", "illustration", "art-direction"],
      tags: ["Brand identity", "Illustration", "Art direction"],
      summary:
        "Identity, illustration and art direction for a premium seafood restaurant built around the myth of the siren.",
      role: "Brand identity, illustration & art direction",
      deliverables: ["Logo", "Ship & siren illustrations", "Colour palette", "Menus", "Tableware", "Packaging", "Stationery", "Signage & posters"],
      brief:
        "La Sirena is a premium seafood restaurant built around a single idea: the myth of the siren, whose voice was said to enchant sailors and pull them toward the sea. The brand borrows that same pull, translating it into a dining experience where seafood itself becomes the irresistible call.",
      approach: [
        "The visual identity centers on a surreal, avant-garde illustration. The art direction leans into the surreal on purpose: the ship doesn’t sail on water, it grows out of a shell, as if the vessel and the sea creature that carried it were always the same thing. That dreamlike logic mirrors the siren myth itself.",
        "Rather than illustrating seafood literally (nets, catches, market stalls), the identity stays in that in-between space, like something seen underwater or in a dream. It’s a deliberate departure from the usual coastal, sun-bleached seafood aesthetic, aiming instead for something more hypnotic and a little uncanny: enchanting, in the same way the siren’s voice was.",
        "The palette is built on a tension between deep red and navy blue, two colours that don’t naturally sit together in seafood branding, which is exactly the point. Blue carries the obvious associations: the sea, depth, trust, the coast. Red disrupts that expectation. It’s the colour of urgency, appetite and desire, closer to blood and passion than to water. Placing them side by side, sometimes shifting the whole ship illustration from one to the other, echoes the siren’s own duality: something beautiful and calming on the surface, with a pull underneath that isn’t entirely safe.",
      ],
      palette: ["#1B2A4A", "#8E2A24", "#F4ECDF", "#C9A45C"],
      cover: { src: "assets/images/la-sirena/sirena-01.webp", alt: "Navy La Sirena menu cover with a gold logo and wavy layered tabs", ratio: "1658/919" },
      card: { src: "assets/images/la-sirena/sirena-card.jpg", alt: "Round La Sirena badge with a red siren tail under the navy logo" },
      gallery: [
        { src: "assets/images/la-sirena/sirena-03.webp", ratio: "1658/859", alt: "Warm-lit restaurant interior beside the ship-in-a-shell emblem", caption: "The ship grows out of a shell: the emblem at the heart of the identity" },
        { src: "assets/images/la-sirena/sirena-04.webp", ratio: "1658/859", alt: "La Sirena wordmark in cream on black with Mediterranean seafood underneath", caption: "Wordmark" },
        { src: "assets/images/la-sirena/sirena-05.webp", ratio: "1658/859", alt: "Glowing La Sirena sign carved into a rock wall at night, with a golden ship on top", caption: "Entrance signage" },
        { src: "assets/images/la-sirena/sirena-06.webp", ratio: "1658/402", alt: "Blue fish illustration on a fork beside the line Straight from the sea", caption: "Straight from the sea" },
        { src: "assets/images/la-sirena/sirena-14.webp", ratio: "1658/920", alt: "Open menu with wavy layered section tabs for breakfast, to share, mains, to drink and dessert", caption: "Menu with wave-cut section tabs" },
        { src: "assets/images/la-sirena/sirena-11.webp", ratio: "1658/919", alt: "Wavy drinks menu and a blue reserved sign on a wooden stand", caption: "Drinks menu and reserved sign" },
        { src: "assets/images/la-sirena/sirena-07.webp", ratio: "1658/920", alt: "Menu on a table in the dining room and a deep red napkin holding cutlery", caption: "In the dining room" },
        { src: "assets/images/la-sirena/sirena-09.webp", ratio: "1658/919", alt: "Chef's red apron with a gold pin, and a navy menu with a painted wave edge", caption: "Apron pin and menu binding" },
        { src: "assets/images/la-sirena/sirena-10.webp", ratio: "1658/920", alt: "Coasters and stickers with the ship and siren tail, next to a table set with a drink", caption: "Coasters and stickers" },
        { src: "assets/images/la-sirena/sirena-12.webp", ratio: "1658/919", alt: "Stack of branded plates on red velvet, and a siren-tail coaster beside oysters", caption: "Tableware" },
        { src: "assets/images/la-sirena/sirena-08.webp", ratio: "1658/859", alt: "Black takeaway bag with the gold La Sirena logo and a red siren tail", caption: "Takeaway bag" },
        { src: "assets/images/la-sirena/sirena-15.webp", ratio: "1658/880", alt: "Business cards reading Lovely having you aboard, with a painted blue and gold sea", caption: "Business cards" },
        { src: "assets/images/la-sirena/sirena-16.webp", ratio: "1658/919", alt: "Table flat lay with the menu, a coaster, a business card and oysters", caption: "The table, together" },
        { src: "assets/images/la-sirena/sirena-13.webp", ratio: "1658/787", alt: "Two posters: a cut-out sea view with the tagline, and a seafood tower under the logo", caption: "Posters" },
        { src: "assets/images/la-sirena/sirena-17.webp", ratio: "1658/791", alt: "The poster pair on a street billboard as someone walks past", caption: "Out in the street" },
      ],
    },
    {
      slug: "mab-kids-wear",
      title: "mab Kids Wear",
      client: "mab Kids Wear",
      year: "2025",
      behance: "https://www.behance.net/gallery/241167563/mab-Kids-Wear-I-Brand-identity",
      categories: ["brand", "art-direction"],
      tags: ["Brand identity", "Logo design", "Art direction"],
      summary:
        "A playground-inspired identity for a premium kids wear store, built around the idea of Fashion in Motion.",
      role: "Brand identity, logo design & art direction",
      deliverables: ["Logo & monogram", "Colour palette", "Shopping bags", "Swing tags & labels", "Shop signage", "Campaign & billboard"],
      brief:
        "mab Kids Wear is more than a clothing brand: it’s a celebration of childhood. Designed for curious, energetic kids, mab creates premium everyday essentials that encourage exploration, confidence and endless play. Built around the idea of “Fashion in Motion”, every collection is designed to move with children as they run, climb, discover and grow. The challenge was to create a clothing brand that doesn’t feel too childish for parents, yet has the spirit of every child, while avoiding the bright, saturated colours usually associated with children’s brands.",
      approach: [
        "The visual identity was inspired by the universal joy of playgrounds. From the logo to the supporting graphic system, mab translates playground architecture into a warm, emotional system, relying on rounded geometric forms that communicate safety, exploration and playful motion.",
        "Soft curves and rounded forms shape the logo to reflect curiosity, freedom and imagination. mab is designed to make children feel expressive and comfortable, while giving parents a sense of trust, clarity and timeless style.",
        "The colour palette deliberately moves away from bright, saturated colours. Instead, it embraces a refined combination of muted grey, warm beige and soft white, for an identity that feels timeless, calming and premium. The overall system balances expressive, playful forms with clean typography and generous spacing: approachable, confident and full of personality.",
      ],
      palette: ["#F0DEC8", "#343A40", "#FFFFFF", "#C9B8A3"],
      cover: { src: "assets/images/mab/mab-01.webp", alt: "Two kids in a playground studio set under the white mab Kids Wear logo", ratio: "2800/1575" },
      card: { src: "assets/images/mab/mab-11.webp", alt: "Backlit mab Kids Wear sign above a shopfront" },
      gallery: [
        { src: "assets/images/mab/mab-03.webp", ratio: "2800/1575", alt: "Moodboard of colourful playground architecture and rounded play spaces", caption: "Visual moodboard: playground architecture" },
        { src: "assets/images/mab/mab-04.webp", ratio: "2800/1575", alt: "Sketchbook page of looping mab logo sketches", caption: "Logo design process" },
        { src: "assets/images/mab/mab-06.webp", ratio: "2800/1575", alt: "mab Kids Wear logo on a construction grid", caption: "The logo and its grid" },
        { src: "assets/images/mab/mab-10.webp", ratio: "2800/1575", alt: "Colour swatches: white, charcoal #343A40 and warm beige #F0DEC8 over a photo of a child playing", caption: "Colour palette" },
        { src: "assets/images/mab/mab-05.gif", ratio: "1200/675", alt: "Animated clip of a child climbing on playground bars", caption: "Fashion in Motion" },
        { src: "assets/images/mab/mab-11.webp", ratio: "1920/1080", alt: "Backlit mab Kids Wear sign above a shopfront", caption: "Shop signage" },
        { src: "assets/images/mab/mab-07.webp", ratio: "2800/1575", alt: "Black shopping bags with a looping beige line and checkered sides, hung on a rail", caption: "Shopping bags" },
        { src: "assets/images/mab/mab-14.webp", ratio: "2800/1575", alt: "Parent carrying a child and a kraft mab paper bag", caption: "Paper bag" },
        { src: "assets/images/mab/mab-08.webp", ratio: "2800/1575", alt: "Front and back of round mab swing tags hanging on a garment", caption: "Swing tags" },
        { src: "assets/images/mab/mab-13.webp", ratio: "2800/1575", alt: "Beige woven mab label on dark fabric", caption: "Woven label" },
        { src: "assets/images/mab/mab-09.webp", ratio: "2800/1575", alt: "Child in a playground holding a mab swing tag up to one eye", caption: "On the playground" },
        { src: "assets/images/mab/mab-16.webp", ratio: "2800/1575", alt: "Clothing rail of kids' knits with the mab monogram and the line Premium meets playful", caption: "Premium meets playful" },
        { src: "assets/images/mab/mab-12.webp", ratio: "2800/1575", alt: "Campaign poster: two girls in knitwear in a playground set under the line Mini magic in every outfit", caption: "Campaign: Mini magic in every outfit" },
        { src: "assets/images/mab/mab-15.webp", ratio: "2800/1575", alt: "The campaign poster on a large building billboard", caption: "Billboard" },
      ],
    },
    {
      slug: "super-h",
      title: "Super H",
      client: "KidZania Cairo",
      year: "2024",
      categories: ["brand", "art-direction"],
      tags: ["Visual identity", "Logo design", "Art direction"],
      summary:
        "Logo, visual identity and key art for Super H: A Story of a Boomer in KidZania, a YouTube series for KidZania Cairo.",
      role: "Assistant director, writer & designer",
      deliverables: ["Series logo", "Visual identity", "Key art & posters", "Teasers & announcement reels", "Episode title cards"],
      brief:
        "This YouTube series was conceptualized to explore the idea of a character who feels unwelcome in KidZania, a city run by kids, for kids, using that perspective to highlight themes of belonging, growth and self-discovery. Beyond the storytelling, the series aimed to promote KidZania’s identity as an empowering space for children and to showcase Shifa Hospital’s vital role in nurturing and supporting kids’ well-being.",
      approach: [
        "As assistant director, writer and designer, I developed the visual identity, crafted the logo, defined the series’ playful yet heroic tone, and built a cohesive design system to bring the concept to life across platforms.",
        "Teasers and announcement reels were published, but the full series was never released on YouTube. It exists as a completed but unreleased creative project.",
      ],
      palette: ["#F2BF42", "#C62D24", "#1B2A6B", "#F7F3EA"],
      cover: { src: "assets/images/super-h/superh-06.webp", alt: "Pilot episode title card: a superhero's shadow on a KidZania street at night", ratio: "2000/1123" },
      card: { src: "assets/images/super-h/superh-02.webp", alt: "Super H logo: a yellow SH inside a red no-entry sign" },
      gallery: [
        { src: "assets/images/super-h/superh-01.webp", ratio: "2000/782", alt: "Super H wordmark in yellow with A Story of a Boomer in KidZania in red", caption: "Series wordmark" },
        { src: "assets/images/super-h/superh-02.webp", ratio: "2000/1766", alt: "Super H logo: a yellow SH crossed by a red no-entry sign", caption: "The logo: a hero who isn’t allowed in" },
        { src: "assets/images/super-h/superh-03.webp", ratio: "1560/2000", size: "half", alt: "Comic-book poster with panels of the hero and kids around the SH logo", caption: "Comic-book key art" },
        { src: "assets/images/super-h/superh-05.webp", ratio: "1560/2000", size: "half", alt: "Coming soon poster of the caped hero running past a KidZania shop", caption: "Coming soon poster" },
        { src: "assets/images/super-h/superh-04.webp", ratio: "2000/1687", alt: "Coming soon teaser: the SH logo in a stormy night sky over a KidZania street", caption: "Announcement teaser" },
      ],
    },
  ],

  /* ---------- Illustration gallery ---------- ratio: "tall" | "wide" | "square" */
  illustrationIntro:
    "Illustration isn't a side project. It's how I make brands feel owned: characters, patterns, lettering and editorial work.",
  illustrations: [
    { title: "Ice Cream Mural", meta: "Mural for an ice cream shop", src: "assets/images/ice-cream-mural-v2.webp", alt: "Mural of friends and their pets running down a striped street towards a giant melting scoop of ice cream", ratio: "2000/1126" },
    { title: "Egypt Coffee Festival", meta: "Key visual for The Egypt Coffee Festival", src: "assets/images/egypt-coffee-festival.jpg", alt: "Festival key visual of characters with coffee cups, a skateboard and headphones tumbling around The Egypt Coffee Festival logo, dated 16 and 17 October", ratio: "2400/997" },
    { title: "Cilantro Wall Art", meta: "Cilantro Egypt, Mohandessin branch", src: "assets/images/cilantro-wall.webp", alt: "Single-line wall drawing of coffee, matcha, pastries, faces and the words coffee first, memories and moments under the Cilantro logo", ratio: "1600/1111" },
    { title: "KidZania Main Character Camp", meta: "KidZania Cairo, firefighter", src: "assets/images/main-character-camp-firefighter.webp", alt: "Girl in a firefighter jacket at a water cannon, framed by illustrated flames, a fire helmet, hose and extinguisher", ratio: "1672/941" },
    { title: "KidZania Main Character Camp", meta: "KidZania Cairo, baker", src: "assets/images/main-character-camp-baker.webp", alt: "Boy in a chef's hat rolling dough, framed by illustrated biscuits, a whisk, a cupcake and a mixing bowl", ratio: "1672/941" },
    { title: "Not So Sweet", meta: "Packaging illustration, plain chocolate", src: "assets/images/not-so-sweet-plain.webp", alt: "Purple sugar-free chocolate bar wrapper with an illustrated old man running off with a giant chocolate bar", ratio: "1086/1448" },
    { title: "Not So Sweet", meta: "Packaging illustration, crunchy hazelnut", src: "assets/images/not-so-sweet-hazelnut.webp", alt: "Blue sugar-free chocolate bar wrapper with an illustrated curly-haired woman biting a giant hazelnut chocolate bar", ratio: "1086/1448" },
  ],

  /* ---------- "For creative directors" section ---------- */
  hire: {
    title: "Hiring for your team?<br>Here's what I bring.",
    services: [
      {
        title: "Identity systems",
        text: "From concept to logo, type, colour and guidelines your team can actually use. I design for the hundredth application, not just the launch deck.",
      },
      {
        title: "Illustration as brand",
        text: "Illustration styles that are part of the identity, not decoration: characters, patterns and icon families built so other designers can extend them.",
      },
      {
        title: "Art direction",
        text: "Campaign concepts, shoot direction, and briefing photographers and illustrators, keeping one look consistent across every channel.",
      },
      {
        title: "You will never feel lost",
        text: "I'm a good listener and I keep you in the loop at every step. I take the time to understand you, your audience and your story, so the design tells it the way you'd tell it yourself.",
      },
    ],
    facts: [
      { label: "Engagements", value: "Freelance projects, retainers, contract & full-time roles" },
      { label: "Teams I've worked in", value: "Branding agencies, in-house brand teams, startups" },
      { label: "Typical timeline", value: "Identity concepts in 1–2 weeks" },
    ],
    // A quote from someone you've worked with. Andre JT characters only. `role` can be left empty.
    quote: {
      placeholder: false,
      text: "Working with Yasmine, you quickly realize that when given creative freedom, she doesn't just bring her best to the table; she brings what works best for the brand. She has a great understanding of people, knows how to connect with them, and instinctively understands how to capture their attention and turn that connection into genuine interest in the brand.",
      name: "Creative Director",
      role: "Edrak Agency",
    },
  },

  tools: ["Illustrator", "Photoshop", "InDesign", "After Effects"],

  /* ---------- About ---------- */
  about: {
    // Intro, modelled on sandracreates.com/about. Bubble and title use Andre JT.
    bubble: "Hi there! Have we met?",
    title: "The name's <em>Yasmine!</em>", // HTML allowed; <em> turns yellow
    // photo: true cuts the picture into a blob; leave it out for a cut-out image such as a character pose.
    portrait: { src: "assets/images/yasmine-portrait-cafe.webp", alt: "Yasmine at a café table with a coffee, peeking over her sunglasses", photo: true },
    bio: [
      "Hi, I’m Yasmine ElBanna, a former sociologist who got obsessed with storytelling and design, so I decided to do something about it: building brands that speak to people, tell their stories and ignite their dreams.",
      "With 5 years of experience, I’ve built identities, packaging and campaigns for agencies, entertainment brands, NGOs and startups.",
    ],
    // The road she cycles along as you scroll: each stop is a year and what I learned there.
    // `year` uses Andre JT (no em dashes or accents).
    path: [
      { year: "The start", title: "Political Science, Cairo & Paris", learned: "Studied people: how they think, what moves them and why they choose what they choose." },
      { year: "2019", title: "Student activities", learned: "Found art, and learned graphic design by creating for the student activities I joined." },
      { year: "2021", title: "Freelance graphic designer", learned: "Found my own illustration-led style, designing for small businesses and clients." },
      { year: "2023", title: "Junior designer, Masuliatna (NGO)", learned: "Learned that design can serve a cause, building brand assets for 2 NGOs." },
      { year: "2024", title: "Brand designer, KidZania Cairo", learned: "Learned to design at scale: 3+ campaigns reaching 3M+ visitors a year." },
      { year: "2025", title: "Strategic brand designer, AllMedia", learned: "Learned to turn strategy into visual systems for the Saudi, UAE and Syrian markets." },
      { year: "2026", title: "Promoted to Senior", learned: "Bringing it all together: people, stories and brands that feel like they were made for you." },
    ],
    education: [
      { years: "M1", role: "Political Science", place: "Paris 1 Panthéon-Sorbonne" },
      { years: "BA", role: "Political Science", place: "Cairo University, FEPS (French Section)" },
    ],
    // Awards, features or talks, shown as "Recognition" when there are any.
    recognition: [],
  },

  contact: {
    title: "Hiring a brand designer or illustrator? <em>Let's talk.</em>",
    note: "Freelance, contract or full-time: tell me about the brief or the role. I usually reply within a day.",
  },
};
