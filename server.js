"use strict";
import { createDatabase, getAllEntries} from "./utils/dbUtils.js"
import express from "express";
import * as path from "path";
const port = 7340;

// createDatabase()

const app = express();

// Serves the front-end content in the "public" directory
app.use("/", express.static(path.join(import.meta.dirname, "./public")));

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/monster", (req, res) => {
    getAllEntries(res)
});

// Serves the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
