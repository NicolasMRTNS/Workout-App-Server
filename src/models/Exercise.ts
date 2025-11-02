import { Schema, model, Types } from "mongoose";

export interface Exercise {
    _id: Types.ObjectId;
    uniqueName: string;
    displayName: string;
    illustration?: string;
    muscles: Types.ObjectId[];
    equipments: Types.ObjectId[];
}

const ExerciseSchema = new Schema<Exercise>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    uniqueName: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    illustration: { type: String, required: false },
    muscles: [{ type: Schema.Types.ObjectId, ref: "EnumValue", index: true }],
    equipments: [{ type: Schema.Types.ObjectId, ref: "EnumValue", index: true }],
});

export const ExerciseModel = model<Exercise>("Exercise", ExerciseSchema);