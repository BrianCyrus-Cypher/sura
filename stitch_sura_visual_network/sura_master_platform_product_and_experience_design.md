# Sura Master Platform, Product, and Experience Design

**Document type:** Standalone product and UI/UX design specification  
**Status:** Pre-implementation design blueprint  
**Version:** 1.0  
**Scope:** Complete Sura platform experience, aesthetics universe, roles, workflows, and AI Showroom 3D interaction system  
**Important:** This document is intentionally created outside the Sura repository. It is a planning artifact only and does not change the project codebase.

> **Sura should make a person’s visual instinct feel worth following, then make the next useful action feel obvious.**

## 1. Executive definition

Sura is an installable, image-led local aesthetics platform for discovering, composing, publishing, and acting on visual directions. It brings together people, companies, products, places, materials, services, references, and small details that shape the way someone wants to live. A user should be able to begin with a feeling, find visual evidence, organise it into a personal direction, explore practical options, and move toward a clear next step.

A company should be able to show what it makes or provides through a visual catalogue, describe the details that affect a decision, publish approved offers, receive a qualified brief or inquiry, and understand how its work is being discovered. Administrators should be able to protect quality, identity, verification, privacy, and public trust without disrupting the visual character of the platform.

Sura is not a generic website, a conventional marketplace, or an Instagram/TikTok/X copy. It is a **living local visual network**. Familiar behaviours such as following, curating, saving, and reposting may exist, but they are organised around aesthetic direction and useful action rather than attention volume or conversation for its own sake. The existing product baseline describes this as a bridge between image-led discovery, personal curation, local commerce, structured briefs, private boards, AI-assisted planning, verified company profiles, and clear product offers. [1]

### 1.1 The core loop

```text
See a signal
  → understand its visual and local context
  → curate or save it
  → connect it to a personal direction
  → explore a product, place, maker, or service
  → make a brief, inquiry, visit, or purchase decision
  → carry the result back into the person’s public or private Sura space
```

### 1.2 The promise to each side

| Participant | Sura promise |
|---|---|
| Visitor | See a strong local visual direction immediately and understand what Sura is for. |
| Personal member | Turn scattered taste into a visible, useful, and continuously evolving direction. |
| Creator or maker | Show work with context, identity, attribution, and a path to serious interest. |
| Company | Publish a visual catalogue and receive a more qualified route to inquiry or order. |
| Administrator | Protect quality, safety, public visibility, and platform trust through explicit controls. |
| Partner | Plug into a clear moment such as delivery, fabrication, payment, venue, creator support, or local fulfilment. |
| Sura operations | Observe what helps people move from discovery to action without exploiting attention or hiding uncertainty. |

## 2. Design direction

### 2.1 Visual direction contract

> **Sura should feel like a composed local signal moving through a tactile editorial world, using strong photography, material contrast, and restrained digital accents, with the visual direction as the hero and one useful next action as the payoff.**

The interface uses a quiet outer stage and a focused inner experience. The outer stage may be deep green-black, warm paper, stone, clay, or a controlled tonal blend. The inner experience contains the hero: a signal, person, product, company, showroom object, place, or collection. Motion gives the object orientation, depth, and consequence; it must not compete with the object.

### 2.2 Sura’s own vocabulary

| Sura term | Meaning |
|---|---|
| **Live Signal** | Fresh visual discoveries from people, places, companies, and products. |
| **Local Edit** | A person’s or company’s visual direction and point of view. |
| **Sura Shelf** | A public visual collection on a person or company profile. |
| **Field Note** | A short visual post about a place, object, maker, service, or idea. |
| **Make a Signal** | The creation entry point for a brief, field note, or AI-assisted direction. |
| **Curate** | Show interest in a signal and help the platform understand its relevance. |
| **Repost to my direction** | Carry an attributed signal into a person’s public Sura space. |
| **Saved Shelf** | A private collection of references, products, companies, and ideas. |
| **Company Studio** | A verified company’s publishing and inquiry workspace. |
| **AI Studio Showroom** | A private visual environment for shaping an aesthetic before making a brief. |

### 2.3 Design principles

1. **Image before explanation.** The strongest image leads, while copy supplies local context, material evidence, identity, and the next action.
2. **Direction before taxonomy.** People can begin with a feeling and progressively refine it through practical lanes and attributes.
3. **One focal point per frame.** A frame may have one hero, one supporting visual layer, and one action cue.
4. **Small details are first-class content.** Stitching, hardware, grain, tyre finish, light temperature, packaging, texture, and typography can be the reason a signal matters.
5. **Local relevance is visible.** Place, maker, verification, availability, delivery, and service scope are shown when they influence action.
6. **Trust is part of composition.** Public status, offer approval, stock state, attribution, and privacy boundaries appear where decisions happen.
7. **Mobile is primary.** Mobile receives thumb-reachable creation and discovery actions, not merely a smaller desktop layout.
8. **Motion explains.** Movement shows sequence, orientation, proof, transformation, or depth. It does not create an endless decorative loop.
9. **The taxonomy stays open.** Categories are data-driven and extensible; no user’s aesthetic is trapped inside a permanent enum.
10. **The next useful action is obvious.** Every screen should answer: what am I seeing, why does it matter, and what can I do next?

## 3. Complete participant and permission model

Sura is a multi-sided platform. The design must represent the needs of each side without allowing one side’s complexity to leak into another side’s experience.

### 3.1 Role inventory

| Role | Core jobs | Main surfaces | Permission level |
|---|---|---|---|
| **Visitor** | Understand Sura, browse public signals, inspect public profiles and read-only previews. | Entry, public Live Signal, public Shelf, public product/company detail, AI Studio preview. | Public read-only. |
| **Member** | Curate, save, follow, repost, build a direction, create briefs, contact companies. | Live Signal, Explore, Saved Shelf, Profile, Make a Signal, private boards. | Authenticated personal actions. |
| **Composer** | Turn visual references into a structured aesthetic or practical brief. | Make a Signal, Local Edit, private board, AI Studio. | Authenticated owner of own work. |
| **Curator** | Follow directions, curate signals, organise collections, and help useful local work travel. | Feed, profile, Shelf, saved and repost flows. | Authenticated social actions. |
| **Creator or maker** | Publish personal work, Field Notes, services, or an attributed point of view. | Public profile, Sura Shelf, creator publishing surfaces. | Authenticated owner; public visibility rules apply. |
| **Company owner** | Publish company identity, products, services, galleries, offers, contacts, and public information. | Company Studio, catalogue, offer workflow, inquiries. | Verified company ownership required for public business publishing. |
| **Company staff** | Support catalogue, fulfilment, inquiry, and public content operations. | Scoped Company Studio and inquiry workspace. | Role-scoped company permissions. |
| **Administrator** | Verify companies, approve offers, manage public entry visuals, review reports, control visibility. | Admin Engagement, moderation queues, entry visuals. | Elevated operational permission. |
| **Moderator** | Review content, reports, abuse, attribution, and safety concerns. | Moderation queue, evidence view, action log. | Elevated content permission. |
| **Partner or service provider** | Receive qualified briefs or participate in delivery, fabrication, venue, payment, or fulfilment workflows. | Partner workspace or controlled handoff. | Scoped access to assigned records only. |
| **Support and operations** | Resolve account, inquiry, publishing, delivery, and trust issues. | Support console, audit trail, user-safe communication. | Restricted operational access. |
| **AI and automation layer** | Suggest directions, classify references, generate showroom concepts, and assist with briefs. | Private AI Studio and internal processing jobs. | Never bypasses user or server permissions. |

