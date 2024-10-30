"using strict";
import { db } from "../utils/dbUtils.js";

export const getTables = async (resolve, reject) => {
    try {
        const q = "SELECT name FROM sqlite_master WHERE type='table'";
        // const q = "PRAGMA table_info([monster])";
        let tableNames = db.prepare(q).all();
        let combinedData = [];

        tableNames.forEach((element, idx, arr) => {
            const statement = "SELECT * FROM PRAGMA_TABLE_INFO(?)";
            const columnNames = db.prepare(statement).all(element["name"]);

            let newObj = { ...element, columnNames };
            combinedData.push(newObj);
        });

        resolve(combinedData);
    } catch (error) {
        reject(error);
    }
};
