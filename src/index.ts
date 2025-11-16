import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import { seedEnums } from "./scripts/seedEnums";
import enumRoutes from "./routes/enumRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import progressRoutes from "./routes/progressRoutes";
import seedExercises from "./scripts/seedExercises";

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(r => "Connected to DB");

app.listen(process.env.PORT || 5000, () => console.log("Server started"));

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/enum", enumRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/workout", workoutRoutes);
app.use("/progress", progressRoutes)