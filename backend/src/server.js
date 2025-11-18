import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import childRoutes from "./routes/child.js"; // Ruta de niños
import routineRoutes from "./routes/routines.js"; // Ruta de rutinas

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/child", childRoutes); // Ruta para los niños
app.use("/routines", routineRoutes); // Ruta para las rutinas

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
