import { Exercise, ExerciseModel } from "../models/Exercise";
import { getEnumsByUniqueNames } from "./enumService";
import { FilterQuery } from "mongoose";

/**
 * Fetch all exercises, filtered by muscle and/or equipment and/or name.
 * muscle and equipment can be strings or string arrays, name is a string.
 */
export async function getAllExercises(
    muscles?: string[] | string,
    equipments?: string[] | string,
    name?: string
): Promise<Exercise[]> {
    const filter: FilterQuery<Exercise> = {};

    const muscleArray = Array.isArray(muscles) ? muscles : muscles ? [muscles] : [];
    const equipmentArray = Array.isArray(equipments) ? equipments : equipments ? [equipments] : [];

    if (muscleArray.length > 0) {
        filter.muscles = { $in: muscleArray };
    }

    if (equipmentArray.length > 0) {
        filter.equipments = { $in: equipmentArray };
    }

    if (name) {
        filter.displayName = { $regex: new RegExp(name, "i") };
    }

    return ExerciseModel.find(filter).lean();
}

/**
 * Create a new exercise, validating that muscles/equipment exist.
 */
export async function createExercise(exerciseData: {
    name: string;
    muscles: string[];
    equipments: string[];
}): Promise<Exercise> {
    // Validate enums exist in DB
    const muscles = await getEnumsByUniqueNames(exerciseData.muscles, "muscle");
    const equipments = await getEnumsByUniqueNames(exerciseData.equipments, "equipment");

    if (muscles.length !== exerciseData.muscles.length) {
        throw new Error("Some muscles are invalid");
    }
    if (equipments.length !== exerciseData.equipments.length) {
        throw new Error("Some equipments are invalid");
    }

    const exercise = new ExerciseModel({
        ...exerciseData,
        muscles: exerciseData.muscles,
        equipments: exerciseData.equipments,
    });

    await exercise.save();
    return exercise.toObject();
}