### 3.2 Permission rules

Public visibility, company verification, and offer approval are separate states. A company may prepare a catalogue item before public visibility. A product may exist in a draft state even when its company is verified. An offer may exist as pending even when the product is public. A repost may be visible only when the user’s profile is public. A private board or AI Studio asset must never become public through a client-side route mistake.

Server-side checks remain the authority. The client can hide unavailable controls, but hiding a control is not authorization. All social actions must be idempotent, and all ownership checks must happen before media storage or public publication.

## 4. Information architecture

### 4.1 Primary product surfaces

| Surface | Purpose | Main state |
|---|---|---|
| **Entry / Join** | Establish Sura’s visual world and authenticate a member. | Public, with sign in, create account, recovery, and callback states. |
| **Home / Live Signal** | Create a local pulse of fresh visual discoveries. | Public preview or authenticated feed. |
| **Explore / Local Edit** | Browse directions, lanes, places, companies, creators, and signals. | Public discovery with progressive refinement. |
| **Signal detail** | Give a visual post enough space and context to be useful. | Public or authenticated depending on source. |
| **Product detail** | Show product gallery, description, company, price, offer, stock, and action. | Public reading; authenticated inquiry/order action. |
| **Sura Shelf** | Show a public person or company direction. | Public profile with attributed activity. |
| **Saved Shelf** | Hold private references, products, and directions. | Authenticated private collection. |
| **Make a Signal** | Start a brief, Field Note, direction, or AI-assisted flow. | Authenticated creation. |
| **AI Studio Showroom** | Explore a private aesthetic through visual stages and optional 3D. | Authenticated private workspace. |
| **Company Studio** | Publish and manage company work. | Verified, scoped company workspace. |
| **Admin Engagement** | Review, approve, publish, and moderate. | Administrator or moderator workspace. |
| **Settings and consent** | Manage identity, theme, preferences, privacy, sessions, and notifications. | Authenticated account surface. |

### 4.2 Navigation model

Desktop uses a minimizable rail. The expanded rail shows route names, active context, and the Sura mark. The collapsed rail preserves icon labels through focus and tooltip states. Mobile uses persistent bottom navigation for **Home**, **Explore**, **Make a Signal**, **Saved Shelf**, and **Profile**. Secondary routes such as AI Studio, Company Studio, settings, and admin tools appear in contextual menus or sheets.

The platform should avoid a large hero landing page as its main product shell. A user should enter a living visual surface. The entry page can be editorial and atmospheric, but the authenticated Home page should immediately show a signal, a direction, or a useful action.

## 5. The complete aesthetics universe

### 5.1 Scope statement

Sura must support aesthetics in the broadest practical sense: everything people see, wear, touch, arrange, use, drive, inhabit, make, hear as part of a visual identity, or recognise as a meaningful detail. This includes finished objects, environments, bodies, interfaces, brands, materials, services, rituals, cultural references, and tiny construction choices.

No taxonomy can literally enumerate every future object or cultural expression. The correct design is therefore an **exhaustive, extensible taxonomy framework** with broad domains, practical lanes, object types, compositional attributes, sensory details, context, and relationship metadata. New categories should be added as data, not forced into a rewrite of product, company, or social schemas.

### 5.2 The taxonomy grammar

Every aesthetic signal can be described through the following layers:

```text
Direction
  → domain
    → practical lane
      → object or subject
        → composition and material attributes
          → micro detail
            → context, place, culture, or occasion
              → source, maker, availability, and next action
```

For example:

```text
Savanna Atelier
  → interiors
    → living room
      → low lounge chair
        → warm leather, dark wood, low silhouette
          → saddle stitching, brushed brass foot, hand-finished edge
            → Nairobi apartment, evening light, small-space layout
              → verified local maker → save, ask for quote, or contact
```

### 5.3 Major aesthetics domains and practical lanes

The following inventory is the minimum intended coverage for Sura’s discovery, curation, company, and AI Showroom systems. Each domain can contain objects, spaces, services, references, and micro-details.

