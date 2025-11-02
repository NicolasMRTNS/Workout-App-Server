import { Types, Schema, model } from "mongoose";

export interface Workout {
    name: string;
    exercises: string[]; // uniqueName
    userId: Types.ObjectId;
    workoutType: string; // uniqueName
}

const WorkoutSchema = new Schema<Workout>({
    name: { type: String, required: true },
    exercises: [{ type: String, index: true }],
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    workoutType: { type: String, index: true },
});

export const WorkoutModel = model<Workout>("Workout", WorkoutSchema);