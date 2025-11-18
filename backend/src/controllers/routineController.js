import Routine from "../models/Routine.js";

// Crear rutina
export const createRoutine = async (req, res) => {
  try {
    const { childId, name, duration, date } = req.body;
    const routine = new Routine({ child: childId, name, duration, date });

    await routine.save(); // Guardar la rutina
    res.json({ message: "Rutina creada", routine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener resumen de las rutinas
export const getSummary = async (req, res) => {
  try {
    const totalRoutines = await Routine.countDocuments();
    const completed = await Routine.countDocuments({ completed: true });
    const inProgress = await Routine.countDocuments({ completed: false });

    res.json({
      pending: totalRoutines - completed,
      inProgress,
      completed,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
