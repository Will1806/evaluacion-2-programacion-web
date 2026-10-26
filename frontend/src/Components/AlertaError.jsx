import { UncontrolledAlert } from "reactstrap";

export default function AlertaError({ error }) {
  if (!error) return null;
  return (
    <UncontrolledAlert key={error.id} color="warning">
      ⚠️ {error.texto}
    </UncontrolledAlert>
  );
}
