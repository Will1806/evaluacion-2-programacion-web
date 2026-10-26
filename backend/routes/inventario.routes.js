import { Router } from "express";
import { estado } from "../data/store.js";

const router = Router();

// GET /api/inventario
router.get("/", (req, res) => {
  res.json(estado.inventario);
});

export default router;
