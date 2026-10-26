import { Router } from "express";
import { getCarga } from "../data/store.js";

const router = Router();

// GET /api/carga
router.get("/", (req, res) => {
  res.json(getCarga());
});

export default router;
