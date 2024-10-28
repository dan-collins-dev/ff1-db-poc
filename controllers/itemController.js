"using strict";
import { db } from "../utils/dbUtils.js";

export const getAllItems = async (resolve, reject) => {
    try {
        const query = "SELECT * FROM item";
        const items = db.prepare(query).all();
        resolve(items);
    } catch (error) {
        reject(error);
    }
};

export const getItemById = async (id, resolve, reject) => {
    try {
        const item = db
            .prepare("SELECT * FROM monster WHERE id = ?")
            .get(id);
        resolve(item);
    } catch (error) {
        reject(error);
    }
};

export const getItemLikeName = async (term, resolve, reject) => {
    try {
        const items = db
            .prepare("SELECT * FROM monster WHERE UPPER(name) LIKE ?")
            .all(`%${term}%`);
        resolve(items);
    } catch (error) {
        console.log("Error getting monster like", error.message);
        reject(error);
    }
};