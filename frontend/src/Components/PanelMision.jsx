import { Alert, Badge, Spinner } from "reactstrap";

export default function PanelMision({ creditos, total, cargando, tiempo }) {
  return (
    <Alert
      color="info"
      className="d-flex flex-wrap justify-content-between align-items-center gap-2"
    >
      <span>
        Creditos disponibles: <strong>{creditos} Cr</strong>
      </span>
      <span>
        Costo total de Carga:{" "}
        <Badge color="dark" pill>
          {total} Cr
        </Badge>
      </span>
      {tiempo && (
        <span>
          ⏱ Ventana de lanzamiento:{" "}
          <Badge color="danger" pill>
            {tiempo}
          </Badge>
        </span>
      )}
      {cargando && (
        <span>
          <Spinner size="sm" /> Calculando peso...
        </span>
      )}
    </Alert>
  );
}