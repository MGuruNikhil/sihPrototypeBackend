import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import 'dotenv/config';
import { Logs } from './model/logModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CORS Configuration for deployment
// app.use(cors({
//     origin: 'frontend-url',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

//localhost
app.use(cors());

app.get('/', async function (req, res) {

    let logs = await Logs.findOne({ id: '1' });
    if(!logs) {
        return res.status(200).render('index', { logs: [] });
    }

    return res.status(200).render('index', { logs: logs.logs });

});

app.post('/', async function (req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send({
            message: "Send all the required data (message field)",
        });
    }

    let logs = await Logs.findOne({ id: '1' });
    if(!logs) {
        const newLogs = {
            logs: [],
            id: '1',
        };

        const createdLogs = await Logs.create(newLogs);

        createdLogs.logs.push(message);

        await createdLogs.save();

        return res.status(201).send({
            message: "Log created successfully",
        });
    } else {
        logs.logs.push(message);

        await logs.save();

        return res.status(201).send({
            message: "Log added successfully",
        });
    }

});

export default app;