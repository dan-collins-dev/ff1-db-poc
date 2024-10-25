"using strict";
import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs";
export let db;

const mosnterData = [
    { name: "Goblin", hp: 8, gil_drop: 6, exp_drop: 6 },
    { name: "Goblin Guard", hp: 16, gil_drop: 18, exp_drop: 18 },
    { name: "Wolf", hp: 20, gil_drop: 6, exp_drop: 24 },
    { name: "Crazy Horse", hp: 20, gil_drop: 6, exp_drop: 24 },
];

const itemData = [
    { name: "Potion", description: "Restores 50 HP." },
    { name: "Hi-Potion", description: "Restores 150 HP." },
    { name: "Ether", description: "Restores 1 MP for each magic level." },
];

export const createDatabase = () => {
    try {
        if (!fs.existsSync(path.join(import.meta.dirname, "../data/ff1.db"))) {
            db = new Database("./data/ff1.db");

            createMonsterTable();
            addMonsters();

            createItemTable();
            addItems();
        } else {
            db = new Database("./data/ff1.db");
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

const createItemTable = () => {
    const query = `
    CREATE TABLE item(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
    )`;
    db.exec(query);
};

const addMonsters = () => {
    const dataToInsert = db.prepare(
        "INSERT INTO monster (name, hp, gil_drop, exp_drop) VALUES (?, ?, ?, ?)"
    );
    mosnterData.forEach((monster) => {
        dataToInsert.run(
            monster.name,
            monster.hp,
            monster.gil_drop,
            monster.exp_drop
        );
    });
};

const addItems = () => {
    const dataToInsert = db.prepare(
        "INSERT INTO item (name, description) VALUES (?, ?)"
    );
    itemData.forEach((item) => {
        dataToInsert.run(item.name, item.description);
    });
};

export const getAllMonsters = (res) => {
    const query = "SELECT * FROM monster";
    const monsters = db.prepare(query).all();

    res.status(200).json({
        data: monsters,
    });
};

export const getAllItems = (res) => {
    const query = "SELECT * FROM item";
    const items = db.prepare(query).all();

    res.status(200).json({
        data: items,
    });
};

createDatabase();
