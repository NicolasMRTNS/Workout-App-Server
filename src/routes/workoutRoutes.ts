import { Router } from "express";
import { create, fetchWorkouts } from "../controllers/workoutController";

const router = Router();

router.get("/", fetchWorkouts)
router.post("/", create);

export default router;