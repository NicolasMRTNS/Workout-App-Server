import { Request, Response } from "express";
import { getAllEnums } from "../services/enumService";
import { ResponseData } from "../models/ResponseData";

export async function fetchEnums(req: Request, res: Response) {
    try {
        const { type } = req.query as { type?: "muscle" | "equipment" | "feeling" | "workoutType" };
        const enums = await getAllEnums(type);

        res.status(200).json(ResponseData.success(enums));
    } catch (error) {
        console.log("Error when fetching enums: ", error);
        res.status(500).json(ResponseData.error("Internal Server Error"));
    }
}