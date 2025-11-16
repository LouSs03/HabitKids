import { Router } from "express";
import { registerChild, loginChild } from "../controllers/childController.js";

const router = Router();

router.post("/register", registerChild);
router.post("/login", loginChild);

export default router;
