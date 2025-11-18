import express from "express";
import { registerChild, getChildren } from "../controllers/childController.js";

const router = express.Router();

// Ruta para registrar un niño
router.post("/register", registerChild);

// Ruta para obtener todos los niños de un padre
router.get("/all/:parentId", getChildren);

export default router;
