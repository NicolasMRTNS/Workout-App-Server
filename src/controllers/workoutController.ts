import { Request, Response } from "express";
import { createWorkout, getAllWorkouts } from "../services/workoutService";
import { ResponseData } from "../models/ResponseData";

export async function fetchWorkouts(req: Request, res: Response) {
    try {
        const { name, workoutType, exercise } = req.query as { name?: string, workoutType?: string, exercise?: string | string[] };
        const workouts = await getAllWorkouts(name, workoutType, exercise);

        res.status(200).json(ResponseData.success(workouts));
    } catch (error) {
        console.log("Error when fetching workouts: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}

export async function create(req: Request, res: Response) {
    try {
        const { name, exercises, userId, workoutType } = req.body;

        if (!name || !Array.isArray(exercises) || !workoutType) {
            console.log("Invalid request body: ", req.body);
            return res.status(400).json(ResponseData.error("Invalid request body"));
        }

        const workout = await createWorkout({ name, exercises, userId, workoutType });
        res.status(201).json(ResponseData.success([workout], "Workout created successfully"));
    } catch (error) {
        console.log("Error when creating workout: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}