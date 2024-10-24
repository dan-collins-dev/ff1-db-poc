"use strict";
import Database from "better-sqlite3";
import express from "express";
import * as path from "path";
const port = 7340;

const db = new Database("./data/ff1.db");

const query = `
    CREATE TABLE bestiary(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        hp INTEGER NOT NULL,
        gil_drop INTEGER NOT NULL,
        exp_drop INTEGER NOT NULL
    )
`;

// used for creating tables
db.exec(query);

const data = [
    { name: "Goblin", hp: 8, gil_drop: 6, exp_drop: 6 },
    { name: "Goblin Guard", hp: 16, gil_drop: 18, exp_drop: 18 },
    { name: "Wolf", hp: 20, gil_drop: 6, exp_drop: 24 },
    { name: "Crazy Horse", hp: 20, gil_drop: 6, exp_drop: 24 },
];

const insertData = db.prepare(
    "INSERT INTO bestiary (name, hp, gil_drop, exp_drop) VALUES (?, ?, ?, ?)"
);

// run() is used when you don't need a return result (usually inserts)
data.forEach((monster) => {
    insertData.run(
        monster.name,
        monster.hp,
        monster.gil_drop,
        monster.exp_drop
    );
});

// // const query = "SELECT * FROM bestiary";
// // const monsters = db.prepare(query).all();
// // console.log(monsters);

// db.prepare is used to prevent sql injection. Pass in query string where values
// are added at a later time
// const monster = db.prepare("SELECT * FROM bestiary WHERE id = ?").get(1);
// console.log(monster);

// db.close()

const app = express();

// Serves the front-end content in the "public" directory
app.use("/", express.static(path.join(import.meta.dirname, "./public")));

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/bestiary", (req, res) => {
    const query = "SELECT * FROM bestiary";
    const monsters = db.prepare(query).all();
    res.status(200).json({
        status: 200,
        data: monsters,
    });
});

// Serves the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
