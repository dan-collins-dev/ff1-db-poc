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
        console.log("ficl");
        reject(error);
    }
};
