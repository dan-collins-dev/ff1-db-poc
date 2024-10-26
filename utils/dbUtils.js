"using strict";
import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs/promises"
import { constants } from "buffer";
export let db;
let loadedMonsterData = []

const loadMonsterData = async () => {
    try {
        const FILE_NAME = path.join(
            import.meta.dirname,
            "../data/monsters.json"
        );

        const fileData = await fs.readFile(FILE_NAME);
        return JSON.parse(fileData)
    } catch (error) {
        console.log(error)
    }
};

const itemData = [
    { name: "Potion", description: "Restores 50 HP." },
    { name: "Hi-Potion", description: "Restores 150 HP." },
    { name: "Ether", description: "Restores 1 MP for each magic level." },
];

const exists = async (filePath) => {
    try {
      await fs.stat(filePath);
      return true;
    } catch {
      return false;
    }
}

export const createDatabase = async () => {
    try {
        let file = await exists("../data/ff1.db")
        if (!file) {
            db = new Database("./data/ff1.db");
            
            createMonsterTable();
            loadMonsterData().then((data) => addMonsters(data)).catch((err) => console.log(err))
            // addMonsters();

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
        name TEXT NOT NULL,
        hp INTEGER NOT NULL,
        attack INTEGER NOT NULL,
        defense INTEGER NOT NULL,
        accuracy INTEGER NOT NULL,
        agility INTEGER NOT NULL,
        intellect INTEGER NOT NULL,
        evasion INTEGER NOT NULL,
        magic_defense INTEGER NOT NULL,
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

const addMonsters = (data) => {
    console.log("IS THERE DATA", data)
    const dataToInsert = db.prepare(
        "INSERT INTO monster (name, hp, attack, defense, accuracy, agility, intellect, evasion, magic_defense, gil_drop, exp_drop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    data.forEach((monster) => {
        dataToInsert.run(
            monster.name,
            monster.hp,
            monster.attack,
            monster.defense,
            monster.accuracy,
            monster.agility,
            monster.intellect,
            monster.evasion,
            monster.magic_defense,
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
