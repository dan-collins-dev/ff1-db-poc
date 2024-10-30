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
