import { Router } from "express";
import { estado, getCarga, creditosDisponibles } from "../data/store.js";

const router = Router();

// GET /api/carga
router.get("/", (req, res) => {
  res.json(getCarga());
});

// POST /api/carga/agregar  { equipoId, cantidad }
router.post("/agregar", (req, res) => {
  const { equipoId, cantidad } = req.body;

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    return res.status(400).json({ mensaje: "La cantidad debe ser un entero mayor a 0" });
  }

  const producto = estado.inventario.find((p) => p.id === equipoId);
  if (!producto) {
    return res.status(404).json({ mensaje: "Suministro no encontrado" });
  }
  if (producto.stock < cantidad) {
    return res.status(400).json({ mensaje: "Stock en base insuficiente" });
  }
  if (producto.precio * cantidad > creditosDisponibles()) {
    return res.status(400).json({ mensaje: "Créditos insuficientes para esta cantidad" });
  }

  producto.stock -= cantidad;
  const item = estado.itemsCargados.find((i) => i.id === equipoId);
  if (item) {
    item.cantidad += cantidad;
  } else {
    estado.itemsCargados.push({ id: equipoId, cantidad });
  }

  res.status(201).json(getCarga());
});

// PUT /api/carga/actualizar-unidades/:id  { cantidad }
router.put("/actualizar-unidades/:id", (req, res) => {
  const id = Number(req.params.id);
  const { cantidad } = req.body;

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    return res.status(400).json({ mensaje: "La cantidad debe ser un entero mayor a 0" });
  }

  const item = estado.itemsCargados.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ mensaje: "El suministro no está en la carga" });
  }

  const producto = estado.inventario.find((p) => p.id === id);
  const diferencia = cantidad - item.cantidad;

  if (diferencia > producto.stock) {
    return res.status(400).json({ mensaje: "Stock en base insuficiente" });
  }
  if (diferencia * producto.precio > creditosDisponibles()) {
    return res.status(400).json({ mensaje: "Créditos insuficientes para esta cantidad" });
  }

  producto.stock -= diferencia;
  item.cantidad = cantidad;

  res.json(getCarga());
});

// DELETE /api/carga/eliminar/:id
router.delete("/eliminar/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = estado.itemsCargados.findIndex((i) => i.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "El suministro no está en la carga" });
  }

  const producto = estado.inventario.find((p) => p.id === id);
  producto.stock += estado.itemsCargados[indice].cantidad;
  estado.itemsCargados.splice(indice, 1);

  res.json(getCarga());
});

export default router;
