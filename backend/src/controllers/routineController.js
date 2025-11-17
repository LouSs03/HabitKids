import Routine from "../models/Routine.js";

// Función para obtener la fecha local en formato YYYY-MM-DD
function getLocalDate() {
  const now = new Date();
  return (
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0")
  );
}

// Crear rutina
export const createRoutine = async (req, res) => {
  try {
    const { childId, name, duration, date } = req.body;

    if (!childId || !name || !duration || !date) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const routine = await Routine.create({
      child: childId,
      name,
      duration,
      date,          // Guardamos la fecha exacta que el padre envía
      completed: false
    });

    res.json({
      message: "Rutina creada",
      routine
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener rutinas del día
export const getTodayRoutines = async (req, res) => {
  try {
    const { childId } = req.params;

    const today = getLocalDate(); // Fecha REAL del sistema

    const routines = await Routine.find({
      child: childId,
      date: today
    });

    res.json({ routines });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Completar rutina
export const completeRoutine = async (req, res) => {
  try {
    const { id } = req.params;

    const routine = await Routine.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    res.json({
      message: "Rutina completada",
      routine
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
