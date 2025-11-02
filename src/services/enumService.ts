import { EnumModel, EnumValue } from "../models/EnumValue";
import { FilterQuery } from "mongoose";

/**
 * Fetch all enums, optionally filtered by type
 */
export async function getAllEnums(type?: "muscle" | "equipment" | "feeling" | "workoutType"): Promise<EnumValue[]> {
    const filter: Partial<EnumValue> = {};
    if (type) {
        filter.type = type;
    }

    return EnumModel.find(filter).lean();
}

/**
 * Fetch a single enum by its unique name.
 */
export async function getEnumByUniqueName(uniqueName: string): Promise<EnumValue | null> {
    if (!uniqueName) throw new Error("uniqueName is required");
    return EnumModel.findOne({ uniqueName }).lean();
}

/**
 * Fetch multiple enums by their unique names.
 */
export async function getEnumsByUniqueNames(uniqueNames: string[], type?: "muscle" | "equipment" | "feeling" | "workoutType"): Promise<EnumValue[]> {
    const filter: FilterQuery<EnumValue> = { uniqueName: { $in: uniqueNames } };
    if (type) filter.type = type;
    return EnumModel.find(filter).lean();
}