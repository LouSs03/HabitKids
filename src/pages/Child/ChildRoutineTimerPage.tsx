import { useParams } from "react-router-dom";

export function ChildRoutineTimerPage() {
  const { routineId } = useParams();

  return (
    <main>
      <h2>Rutina en progreso</h2>
      <p>ID de rutina: {routineId}</p>
      <p>Aquí irá el cronómetro animado y el botón "¡Terminé!".</p>
    </main>
  );
}
