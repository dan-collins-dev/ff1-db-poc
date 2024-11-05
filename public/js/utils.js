"using strict";
import schema from "./schema.js";

export const tableNames = schema.data.map((data) => {
    return {
        "name": data.name,
        "schema": data.schema
    }
})