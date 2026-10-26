export const PRESUPUESTO = 500;

const inventarioInicial = [
  { id: 201, nombre: "Tanque de Oxígeno XL", precio: 50, stock: 5, categoria: "Soporte Vital" },
  { id: 202, nombre: "Ración Liofilizada (caja)", precio: 20, stock: 10, categoria: "Alimentos" },
  { id: 203, nombre: "Panel Solar Plegable", precio: 120, stock: 3, categoria: "Energía" },
  { id: 204, nombre: "Kit Médico Orbital", precio: 80, stock: 4, categoria: "Medicina" },
  { id: 205, nombre: "Traje EVA", precio: 200, stock: 2, categoria: "Equipo" },
  { id: 206, nombre: "Filtro de Agua", precio: 35, stock: 0, categoria: "Soporte Vital" },
];

export const estado = {
  inventario: structuredClone(inventarioInicial),
  itemsCargados: [],
};

export const reiniciarEstado = () => {
  estado.inventario = structuredClone(inventarioInicial);
  estado.itemsCargados = [];
};

export const calcularTotal = () => {
  const total = estado.itemsCargados.reduce((acc, item) => {
    const producto = estado.inventario.find((p) => p.id === item.id);
    return acc + producto.precio * item.cantidad;
  }, 0);
  return Math.round(total * 100) / 100;
};

export const creditosDisponibles = () =>
  Math.round((PRESUPUESTO - calcularTotal()) * 100) / 100;

export const getCarga = () => ({
  creditos: creditosDisponibles(),
  itemsCargados: estado.itemsCargados,
  total: calcularTotal(),
});
