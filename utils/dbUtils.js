"using strict";
import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs";
let db;
const data = [
    { name: "Goblin", hp: 8, gil_drop: 6, exp_drop: 6 },
    { name: "Goblin Guard", hp: 16, gil_drop: 18, exp_drop: 18 },
    { name: "Wolf", hp: 20, gil_drop: 6, exp_drop: 24 },
    { name: "Crazy Horse", hp: 20, gil_drop: 6, exp_drop: 24 },
];

export const createDatabase = () => {
    try {
        if (!fs.existsSync(path.join(import.meta.dirname, "../data/ff1.db"))) {
            db = new Database("./data/ff1.db");
            console.log("Bestiary Table Created.");

            createMonsterTable();
            addEntries();
        } else {
            db = new Database("./data/ff1.db");
            console.log("Bestiary Table already exists");
        }
    } catch (error) {
        console.log("Something went wrong. Error", error.message);
    }
};

const createMonsterTable = () => {
    const query = `
    CREATE TABLE monster(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        hp INTEGER NOT NULL,
        gil_drop INTEGER NOT NULL,
        exp_drop INTEGER NOT NULL
    )`;
    db.exec(query);
};


const addEntries = () => {
    const dataToInsert = db.prepare("INSERT INTO monster (name, hp, gil_drop, exp_drop) VALUES (?, ?, ?, ?)")
    data.forEach((monster) => {
        dataToInsert.run(
            monster.name,
            monster.hp,
            monster.gil_drop,
            monster.exp_drop
        );
    });
}

export const getAllEntries = (res) => {
    const query = 'SELECT * FROM monster';
    const monsters = db.prepare(query).all();
    // const monsters = []
    res.status(200).json({
        data: monsters,
    });
}

createDatabase()