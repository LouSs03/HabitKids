import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);

// Conexión a Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Ruta base
app.get("/", (req, res) => {
  res.send("HabitKids API funcionando");
});

// Servidor
app.listen(process.env.PORT, () =>
  console.log(`Servidor en http://localhost:${process.env.PORT}`)
);

