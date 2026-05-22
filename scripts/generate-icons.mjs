// Regenerate raster icons + Open Graph image from the brand mark.
// Run with: node scripts/generate-icons.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const iconSvg = fs.readFileSync(path.join(root, "src/app/icon.svg"));

// Sun/aperture glyph (matches the web logo), rendered with a gradient stroke.
const glyph = `
  <g transform="translate(120 205) scale(6.875)" fill="none" stroke="url(#g)" stroke-width="2" stroke-linecap="round">
    <circle cx="16" cy="16" r="13"/>
    <circle cx="16" cy="16" r="5.5" fill="url(#g)" stroke="none"/>
    <line x1="24.5" y1="16" x2="27.5" y2="16"/>
    <line x1="22.01" y1="22.01" x2="24.13" y2="24.13"/>
    <line x1="16" y1="24.5" x2="16" y2="27.5"/>
    <line x1="9.99" y1="22.01" x2="7.87" y2="24.13"/>
    <line x1="7.5" y1="16" x2="4.5" y2="16"/>
    <line x1="9.99" y1="9.99" x2="7.87" y2="7.87"/>
    <line x1="16" y1="7.5" x2="16" y2="4.5"/>
    <line x1="22.01" y1="9.99" x2="24.13" y2="7.87"/>
  </g>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#46b6e8"/>
      <stop offset="55%" stop-color="#8a6cf0"/>
      <stop offset="100%" stop-color="#f3c969"/>
    </linearGradient>
    <radialGradient id="a1" cx="18%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#46b6e8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#46b6e8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a2" cx="88%" cy="12%" r="50%">
      <stop offset="0%" stop-color="#8a6cf0" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#8a6cf0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a3" cx="70%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#f3c969" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#f3c969" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b101c"/>
  <rect width="1200" height="630" fill="url(#a1)"/>
  <rect width="1200" height="630" fill="url(#a2)"/>
  <rect width="1200" height="630" fill="url(#a3)"/>
  ${glyph}
  <text x="408" y="280" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="700" fill="#ffffff">DAo Calculator</text>
  <text x="410" y="338" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#c2ccdb">Overcast Daylight Autonomy from Daylight Factor</text>
  <text x="410" y="404" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#6cc0ee">dao-calculator.pages.dev</text>
</svg>`;

await sharp(iconSvg).resize(256, 256).png().toFile(path.join(root, "src/app/icon.png"));
await sharp(iconSvg).resize(180, 180).png().toFile(path.join(root, "src/app/apple-icon.png"));
fs.mkdirSync(path.join(root, "public"), { recursive: true });
await sharp(Buffer.from(og)).png().toFile(path.join(root, "public/og.png"));
console.log("Generated: src/app/icon.png, src/app/apple-icon.png, public/og.png");
