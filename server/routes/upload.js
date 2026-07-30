import { Router } from 'express';
import { upload } from '../config/cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
  res.json({ imageUrl: req.file.path, imagePublicId: req.file.filename });
});

export default router;
