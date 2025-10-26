import { Types, Schema, model } from "mongoose";

export interface SetData {
    weight?: number;
    reps?: number;
    rest?: number;
    // cardio only
    duration?: number;
    pace?: number;
    distance?: number;
}

export interface Progress {
    exercise: Types.ObjectId;
    workout: Types.ObjectId;
    sets: SetData[];
    feeling?: Types.ObjectId;
    notes?: string
}

const SetSchema = new Schema<SetData>(
    {
        weight: { type: Number, required: false },
        reps: { type: Number, required: false },
        rest: { type: Number, required: false },
        duration: { type: Number, required: false },
        pace: { type: Number, required: false },
        distance: { type: Number, required: false },
    },
    {
        _id: false
    }
);

const ProgressSchema = new Schema<Progress>({
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", index: true },
    workout: { type: Schema.Types.ObjectId, ref: "Workout", index: true },
    sets: [SetSchema],
    feeling: { type: Schema.Types.ObjectId, ref: "EnumValue", index: true },
    notes: { type: String, required: false }
});

export const ProgressModel = model<Progress>("Progress", ProgressSchema);