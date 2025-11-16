import { Router } from "express";
import { registerParent, loginParent } from "../controllers/Parent.js";

const router = Router();

// Registro
router.post("/register", registerParent);

// Login 
router.post("/login", loginParent);

export default router;
