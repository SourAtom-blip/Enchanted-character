// Some stock art images have fake browser/app chrome baked into the picture
// (title bars, nav icons) from the source generator. Zoom-crop those specific
// images so the chrome falls outside the visible frame.
const CROPS = [
  { match: 'AB6AXuBG12bpbMTNgoqHZiqyub85ifX1LyWJen40LGoKIll13XGiG-h9GyToHd8eCUUmDFIq', size: '134% 134%' }, // Wine & Canvas (corner watermark, no clean alternative provided)
  { match: 'AB6AXuAdaTaSF-YDtjACEX8zr9_yWbx1Jz7loX_Cyw5Hzgk_u0FNgImXITcnxaI1C2ruVNdJqzQq7', size: '160% 160%' }, // A Hearthside Story (top + bottom caption bars)
  { match: 'AB6AXuDVazThhLBMAm1qjINj1HtFCF-JDvLVRKj8Zpg9YoYaeaKTB6JIAzYqv5eQCzySqAomhZ', size: '220% 220%' }, // Lavender Dreams (caption bars + left edge strip)
  { match: 'AB6AXuCDExoZrRITq8YhcTL0yYYpT7TKHyz3wABAEGmBKzEzROYRlm_j4fOu_ycPEBafHeux', size: '220% 220%' }, // Celestial Citadel (caption bars + left edge strip)
  { match: 'AB6AXuAxCPNOpmmyX_9G168vrhsCgWHU-JmqWZU9JLD7G1E5EA66X7GzE-pRU8YKDnm5v_h', size: '160% 160%' }, // Abyssal Serenade (top caption bar)
  { match: 'AB6AXuD5CCW0xZVQquXf04zb26Gbj-cIl0yqbqc2DKviVCweMpAPtZ7t-U7-TWneENLJFxi', size: '160% 160%' }, // Grand Atelier Venue (top caption bar)
  { match: 'd8awjhq9gyjmdses2xqd', size: '190% 190%', position: 'left center' }, // Elsa (isolate from duo photo)
  { match: 'cglf1dfc2admmpkw94qt', size: '180% 180%', position: 'left top' }, // Batman (isolate from duo photo)
];

// Cloudinary-hosted images are uploaded at full resolution; inject an
// auto quality/format transformation so they're served compressed
// (this also covers images uploaded before optimized upload settings existed).
function optimizeUrl(imageUrl) {
  if (!imageUrl.includes('res.cloudinary.com') || imageUrl.includes('/upload/q_auto')) return imageUrl;
  return imageUrl.replace('/upload/', '/upload/q_auto,f_auto/');
}

export function getImageStyle(imageUrl) {
  if (!imageUrl) return {};
  const optimized = optimizeUrl(imageUrl);
  const crop = CROPS.find((c) => imageUrl.includes(c.match));
  if (!crop) {
    return { backgroundImage: `url("${optimized}")` };
  }
  return {
    backgroundImage: `url("${optimized}")`,
    backgroundSize: crop.size,
    backgroundPosition: crop.position || 'center center',
  };
}
