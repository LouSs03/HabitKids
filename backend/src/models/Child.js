import mongoose from "mongoose";

// Definir el esquema para el niño
const childSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  age: { type: Number },
  avatar: { type: String }, // Imagen/avatar del niño (opcional)
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" } // Referencia al padre
});

// Crear el modelo de Niño
const Child = mongoose.model("Child", childSchema);

export default Child;
