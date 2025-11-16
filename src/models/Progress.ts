import { Types, Schema, model } from "mongoose";

export interface SetData {
    _id: Types.ObjectId;
    // Non cardio only
    weight?: number;
    reps?: number;
    // cardio only
    duration?: number;
    pace?: number;
    distance?: number;
}

export interface Progress {
    _id: Types.ObjectId;
    exercise: Types.ObjectId;
    workout: Types.ObjectId;
    sets: Types.ObjectId[];
    feeling?: Types.ObjectId;
    comment?: string;
    date: Date;
}

const SetSchema = new Schema<SetData>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        weight: { type: Number, required: false },
        reps: { type: Number, required: false },
        duration: { type: Number, required: false },
        pace: { type: Number, required: false },
        distance: { type: Number, required: false },
    },
);

export const SetModel = model<SetData>("SetData", SetSchema);

const ProgressSchema = new Schema<Progress>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", index: true },
    workout: { type: Schema.Types.ObjectId, ref: "Workout", index: true },
    sets: { type: [Schema.Types.ObjectId], ref: "SetData", index: true },
    feeling: { type: Schema.Types.ObjectId, ref: "EnumValue", index: true },
    comment: { type: String, required: false },
    date: { type: Date, default: Date.now },
});

export const ProgressModel = model<Progress>("Progress", ProgressSchema);