| Domain | Practical lanes and subject families |
|---|---|
| **Personal identity and body** | Face, skin, complexion, skincare, makeup, cosmetics, fragrance, hair, barbering, braids, locs, protective styles, wigs, colour treatments, nails, manicure, pedicure, tattoos, tattoo styles, tattoo placement, piercings, body jewellery, body modification, grooming, shaving, wellness presentation, posture, silhouette, personal styling, eyewear, contact lenses, dental aesthetics, smile design. |
| **Fashion and apparel** | Tops, shirts, blouses, tees, knitwear, sweaters, jackets, coats, blazers, dresses, skirts, trousers, jeans, shorts, jumpsuits, suits, uniforms, workwear, streetwear, activewear, swimwear, underwear, sleepwear, modest wear, occasion wear, formalwear, cultural dress, upcycling, vintage, thrift, tailoring, made-to-measure, layering, capsule wardrobes, maternity, adaptive clothing, children’s clothing. |
| **Footwear** | Sneakers, trainers, boots, sandals, heels, flats, loafers, dress shoes, work boots, outdoor shoes, running shoes, football boots, hiking shoes, slippers, custom shoes, soles, laces, toe shape, heel shape, tread, patina, polish, material, repair, restoration. |
| **Accessories and carry** | Bags, handbags, totes, backpacks, briefcases, luggage, wallets, card holders, purses, pouches, keychains, key rings, straps, belts, hats, caps, headwraps, scarves, gloves, socks, ties, bow ties, suspenders, jewellery, necklaces, rings, bracelets, earrings, brooches, watches, watch straps, sunglasses, eyewear chains, phone cases, laptop sleeves, camera straps, charms, pins, badges, patches, small personal objects. |
| **Home and interiors** | Living rooms, bedrooms, dining rooms, kitchens, bathrooms, entryways, hallways, home offices, studios, nurseries, children’s rooms, rental spaces, small spaces, shared spaces, balconies, verandas, outdoor rooms, guest spaces, storage rooms, creative workspaces, clinics, salons, shops, studios, libraries, hospitality interiors. |
| **Furniture** | Sofas, sectionals, lounge chairs, accent chairs, stools, benches, ottomans, beds, headboards, bedside tables, wardrobes, dressers, cabinets, shelves, desks, dining tables, coffee tables, side tables, consoles, bar carts, cribs, pet furniture, modular furniture, foldable furniture, outdoor furniture, built-ins, custom joinery, restoration. |
| **Home surfaces and architectural detail** | Walls, paint, plaster, limewash, wallpaper, panelling, ceilings, beams, columns, floors, tiles, terrazzo, concrete, timber, stone, rugs, mats, stairs, railings, doors, handles, hinges, locks, windows, shutters, blinds, curtains, skirting, trim, alcoves, niches, shelving, arches, room dividers, acoustic panels, vents, switches, sockets, hardware, built-in storage. |
| **Home lighting and atmosphere** | Daylight, ambient light, task light, accent light, pendant lights, chandeliers, floor lamps, table lamps, wall lights, hidden lighting, candles, lanterns, neon, smart lighting, colour temperature, shadow quality, reflection, glare, dusk, night mood, scent, soundscape, acoustic treatment. |
| **Appliances and domestic objects** | Refrigerators, freezers, ovens, cookers, microwaves, dishwashers, washing machines, dryers, kettles, coffee machines, blenders, air purifiers, fans, heaters, televisions, speakers, humidifiers, irons, vacuum cleaners, water filters, smart-home devices, kitchen tools, cookware, cutlery, utensils, storage jars, containers, cleaning objects, organisers. |
| **Textiles and soft goods** | Curtains, upholstery, cushions, throws, blankets, quilts, duvets, sheets, towels, tablecloths, napkins, runners, bedding, woven baskets, mats, wall hangings, macramé, embroidery, crochet, handloom, quilting, printed fabric, dyeing, texture, pile, weave, fringe, edge finish. |
| **Art and objects** | Paintings, prints, drawings, photography, sculpture, ceramics, pottery, glass, woodwork, metalwork, textiles as art, baskets, masks, carvings, found objects, antiques, collectibles, books, magazines, records, instruments, clocks, mirrors, vases, vessels, decorative trays, candles, incense, plants, dried flowers, objects with patina or provenance. |
| **Architecture and exterior spaces** | Houses, apartments, compounds, offices, studios, shops, hotels, restaurants, cafés, galleries, schools, clinics, churches, public buildings, facades, entrances, signage, porches, courtyards, rooftops, terraces, balconies, gardens, driveways, walls, gates, paths, shade structures, landscaping, pools, outdoor kitchens. |
| **Gardens and landscape** | Indoor plants, balcony plants, gardens, vertical gardens, succulents, tropical planting, native planting, trees, shrubs, flowers, grasses, water features, stones, soil, planters, pots, garden furniture, lighting, irrigation, composting, small-space growing, edible gardens, landscape maintenance. |
| **Vehicles and mobility** | Cars, SUVs, trucks, vans, motorcycles, scooters, bicycles, e-bikes, buses, matatus, tuk-tuks, boats, watercraft, trailers, mobility aids, skateboards, helmets, travel gear, public transport identity, cycling setups, camping vehicles, off-road builds. |
| **Vehicle exterior** | Paint, wrap, satin finish, gloss, metallic, pearlescent, patina, rust, body kit, bumpers, grille, bonnet, roof, mirrors, windows, tint, lights, headlights, taillights, indicators, badges, decals, livery, number plates, racks, steps, tow systems, roof boxes, spoilers, aero parts. |
| **Vehicle stance and mechanical detail** | Wheels, rims, spokes, tyres, tread, sidewalls, suspension, ride height, brakes, callipers, exhaust, engine bay, battery, charging hardware, drivetrain, underbody, alignment, sound, performance, restoration, customisation, service condition. |
| **Vehicle interior and detailing** | Seats, upholstery, leather, fabric, stitching, dashboard, steering wheel, gear selector, screens, gauges, trim, wood, carbon, metal, ambient lighting, floor mats, fragrances, sound system, cable routing, storage, child safety, cleaning, paint correction, ceramic coating, polishing, wrapping, inspection. |
| **Digital devices and personal technology** | Phones, tablets, laptops, desktops, monitors, keyboards, mice, trackpads, headphones, earbuds, speakers, cameras, lenses, microphones, game consoles, controllers, smartwatches, e-readers, chargers, docks, cables, stands, cases, skins, wallpapers, lock screens, widgets, icons, themes, notification style. |
| **Work, study, and desk environments** | Home office, studio desk, editing suite, coding setup, design desk, trading desk, gaming room, streaming setup, school desk, classroom, meeting table, lighting, chair, monitor layout, keyboard profile, stationery, notebooks, cable management, storage, acoustics, background, camera framing. |
| **Gaming and virtual spaces** | Console setup, PC build, game room, streaming layout, avatar style, character design, game UI, HUD, skins, maps, virtual room, virtual showroom, digital collectibles, lighting, sound, motion, controller customisation, community identity. |
| **Brand identity and business presence** | Logos, wordmarks, monograms, colour systems, typography, packaging, labels, uniforms, staff styling, signage, storefronts, menus, receipts, catalogues, websites, social surfaces, product photography, service environment, tone of voice, vehicle livery, delivery packaging, retail fixtures, point of sale, brand rituals. |
| **Retail, hospitality, and service spaces** | Shops, showrooms, boutiques, markets, salons, barbershops, restaurants, cafés, bakeries, hotels, lodges, coworking spaces, gyms, studios, clinics, galleries, waiting rooms, service counters, menus, displays, uniforms, queue experience, scent, lighting, seating, signage. |
| **Food, drink, and table aesthetics** | Ingredients, plating, bowls, plates, glasses, cups, cutlery, tablescapes, menus, packaging, takeaway containers, coffee, tea, cocktails, juices, bakery, street food, home cooking, dining rituals, colour, garnish, texture, temperature, hospitality mood. |
| **Travel and place** | Neighbourhoods, streets, markets, beaches, mountains, parks, hotels, lodges, cabins, camps, airports, train stations, road trips, local landmarks, architecture, transport, luggage, travel objects, itinerary mood, seasonal light, cultural context. |
| **Sport, fitness, and movement** | Gym spaces, home gyms, bodybuilding, running, cycling, football, basketball, swimming, martial arts, dance, yoga, hiking, climbing, equipment, footwear, jerseys, uniforms, training spaces, recovery objects, body movement, performance styling. |
| **Pets and animal life** | Dogs, cats, birds, fish, reptiles, small animals, pet beds, crates, carriers, collars, harnesses, leashes, bowls, toys, grooming, clothing, accessories, habitats, aquariums, terrariums, pet-friendly interiors, custom pet pieces. |
| **Events and social rituals** | Weddings, birthdays, graduations, launches, exhibitions, festivals, concerts, dinners, ceremonies, parties, community gatherings, funerals, religious events, cultural events, invitations, decor, styling, seating, flowers, lighting, sound, dress codes, gifting, photography. |
| **Creative production and media** | Photography, filmmaking, cinematography, editing, colour grading, motion graphics, illustration, typography, graphic design, 3D art, animation, music visuals, album art, posters, zines, books, magazines, podcasts, sound design, stage design, set design. |
| **Nature, science, and material culture** | Plants, animals, minerals, geology, weather, sky, water, fire, laboratory objects, tools, instruments, maps, diagrams, scientific models, natural textures, landscapes, conservation, sustainable materials, repair culture, reuse, craft process. |
| **Accessibility and adaptive aesthetics** | Mobility aids, prosthetics, hearing devices, adaptive clothing, accessible interiors, tactile markers, high-contrast palettes, low-sensory spaces, ergonomic tools, inclusive signage, assistive technology, sensory-friendly event design, universal design objects. |
| **Micro-objects and everyday details** | Pens, notebooks, keys, coins, cards, receipts, labels, stamps, tags, buttons, zippers, buckles, seams, stitching, rivets, screws, grain, scratches, scuffs, fingerprints, patina, dust, reflections, shadows, cable ends, packaging folds, paper edges, screen pixels, interface icons, cursor shape, loading states, tiny marks. |

### 5.4 Universal aesthetic attributes

Every subject can be described through shared facets. These facets should be available to discovery, search, AI prompting, company publishing, and personal curation.

