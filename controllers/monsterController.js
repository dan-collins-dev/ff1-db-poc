"using strict";
import { db } from "../utils/dbUtils.js";

export const getAllMonsters = async (resolve, reject) => {
    try {
        const query = "SELECT * FROM monster";
        const monsters = db.prepare(query).all();
        resolve(monsters);
    } catch (error) {
        reject(error);
    }
};

export const getMonsterById = async (id, resolve, reject) => {
    try {
        const monster = db
            .prepare("SELECT * FROM monster WHERE id = ?")
            .get(id);
        resolve(monster);
    } catch (error) {
        reject(error);
    }
};

export const getMonsterLikeName = async (term, resolve, reject) => {
    try {
        const monsters = db
            .prepare("SELECT * FROM monster WHERE UPPER(name) LIKE ?")
            .all(`%${term}%`);
        resolve(monsters);
    } catch (error) {
        console.log("Error getting monster like", error.message);
        reject(error);
    }
};

export const getTables = async (resolve, reject) => {
    try {
        const q = "SELECT name FROM sqlite_master WHERE type='table'";
        // const q = "PRAGMA table_info([monster])";
        const tableNames = db.prepare(q).all();

        resolve(tableNames);
    } catch (error) {
        reject(error);
    }
};

export const getTableColumns = async (tableName, resolve, reject) => {
    try {
        const statement = "SELECT * FROM PRAGMA_TABLE_INFO(?)"
        const columnNames = db.prepare(statement).all(tableName);
        resolve(columnNames);

    } catch (error) {
        console.log("Something went wrong getting table columns. Error:", error.message)
        reject(error)
    }
}

