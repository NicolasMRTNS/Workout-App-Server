import { Schema, model } from "mongoose";

export interface Exercise {
    uniqueName: string;
    displayName: string;
    illustration?: string;
    muscles: string[]; // uniqueName
    equipments: string[]; // uniqueName
}

const ExerciseSchema = new Schema<Exercise>({
    uniqueName: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    illustration: { type: String, required: false },
    muscles: [{ type: String, index: true }],
    equipments: [{ type: String, index: true }],
});

export const ExerciseModel = model<Exercise>("Exercise", ExerciseSchema);