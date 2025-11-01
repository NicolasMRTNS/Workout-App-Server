import { Exercise, ExerciseModel } from "../models/Exercise";

const defaultExercises: Exercise[] = [
    // --- Lower Body ---
    { uniqueName: "barbellsquat", displayName: "Barbell Squat", muscles: ["quadriceps", "glutes", "hamstrings", "lowerback"], equipments: ["barbell", "powerrack"] },
    { uniqueName: "frontsquat", displayName: "Front Squat", muscles: ["quadriceps", "glutes", "core"], equipments: ["barbell", "powerrack"] },
    { uniqueName: "smithmachinesquat", displayName: "Smith Machine Squat", muscles: ["quadriceps", "glutes"], equipments: ["smithmachine"] },
    { uniqueName: "hacksquat", displayName: "Hack Squat", muscles: ["quadriceps", "glutes"], equipments: ["hacksquatmachine"] },
    { uniqueName: "legpress45", displayName: "45-Degree Leg Press", muscles: ["quadriceps", "glutes", "hamstrings"], equipments: ["legpress45"] },
    { uniqueName: "horizontallegpress", displayName: "Horizontal Leg Press", muscles: ["quadriceps", "glutes"], equipments: ["horizontallegpress"] },
    { uniqueName: "bulgariansplitsquat", displayName: "Bulgarian Split Squat", muscles: ["quadriceps", "glutes", "hamstrings"], equipments: ["bench", "dumbbells"] },
    { uniqueName: "walkinglunge", displayName: "Walking Lunge", muscles: ["quadriceps", "glutes", "hamstrings"], equipments: ["dumbbells"] },
    { uniqueName: "reverselunge", displayName: "Reverse Lunge", muscles: ["glutes", "hamstrings", "quadriceps"], equipments: ["dumbbells"] },
    { uniqueName: "stepup", displayName: "Step-Up", muscles: ["quadriceps", "glutes", "calves"], equipments: ["bench", "dumbbells"] },
    { uniqueName: "legextension", displayName: "Leg Extension", muscles: ["quadriceps"], equipments: ["legextensionmachine"] },
    { uniqueName: "legcurlseated", displayName: "Seated Leg Curl", muscles: ["hamstrings", "glutes"], equipments: ["legcurlmachine"] },
    { uniqueName: "legcurlying", displayName: "Lying Leg Curl", muscles: ["hamstrings"], equipments: ["legcurlmachine"] },
    { uniqueName: "romaniandeadlift", displayName: "Romanian Deadlift", muscles: ["hamstrings", "glutes", "lowerback"], equipments: ["barbell"] },
    { uniqueName: "sumodeadlift", displayName: "Sumo Deadlift", muscles: ["glutes", "hamstrings", "quadriceps"], equipments: ["barbell"] },
    { uniqueName: "stifflegdeadlift", displayName: "Stiff-Leg Deadlift", muscles: ["hamstrings", "glutes"], equipments: ["barbell"] },
    { uniqueName: "hipthrust", displayName: "Hip Thrust", muscles: ["glutes", "hamstrings", "core"], equipments: ["barbell", "bench", "hipthrustmachine"] },
    { uniqueName: "glutebridge", displayName: "Glute Bridge", muscles: ["glutes", "core"], equipments: ["noequipment"] },
    { uniqueName: "donkeykick", displayName: "Donkey Kick", muscles: ["glutes"], equipments: ["noequipment"] },
    { uniqueName: "cableglutekickback", displayName: "Cable Glute Kickback", muscles: ["glutes", "hamstrings"], equipments: ["functionaltrainer"] },
    { uniqueName: "hipabduction", displayName: "Hip Abduction (Machine)", muscles: ["glutes", "adductors"], equipments: ["abductionmachine"] },
    { uniqueName: "hipadduction", displayName: "Hip Adduction (Machine)", muscles: ["adductors"], equipments: ["adductionmachine"] },
    { uniqueName: "goodmorning", displayName: "Good Morning", muscles: ["lowerback", "hamstrings", "glutes"], equipments: ["barbell"] },
    { uniqueName: "backextension", displayName: "Back Extension (Hyperextension)", muscles: ["lowerback", "glutes", "hamstrings"], equipments: ["hyperextensionmachine"] },
    { uniqueName: "standingcalfraise", displayName: "Standing Calf Raise", muscles: ["calves"], equipments: ["standingcalfraisemachine"] },
    { uniqueName: "seatedcalfraise", displayName: "Seated Calf Raise", muscles: ["calves"], equipments: ["seatedcalfraisemachine"] },

    // --- Chest & Upper Body ---
    { uniqueName: "barbellbenchpress", displayName: "Barbell Bench Press", muscles: ["pectorals", "triceps", "shoulders"], equipments: ["barbell", "bench"] },
    { uniqueName: "inclinebenchpress", displayName: "Incline Bench Press", muscles: ["pectorals", "shoulders", "triceps"], equipments: ["barbell", "bench"] },
    { uniqueName: "declinebenchpress", displayName: "Decline Bench Press", muscles: ["pectorals", "triceps"], equipments: ["barbell", "bench"] },
    { uniqueName: "dumbbellbenchpress", displayName: "Dumbbell Bench Press", muscles: ["pectorals", "triceps"], equipments: ["dumbbells", "bench"] },
    { uniqueName: "chestpressmachine", displayName: "Chest Press Machine", muscles: ["pectorals", "triceps"], equipments: ["chestpressmachine"] },
    { uniqueName: "pecdeckfly", displayName: "Pec Deck Fly", muscles: ["pectorals", "shoulders"], equipments: ["pecdeckmachine"] },
    { uniqueName: "cablecrossover", displayName: "Cable Crossover", muscles: ["pectorals", "shoulders"], equipments: ["cablecrossover"] },
    { uniqueName: "pushup", displayName: "Push-Up", muscles: ["pectorals", "triceps", "core"], equipments: ["noequipment"] },
    { uniqueName: "dips", displayName: "Dips", muscles: ["triceps", "pectorals", "shoulders"], equipments: ["dipstation"] },
    { uniqueName: "closegripbenchpress", displayName: "Close-Grip Bench Press", muscles: ["triceps", "pectorals"], equipments: ["barbell", "bench"] },

    // --- Back & Lats ---
    { uniqueName: "pullup", displayName: "Pull-Up", muscles: ["lats", "biceps", "upperback"], equipments: ["pullupbar"] },
    { uniqueName: "chinup", displayName: "Chin-Up", muscles: ["biceps", "lats"], equipments: ["pullupbar"] },
    { uniqueName: "latpulldown", displayName: "Lat Pulldown (Wide Grip)", muscles: ["lats", "biceps"], equipments: ["latpulldownwide"] },
    { uniqueName: "latpulldownnarrow", displayName: "Lat Pulldown (Narrow Grip)", muscles: ["lats", "biceps"], equipments: ["latpulldownnarrow"] },
    { uniqueName: "seatedcablerow", displayName: "Seated Cable Row", muscles: ["upperback", "lats", "biceps"], equipments: ["seatedrowmachine"] },
    { uniqueName: "bentoverbarbellrow", displayName: "Bent Over Barbell Row", muscles: ["upperback", "lats", "biceps"], equipments: ["barbell"] },
    { uniqueName: "tbarrow", displayName: "T-Bar Row", muscles: ["lats", "upperback", "biceps"], equipments: ["tbarrowmachine"] },
    { uniqueName: "facepull", displayName: "Face Pull", muscles: ["upperback", "trapezius", "shoulders"], equipments: ["functionaltrainer"] },
    { uniqueName: "shrug", displayName: "Barbell Shrug", muscles: ["trapezius"], equipments: ["barbell"] },

    // --- Shoulders & Arms ---
    { uniqueName: "overheadpress", displayName: "Overhead Press", muscles: ["shoulders", "triceps"], equipments: ["barbell"] },
    { uniqueName: "arnoldpress", displayName: "Arnold Press", muscles: ["shoulders", "triceps"], equipments: ["dumbbells"] },
    { uniqueName: "lateralraise", displayName: "Lateral Raise", muscles: ["shoulders"], equipments: ["dumbbells"] },
    { uniqueName: "frontraise", displayName: "Front Raise", muscles: ["shoulders", "pectorals"], equipments: ["dumbbells"] },
    { uniqueName: "rearfeltfly", displayName: "Rear Delt Fly", muscles: ["shoulders", "upperback"], equipments: ["dumbbells"] },
    { uniqueName: "barbellcurl", displayName: "Barbell Curl", muscles: ["biceps", "forearms"], equipments: ["barbell"] },
    { uniqueName: "dumbbellcurl", displayName: "Dumbbell Curl", muscles: ["biceps", "forearms"], equipments: ["dumbbells"] },
    { uniqueName: "hammercurl", displayName: "Hammer Curl", muscles: ["biceps", "forearms"], equipments: ["dumbbells"] },
    { uniqueName: "concentrationcurl", displayName: "Concentration Curl", muscles: ["biceps"], equipments: ["dumbbells"] },
    { uniqueName: "preachercurl", displayName: "Preacher Curl", muscles: ["biceps"], equipments: ["preachercurlbench", "barbell"] },
    { uniqueName: "tricepspushdown", displayName: "Triceps Pushdown", muscles: ["triceps"], equipments: ["functionaltrainer"] },
    { uniqueName: "overheadtricepsextension", displayName: "Overhead Triceps Extension", muscles: ["triceps"], equipments: ["dumbbells"] },
    { uniqueName: "skullcrusher", displayName: "Skull Crusher", muscles: ["triceps"], equipments: ["barbell", "bench"] },
    { uniqueName: "tricepskickback", displayName: "Triceps Kickback", muscles: ["triceps"], equipments: ["dumbbells"] },
    { uniqueName: "wristcurl", displayName: "Wrist Curl", muscles: ["forearms"], equipments: ["barbell"] },
    { uniqueName: "reversewristcurl", displayName: "Reverse Wrist Curl", muscles: ["forearms"], equipments: ["barbell"] },
    { uniqueName: "farmerscarry", displayName: "Farmer’s Carry", muscles: ["forearms", "trapezius", "core"], equipments: ["dumbbells"] },

    // --- Core & Abs ---
    { uniqueName: "plank", displayName: "Plank", muscles: ["abs", "core", "shoulders"], equipments: ["noequipment"] },
    { uniqueName: "sideplank", displayName: "Side Plank", muscles: ["abs", "core"], equipments: ["noequipment"] },
    { uniqueName: "crunch", displayName: "Crunch", muscles: ["abs"], equipments: ["noequipment"] },
    { uniqueName: "legraise", displayName: "Leg Raise", muscles: ["abs", "hipflexors"], equipments: ["noequipment"] },
    { uniqueName: "hangingkneeraises", displayName: "Hanging Knee Raises", muscles: ["abs"], equipments: ["pullupbar"] },
    { uniqueName: "cablecrunch", displayName: "Cable Crunch", muscles: ["abs"], equipments: ["functionaltrainer"] },
    { uniqueName: "abrollout", displayName: "Ab Rollout", muscles: ["abs", "core"], equipments: ["barbell"] },
    { uniqueName: "russiantwist", displayName: "Russian Twist", muscles: ["abs", "obliques"], equipments: ["medicineball"] },
    { uniqueName: "mountainclimbers", displayName: "Mountain Climbers", muscles: ["abs", "core", "shoulders", "heart"], equipments: ["noequipment"] },
    { uniqueName: "vups", displayName: "V-Ups", muscles: ["abs", "core"], equipments: ["noequipment"] },

    // --- Functional / Cardio ---
    { uniqueName: "jumpingrope", displayName: "Jump Rope", muscles: ["calves", "quads", "heart"], equipments: ["jumprope"] },
    { uniqueName: "battleropes", displayName: "Battle Ropes", muscles: ["shoulders", "arms", "core", "heart"], equipments: ["battleropes"] },
    { uniqueName: "kettlebellswing", displayName: "Kettlebell Swing", muscles: ["glutes", "hamstrings", "core"], equipments: ["kettlebells"] },
    { uniqueName: "kettlebellcleanpress", displayName: "Kettlebell Clean and Press", muscles: ["shoulders", "glutes", "core"], equipments: ["kettlebells"] },
    { uniqueName: "medicineballslam", displayName: "Medicine Ball Slam", muscles: ["shoulders", "core", "abs"], equipments: ["medicineball"] },
    { uniqueName: "rowingmachine", displayName: "Rowing Machine", muscles: ["back", "biceps", "legs", "heart"], equipments: ["rowingmachine"] },
    { uniqueName: "treadmillrun", displayName: "Treadmill Running", muscles: ["quadriceps", "glutes", "calves", "heart"], equipments: ["treadmill"] },
    { uniqueName: "cycling", displayName: "Cycling (Stationary Bike)", muscles: ["quadriceps", "glutes", "calves", "heart"], equipments: ["stationarybike"] },
    { uniqueName: "elliptical", displayName: "Elliptical Training", muscles: ["quads", "glutes", "hamstrings", "heart"], equipments: ["ellipticalbike"] },
    { uniqueName: "sledpush", displayName: "Sled Push", muscles: ["quads", "glutes", "hamstrings", "core"], equipments: ["sled"] },
    { uniqueName: "boxjump", displayName: "Box Jump", muscles: ["quads", "glutes", "calves"], equipments: ["plyobox"] },
    { uniqueName: "trxrow", displayName: "TRX Row", muscles: ["back", "biceps", "core"], equipments: ["trxtrainer"] },
    { uniqueName: "trxchestpress", displayName: "TRX Chest Press", muscles: ["chest", "triceps", "core"], equipments: ["trxtrainer"] },
    { uniqueName: "trxplank", displayName: "TRX Plank", muscles: ["core", "abs", "shoulders"], equipments: ["trxtrainer"] },
    { uniqueName: "yogaflow", displayName: "Yoga Flow / Stretch", muscles: ["core", "heart"], equipments: ["noequipment"] }
];

export async function seedExercises() {
    for (const e of defaultExercises) {
        const exists = await ExerciseModel.findOne({ uniqueName: e.uniqueName });
        if (!exists) {
            await ExerciseModel.create(e);
        }
    }
}