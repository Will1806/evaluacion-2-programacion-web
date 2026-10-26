import { useState, useEffect } from "react";

export function useTemporizador(segundosIniciales) {
  const [restante, setRestante] = useState(segundosIniciales);

  useEffect(() => {
    if (restante <= 0) return;
    const id = setTimeout(() => setRestante((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [restante]);

  const reiniciar = () => setRestante(segundosIniciales);

  return { restante, expirado: restante <= 0, reiniciar };
}
