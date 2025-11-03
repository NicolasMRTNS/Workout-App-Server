import { Router } from "express";
import { create, deleteWkt, fetchWorkouts, update } from "../controllers/workoutController";

const router = Router();

router.get("/", fetchWorkouts)
router.post("/", create);
router.delete("/:id", deleteWkt);
router.put("/:id", update)

export default router;