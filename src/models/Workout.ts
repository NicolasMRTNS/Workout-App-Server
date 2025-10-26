import { Types, Schema, model } from "mongoose";

export interface Workout {
    name: string;
    exercises: Types.ObjectId[];
    userId: Types.ObjectId;
    workoutType: Types.ObjectId;
}

const WorkoutSchema = new Schema<Workout>({
    name: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise", index: true }],
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    workoutType: { type: Schema.Types.ObjectId, ref: "EnumValue", index: true },
});

export const WorkoutModel = model<Workout>("Workout", WorkoutSchema);