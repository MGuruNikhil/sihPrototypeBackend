import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    log: String
});


export const Logs = new mongoose.model("Log", logSchema);