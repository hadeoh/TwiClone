import { Router } from 'express';
import authRoutes from '../routes/auth.routes';
import tweetRoutes from '../routes/tweet.routes';
import userRoutes from '../routes/user.routes';
import searchRoutes from '../routes/search.routes';

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'twiclone server started ok' }));

router.use('/auth', authRoutes);

router.use('/tweets', tweetRoutes);

router.use('/users', userRoutes);

router.use('/search', searchRoutes);

export default router;
