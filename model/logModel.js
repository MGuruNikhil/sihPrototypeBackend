import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    logs: [],
    id: String,
}, { _id : false, minimize: false });


export const Logs = new mongoose.model("User", logSchema);