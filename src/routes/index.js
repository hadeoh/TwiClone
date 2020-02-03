import { Router } from 'express';
import authRoutes from '../routes/auth.routes';
import tweetRoutes from '../routes/tweet.routes'

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'twiclone server started ok' }));

router.use('/auth', authRoutes);

router.use('/tweets', tweetRoutes);

export default router;
