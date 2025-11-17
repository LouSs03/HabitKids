import { Router } from "express";
import {
  createRoutine,
  getTodayRoutines,
  completeRoutine
} from "../controllers/routineController.js";

const router = Router();

router.post("/", createRoutine);
router.get("/today/:childId", getTodayRoutines);
router.patch("/:id/complete", completeRoutine);

export default router;
