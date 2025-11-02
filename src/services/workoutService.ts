import {Workout, WorkoutModel} from "../models/Workout";
import {getExercisesByUniqueName} from "./exerciceService";
import {getEnumByUniqueName, getEnumsByUniqueNames} from "./enumService";
import {FilterQuery} from "mongoose";

interface WorkoutWithDetails {
    _id: string;
    name: string;
    exercises: { uniqueName: string; displayName: string }[];
    workoutType: { uniqueName: string; displayName: string } | null;
}

/**
 * Fetch all workouts, optionally filtered by name, workout type, or user.
 */
export async function getAllWorkouts(
    name?: string,
    workoutType?: string,
    exercise?: string | string[]
): Promise<WorkoutWithDetails[]> {
    const filter: FilterQuery<Workout> = {};

    const exerciseArray = Array.isArray(exercise) ? exercise : exercise ? [exercise] : [];

    if (name) filter.name = { $regex: new RegExp(name, "i") };
    if (workoutType) filter.workoutType = workoutType;
    if (exerciseArray.length > 0) filter.exercises = { $all: exerciseArray };

    // fetch workouts
    const workouts = await WorkoutModel.find(filter).lean();

    // fetch all exercises and workoutTypes in one go to avoid N+1 queries
    const allExerciseUniqueNames = workouts.flatMap((w) => w.exercises);
    const exercises = await getExercisesByUniqueName(allExerciseUniqueNames) || [];

    const workoutTypeUniqueNames = workouts.map((w) => w.workoutType).filter(Boolean);
    const workoutTypes = await getEnumsByUniqueNames(workoutTypeUniqueNames, "workoutType") || [];

    // map for fast lookup
    const exerciseMap = Object.fromEntries(exercises.map((ex) => [ex.uniqueName, ex.displayName]));
    const workoutTypeMap = Object.fromEntries(workoutTypes.map((wt) => [wt.uniqueName, wt.displayName]));

    // construct detailed workouts
    return workouts.map((w) => ({
        _id: w._id.toString(),
        name: w.name,
        exercises: w.exercises.map((u) => ({uniqueName: u, displayName: exerciseMap[u] || u})),
        workoutType: w.workoutType
            ? {uniqueName: w.workoutType, displayName: workoutTypeMap[w.workoutType] || w.workoutType}
            : null,
    }));
}

/**
 * Create a new workout, validate that exercises exist, and add them to the workout.
 */
export async function createWorkout(data: {
    name: string;
    exercises: string[];
    userId: string;
    workoutType: string;
}): Promise<Workout> {
    const { name, exercises, userId, workoutType } = data;

    // Validate exercises exist in DB
    const exercisesExist = await getExercisesByUniqueName(exercises);
    if (exercisesExist?.length !== exercises.length) {
        throw new Error("Some exercises are invalid");
    }

    // Fetch workoutType enum
    const workoutTypeEnum = await getEnumByUniqueName(workoutType);
    if (!workoutTypeEnum) {
        throw new Error("Workout type not found");
    }

    // Create and save workout
    const workout = new WorkoutModel({
        name,
        exercises: exercisesExist.map(exercise => exercise.uniqueName),
        userId,
        workoutType: workoutTypeEnum.uniqueName
    });

    await workout.save();

    return workout.populate("exercises workoutType");
}