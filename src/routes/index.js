import { Router } from "express";
const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req, res) =>
  res.send({ check: "twiclone server started ok" })
);

export default router;