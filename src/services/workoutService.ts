import { FilterQuery } from "mongoose";
import { WorkoutModel } from "../models/Workout";
import { Workout } from "../models/Workout";
import { getEnumByUniqueName } from "./enumService";
import { getExercisesByUniqueNames } from "./exerciceService";

export async function getAllWorkouts(
    name?: string,
    workoutType?: string,
    exercise?: string | string[]
): Promise<Workout[]> {
    const filter: FilterQuery<Workout> = {};

    if (name) filter.name = { $regex: new RegExp(name, "i") };

    if (workoutType) {
        const workoutTypeDoc = await getEnumByUniqueName(workoutType);
        if (workoutTypeDoc) filter.workoutType = workoutTypeDoc._id;
    }

    if (exercise) {
        const exerciseArray = Array.isArray(exercise) ? exercise : [exercise];
        const exerciseDocs = await getExercisesByUniqueNames(exerciseArray);
        if (exerciseDocs && exerciseDocs.length > 0) filter.exercises = { $all: exerciseDocs.map((e) => e._id) };
    }

    return WorkoutModel.find(filter)
        .populate({
            path: "exercises",
            populate: [
                { path: "muscles" },
                { path: "equipments" },
            ],
        })
        .populate("workoutType")
        .lean();
}

export async function createWorkout(workoutData: {
    name: string;
    exercises: string[]; // uniqueNames
    workoutType: string; // uniqueName
    userId?: string;
}): Promise<Workout> {
    const { name, exercises, workoutType, userId } = workoutData;

    const exerciseDocs = await getExercisesByUniqueNames(exercises);
    if (exerciseDocs && exerciseDocs.length !== exercises.length) {
        throw new Error("One or more exercises not found");
    }

    const workoutTypeDoc = await getEnumByUniqueName(workoutType);
    if (!workoutTypeDoc) {
        throw new Error("Invalid workout type");
    }

    const newWorkout = new WorkoutModel({
        name,
        exercises: exerciseDocs?.map((e) => e._id) || [],
        workoutType: workoutTypeDoc._id,
        userId,
    });

    await newWorkout.save();

    return newWorkout.populate([
        {
            path: "exercises",
            populate: [
                { path: "muscles" },
                { path: "equipments" },
            ],
        },
        { path: "workoutType" },
    ]);
}

export async function deleteWorkout(id: string) {
    return WorkoutModel.deleteOne({ _id: id });
}

export async function updateWorkout(id: string, workoutData: {
    name: string;
    exercises: string[];
    workoutType: string;
    userId?: string;
}) {
    const exercises = await getExercisesByUniqueNames(workoutData.exercises);

    const workoutTypeDoc = await getEnumByUniqueName(workoutData.workoutType);

    if (!workoutTypeDoc) {
        throw new Error("Invalid workout type");
    }

    const update = {
        name: workoutData.name,
        exercises: exercises?.map((e) => e._id),
        workoutType: workoutTypeDoc._id,
    };

    return WorkoutModel.updateOne({_id: id}, update);
}