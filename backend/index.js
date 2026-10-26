import express from "express";
import inventarioRoutes from "./routes/inventario.routes.js";
import cargaRoutes from "./routes/carga.routes.js";
import sesionRoutes from "./routes/sesion.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/inventario", inventarioRoutes);
app.use("/api/carga", cargaRoutes);
app.use("/api/reiniciar", sesionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor AstroLogistics en http://localhost:${PORT}`);
});
