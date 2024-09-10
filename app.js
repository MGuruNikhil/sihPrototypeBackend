import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import 'dotenv/config';
import { Logs } from './model/logModel.js';

const app = express();

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

    let logs = await Logs.find();

    if(logs.length === 0) {
        return res.render('index', { logs: [] });
    }
    return res.render('index', { logs });

});

app.post('/', async function (req, res) {
    const { message } = req.body;

    console.log(req.body);

    if (!message) {
        return res.status(400).send({
            message: "Send all the required data (message field)",
        });
    }

    const log = await Logs.create({
        log: message
    });

    return res.status(201).send({
        message: "Log created successfully",
    });

});

export default app;