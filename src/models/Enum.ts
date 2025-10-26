import { Schema, model } from "mongoose";

export interface EnumValue {
    type: "muscle" | "equipment" | "feeling" | "workoutType";
    uniqueName: string;
    displayName: string;
    illustration?: string;
}

const EnumSchema = new Schema<EnumValue>({
    type: { type: String, enum: ["muscle", "equipment", "feeling", "workoutType"], required: true },
    uniqueName: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    illustration: { type: String, required: false },
});

export const EnumModel = model<EnumValue>("Enum", EnumSchema);