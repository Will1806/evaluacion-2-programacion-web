import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import PanelMision from "./Components/PanelMision";
import Catalogo from "./Components/Catalogo";
import Bodega from "./Components/Bodega";
import AlertaError from "./Components/AlertaError";
import SesionExpirada from "./Components/SesionExpirada";
import { useTemporizador } from "./hooks/useTemporizador";
import {
  getInventario,
  getCarga,
  agregarSuministro,
  actualizarUnidades,
  eliminarSuministro,
  reiniciarSesion,
} from "./services/api";

const SEGUNDOS_MISION = 300; // 5 minutos

const formatearTiempo = (segundos) => {
  const m = Math.floor(segundos / 60);
  const s = String(segundos % 60).padStart(2, "0");
  return `${m}:${s}`;
};

function App() {
  const [inventario, setInventario] = useState([]);
  const [carga, setCarga] = useState({ creditos: 0, itemsCargados: [], total: 0 });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const { restante, expirado, reiniciar } = useTemporizador(SEGUNDOS_MISION);

  const refrescar = useCallback(
    () =>
      Promise.all([getInventario(), getCarga()]).then(([inv, car]) => {
        setInventario(inv);
        setCarga(car);
      }),
    []
  );

  useEffect(() => {
    refrescar().catch((e) => setError({ id: Date.now(), texto: e.message }));
  }, [refrescar]);

  const ejecutar = async (accion) => {
    setCargando(true);
    setError(null);
    try {
      await accion();
      await refrescar();
    } catch (e) {
      setError({ id: Date.now(), texto: e.message });
    } finally {
      setCargando(false);
    }
  };

  const handleAgregar = (id) => ejecutar(() => agregarSuministro(id, 1));
  const handleActualizar = (id, cantidad) => ejecutar(() => actualizarUnidades(id, cantidad));
  const handleEliminar = (id) => ejecutar(() => eliminarSuministro(id));
  const handleReiniciar = () =>
    ejecutar(async () => {
      await reiniciarSesion();
      reiniciar();
    });

  return (
    <Container className="py-3">
      <h2 className="mb-3">🚀 AstroLogistics Ltd.</h2>
      <AlertaError error={error} />
      <PanelMision
        creditos={carga.creditos}
        total={carga.total}
        cargando={cargando}
        tiempo={formatearTiempo(restante)}
      />
      <Row>
        <Col md="8" xs="12">
          <Catalogo inventario={inventario} onAgregar={handleAgregar} cargando={cargando} />
        </Col>
        <Col md="4" xs="12">
          <Bodega
            items={carga.itemsCargados}
            inventario={inventario}
            onActualizar={handleActualizar}
            onEliminar={handleEliminar}
            cargando={cargando}
          />
        </Col>
      </Row>
      <SesionExpirada abierto={expirado} onReiniciar={handleReiniciar} />
    </Container>
  );
}

export default App;
