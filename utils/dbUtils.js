"using strict";
import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs/promises";
export let db;
let loadedMonsterData = [];

const loadMonsterData = async () => {
    try {
        const FILE_NAME = path.join(
            import.meta.dirname,
            "../data/monsters.json"
        );

        const fileData = await fs.readFile(FILE_NAME);
        return JSON.parse(fileData);
    } catch (error) {
        console.log(error);
    }
};

const loadItemData = async () => {
    try {
        const FILE_NAME = path.join(import.meta.dirname, "../data/items.json");

        const fileData = await fs.readFile(FILE_NAME);
        return JSON.parse(fileData);
    } catch (error) {
        console.log(error);
    }
};

const exists = async (filePath) => {
    try {
        await fs.stat(filePath);
        return true;
    } catch {
        return false;
    }
};

export const createDatabase = async () => {
    try {
        let file = await exists("../data/ff1.db");
        if (!file) {
            db = new Database("./data/ff1.db");

            createMonsterTable();
            const monsterData = await loadMonsterData();
            // console.log(monsterData);
            addMonsters(monsterData);

            createItemTable();
            const itemData = await loadItemData();
            addItems(itemData);
        }
    } catch (error) {
        console.log("DB and tables already exist.");
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
    description TEXT,
    price INTEGER
    )`;
    db.exec(query);
};

const addMonsters = (data) => {
    // console.log("IS THERE DATA", data)
    const insertStatement = db.prepare(
        "INSERT INTO monster (name, hp, attack, defense, accuracy, agility, intellect, evasion, magic_defense, gil_drop, exp_drop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    data.forEach((monster) => {
        insertStatement.run(
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

const addItems = (data) => {
    const insertStatement = db.prepare(
        "INSERT INTO item (name, description, price) VALUES (?, ?, ?)"
    );
    data.forEach((item) => {
        insertStatement.run(item.name, item.description, item.price);
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
