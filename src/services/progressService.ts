import { Progress, ProgressModel, SetData, SetModel } from "../models/Progress";
import { getExerciseById } from "./exerciceService";
import { getWorkoutById } from "./workoutService";
import { getEnumByUniqueName } from "./enumService";

export async function getProgress(workoutId: string): Promise<Progress[]> {
    return ProgressModel.find({ workout: workoutId })
        .select("+exercise +workout, +feeling")
        .populate("sets", "weight reps duration pace distance")
        .populate("exercise")
        .populate("workout")
        .populate("feeling")
        .lean() as Promise<Progress[]>;
}

export async function updateProgress(exerciseId: string, workoutId: string, comment?: string, feelingUniqueName?: string) {
    const progressData: Partial<Progress> = {};
    if (feelingUniqueName) {
        const feelingEnum = await getEnumByUniqueName(feelingUniqueName);
        if (feelingEnum) progressData.feeling = feelingEnum._id;
    }
    if (comment) progressData.comment = comment;

    await ProgressModel.updateOne({ exercise: exerciseId, workout: workoutId }, progressData);
}

export async function addSetToProgress(set: SetData, exerciseId: string, workoutId: string) {
    const exercise = await getExerciseById(exerciseId);
    const workout = await getWorkoutById(workoutId);

    const setToSave = new SetModel(set);
    await setToSave.save();

    const progressExists = await ProgressModel.findOne({ exercise: exerciseId, workout: workoutId });

    if (progressExists) {
        progressExists.sets.push(setToSave._id);
        await progressExists.save();
    } else {
        const progress = new ProgressModel({
            exercise: exercise?._id,
            workout: workout?._id,
            sets: [setToSave._id]
        });
        await progress.save();
    }
}

export async function deleteSetFromProgress(exerciseId: string, workoutId: string, setIndex: number) {
    const progress = await ProgressModel.findOne({ exercise: exerciseId, workout: workoutId });
    if (!progress) return;

    const setToDelete = progress.sets[setIndex];

    await SetModel.deleteOne({ _id: setToDelete });

    const updatedProgress = progress.sets.filter((_, i) => i !== setIndex);
    await ProgressModel.updateOne(progress._id, updatedProgress);
}