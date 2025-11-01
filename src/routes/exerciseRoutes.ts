import { Router } from "express";
import { fetchExercises } from "../controllers/exerciseController";

const router = Router();

router.get("/", fetchExercises);

export default router;