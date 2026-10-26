import { Router } from "express";
import { reiniciarEstado, getCarga } from "../data/store.js";

const router = Router();

// POST /api/reiniciar (se usa cuando expira la ventana de lanzamiento)
router.post("/", (req, res) => {
  reiniciarEstado();
  res.json(getCarga());
});

export default router;
