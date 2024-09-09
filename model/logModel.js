import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    logs: [],
    id: String,
}, { minimize: false });


export const Logs = new mongoose.model("User", logSchema);