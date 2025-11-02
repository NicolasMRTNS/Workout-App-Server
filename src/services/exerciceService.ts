import {Exercise, ExerciseModel} from "../models/Exercise";
import {getEnumsByUniqueNames} from "./enumService";
import {FilterQuery} from "mongoose";

/**
 * Fetch all exercises, filtered by muscle and/or equipment and/or name.
 */
/**
 * Fetch all exercises with optional filters
 * Each exercise will have:
 * muscles: { uniqueName, displayName }[]
 * equipments: { uniqueName, displayName }[]
 */
export async function getAllExercises(
    muscles?: string[] | string,
    equipments?: string[] | string,
    name?: string
): Promise<
    (Omit<Exercise, "muscles" | "equipments"> & {
        muscles: { uniqueName: string; displayName: string }[];
        equipments: { uniqueName: string; displayName: string }[];
    })[]
> {
    const filter: FilterQuery<Exercise> = {};

    const muscleArray = Array.isArray(muscles) ? muscles : muscles ? [muscles] : [];
    const equipmentArray = Array.isArray(equipments) ? equipments : equipments ? [equipments] : [];

    if (muscleArray.length > 0) filter.muscles = { $all: muscleArray };
    if (equipmentArray.length > 0) filter.equipments = { $all: equipmentArray };
    if (name) filter.displayName = { $regex: new RegExp(name, "i") };

    // Fetch exercises
    const exercises = await ExerciseModel.find(filter).lean();

    // Collect all uniqueNames to fetch displayNames
    const allEnumNames = Array.from(
        new Set(exercises.flatMap((e) => [...e.muscles, ...e.equipments]))
    );

    const enums = await getEnumsByUniqueNames(allEnumNames);
    const enumMap = Object.fromEntries(enums.map((e) => [e.uniqueName, e.displayName]));

    // Replace strings with objects in the Exercise object itself
    return exercises.map((e) => ({
        ...e,
        muscles: e.muscles.map((m) => ({uniqueName: m, displayName: enumMap[m] || m})),
        equipments: e.equipments.map((eq) => ({uniqueName: eq, displayName: enumMap[eq] || eq})),
    }));
}

/**
 * Fetch multiple exercises by their unique names.
 */
export async function getExercisesByUniqueName(uniqueNames: string[]): Promise<Exercise[] | null> {
    return ExerciseModel.find({ uniqueName: { $in: uniqueNames } }).lean();
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