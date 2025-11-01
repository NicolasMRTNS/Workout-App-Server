import { Request, Response } from "express";
import { getAllExercises } from "../services/exerciceService";
import { ResponseData } from "../models/ResponseData";

export async function fetchExercises(req: Request, res: Response) {
    try {
        const { muscle, equipment, name } = req.query as { muscle?: string | string[], equipment?: string | string[], name?: string };
        const exercises = await getAllExercises(muscle, equipment, name);

        res.status(200).json(ResponseData.success(exercises));
    } catch (error) {
        console.log("Error when fetching exercises: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}