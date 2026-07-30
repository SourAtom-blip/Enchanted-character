import { Router } from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const settings = (await SiteSettings.findOne({ key: 'main' })) || {};
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.put('/', requireAuth, async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({ key: 'main' }, req.body, {
      new: true,
      upsert: true,
    });
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

export default router;
