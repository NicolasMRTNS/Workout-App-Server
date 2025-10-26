import { Router } from "express";
import { fetchEnums } from "../controllers/enumController";

const router = Router();

router.get("/", fetchEnums);

export default router;