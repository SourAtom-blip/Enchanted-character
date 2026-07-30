import { Router } from 'express';
import Newsletter from '../models/Newsletter.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) return res.json({ message: 'You are already subscribed!' });
    await Newsletter.create({ email: email.toLowerCase() });
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    next(err);
  }
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const subs = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    next(err);
  }
});

export default router;