| Facet group | Attribute families |
|---|---|
| **Mood and emotional signal** | Calm, energetic, warm, quiet, playful, serious, intimate, dramatic, soft, bold, nostalgic, futuristic, grounded, refined, raw, joyful, moody, optimistic, ceremonial, utilitarian. |
| **Visual language** | Minimal, maximal, editorial, brutalist, organic, geometric, industrial, handcrafted, retro, contemporary, futuristic, traditional, eclectic, monochrome, tonal, high-contrast, airy, dense, sculptural, graphic, illustrative, photographic. |
| **Colour** | Hue, temperature, saturation, value, contrast, monochrome, analogous, complementary, earth, jewel, pastel, neon, neutral, black-and-white, accent colour, seasonal palette, local pigment. |
| **Form and silhouette** | Angular, curved, rounded, sharp, low, tall, wide, narrow, oversized, fitted, compact, modular, asymmetrical, symmetrical, irregular, sculptural, flat, layered, tapered, flowing. |
| **Material** | Wood, stone, metal, glass, ceramic, concrete, leather, fabric, knit, paper, plastic, rubber, acrylic, bamboo, rattan, cork, recycled material, bio-material, digital surface, mixed material. |
| **Surface and finish** | Matte, gloss, satin, brushed, polished, rough, raw, distressed, woven, ribbed, embossed, perforated, transparent, translucent, reflective, weathered, oxidised, painted, printed, glazed, unfinished. |
| **Pattern and mark** | Plain, stripe, check, plaid, grid, floral, botanical, geometric, animal, abstract, logo, type-led, hand-drawn, camouflage, marbled, speckled, gradient, repeated, one-off mark. |
| **Light and atmosphere** | Daylight, golden hour, dusk, night, overcast, hard shadow, soft shadow, rim light, candlelight, fluorescent, studio, low-light, high-key, low-key, reflective, foggy, dusty, humid, airy. |
| **Scale and proportion** | Miniature, small, medium, large, oversized, monumental, intimate, low-profile, high-rise, dense, sparse, close-up, wide view, macro detail. |
| **Age and time** | New, contemporary, vintage, antique, archival, restored, repaired, weathered, temporary, seasonal, evolving, unfinished, future-facing. |
| **Craft and process** | Handmade, machined, printed, woven, carved, cast, forged, stitched, tailored, assembled, upcycled, repaired, locally made, imported, limited-run, mass-produced, custom-built. |
| **Sensory extension** | Texture, tactility, weight, temperature, scent, sound, movement, rhythm, softness, hardness, silence, resonance, comfort, friction, portability. |
| **Context** | Home, work, school, travel, street, ceremony, everyday, performance, sport, hospitality, retail, outdoors, digital, private, public, local, regional, global. |
| **Practical constraints** | Budget, size, fit, availability, maintenance, delivery, accessibility, durability, climate, space, care, repairability, sustainability, customisation, lead time. |
| **Identity and provenance** | Person, maker, company, neighbourhood, city, culture, tradition, material source, craft history, collaboration, ownership, attribution, verification. |

### 5.5 Direction system

Directions are high-level aesthetic entry points. They help a person start without knowing the correct object or category. Sura should support an expandable library such as **Soft Comfort**, **Warm Minimal**, **Quiet Utility**, **Earthbound Home**, **Bright Play**, **Heritage Modern**, **Thrift Remix**, **Coastal Ease**, **Savanna Atelier**, **Ink & Ivory**, **Orchid After Dark**, **Tangerine Social**, **Moss & Marigold**, **Cobalt Ritual**, **Thermal Bloom**, **Street Archive**, **Studio Calm**, **Pet Piece**, **Object Story**, and **Motion Detail**. [3]

Directions should be composed from attributes and evidence rather than treated as permanent categories. A person can combine directions, mute attributes, save a variation, or create a private direction with a personal name. The system should support both descriptive labels and user-created language.

### 5.6 Taxonomy rules

The taxonomy must support multiple parent relationships. A leather bag can belong to fashion, accessories, personal identity, gifting, work, and travel without duplicating the object. A dining chair can belong to furniture, interiors, hospitality, accessibility, and company catalogue. Search and recommendation should use facets and relationships, not a single category field.

Taxonomy entries require a human-readable label, optional synonyms, visual attributes, practical attributes, examples, locale information, and a content-safety status. New terms can enter as user language, then be mapped by moderation or assisted classification. AI suggestions remain suggestions until the user confirms them.

## 6. Complete feature inventory

### 6.1 Entry, identity, and account

| Feature | Requirement |
|---|---|
| Image-led Join | Entry composition uses a lead visual, supporting frames, a clear Sura thesis, and one readable action surface. |
| Sign in | Email and password authentication with visible progress, success, error, and timeout states. |
| Create account | Email, password, confirmation password, and explicit Supabase confirmation-email guidance. |
| Password recovery | Request reset, receive link, return to Sura, choose a new password, and re-enter the private space. |
| Sign out | Clearly visible after authentication; clears Sura session and Supabase browser session. |
| Session exchange | Supabase identity is exchanged once for a signed Sura application session. |
| Session expiry | Explain what happened, preserve safe local work where possible, and offer a clear re-authentication path. |
| Profile identity | Display name, handle, avatar, location context, short point of view, and visibility setting. |
| Profile privacy | Public or private profile, with clear effect on Shelf and repost visibility. |
| Account security | Active sessions, sign-out-all option, email status, password reset, and security notices. |
| Consent | Required session cookies are separated from optional theme, aesthetic, layout, analytics, and preference cookies. |
| Installability | Web manifest, icon, install prompt, standalone shell, and safe service-worker strategy. |

### 6.2 Onboarding and preference shaping

Onboarding should be lightweight and image-led. It can ask the person to choose a few visual directions, practical lanes, places, or objects they are interested in. It should also offer **Skip for now** so the user can discover without making a premature identity decision.

Possible onboarding modules include a direction picker, visual comparison cards, location context, preferred discovery lanes, accessibility preferences, notification choice, and a first saved item. Preference shaping must never lock the user into one aesthetic identity. The interface should explain that directions can change.

### 6.3 Live Signal and discovery

The Live Signal feed is a local pulse, not an infinite attention machine. It can contain company signals, creator Field Notes, place references, product stories, public directions, and attributed reposts. Each signal carries identity, visual evidence, a short thesis, local context, lane or direction labels, and one primary action.

Required feed capabilities include personal, following, nearby, and direction-based views; horizontal signal rails; progressive image loading; stable skeleton states; save and curate actions; follow controls; repost with attribution; source identity; report and hide controls; and a clear route to detail.

### 6.4 Explore and search

Explore should support multiple entry modes: direction, practical lane, place, company, creator, object, material, colour, mood, and Field Note. Search should understand synonyms and relationships. A person searching for “warm brown leather chair” should be able to reach furniture, interiors, material, colour, and local makers without selecting one exact category first.

Search results need visual density controls, a filter sheet, sort options, safe empty states, and a way to convert the current query into a Saved Shelf or private direction. Nearby discovery should be optional, transparent, and coarse enough to avoid unnecessary location exposure.

### 6.5 Public profile and Sura Shelf

A Sura Shelf uses visual windows rather than generic story or highlight terminology. The default windows are **Point of View**, **Field Notes**, **Made Here**, and **Next Signal**. A person or company may customise the content, but the structure remains recognisable across the network.

