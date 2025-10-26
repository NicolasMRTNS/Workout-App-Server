import { Schema, model, Types } from "mongoose";

export interface Exercise {
    uniqueName: string;
    displayName: string;
    illustration?: string;
    muscles: Types.ObjectId[];
    equipment: Types.ObjectId[];
}

const ExerciseSchema = new Schema<Exercise>({
    uniqueName: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    illustration: { type: String, required: false },
    muscles: [{ type: Schema.Types.ObjectId, ref: "EnumValue", index: true }],
    equipment: [{ type: Schema.Types.ObjectId, ref: "EnumValue", index: true }],
});

export const ExerciseModel = model<Exercise>("Exercise", ExerciseSchema);