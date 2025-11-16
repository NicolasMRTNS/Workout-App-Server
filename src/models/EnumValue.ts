import { model, Schema, Types } from "mongoose";

export interface EnumValue {
    _id: Types.ObjectId;
    type: "muscle" | "equipment" | "feeling" | "workoutType";
    uniqueName: string;
    displayName: string;
    illustration?: string;
}

const EnumSchema = new Schema<EnumValue>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    type: { type: String, enum: ["muscle", "equipment", "feeling", "workoutType"], required: true },
    uniqueName: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    illustration: { type: String, required: false },
});

export const EnumModel = model<EnumValue>("EnumValue", EnumSchema);