A public profile includes identity, direction summary, location context when shared, follower/following counts, public Shelf, original work, attributed reposts, and contact route when applicable. A company profile adds verification, catalogue, offers, fulfilment context, and inquiry route.

### 6.6 Following, curation, saving, and reposting

Following builds a personal stream from selected people, verified companies, and relevant signals. **Curate** expresses interest without turning the interface into a competitive like counter. Save places a signal or product on a private Saved Shelf. **Repost to my direction** carries a public business signal to the user’s profile with original attribution and an optional note.

The system must protect ownership. A repost is not a copy of the original business post. Removing a repost removes the user’s distribution, not the company’s original. Repeated taps are safe through unique constraints and idempotent server procedures. [3]

### 6.7 Saved Shelf and private boards

Saved Shelf supports folders or directions, reorder, remove, notes, comparison, and conversion into a brief. A user can save a product, company, Field Note, place, image, colour, material, or tiny detail. Private boards can contain mixed references and should preserve source attribution.

A board can be:

- **Reference board:** visual collection without a declared outcome.
- **Direction board:** an organised aesthetic with mood, palette, material, and form.
- **Project board:** a practical brief with budget, room, body, vehicle, event, or service constraints.
- **Inquiry board:** a company-facing package of references and requirements.
- **Showroom board:** a private AI Studio set with generated and selected frames.

### 6.8 Make a Signal

Make a Signal should begin with intent, not a blank editor. The first choices are **shape a direction**, **ask for a product or service**, **write a Field Note**, **repost to my direction**, or **open AI Studio**. The flow progressively asks for references, practical constraints, place, budget, timing, and desired outcome.

A brief should support references, desired feeling, object or service, measurements, location, budget range, timing, accessibility requirements, materials, exclusions, and preferred communication route. The user should see a clean preview before sending it to a company or partner.

### 6.9 AI Studio and Showroom

AI Studio is private. It helps a user explore a direction before committing to a full brief. Lanes include home, furniture, appliances, art, fashion, footwear, accessories, vehicles, detailing, tattoos, pets, gifting, digital setups, hospitality, and future extensible domains.

Each lane exposes relevant parts. A wardrobe lane can include top, bottom, outer layer, footwear, accessories, colour, material, fit reference, and proportions. A car lane can include body, paint, wheels, stance, lights, interior, sound, detailing, and accessories. A home lane can include room, anchor furniture, surfaces, lighting, textiles, art, plants, storage, and atmosphere. A tattoo lane can include placement, scale, line, shading, colour, reference, and cultural context. A pet lane can include animal, size reference, accessory, material, safety, and environment.

The Showroom must explain the boundary between visual exploration and real-world fit. Height or proportion sliders are visual aids, not sizing decisions. A vehicle or detailing concept is not a final quote. Actual measurements, material availability, inspection, labour, service scope, and maker confirmation remain necessary.

### 6.10 Product and commerce experience

A company product has a lead image and supporting images that provide evidence: alternate angle, material, scale, colourway, fit, packaging, use, or detail. The existing product design supports up to eight JPEG, PNG, or WebP images and stores an ordered gallery. [2]

A product card should show the strongest image, compact supporting thumbnails, product name, company identity, concise description, stock state, regular or sale price, and a clear **View product** action. The full detail view shows gallery, description, options, stock, original price, effective price, saving, offer terms, company context, delivery estimate, and inquiry or order action.

Discounts are transparent. A public offer shows original price, effective price, savings, title, code, scope, validity, and minimum-spend condition. Product-specific offers are labelled **Product offer**; whole-shop offers are labelled **Shop-wide**. Pending or rejected offers never appear as live public discounts. [2]

### 6.11 Company Studio

Company Studio is a publishing studio with a live public preview. Its primary flow is:

```text
Company identity
  → product or service type
  → gallery or evidence
  → description and materials
  → price, stock, options, or scope
  → offer if applicable
  → public preview
  → submit or save draft
```

Company capabilities include verified profile, staff roles, catalogue, product publishing, service publishing, gallery management, stock, options, price, discount offers, delivery or fulfilment notes, inquiry handling, contact details, analytics, drafts, archive, and public preview.

A future production hardening layer should include malware scanning, EXIF stripping, dimension and aspect-ratio normalization, responsive thumbnail generation, and archive/edit operations. [2]

### 6.12 Inquiry, order, and partner handoff

Sura’s first release should keep contact simple and accountable. A user can contact a company through a published route or structured inquiry form. The inquiry includes the relevant signal or product, user references, desired outcome, practical constraints, and consent to share required details.

Open-ended direct messaging is not a first-release requirement. It introduces moderation, abuse handling, unread states, delivery guarantees, notification work, and support burden before the discovery loop has earned that complexity. [3] A later messaging system should be introduced only with a clear safety, reporting, notification, and retention design.

### 6.13 Notifications

Notifications should be purposeful and grouped. They may include confirmation email status, inquiry response, offer approval, company verification, repost activity, new signals from followed accounts, saved board changes, and AI Studio completion. Each notification has a source, event type, timestamp, read state, deep link, and privacy rule.

The system should not use notification volume as an engagement objective. The default should be low-noise, user-controlled, and explainable.

### 6.14 Settings and personal control

Settings include profile, password, email, active sessions, public/private profile, following, notification preferences, saved data, theme mode, aesthetic direction, language readiness, location privacy, optional cookie consent, connected services, data export, account deletion, and report/support access.

Sura supports Light, Dark, and System interface modes. Interface tone is separate from a user’s selected aesthetic direction. Optional theme, aesthetic, and layout persistence occurs only after consent. [1]

## 7. User journeys by side

### 7.1 Visitor journey

| Stage | Experience | Required design outcome |
|---|---|---|
| See | Entry or public signal opens with a strong image and short thesis. | Sura is understood without a long explanation. |
| Orient | Visitor sees local context, identity, and a visible next action. | The platform feels like a network, not a brochure. |
| Explore | Visitor opens a Shelf, company, product, or public direction. | The visitor can move through related visual evidence. |
| Decide | Visitor sees what requires account creation. | Private actions are explained without breaking the public flow. |
| Join | Visitor creates an account or signs in. | Authentication has a bounded visible outcome. |

### 7.2 Personal member journey

```text
Join
  → choose or skip initial directions
  → see Live Signal
  → curate or save a signal
  → follow a person or verified company
  → build a Saved Shelf
  → make a direction or brief
  → explore AI Studio Showroom
  → send inquiry or carry a direction into public Profile
```

### 7.3 Composer journey

```text
Start with a feeling or problem
  → choose a practical lane
  → add visual references
  → select material, colour, form, and constraints
  → review a private direction
  → choose AI Showroom or company inquiry
  → save, revise, or send
```

### 7.4 Company journey

```text
Create company identity
  → verify company
  → prepare product/service draft
  → upload gallery or evidence
  → describe details honestly
  → add price, stock, scope, and fulfilment
  → preview public presentation
  → publish when eligible
  → receive inquiry or order request
  → fulfil and learn from qualified interest
```

### 7.5 Administrator journey

```text
Review queue
  → inspect identity, evidence, ownership, and public consequence
  → approve, reject, request changes, or restrict
  → record reason
  → monitor public result
```

Admin entry visual management remains a separate public-brand workflow. An administrator can name a visual set, select one to eight images, inspect lead/supporting order, and publish without touching personal edit content. [1]

## 8. AI Showroom 3D experience architecture

