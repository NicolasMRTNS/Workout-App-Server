import { Request, Response } from "express";
import {
    addSetToProgress,
    deleteSetFromProgress,
    getProgress,
    updateProgress
} from "../services/progressService";
import { ResponseData } from "../models/ResponseData";
import { Progress, SetData } from "../models/Progress";

export async function fetchProgress(req: Request, res: Response) {
    try {
        const { workoutId } = req.params;
        const progress = await getProgress(workoutId);
        res.status(200).json(ResponseData.success(progress));
    } catch (error) {
        console.log("Error when fetching progress: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function update(req: Request, res: Response) {
    try {
        const { exerciseId, workoutId } = req.params;
        const { comment, feeling } = req.body as { comment?: string, feeling?: string};

        await updateProgress(exerciseId, workoutId, comment, feeling);
        res.status(200).json(ResponseData.success([], "Progress updated successfully"));
    } catch (error) {
        console.log("Error when updating progress: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function createSet(req: Request, res: Response) {
    try {
        const { exerciseId, workoutId } = req.params;
        const set = req.body as SetData;

        await addSetToProgress(set, exerciseId, workoutId);
        res.status(200).json(ResponseData.success([], "Progress fetched successfully"));
    } catch (error) {
        console.log("Error when fetching progress: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function deleteSet(req: Request, res: Response) {
    try {
        const { exerciseId, workoutId, setIndex } = req.params;
        await deleteSetFromProgress(exerciseId, workoutId, parseInt(setIndex));
        res.status(200).json(ResponseData.success([], "Progress deleted successfully"));
    } catch (error) {
        console.log("Error when deleting progress: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}