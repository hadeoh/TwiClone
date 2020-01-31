import { Router } from 'express';
const router = Router();
import * as UserController from '../controllers/user.controller';

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'twiclone server started ok' }));

router.get('/users', UserController.getAll);

export default router;
