// Some stock art images have fake browser/app chrome baked into the picture
// (title bars, nav icons) from the source generator. Zoom-crop those specific
// images so the chrome falls outside the visible frame.
const CROPS = [
  { match: 'AB6AXuBG12bpbMTNgoqHZiqyub85ifX1LyWJen40LGoKIll13XGiG-h9GyToHd8eCUUmDFIq', size: '134% 134%' }, // Wine & Canvas (corner watermark, no clean alternative provided)
  { match: 'AB6AXuAdaTaSF-YDtjACEX8zr9_yWbx1Jz7loX_Cyw5Hzgk_u0FNgImXITcnxaI1C2ruVNdJqzQq7', size: '160% 160%' }, // A Hearthside Story (top + bottom caption bars)
  { match: 'AB6AXuDVazThhLBMAm1qjINj1HtFCF-JDvLVRKj8Zpg9YoYaeaKTB6JIAzYqv5eQCzySqAomhZ', size: '220% 220%' }, // Lavender Dreams (caption bars + left edge strip)
  { match: 'AB6AXuCDExoZrRITq8YhcTL0yYYpT7TKHyz3wABAEGmBKzEzROYRlm_j4fOu_ycPEBafHeux', size: '220% 220%' }, // Celestial Citadel (caption bars + left edge strip)
];

export function getImageStyle(imageUrl) {
  if (!imageUrl) return {};
  const crop = CROPS.find((c) => imageUrl.includes(c.match));
  if (!crop) {
    return { backgroundImage: `url("${imageUrl}")` };
  }
  return {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: crop.size,
    backgroundPosition: 'center center',
  };
}
