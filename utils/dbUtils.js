"using strict"
import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs"
export let db = null;

export const createDatabase = () => {
    try {
        if (!fs.existsSync(path.join(import.meta.dirname, "../data/ff1.db"))) {
            db = new Database("./data/ff1.db");
            console.log("Bestiary Table Created.")
        } else {
            console.log("Bestiary Table already exists")
        }
    } catch (error) {
        console.log("Something went wrong. Error", error.message)
    }
}