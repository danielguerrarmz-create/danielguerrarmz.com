# Hero Showcase Assets

Drop images here for the home page cycling showcase (one per project, 5 total).
JPG or PNG both work. Max ~500KB recommended for fast load.
Recommended size: 1920×1080 (16:9), but different resolutions work too.

## Different resolutions / aspect ratios

In `src/data/heroShowcase.ts` you can set per-image display:

- **objectFit** — `'cover'` (default): image fills the area, may crop. Use `'contain'` to show the full image with letterboxing (no crop).
- **objectPosition** — where to anchor when cropping: `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, or e.g. `'50% 30%'`.

Example for a portrait or tall image you don’t want cropped:
`{ projectId: 1, title: '...', src: '...', objectFit: 'contain' }`

Example to keep the top of the image visible:
`{ projectId: 2, title: '...', src: '...', objectPosition: 'top' }`

## Files expected (use either .jpg or .png):
- 01-synergy — Synergy with the Cosmos
- 02-pressure-ulcer — Pressure Ulcer Medical Device
- 03-hydraulic-commons — Hydraulic Commons
- 04-search-by-assembly — Search by Assembly
- 05-dougherty — Dougherty Arts Center
