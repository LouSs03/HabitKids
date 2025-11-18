import express from "express";
import { createRoutine, getSummary } from "../controllers/routineController.js";

const router = express.Router();

// Ruta para crear una rutina
router.post("/create", createRoutine);

// Ruta para obtener el resumen de las rutinas
router.get("/summary", getSummary);

export default router;
