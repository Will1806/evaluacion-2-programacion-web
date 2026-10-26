import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Badge, Button } from "reactstrap";

export default function Catalogo({ inventario, onAgregar, cargando }) {
  return (
    <Row>
      {inventario.map((item) => (
        <Col md="4" xs="12" key={item.id}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h5">{item.nombre}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{item.categoria}</CardSubtitle>
              <p>
                <Badge color="success">{item.precio} Cr</Badge>
              </p>
              <p className="mb-2">Stock disponible: {item.stock}</p>
              {item.stock === 0 ? (
                <Button color="secondary" disabled block>
                  Agotado en Base
                </Button>
              ) : (
                <Button
                  color="primary"
                  block
                  disabled={cargando}
                  onClick={() => onAgregar(item.id)}
                >
                  Añadir a la Nave
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}