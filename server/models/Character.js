import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Character || mongoose.model('Character', characterSchema);