### 8.1 Objective

The Showroom should make a person feel that an aesthetic can be explored, rotated, compared, and refined before it becomes a brief. It should work for products, rooms, wardrobes, vehicles, detailing, accessories, tattoos, pets, and future object types without inventing a different interaction model for every category.

### 8.2 Recommended hybrid architecture

The most viable solution is progressive enhancement rather than forcing every user and every lane into full WebGL.

| Layer | Experience | Use case | Viability |
|---|---|---|---|
| **Stage A: 2D multi-angle** | Four or more approved frames with direct view buttons and horizontal scroll. | All lanes, slow networks, mobile, reduced motion, missing 3D asset. | Highest. Ship first. |
| **Stage B: motion composition** | Cover flow, window carousel, scroll reveal, and stacking cards using DOM/CSS transforms. | Product evidence, outfit layers, room parts, reference comparison. | High. Ship with Stage A. |
| **Stage C: lightweight 3D viewer** | Lazy-loaded WebGL model with orbit, limited camera, material variants, and hotspots. | High-value product, vehicle, furniture, room anchor, footwear, accessory. | Medium-high. Add selectively. |
| **Stage D: composed 3D scene** | Several objects in a guided scene with camera path and editable parts. | Car garage, room showroom, wardrobe, retail set, hospitality scene. | Medium. Use for premium lanes and approved assets. |
| **Stage E: real-time configurator** | Multi-part variants, price/stock integration, fit or service logic, quote handoff. | Later company-grade workflows. | Highest complexity. Do not make this the first 3D release. |

The recommended rendering boundary is a lazy-loaded 3D island. The main platform remains DOM and image-first. A 3D viewer loads only after the user enters a showroom state or requests an interactive object. A Three.js/React Three Fiber or equivalent glTF-capable layer can power the viewer, but the design contract must remain independent of a specific engine so a pre-rendered fallback is always valid.

### 8.3 Showroom composition

Every showroom lane uses the same conceptual frame:

```text
Outer stage
  → showroom header and lane context
  → hero object or visual direction
  → view/navigation system
  → detail or component controls
  → material/attribute rail
  → clear next action
```

The user should always know whether they are viewing a **Front**, **Angle**, **Side**, or **Detail** state; changing a view should not erase the selected direction or parts. A generated concept can become the hero, while bundled or managed editorial imagery keeps the stage usable during generation or asset failure.

### 8.4 The requested motion patterns and their roles

#### A. Scroll animations

Scroll animation is the section-level narrative. As the user moves through the showroom, the interface can progress through **thesis → interface state → focal object movement → detail zoom → final state**. The page may pin the hero for a short section while attributes reveal beside it, then release into a clear action.

**Use it for:** entering the showroom, revealing the reason for the object, transitioning from broad direction to material detail, and returning to the final chosen state.

**Do not use it for:** every text line, continuous page-wide parallax, or essential controls that can only be reached by scrolling.

#### B. Cover flow

Cover flow is a controlled depth arrangement for a small number of adjacent views. The selected frame is front-facing and dominant; neighbouring views sit behind at reduced scale or angle. Direct controls and a position label remain visible.

**Use it for:** Front/Angle/Side/Detail media, product galleries, wardrobe reference frames, and a compact desktop visual rail.

**Implementation direction:** use CSS transforms and opacity for Stage B; keep at most three visible adjacent items; preserve the selected item’s accessible reading order; disable perspective movement under reduced-motion preferences.

#### C. Window carousel

The window carousel is the primary navigation contract for the four showroom views. Each view acts like a window into the same object rather than a separate slide. Previous, next, direct view buttons, a range slider, and an explicit label are required.

**Use it for:** all lanes, especially mobile, because it is understandable, controllable, and can work with either images or 3D camera snapshots.

**Implementation direction:** use a `viewIndex` state with `idle`, `focused`, `changing`, and `complete` meanings. Pause automatic progression when the user touches, hovers, focuses, drags, or uses a keyboard control. Never make autoplay the only route through the asset.

#### D. Reverse scrolling columns

Reverse scrolling columns create a moving field of references behind or beside the main showroom. One column can move upward while another moves downward, but the content should remain secondary and sparse.

**Use it for:** desktop-only ambient references, mood vocabulary, material swatches, related signals, or company evidence around the main showroom.

**Do not use it for:** primary product selection, dense text, checkout or inquiry forms, or mobile-first navigation. It can distract, reduce performance, and create motion discomfort.

**Implementation direction:** cap the number of columns, pause on hover/focus, use low-speed transform-only movement, and replace it with a static grid under reduced motion or on constrained devices.

#### E. 3D explorer horizontal-scroll section

The 3D explorer is a horizontally scrolling, snap-aligned section that lets the user move through showroom stages or component zones. On desktop it can combine horizontal scroll with a pinned stage; on mobile it becomes a normal touch rail with clear continuation cues.

**Use it for:** a room moving from shell to furniture to lighting, a car moving from body to wheels to interior, a wardrobe moving from base outfit to layers to accessories, or a product moving from complete object to material/detail evidence.

**Implementation direction:** use native horizontal scroll and `scroll-snap-type` where possible. Use an intersection observer to update active section state rather than a high-frequency scroll handler. A visible progress indicator and a direct jump list are required.

#### F. Stacking cards

Stacking cards represent layered decisions. The top card is the active visual or component; lower cards expose alternatives, evidence, or prior choices. A card can be swiped or clicked into focus, but the system should not require a gesture.

**Use it for:** outfit layers, room layers, vehicle build choices, material alternatives, saved references, and AI-generated concept history.

**Implementation direction:** use a small stack, stable source order, explicit select/remove controls, and a vertical fallback on mobile or reduced motion. Stacking cards should not become generic dashboard cards; each stack must explain what layer or decision it represents.

### 8.5 Recommended default choreography

```text
1. Entry reveal: the stage appears with one hero object and one short thesis.
2. Orientation: Front/Angle/Side/Detail controls establish the object’s coordinate system.
3. Focus: cover flow or window carousel moves the chosen view to the front.
4. Explore: horizontal 3D explorer exposes the next meaningful component zone.
5. Compare: stacking cards show two or three material, colour, or part alternatives.
6. Prove: a detail zoom reveals construction, texture, fit reference, or service evidence.
7. Resolve: the selected direction becomes a saved frame, brief, or company inquiry.
```

The reverse columns are optional atmosphere around steps 1–3 on capable desktop devices. They are not part of the core decision path.

### 8.6 Showroom modes by category

