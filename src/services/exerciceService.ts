import { Schema, model, FilterQuery } from "mongoose";
import { ExerciseModel } from "../models/Exercise";
import { EnumModel } from "../models/EnumValue";
import { Exercise } from "../models/Exercise";
import {getEnumByUniqueName, getEnumsByUniqueNames} from "./enumService";

export async function getAllExercises(
    muscles?: string[] | string,
    equipments?: string[] | string,
    name?: string
): Promise<Exercise[]> {
    const filter: FilterQuery<Exercise> = {};

    const muscleArray = Array.isArray(muscles) ? muscles : muscles ? [muscles] : [];
    const equipmentArray = Array.isArray(equipments) ? equipments : equipments ? [equipments] : [];

    if (muscleArray.length > 0) {
        const muscleDocs = await getEnumsByUniqueNames(muscleArray, "muscle");
        filter.muscles = { $all: muscleDocs.map((m) => m._id) };
    }

    if (equipmentArray.length > 0) {
        const equipmentDocs = await getEnumsByUniqueNames(equipmentArray, "equipment");
        filter.equipments = { $all: equipmentDocs.map((e) => e._id) };
    }

    if (name) {
        filter.displayName = { $regex: new RegExp(name, "i") };
    }

    return ExerciseModel.find(filter)
        .populate("muscles", "uniqueName displayName type illustration")
        .populate("equipments", "uniqueName displayName type illustration")
        .lean();
}

export async function getExercisesByUniqueNames(uniqueNames: string[]): Promise<Exercise[] | null> {
    return ExerciseModel.find({ uniqueName: { $in: uniqueNames } }).lean().populate("muscles").populate("equipments");
}

export async function createExercise(exerciseData: {
    uniqueName: string;
    displayName: string;
    illustration?: string;
    muscles: string[];
    equipments: string[];
}): Promise<Exercise> {
    const muscleDocs = await EnumModel.find({ uniqueName: { $in: exerciseData.muscles }, type: "muscle" });
    const equipmentDocs = await EnumModel.find({ uniqueName: { $in: exerciseData.equipments }, type: "equipment" });

    const newExercise = new ExerciseModel({
        uniqueName: exerciseData.uniqueName,
        displayName: exerciseData.displayName,
        illustration: exerciseData.illustration,
        muscles: muscleDocs.map((m) => m._id),
        equipments: equipmentDocs.map((e) => e._id),
    });

    await newExercise.save();

    return newExercise.populate([
        { path: "muscles", select: "uniqueName displayName type illustration" },
        { path: "equipments", select: "uniqueName displayName type illustration" },
    ]);
}
