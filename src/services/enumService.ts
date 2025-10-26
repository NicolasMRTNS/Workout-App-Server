import { EnumModel, EnumValue } from "../models/Enum";

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