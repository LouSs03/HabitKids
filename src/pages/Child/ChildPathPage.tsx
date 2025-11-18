import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Routine {
  _id: string;
  name: string;
  duration: number;
  date: string;      // ISO string
  completed: boolean;
  child: string;
}

type StepStatus = "done" | "current" | "locked";

const ChildPathPage: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!childId) return;

    const fetchRoutines = async () => {
      try {
        setLoading(true);
        setError(null);

        const resp = await fetch(
          `http://localhost:4000/routines/today/${childId}`
        );

        if (!resp.ok) {
          throw new Error("No se pudieron cargar las rutinas");
        }

        const data = await resp.json();
        setRoutines(data.routines || []);
      } catch (err: any) {
        setError(err.message || "Error al cargar rutinas");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [childId]);

  const handleCompleteRoutine = async (routineId: string) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/routines/${routineId}/complete`,
        { method: "PATCH" }
      );

      if (!resp.ok) {
        throw new Error("No se pudo completar la rutina");
      }

      setRoutines((prev: Routine[]) =>
        prev.map((r) =>
          r._id === routineId ? { ...r, completed: true } : r
        )
      );
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al completar rutina");
    }
  };

  const getStepStatus = (index: number): StepStatus => {
    const completedCount = routines.filter((r) => r.completed).length;

    if (index < completedCount) return "done";
    if (index === completedCount) return "current";
    return "locked";
  };

  const styles: any = {
    page: {
      minHeight: "100vh",
      background: "#FFFDF6",
      display: "flex",
      justifyContent: "center",
      padding: "32px 16px",
    },
    container: {
      width: "100%",
      maxWidth: "480px",
      background: "#FFFFFF",
      borderRadius: "24px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      padding: "24px 20px",
    },
    header: {
      marginBottom: "24px",
    },
    title: {
      fontSize: "20px",
      fontWeight: 700,
      color: "#333",
      marginBottom: "4px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#888",
    },
    stepWrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "16px",
    },
    line: {
      width: "3px",
      height: "40px",
      background: "#e5e5e5",
      marginBottom: "10px",
    },
    node: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "6px",
      cursor: "pointer",
      transition: "transform 0.15s ease",
    },
    nodeLabel: {
      fontSize: "13px",
      textAlign: "center" as const,
      maxWidth: "120px",
      color: "#555",
      marginBottom: "16px",
    },
    done: {
      background: "#C5F5C5",
      border: "3px solid #28A745",
      color: "#1E7A34",
    },
    current: {
      background: "#FFF066",
      border: "3px solid #F5C518",
      color: "#6B4F00",
    },
    locked: {
      background: "#F0F0F0",
      border: "3px solid #C8C8C8",
      color: "#999999",
      cursor: "not-allowed",
      opacity: 0.6,
    },
    badge: {
      fontSize: "18px",
      fontWeight: 700,
    },
    footerInfo: {
      marginTop: "12px",
      fontSize: "12px",
      color: "#999",
      textAlign: "center" as const,
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>Cargando camino de hoy...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={{ color: "#d9534f" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.title}>Camino de hoy</div>
          <div style={styles.subtitle}>
            Completa las rutinas en orden para mantener tu racha 💫
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {routines.map((routine, index) => {
            const status = getStepStatus(index);

            let nodeStyle = { ...styles.node };
            if (status === "done") nodeStyle = { ...nodeStyle, ...styles.done };
            if (status === "current") nodeStyle = { ...nodeStyle, ...styles.current };
            if (status === "locked") nodeStyle = { ...nodeStyle, ...styles.locked };

            const isClickable = status === "current";

            return (
              <div key={routine._id} style={styles.stepWrapper}>
                <button
                  style={nodeStyle}
                  disabled={!isClickable}
                  onClick={() => {
                    if (isClickable) {
                      handleCompleteRoutine(routine._id);
                    }
                  }}
                >
                  <span style={styles.badge}>
                    {status === "done" && "✔"}
                    {status === "current" && index + 1}
                    {status === "locked" && "🔒"}
                  </span>
                </button>

                <div style={styles.nodeLabel}>{routine.name}</div>

                {index < routines.length - 1 && <div style={styles.line} />}
              </div>
            );
          })}
        </div>

        <div style={styles.footerInfo}>
          Solo puedes tocar la rutina actual.  
          Las siguientes se desbloquean cuando completes las anteriores.
        </div>
      </div>
    </div>
  );
};

export default ChildPathPage;
