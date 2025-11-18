import mongoose from "mongoose";

// Definir el esquema para las rutinas
const routineSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" }, // Asociar con el niño
  name: { type: String },
  duration: { type: Number },
  date: { type: Date },
  completed: { type: Boolean, default: false }, // Si la rutina se completó
});

// Crear el modelo de Rutina
const Routine = mongoose.model("Routine", routineSchema);

export default Routine;
