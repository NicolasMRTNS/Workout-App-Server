import { Router } from "express";
import { createSet, deleteSet, fetchProgress, update } from "../controllers/progressController";

const router = Router();

router.get("/:workoutId", fetchProgress);
router.put("/:exerciseId/:workoutId", update);

router.post("/sets/:exerciseId/:workoutId", createSet);
router.delete("/sets", deleteSet);

export default router;