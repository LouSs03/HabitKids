import mongoose from "mongoose";

const RoutineSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  name: String,
  duration: Number, // minutos
  date: String,     // YYYY-MM-DD
  completed: Boolean,
});

export default mongoose.model("Routine", RoutineSchema);
