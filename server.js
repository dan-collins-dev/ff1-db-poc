"use strict";
import express from "express";
import * as path from "path";
import monsterRouter from "./routes/monsterRoute.js";
import itemRouter from "./routes/itemRoute.js";
import {getTables, getTableColumns} from "./controllers/monsterController.js"

const port = 7340;

const app = express();

// Serves the front-end content in the "public" directory
app.use("/", express.static(path.join(import.meta.dirname, "./public")));

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/monster", monsterRouter);

app.use("/api/v1/item", itemRouter);

app.get("/api/v1/table", (req, res) => {
    getTables((data) => {
        res.status(200).json({
            data: data,
        });
    }, (err) => {console.log(err.message)});
})

app.get("/api/v1/columns", (req, res) => {
    if (req.query.name) {
        getTableColumns(req.query.name, (data) => {
            res.status(200).json({
                data: data
            });
        }, (err) => {console.log(err.message)})
    }
})

// Serves the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
