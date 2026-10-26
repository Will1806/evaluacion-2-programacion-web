import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function SesionExpirada({ abierto, onReiniciar }) {
  return (
    <Modal isOpen={abierto} backdrop="static" keyboard={false} centered>
      <ModalHeader>⏰ Ventana de lanzamiento cerrada</ModalHeader>
      <ModalBody>
        No completaste la carga a tiempo y la sesión se cerró. Inicia una nueva misión
        para volver a intentarlo.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onReiniciar}>
          Iniciar de nuevo
        </Button>
      </ModalFooter>
    </Modal>
  );
}
