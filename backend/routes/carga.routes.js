import { Router } from "express";
import { estado, getCarga, creditosDisponibles } from "../data/store.js";

const router = Router();

// GET /api/carga
router.get("/", (req, res) => {
  res.json(getCarga());
});

