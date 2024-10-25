"use strict";
// import { getAllItems, getAllMonsters } from "./utils/dbUtils.js";
import express from "express";
import * as path from "path";
import monsterRouter from "./routes/monsters.js";

const port = 7340;

const app = express();

// Serves the front-end content in the "public" directory
app.use("/", express.static(path.join(import.meta.dirname, "./public")));

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/monster", monsterRouter);

app.get("/api/v1/item", (req, res) => {
    getAllItems(res);
});

// Serves the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
