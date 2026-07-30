import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    logoUrl: { type: String, default: '' },
    heroBadgeUrl: { type: String, default: '' },
    heroImageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
