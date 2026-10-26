const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.mensaje || "Error inesperado en el servidor");
  }
  return data;
}

export const getInventario = () => request("/inventario");

export const getCarga = () => request("/carga");

export const agregarSuministro = (equipoId, cantidad = 1) =>
  request("/carga/agregar", {
    method: "POST",
    body: JSON.stringify({ equipoId, cantidad }),
  });

export const actualizarUnidades = (id, cantidad) =>
  request(`/carga/actualizar-unidades/${id}`, {
    method: "PUT",
    body: JSON.stringify({ cantidad }),
  });

export const eliminarSuministro = (id) =>
  request(`/carga/eliminar/${id}`, { method: "DELETE" });

export const reiniciarSesion = () => request("/reiniciar", { method: "POST" });