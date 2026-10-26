import { useEffect, useState, useCallback } from "react";
import { Container } from "reactstrap";
import PanelMision from "./components/PanelMision";
import Catalogo from "./components/Catalogo";
import { getInventario, getCarga, agregarSuministro } from "./services/api";

function App() {
  const [inventario, setInventario] = useState([]);
  const [carga, setCarga] = useState({ creditos: 0, itemsCargados: [], total: 0 });
  const [cargando, setCargando] = useState(false);

  const refrescar = useCallback(
    () =>
      Promise.all([getInventario(), getCarga()]).then(([inv, car]) => {
        setInventario(inv);
        setCarga(car);
      }),
    []
  );

  useEffect(() => {
    refrescar().catch((e) => console.error(e.message));
  }, [refrescar]);

  const ejecutar = async (accion) => {
    setCargando(true);
    try {
      await accion();
      await refrescar();
    } catch (e) {
      console.error(e.message);
    } finally {
      setCargando(false);
    }
  };

  const handleAgregar = (id) => ejecutar(() => agregarSuministro(id, 1));

  return (
    <Container className="py-3">
      <h2 className="mb-3">🚀 AstroLogistics Ltd.</h2>
      <PanelMision creditos={carga.creditos} total={carga.total} cargando={cargando} />
      <Catalogo inventario={inventario} onAgregar={handleAgregar} cargando={cargando} />
    </Container>
  );
}

export default App;