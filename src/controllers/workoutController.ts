import { Request, Response } from "express";
import {createWorkout, deleteWorkout, getAllWorkouts, updateWorkout} from "../services/workoutService";
import { ResponseData } from "../models/ResponseData";

export async function fetchWorkouts(req: Request, res: Response) {
    try {
        const { name, workoutType, exercise, date } = req.query as { name?: string, workoutType?: string, exercise?: string | string[], date?: Date };
        const workouts = await getAllWorkouts(name, workoutType, exercise, date);

        res.status(200).json(ResponseData.success(workouts));
    } catch (error) {
        console.log("Error when fetching workouts: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function create(req: Request, res: Response) {
    try {
        const { name, exercises, userId, workoutType, date } = req.body;

        if (!name || !Array.isArray(exercises) || !workoutType) {
            console.log("Invalid request body: ", req.body);
            return res.status(400).json(ResponseData.error("Invalid request body"));
        }

        const workout = await createWorkout({ name, exercises, userId, workoutType, date });
        res.status(201).json(ResponseData.success([workout], "Workout created successfully"));
    } catch (error) {
        console.log("Error when creating workout: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function deleteWkt(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json(ResponseData.error("Workout ID is required"));
        }
        await deleteWorkout(id);
        return res.status(200).json(ResponseData.success([], "Workout deleted successfully"));
    } catch (error) {
        console.log("Error when deleting workout: ", error);
        return res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name, exercises, userId, workoutType, date } = req.body;
        if (!id) {
            return res.status(400).json(ResponseData.error("Workout ID is required"));
        }
        if (!name || !Array.isArray(exercises) || !workoutType) {
            return res.status(400).json(ResponseData.error("Invalid request body"));
        }

        const workout = await updateWorkout(id, { name, exercises, userId, workoutType, date });
        res.status(200).json(ResponseData.success([workout], "Workout updated successfully"));
    } catch (error) {
        console.log("Error when updating workout: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}