| Lane | Hero object | Interactive parts | Recommended motion |
|---|---|---|---|
| Wardrobe | Mannequin or full outfit | Top, bottom, outer layer, shoes, accessories, proportion reference. | Window carousel, stacking layers, 3D explorer for selected garment, detail zoom. |
| Home | Room shell or anchor furniture | Walls, floor, furniture, lighting, textiles, art, plants, storage. | Pinned scroll reveal, horizontal room zones, stacking layers, optional 3D orbit. |
| Vehicle | Vehicle in a garage-like stage | Body, paint, wheels, stance, lights, interior, detailing, accessories. | 3D explorer horizontal scroll, orbit camera, cover flow of angles, detail hotspots. |
| Product | Product turntable | Colour, material, size, attachments, packaging, detail. | Window carousel, cover flow, material stacking cards, optional orbit. |
| Footwear | Shoe on neutral stage | Upper, sole, laces, colourway, material, fit reference. | Cover flow, detail zoom, 3D orbit for high-value products. |
| Tattoo | Body-area reference or abstract placement stage | Placement, scale, line, shading, colour, orientation. | Window carousel and controlled before/after overlay; no misleading body-fit claim. |
| Pet accessory | Pet-neutral stage or silhouette | Size, collar/harness, material, colour, safety features, environment. | Horizontal rail, stacking variants, 2D fallback first; 3D only when asset quality is high. |
| Digital setup | Desk or device environment | Monitor, keyboard, lighting, audio, wallpaper, cable path, accessories. | Horizontal explorer, stacking components, reverse reference columns on desktop. |
| Hospitality | Room, table, or venue stage | Seating, tableware, menu, lighting, signage, service details. | Pinned scroll narrative, 2D multi-angle, optional scene viewer. |

### 8.7 3D interaction states

The 3D component must expose semantic states rather than hidden animation logic.

| State | Meaning | User feedback |
|---|---|---|
| `idle` | Default hero is ready. | Object and next action are visible. |
| `focused` | A view, part, or hotspot is selected. | Selected label, focus ring, and object emphasis. |
| `changing` | The camera, view, or component is transitioning. | Controls remain stable; no duplicate action is accepted. |
| `revealed` | A detail, material, or layer is shown. | Supporting copy and source evidence appear. |
| `scrolled` | User has moved to a new showroom section. | Progress indicator and stage label update. |
| `complete` | The user has chosen a direction or completed a preview. | Save, make a brief, or contact action becomes primary. |
| `fallback` | 3D asset cannot load or is not appropriate. | Switch to approved multi-angle frames without losing context. |
| `reduced` | Reduced-motion preference is enabled. | Static or instant state changes preserve hierarchy and control. |
| `error` | Asset, generation, or save failed. | Explain the issue, keep safe work, and provide retry or fallback. |

### 8.8 3D asset and data contract

A showroom object should be represented by a data contract such as:

```text
ShowroomScene
  id
  lane
  title
  direction
  heroImage
  fallbackFrames[]
  modelUrl?
  posterUrl?
  cameraPresets[]
  componentSlots[]
  materialVariants[]
  hotspots[]
  accessibilityDescription
  fitAndSafetyNotice?
  sourceCompany?
  visibility
  generatedState
  createdAt
```

A component slot contains a stable name, category, available variants, source media, price or inquiry relevance when public, asset status, and permissions. A material variant contains colour, finish, texture, availability, and an optional company reference. Generated assets remain private until the user explicitly saves, publishes, or sends them into a brief.

### 8.9 Performance and graceful fallback

The platform should not load a heavy 3D engine on every Sura page. Use lazy loading, intersection-based activation, poster images, compressed glTF assets, texture budgets, device capability checks, and a 2D fallback. A mobile or low-power device should still receive the complete conceptual experience through multi-angle frames and direct controls.

Animations should favour opacity and transform, avoid layout thrashing, and use a single light direction. Scroll observers should update state at meaningful thresholds rather than reading layout on every event. Reverse columns and continuous orbit should stop when the object is not visible.

### 8.10 Accessibility and motion safety

All 3D actions need equivalent text controls. A user must be able to choose Front, Angle, Side, and Detail without dragging. Hotspots require keyboard focus, accessible names, and a nonvisual description. A model cannot be the only place where a product name, material, or offer condition exists.

Respect `prefers-reduced-motion`. Replace camera push, perspective rotation, reverse columns, and continuous orbit with static frames, direct changes, or a simple fade. Do not use motion to communicate an irreversible action. Preserve focus, reading order, and the selected state.

## 9. Visual system and component architecture

### 9.1 Core primitives

The platform should be built from composition primitives rather than one-off pages:

| Primitive | Responsibility |
|---|---|
| `Stage` | Outer environment and tonal atmosphere. |
| `HeroFrame` | One dominant image, object, or direction. |
| `Signal` | Image-led discovery unit with identity and next action. |
| `Shelf` | Public visual collection for person or company. |
| `Gallery` | Lead image, supporting images, direct controls, and evidence. |
| `Showroom` | Private visual exploration surface. |
| `MotionCaption` | Short thesis or explanatory label tied to a state. |
| `AttributeRail` | Mood, material, colour, form, and practical facet controls. |
| `Stack` | Layered decisions or alternatives. |
| `OfferSummary` | Transparent original/effective price transformation. |
| `BriefPreview` | User-facing review before inquiry or save. |
| `Notice` | Success, warning, error, pending, and fallback states. |
| `ActionBar` | One clear primary action plus quiet secondary actions. |
| `PermissionGate` | Public/private, verified/unverified, and owner/admin boundary. |

### 9.2 Theme system

Sura has two independent axes:

1. **Interface tone:** Light, Dark, or System.
2. **Aesthetic direction:** a visual preference such as Warm Minimal, Street Archive, or Savanna Atelier.

Interface tone controls legibility and environment. Aesthetic direction changes selected visual accents and content suggestions. Neither axis changes permission rules or semantic meaning. Accent colours may vary, but success, warning, error, focus, and selected states must remain understandable.

### 9.3 Responsive compositions

| Context | Composition |
|---|---|
| Mobile | Single-column stage, thumb-reachable controls, horizontal rails, bottom navigation, sheets for secondary tools. |
| Tablet | Hybrid layout, touch-sized controls, flexible gallery/detail split, scrollable rails. |
| Desktop | Minimisable rail, asymmetric editorial grid, two-column product detail, optional pinned showroom stage. |
| Reduced motion | Static frames, instant selection, no continuous orbit or reverse columns. |
| Slow network | Reserved media geometry, poster image, skeleton state, and 2D fallback. |
| Keyboard-only | Logical DOM order, visible focus, direct view controls, no hover-only actions. |

## 10. Trust, safety, privacy, and governance

### 10.1 Public and private boundaries

| Data or action | Public by default? | Rule |
|---|---:|---|
| Public company signal | Conditional | Company must be verified and post active. |
| Product catalogue | Conditional | Product active and parent company verified. |
| Approved offer | Conditional | Offer approved, public, valid, and inside conditions. |
| Personal profile | User controlled | Public or private setting. |
| Repost | Conditional | Visible when profile is public; original attribution preserved. |
| Saved Shelf | No | Private to the member. |
| Private brief | No | Owner and explicitly shared recipient only. |
| AI Studio | No | Authenticated owner and server-side authorization. |
| `/ai-studio-preview` | Yes | Read-only; no upload, generation, persistence, or private data. |
| Admin entry visuals | Yes | Public brand content managed by authorized admin. |
| Inquiry | Restricted | User, company, assigned staff, and approved operational access. |

### 10.2 Moderation and reporting

Sura needs report, hide, block, ownership dispute, attribution correction, company verification, offer approval, media removal, and appeal states. A moderation action should capture actor, target, reason, timestamp, evidence, outcome, and whether the public surface changed.

The platform should avoid treating visual polish as trust. Verification badges, offer statuses, stock states, delivery estimates, and maker information must be legible. Businesses should not be able to imply availability, approval, or affiliation that the platform has not verified.

### 10.3 Consent and data minimisation

