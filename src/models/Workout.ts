import { Types, Schema, model } from "mongoose";

export interface Workout {
    _id: Types.ObjectId;
    name: string;
    exercises: Types.ObjectId[];
    userId: Types.ObjectId;
    workoutType: Types.ObjectId;
    date: Date;
}

const WorkoutSchema = new Schema<Workout>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise", index: true }],
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    workoutType: { type: Schema.Types.ObjectId, ref: "EnumValue", index: true },
    date: { type: Date, default: Date.now },
});

export const WorkoutModel = model<Workout>("Workout", WorkoutSchema);