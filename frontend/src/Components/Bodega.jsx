import { ListGroup, ListGroupItem, ButtonGroup, Button, Badge } from "reactstrap";

export default function Bodega({ items, inventario, onActualizar, onEliminar, cargando }) {
  return (
    <>
      <h5>Tu Bodega de Carga</h5>
      <ListGroup>
        {items.length === 0 && <ListGroupItem>La bodega está vacía</ListGroupItem>}
        {items.map((item) => {
          const suministro = inventario.find((s) => s.id === item.id);
          if (!suministro) return null;
          return (
            <ListGroupItem key={item.id}>
              <div className="fw-bold">{suministro.nombre}</div>
              <small className="text-muted">
                {suministro.precio} Cr c/u · Subtotal: {suministro.precio * item.cantidad} Cr
              </small>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <ButtonGroup size="sm">
                  <Button
                    outline
                    disabled={cargando || item.cantidad <= 1}
                    onClick={() => onActualizar(item.id, item.cantidad - 1)}
                  >
                    -
                  </Button>
                  <Button outline disabled>
                    <Badge color="dark">{item.cantidad}</Badge>
                  </Button>
                  <Button
                    outline
                    disabled={cargando}
                    onClick={() => onActualizar(item.id, item.cantidad + 1)}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  color="danger"
                  outline
                  size="sm"
                  disabled={cargando}
                  onClick={() => onEliminar(item.id)}
                >
                  Desembarcar
                </Button>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
}