Required authentication cookies are distinguished from optional preference cookies. Optional theme, aesthetic, sidebar, and preference persistence is written only after consent. Location uses the least precision necessary for a useful local experience. AI inputs and generated concepts are private by default and should not be used for public recommendations without an explicit product decision and user control.

## 11. Content and metadata standards

Every public visual object should have enough information to remain useful outside its original feed position.

| Content type | Minimum metadata |
|---|---|
| Field Note | Title or thesis, creator, place context, image alt text, direction/lane, source, created time, primary action. |
| Company signal | Company identity, verification, product/service context, description, place, gallery, status, contact route. |
| Product | Name, category/lane, description, ordered gallery, options, stock, price, discount state, company, delivery or order context. |
| Repost | Original source, original title/image, reposter, optional note, timestamp, public visibility. |
| Saved reference | Source, image, label, lane, original route, user notes, collection, date saved. |
| Showroom concept | Lane, direction, frames/model, generated state, source references, private/public state, fit or safety notice. |
| Offer | Scope, title, code, value, validity, minimum spend, approval state, public state, applicable product/company. |

Copy should be concise, specific, and local without becoming vague. The visual carries atmosphere; the caption carries relevance and practical meaning. Tiny labels should not be the only place where critical information appears.

## 12. Analytics and success measures

These are design-health measures to validate after appropriate consent and privacy review. They are not current performance claims.

| Product question | Measure |
|---|---|
| Does entry explain Sura? | First-session comprehension test and Join-to-discovery completion. |
| Does a signal lead to action? | Signal open to curate, save, follow, repost, brief, product, or inquiry rate. |
| Does the taxonomy help rather than constrain? | Search refinement success, query reformulation, and category escape rate. |
| Does Showroom clarify direction? | Showroom start to view interaction, saved concept, brief, or inquiry. |
| Is 3D worth its cost? | 3D activation, completion, fallback rate, device performance, and user preference versus 2D. |
| Can companies publish? | Draft to preview to publish completion and time. |
| Are offers understood? | Product detail engagement with original/effective price and inquiry start. |
| Does reposting create identity? | Repost to public Shelf view and new follow rate. |
| Is trust healthy? | Verification outcomes, reports, attribution corrections, blocked content, and inquiry completion. |
| Does mobile work as a platform? | Mobile return usage, Make a Signal starts, Saved Shelf use, and navigation success. |

## 13. Recommended implementation roadmap

### Phase 0 — Product foundation

Define taxonomy objects, direction facets, user/company/admin permissions, public/private states, content metadata, and semantic design tokens. Do not begin with 3D code before the data contract and fallback experience exist.

### Phase 1 — Core visual network

Ship the Live Signal feed, Explore, public profiles, Sura Shelf, product detail, basic company identity, follow, curate, save, attributed repost, and mobile/desktop shell. Use stable image-led components and consistent state surfaces.

### Phase 2 — Personal direction and inquiry

Ship Saved Shelf, private boards, Make a Signal, structured brief, company inquiry, and direction facets. Make the bridge from visual reference to useful action measurable.

### Phase 3 — Company publishing and offers

Ship gallery publishing, live preview, product/service detail, stock, options, transparent discounts, company verification, offer approval, and inquiry operations. Keep all public claims server-controlled. [2]

### Phase 4 — Showroom Stage A and B

Ship 2D multi-angle frames, window carousel, cover flow, stacking cards, scroll-snap rails, and reduced-motion equivalents. These provide most of the showroom value with the smallest risk.

### Phase 5 — Selective 3D explorer

Add a lazy-loaded 3D viewer for high-value lanes such as vehicles, furniture, wardrobe, footwear, and hero products. Use glTF assets, poster fallback, limited camera presets, material variants, and hotspots. Do not require 3D for every user or every catalogue item.

### Phase 6 — Advanced motion composition

Add a pinned scroll narrative, horizontal 3D explorer sections, controlled camera transitions, and desktop-only reverse scrolling reference columns. Measure performance, comprehension, motion comfort, and fallback usage before expanding.

### Phase 7 — Company-grade configurators and partners

Only after the discovery and inquiry loop works should Sura consider real-time multi-part configurators, live inventory linkage, delivery/payment partners, fulfilment status, richer company analytics, or structured messaging.

## 14. Non-goals and boundaries

Sura should not become an infinite short-video product, an open-ended chat platform, a generic classified listing site, or a 3D demo where interaction replaces usefulness. It should not require a full 3D asset for every product, infer body fit without measurements, expose private AI work, hide price conditions, or use notification volume as proof of engagement.

The public AI Studio preview remains read-only. Live payment collection, including M-Pesa, must remain disabled until the provider credentials and production workflow are actually configured. Sura should never ask users to enter an M-Pesa PIN inside the product. [1]

## 15. Master acceptance criteria

The platform is ready for a major release when all of the following are true:

| Area | Acceptance condition |
|---|---|
| Identity | A person recognises Sura as a distinct visual network in one screen. |
| Discovery | A signal has one focal image, local context, identity, and an obvious next action. |
| Taxonomy | A user can begin with a feeling, object, material, place, or tiny detail and refine progressively. |
| Coverage | Home, fashion, body, accessories, vehicles, digital setups, pets, art, places, services, events, food, hospitality, and micro-details are representable. |
| Personal direction | A user can save, organise, shape, and publish or privately retain a direction. |
| Social integrity | Follow, curate, save, repost, attribution, privacy, and public visibility rules are clear. |
| Company utility | A verified company can publish a visual product/service presentation with description, gallery, price/scope, stock, and offer conditions. |
| Inquiry | A user can move from reference to structured brief to accountable company contact. |
| Showroom | Every lane has a working 2D fallback; 3D is progressive enhancement, not a hard dependency. |
| Motion | Scroll animation, cover flow, window carousel, stacking cards, and horizontal explorer patterns are purposeful and state-driven. |
| Restraint | Reverse scrolling columns remain optional atmosphere and never obscure the decision path. |
| Mobile | The mobile experience is complete, thumb-reachable, scrollable, and not a reduced desktop afterthought. |
| Accessibility | Keyboard controls, alt text, contrast, focus, reduced motion, direct view controls, and nonvisual state descriptions work. |
| Trust | Verification, offers, stock, attribution, privacy, and public/private boundaries are server-enforced and visible. |
| Performance | Heavy 3D and motion load progressively, preserve layout geometry, and fall back safely. |
| Governance | Admins can review, approve, reject, publish, remove, and explain public-impact actions. |
| Originality | The platform uses Sura vocabulary, Sura Shelf, Live Signal, Local Edit, Field Note, and Make a Signal rather than copying another network’s naming or composition. |

## 16. Final product statement

Sura should make every visible thing part of a larger direction: the room, the shirt, the shoe, the vehicle, the phone case, the chair leg, the stitching, the light, the packaging, the pet accessory, the street, the sound of a place, the interface on a screen, and the tiny detail that makes an object feel like itself.

The platform’s job is not to tell people what their aesthetic is. Its job is to help them notice it, compose it, share it responsibly, find the people and companies who can help make it real, and take the next useful step.

## References

[1]: https://github.com/Linux-254/sura/blob/main/README.md "Sura platform README and product baseline"
[2]: https://github.com/Linux-254/sura/blob/main/docs/product-publishing.md "Sura Product Publishing and Promotion Flow"
[3]: https://github.com/Linux-254/sura/blob/main/docs/sura-social-model.md "Sura Social Model"
