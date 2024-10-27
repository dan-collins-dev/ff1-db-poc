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
