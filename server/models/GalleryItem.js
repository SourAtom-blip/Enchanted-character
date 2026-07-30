import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
    size: { type: String, enum: ['large', 'medium'], default: 'medium' },
    type: { type: String, enum: ['art', 'photo'], default: 'art' },
    category: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);
