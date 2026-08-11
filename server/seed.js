import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import Admin from './models/Admin.js';
import Character from './models/Character.js';
import GalleryItem from './models/GalleryItem.js';
import Page from './models/Page.js';
import Event from './models/Event.js';
import SiteSettings from './models/SiteSettings.js';

const img = (id) => `https://lh3.googleusercontent.com/aida-public/${id}`;

async function seed() {
  await connectDB();

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'change-me-please';
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ email: adminEmail, passwordHash, name: 'Lorrie' });
    console.log(`Created admin: ${adminEmail}`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  const charCount = await Character.countDocuments();
  if (charCount === 0) {
    await Character.insertMany([
      {
        name: 'The Lavender Queen',
        tag: 'Princess',
        imageUrl: img('AB6AXuB3QkvGksj8xx7QPHXiSg5LDupuVkgDhqNUiH_bitzejf2ss9ozjDOr4zndcZO4mus-vd9FYFjqri1lN9irkcPl7U1zSVNJSOmm4bjj7vDlTYho3gaM08hh-EHaa0d_-sgcR0TwRJ9AucVzefWc21DE0VG8SkUIXrKmP9g377z8rw0_ILFKMlFHaQYwXYi_Si4gOuCt5YXobqdBUG7p4DGM3aFjhYS5Fckon7ygjyPqtUp91MFdg1B__EyEVjRajBjlvza6aGbnNGk'),
        order: 0,
      },
      {
        name: 'Golden Guard',
        tag: 'Hero',
        imageUrl: img('AB6AXuCG4Kr826AuxzqWV2b1dvjAFUed5fxiLmTL3gLOQh1gSH1Pve1f7VGandql6VF7bgu3pi2PIfEY2XY4WspgWba-BuGhAcQnRDftEHOS8nqCY2UonxijhuvP1deOsjOPxNcxdHyRuJPNcuUOWoJEYhwxH_CyNyo0ED_dmdmoLaI-mO2GxTH0meGpImSlLf8qEsUWjnk7jpX58JZoAO1Wlm3bN6_RYUqLi5i7Pzj9Clx7piwLFIWJZ1kdrPfM1UZnCpJWr_vgbB_8iho'),
        order: 1,
      },
      {
        name: 'Autumn Sylph',
        tag: 'Ethereal',
        imageUrl: img('AB6AXuAIYuvQljMmvNj0e5cmo8wmF3jWtgsfQhV6MBxXnvPF3rZUWfp4ZUgCqskD5NhRWFnayV542T1hDg6j1HM9N_LDKa_mc4Vii7Zf2XlhC_c1aQKomIKfyO8u4bUH0bsqrLKovpU_Ks7GAyNTikcFVHDDPxhn5etiDOWxp3pgBpPj1Y3IxTWv1WiVYxC81yJifFJwkQ2HgVwOzBxBFf0_5a6AiZWRcFallhpwbAC8objnIEtmOXbrkvUUtmfkg3clzvudOKE9jPZxZ-k'),
        order: 2,
      },
      {
        name: 'Star Voyager',
        tag: 'Explorer',
        imageUrl: img('AB6AXuCE-X5CYM117hsP4zyfVdO0-cC3Yp-h9ZtlN4y3UaXkULhp7IZkVyYpOupShpIAFT7jFvYH1Z2wuxJZFuJuBNkSHk_uAfKdVsDq7xxv1M2ZlZOSx2iQ_1kXJeS4K1yNOFu6skvZY968PQB_KW-_Wnso1vn_BzWmutRLYI0xY2l4fceBmODFzwMrz87Ku5ybFoMcsXFFlKZJ8L1KX2_pEtNquId7m4CT5UjZ2STRPeKl8zq-Tf0PGzWJxnlnVs0uDqg-zqmoTEt6o00'),
        order: 3,
      },
    ]);
    console.log('Seeded characters.');
  }

  const santaCount = await Character.countDocuments({ category: 'Santas' });
  if (santaCount === 0) {
    await Character.insertMany([
      {
        name: 'JD',
        tag: 'Santa',
        imageUrl: 'https://res.cloudinary.com/fl5vkej3/image/upload/v1786464372/enchanted-arts/pzlhq1x8mw6c60s7krin.jpg',
        category: 'Santas',
        order: 0,
      },
      {
        name: 'Jansen',
        tag: 'Santa',
        imageUrl: 'https://res.cloudinary.com/fl5vkej3/image/upload/v1786464374/enchanted-arts/pxexcmbimli38wk6gu6k.jpg',
        category: 'Santas',
        order: 1,
      },
      {
        name: 'Fred',
        tag: 'Santa',
        imageUrl: 'https://res.cloudinary.com/fl5vkej3/image/upload/v1786464713/enchanted-arts/lx7ehfjroqfkxdpfhgvv.jpg',
        category: 'Santas',
        order: 2,
      },
      {
        name: 'David',
        tag: 'Santa',
        imageUrl: 'https://res.cloudinary.com/fl5vkej3/image/upload/v1786464715/enchanted-arts/ac8teearqi8hleb6sy5w.jpg',
        category: 'Santas',
        order: 3,
      },
    ]);
    console.log('Seeded Santas.');
  }

  const mrsClausCount = await Character.countDocuments({ category: 'MrsClaus' });
  if (mrsClausCount === 0) {
    await Character.insertMany([
      {
        name: 'Lorrie',
        tag: 'Mrs. Claus',
        category: 'MrsClaus',
        order: 0,
        imageUrl: 'https://res.cloudinary.com/fl5vkej3/image/upload/v1786465661/enchanted-arts/cpjgrt12lwxac7dhmyka.jpg',
        description:
          'Miss Lorrie is a favorite for "Storytime with Mrs Claus". She is available to do crafts, help kids, write letters to Santa, play games, Christmas coloring pages, sing Christmas carols and sing alongs, as well as reading and entertaining. She and JD have been performing as Mr. and Mrs. Claus for 13 years as of 2026.',
      },
      {
        name: 'Lisa',
        tag: 'Mrs. Claus',
        category: 'MrsClaus',
        order: 1,
        imageUrl: 'https://res.cloudinary.com/fl5vkej3/image/upload/v1786465662/enchanted-arts/icexokaf6f2uug09ghhs.jpg',
        description:
          "Lisa is one of our newest members of the Santa team. Kids love to hear her read delightful Christmas stories. And tell them all about the reindeer.",
      },
    ]);
    console.log('Seeded Mrs. Claus.');
  }

  const galleryCount = await GalleryItem.countDocuments();
  if (galleryCount === 0) {
    await GalleryItem.insertMany([
      // Art Showcase pieces (original paintings) — from art_showcase_lorrie_s_painted_wonders mockup
      {
        title: 'Lavender Dreams',
        subtitle: "An ethereal exploration of childhood wonder, capturing the quiet magic of a moonlit lavender field.",
        imageUrl: img('AB6AXuDVazThhLBMAm1qjINj1HtFCF-JDvLVRKj8Zpg9YoYaeaKTB6JIAzYqv5eQCzySqAomhZrmNcqnJkGvgALeAeedA5LEoPv9-nDK7wU6bYSDuwO_cwjRRGxkLS7bh4tGn8eW8OMoZJJlvayI-zUR179f6xO0dOnNbsh1udfrXFtQni6W01xYU7LlR1doh6pKnfm0tLbOPWe8eokxLY4KI9VluSU4M7Ur43D0wFGRxygnkW3PZMXac2SFTwpYEglNNvZlzGRj5sqwrCk'),
        size: 'medium',
        type: 'art',
        order: 0,
      },
      {
        title: 'The Guardian',
        subtitle: "A majestic study of nature's hidden protectors, rendered in rich acrylic textures.",
        imageUrl: img('AB6AXuCjQ9wQ7fMbn9C2w7M1ZFj6syDyLeyounez1HNO3HKdxXJjXzID-z0DyBcl0dEsKqDKI81QgajOf5n5EMTlT91A9d5oGy78vmwW0FxLPNqrm2wNjir9bSbthpdNa8XgmDOBArnhNMRaMNu3YFOGURLl_PwX0SxB4cp0pgJ82fDW9HyojEnV8fV4-vZOvvEATSmSo_Q0qVBnRgrqyLh2i05Q196NuavP1xoZxQor_iyY3o3XQWzeBqMgDg-zWXMh4H_dnpKx7og3yls'),
        size: 'medium',
        type: 'art',
        order: 1,
      },
      {
        title: 'Celestial Citadel',
        subtitle: 'A journey beyond the horizon where the architecture of dreams meets the colors of twilight.',
        imageUrl: img('AB6AXuCDExoZrRITq8YhcTL0yYYpT7TKHyz3wABAEGmBKzEzROYRlm_j4fOu_ycPEBafHeuxN8fBjCWL3yQYQecGSsX9SPnDkD66V630-DERQQD3lQPb5zMooAT_Un7-pNYiD6080RjY183gzri5u9WG07CJm17tF-Jh9WRofnqb_W50j2qpxflDFhLTdVqM-1lln3TMosZQpsponoObfY-eWWeWrTWG3zZX95EToOxwv7KfL6pIMTnzbR2TPf_mSdCmU6jRndE4fHodDgU'),
        size: 'large',
        type: 'art',
        order: 2,
      },
      {
        title: 'Abyssal Serenade',
        subtitle: "Capturing the silent, glowing beauty of the deep ocean's most elusive inhabitants.",
        imageUrl: img('AB6AXuAxCPNOpmmyX_9G168vrhsCgWHU-JmqWZU9JLD7G1E5EA66X7GzE-pRU8YKDnm5v_hvYe3mESUJ63yP912NfEwt0LQk32QNRmJ13KZBi_9vDr_AYoiinb2YCyAs6A9bTLlkN-Cjocnd1uOrdIXfkagnhak9PucziwMDhp34hXPxlYVrVIXMLE36_JciU2oFnDA4MXpQaiZ8hTTxDTUv5Tcr-w-GK_dOuQWewnxPYXtMPBXNdn1wTkmllWijnMPMnisQMMkgnjjmvqI'),
        size: 'medium',
        type: 'art',
        order: 3,
      },
      {
        title: 'Autumn Reverie',
        subtitle: 'A celebration of connection and whimsy amidst the falling leaves of an enchanted garden.',
        imageUrl: img('AB6AXuBbR5jrdgSMXCfdNq3ahEMDual6gXhT2OSdDlvnSmlkWsO-jMW8mHJH0WLS9u7u-bPcdF0cUsrtz-qXXrNxwqrf3SJDKTCFe8gt90DmGKbtxUDtvpyoaiMnxbU8uxKloX82IJmoOXid-tEKbuzKaYRR7eIiM5A9yNZCe6r3FJy_C8CwINs9ZEEWayr3LU_pZ1CnfquBBRIgbjhx2KRrLWgUnhtu1IdfT_U2deWx3FTcxybeYWORPD4uOZiV03Cwd94r8gyXDY41xkc'),
        size: 'large',
        type: 'art',
        order: 4,
      },
      // Gallery "moments" (event performance photos) — from gallery_magical_moments_captured mockup
      {
        title: 'A Hearthside Story',
        subtitle: 'Private Residence • 2023',
        imageUrl: img('AB6AXuAdaTaSF-YDtjACEX8zr9_yWbx1Jz7loX_Cyw5Hzgk_u0FNgImXITcnxaI1C2ruVNdJqzQq7Ust3PDjjqINk1FB5ZrFuJHz7DHzCB-CPbNyBb6i91ubUD5NSXIrkFFcV5cubgJRitqwcmP5omxhMF6NcWAb3JhRX9pcAp0u3i2RiyfizLmbJXW8CB_hOWQe8GHAXgMO4L6ItOxH47Pukf72ej-I6yWoDLMOCwxhL7NXTro15jgDwSB2dJusLmCZbvaoxinjp16kDyc'),
        size: 'large',
        type: 'photo',
        category: 'Holiday Magic',
        order: 0,
      },
      {
        title: "Mrs. Claus' Kitchen",
        subtitle: 'Corporate Gala',
        imageUrl: img('AB6AXuDEOdm6ju9OQs2ZZyGoP81HflrJvoR4Th67ZNfpGVpvt8FvOlbRnZpF4qKCpFtSV2jEi2iYRQof6Rm67CnUqXS1LljzAwZTVAm-L6GQLpMDRTanfygaMH9-ip3G7G_CBWNTgyDQ6E1RWJfiITvyHtLo8ngCxCHg6TkWsDhJ259s0Xxz-uSEvkQglhrgPZFgYnKcE3ULIrIb0veYt4-ylHKcRlsyL3GSmrVRD53qtqyKePMHgYDgk2fA6ooofUN1iDuFVuC75fy1bcQ'),
        size: 'medium',
        type: 'photo',
        category: 'Holiday Magic',
        order: 1,
      },
      {
        title: 'The Lavender Sovereign',
        subtitle: 'Spring Coronation',
        imageUrl: img('AB6AXuDc4crbv2r_qNjZ59yGrMq99TzvIqjk2yKzU2e6x3SIutMaPi-QJfOQeuA-xXAO3JNy3vBLFc6ObUHj5JezFg8KAZuA9h4dAvIj0T0rrcuSJoA7DWcoLWo5IE2J_vswnQe2Wy9heGWULvaxUP58-0m4rhiwSGM8WSbn3_ohKUc7ywOpmG8EfLvgCHDBHx7eu4pmNVswTNNVmCXH4aZExAN4ni3kNyTnRC0sH5vijVh_0A5QEihI7FUw7SJnKCH82_xdxK9d1suqlk0'),
        size: 'large',
        type: 'photo',
        category: 'Royal Balls',
        order: 2,
      },
      {
        title: 'Enchanted Tea Garden',
        subtitle: 'Community Festival',
        imageUrl: img('AB6AXuAGR5WKFSQUsXC4bl3rGnYnt4JTEe1ngZ3KGEgY8pJHbwBgvHSg0uaqN-BfCPiCCTyLs42uqSBAOQuq1PsSvHQjUq-TcK_JsqwUEr2ICkxAVD-i5YYGffleUSQGffIpPwyQ-8qfYeR43Ibvwsb3KPUKY7E9mGX_etTkjjnnZWkYUJpbXm14CMtI7pi_YRebV_lFg4LLyNLDI8dWRnkVxG5E_WAr3oBh3E935FO7qjbeUe_7QzdbxDLzn32wTRcTj2xenZv6NSlgklY'),
        size: 'large',
        type: 'photo',
        category: 'Royal Balls',
        order: 3,
      },
      {
        title: 'Glass Slippers',
        subtitle: 'Prop Detail',
        imageUrl: img('AB6AXuC7Y2GwK2v9Zi67nKEvOFLrJg3nB-Y2jtBdoXR7HT7brT_YE7ek7DKJjE-NLAhjh48o9UToGuLBGVFaHC4BJ9tbZZNW1BAm1ljUV9_UTjIzZLYLmfD3KTGwari_aF8zX1PgpCGhmrhbi77EteLoZhCYc5jVu12YAzBcdPsd6QMKqmX-WRY9INcc8nsyjvuWSddSd7rlo9jI_rMzR9OsH4ngcXVKlbcfUeHnXqVAYw_bhskUlexkyAlT9oPcWy8wXfwSQbdEVi6cUeY'),
        size: 'medium',
        type: 'photo',
        category: 'Royal Balls',
        order: 4,
      },
      {
        title: 'The Storyteller',
        subtitle: 'Library Reading Hour',
        imageUrl: img('AB6AXuCu15-iNY7UUBasQX7eD3vzdeePGxv9SRSssvGalRWU7pFjeU7D--WByXFJFu9tUhr6p60Xt1d85DAqXO596nyqVqTFczEtfIO6943MU7kcJjbPI9OGvADZTz8VUDx9PJmDy78sBg4OJJ0ZQ6-wJnpWh2uIEppnRdcJM8mZwIVB_ANgMPHve2xOUMS0iWt0IIVcu7wTXM4eWUCcJLEfAlSnbT5zFd3wfXe4CWQlwbbPdkSDJU00WAITTpCzdgoZjq0NyBzwxZHyzKg'),
        size: 'medium',
        type: 'photo',
        category: 'Royal Balls',
        order: 5,
      },
      {
        title: 'Rooftop Training Academy',
        subtitle: 'Public Event',
        imageUrl: img('AB6AXuCQwbzjbB_VUMkPihuNW6yNybHQv00LDZTotmAYw1fSjCDcGSJsBGkGno9NmTqMujD7Xb6Zf_dQpKv9v_iSo2sux8dsz-HvWnQ-sCmn9mXTu4zWjmluCGoLCmVPTo26VbCVRdosXHxi8cB9LYfDVU7yKgKXGZE_kOuqzOgENDdMTsZ16ZgiWk0Mx1krWICWqPxcmZ9W0j18scWepxLPRLmy-Y5bp83gsuBSsON_SG0CtnAaKZO2aTCKqkobtRZkLhB0Pe8iKMal2Uc'),
        size: 'large',
        type: 'photo',
        category: 'Superhero Training',
        order: 6,
      },
      {
        title: "The Protector's Gaze",
        subtitle: 'Heroic Portraits',
        imageUrl: img('AB6AXuChYxKz1SAkjsPWm2Ta6OmCaX9T8myj4jreCjnNklaIAR3piS52IFL1SC2BplnPhTxGeU0Zr-0fZ7aKuOhpinwu3FoBetBMgZZRzo2MtfDpK6ndbSFWTrtAljbuDj0EGUOxE_OOKyU3Il_Vh9TNxNr3jRh7AhDBsrgwHvw40U2bfHU4Zzr5LKVxT2SBuMhylRqaDrBbDX-OlLEJPw6sOJMc6Y9HlAJXd4iCopZd8i9fRd-W19qdVY-F_Af1ThOygHd_d-frgicWycc'),
        size: 'large',
        type: 'photo',
        category: 'Superhero Training',
        order: 7,
      },
    ]);
    console.log('Seeded gallery items.');
  }

  const pageCount = await Page.countDocuments();
  if (pageCount === 0) {
    await Page.insertMany([
      {
        slug: 'home',
        title: 'Home',
        isCore: true,
        sections: [
          {
            key: 'hero',
            type: 'hero',
            heading: 'Where Imagination Meets Professional Artistry',
            body: 'Princesses, superheroes, Santa & Mrs. Claus, and more — real entertainers bringing genuine magic to your event throughout the Permian Basin.',
            imageUrl: img('AB6AXuB_OKem_h0IDdLe0AzhIpSi5HfkE3fLP5xvDiDYWNKnh_V2AOGW8LWdONC0E0IZfemiYkwIxFA-rodCQ4HEexB27r-Xf4xbXEvmUGQknHctwmyt2xzo_NcrrmaxcGgh-YI44c9fTzXunOyPeHD9OBy41nV0_rOPeqzJ2uA6u6tZdUk9xuVTxB0gb2bgFwEeVqHaCkwUAlvrVhZsCVdAxqxXnVQ5mAMmZ1dcf07MPL8Qb6-iGOeKkmiJVhWMxys6Bk0HqlXiBuBsbPQ'),
            order: 0,
          },
          {
            key: 'trust',
            type: 'image',
            heading: 'Professional Performers You Can Trust',
            body: "Every performer is carefully vetted — background checked, drug screened, and non-smoking. Many come from theater or music backgrounds, and we don't just pose for photos; we sing, tell stories, and play games to make your event truly magical.",
            imageUrl: img('AB6AXuCZLHIkESK9EM1kbH1V8YJQcIm0kz9d0f8d-2NOk_nD9cSpv2kvIuk2dZtNkC1E6D2WzWmA8AJYA0SBLxP7JTrEctdrYmYBLJbL-UbmYNt9-DYj5Ij0USMFxK17a4kJJkG9K2yJjsoPyUDOalYZ4ecfGZIlKA0RCCn3mJiLkK3ZUIdI00OgBj_tLAyFjpCY_gOsdmTpNOPZYPHBbCh712qxK19BSLjiLkVrIcLtFNPYcwangvUofvc6bHhn3LnYQ9s1umoOazMZBB0'),
            order: 1,
          },
        ],
      },
      {
        slug: 'about',
        title: 'About Us',
        isCore: true,
        sections: [
          {
            key: 'intro',
            type: 'text',
            heading: 'Our Story',
            body: 'Once Upon A Party started as the Permian Basin Santa Crew. Owner Lorrie Norris and her husband JD have been performing as Mr. and Mrs. Claus for thirteen years. We are not just photo props — we are entertainers, and we love what we do.',
            order: 0,
          },
        ],
      },
      {
        slug: 'contact',
        title: 'Contact',
        isCore: true,
        sections: [
          {
            key: 'intro',
            type: 'text',
            heading: 'Ready to Start Your Story?',
            body: 'Complete the form below and I will be in touch as soon as possible — typically within two or three hours. Or call me directly at 432-528-6942.',
            order: 0,
          },
        ],
      },
    ]);
    console.log('Seeded pages.');
  }

  const settingsExisting = await SiteSettings.findOne({ key: 'main' });
  if (!settingsExisting) {
    await SiteSettings.create({
      key: 'main',
      logoUrl: img('AB6AXuANaU3yB_Z8geT6VqfbnboTreGnRV3zFybc3uXxaeUdNMZ_gFFdxWauN-qNQdtmCwstRauzZO7LDrBvNO1VbKrZlp1rtSPcu90oF-Uji9B_GzocthENLDNb8hx3I_8WlARftql9wwzWigRpyDSgwcFWnYk3DOFjQgl88cTJcp1ENS3Iy374MaZR013lu8CmoQaXl3Yj5DaBelRP07RVCXTTx_67HgTdxeKzBrA7dFIneAAZ1lj8NbdVuMfHPJONOGk5tNeqeknyJNI'),
      heroBadgeUrl: img('AB6AXuAmNpAuSDzlcbz5XFFgA7pCaiKB7ogOKVCVgbR36h_aDNkCItSH_U5wZWu7lWtIoMBfvMllXpVfgi5yGwToQ9WyYYPC54MGFNHoXYP7VkaGAI73-rKa9JG9y3v11LjxYMzHS9J8D5XD1oeI7YLwMXCxVCm_RhVtQRyoulz9UftnaxVpiIBIY85DHd-0E_KLT5pY7oFRpGiEn8MlOE6DG3kqn0wTfDHuXLYl5idmgaHxm93KjBRE10Ki7_WPZcaOKeB4lkhFWo5G070'),
      heroImageUrl: img('AB6AXuB_OKem_h0IDdLe0AzhIpSi5HfkE3fLP5xvDiDYWNKnh_V2AOGW8LWdONC0E0IZfemiYkwIxFA-rodCQ4HEexB27r-Xf4xbXEvmUGQknHctwmyt2xzo_NcrrmaxcGgh-YI44c9fTzXunOyPeHD9OBy41nV0_rOPeqzJ2uA6u6tZdUk9xuVTxB0gb2bgFwEeVqHaCkwUAlvrVhZsCVdAxqxXnVQ5mAMmZ1dcf07MPL8Qb6-iGOeKkmiJVhWMxys6Bk0HqlXiBuBsbPQ'),
    });
    console.log('Seeded site settings.');
  }

  const eventCount = await Event.countDocuments();
  if (eventCount === 0) {
    await Event.insertMany([
      {
        title: 'The Enchanted Princess Tea Party',
        eventType: 'Premium Experience',
        date: 'July 15, 2024',
        time: '2:00 PM — 4:30 PM',
        location: 'The Glass Conservatory, Oak Ridge',
        description:
          'A royal afternoon of refined pastries, herbal teas, and private audiences with three of our most beloved characters in the historic Conservatory Garden.',
        imageUrl: img('AB6AXuCrjKWHIFjxsDsfhhRdF-X_BwIDOL8cvsZbIpAJn5Mkr4Ucb6dEACfHdT1oV-d0lUo_2oIktaDJWROUCC3J4-LdhlFD0i_3UjNPEE2kWG0-WWxiSi2ZoVXAwzKGrNzVeb_U6_7sYXyHLqRfmk9buhlAuYvUkoNbfwhFzuywOw4HcBeSllh7YM866J8CPrXWBhHXvTspwDnicRkkqgQzCvLZVhHJqDL1i1JgVDILZEST3-OUp0d_daHcjSUD7HPHqsUHUxp_05MxLQ4'),
        featured: true,
        ctaLabel: 'Reserve Seating',
        order: 0,
      },
      {
        title: 'Wine & Canvas: Fantasy Edition',
        eventType: 'Art & Spirits',
        date: 'Aug 02',
        time: '7:00 PM',
        location: "Lorrie's Studio",
        description:
          'Sip on artisanal vintages while painting a live character model. Perfect for dates or creative friend groups.',
        imageUrl: img('AB6AXuBG12bpbMTNgoqHZiqyub85ifX1LyWJen40LGoKIll13XGiG-h9GyToHd8eCUUmDFIqKP3FGErnZ-Rge1VrlrPfg1_Zf3I9h0PNhE1WOELDLlxla1JL1fG13W06OeJE0stieU40FOtWa8VkaLcX8uZl6ptiuSZS8hLwqgxz9D2EynYgFSI41VaI-G_2Il5nh92NyMUjkivCUkCu3dPAU_cdkG1xhySUbC2r5G1f25M1FvI7URioeuBuOFMZtT0C8tWohpSLnRYxa6k'),
        ctaLabel: 'Details',
        order: 1,
      },
      {
        title: 'Fairytale Festival',
        eventType: 'Community Appearance',
        date: 'September 12',
        location: 'Central Park',
        description: 'Meet our full cast of characters at the annual City Park fair. Photo ops and live performances throughout the day.',
        ctaLabel: 'Inquire',
        order: 2,
      },
      {
        title: 'Royal Academy Workshop',
        eventType: 'Workshop',
        date: 'October 05',
        location: "Lorrie's Studio",
        description: 'Interactive etiquette and storytelling workshop for children. Learn the secrets of character acting and royal grace.',
        ctaLabel: 'Inquire',
        order: 3,
      },
    ]);
    console.log('Seeded events.');
  }

  await mongoose.disconnect();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
