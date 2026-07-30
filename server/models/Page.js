import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    type: { type: String, enum: ['hero', 'text', 'image', 'richtext'], default: 'text' },
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    body: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    isCore: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sections: { type: [sectionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model('Page', pageSchema);
