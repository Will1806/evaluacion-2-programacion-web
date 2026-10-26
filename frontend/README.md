# AstroLogistics Ltd. – Evaluación II Programación Web

## Ejecutar
```bash
# Terminal 1
cd backend && npm install && npm run dev   # http://localhost:3000

# Terminal 2
cd frontend && npm install && npm run dev  # http://localhost:5173
```

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/inventario | Lista de suministros con precio y stock |
| GET | /api/carga | Carga actual, créditos y total |
| POST | /api/carga/agregar | Agrega suministro `{ equipoId, cantidad }` |
| PUT | /api/carga/actualizar-unidades/:id | Cambia unidades `{ cantidad }` |
| DELETE | /api/carga/eliminar/:id | Quita suministro y devuelve stock |
| POST | /api/reiniciar | Reinicia la misión (al expirar el tiempo) |
