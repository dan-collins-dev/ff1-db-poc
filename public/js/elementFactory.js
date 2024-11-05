"using strict";
import { fetchAllMonstersEvent, onTableSelectChange } from "./events.js";
import schema from "./schema.js";

let currentTable = "monster";

export const getMonsterLike = async (term) => {
    if (term !== "") {
        const response = await fetch(
            `http://localhost:7340/api/v1/${currentTable}?search=${term}`
        );
        let monsters = await response.json();
        console.log("MONSTERS", monsters);
        monsters.data.forEach((element) => {
            createRow(element);
        });
    }
};

export const createTableSection = (tableName) => {
    const main = document.querySelector("main");
    const section = document.createElement("section");

    const h2 = document.createElement("h2");
    section.addEventListener("searchAllByName", (e) => {
        console.log(e.target.value);
        if (e.target.value !== null) {
            const tableBody = document.getElementById("table-body");
            tableBody.replaceChildren();
            getMonsterLike(e.target.value);
        }
    });
    const input = document.createElement("input");

    input.addEventListener("input", (e) => {
        console.log("Dispatching fetchAllMonsters");
        input.dispatchEvent(fetchAllMonstersEvent);
    });

    input.type = "text";
    input.id = "search-bar";
    input.name = "search";

    h2.innerHTML = `${tableName.slice(0, 1).toUpperCase()}${tableName.slice(
        1
    )}`;
    section.append(h2);
    section.append(input);
    main.append(section);

    const table = document.createElement("table");
    main.append(table);

    const data = schema.data.filter((t) => t.name === tableName);

    const thead = document.createElement("thead");
    table.append(thead);

    const tbody = document.createElement("tbody");
    tbody.id = "table-body";
    table.append(tbody);

    const tr = document.createElement("tr");
    thead.append(tr);

    data.forEach((e) => {
        e.schema.forEach((j) => {
            console.log(j.name);
            const th = document.createElement("th");
            th.innerHTML = j.name;
            tr.append(th);
        });
    });
};

export const createLabelSelect = () => {
    const header = document.querySelector("header");
    const label = document.createElement("label");
    label.setAttribute("for", "table-select");
    label.innerHTML = "Table:";
    header.appendChild(label);
    const select = document.createElement("select");
    select.name = "table";
    select.id = "table-select";

    select.addEventListener("change", (e) => {
        console.log(e.target.value);
        currentTable = e.target.value;
        select.dispatchEvent(onTableSelectChange);
    });

    header.appendChild(select);

    const option = document.createElement("option");
    option.value = "";
    option.innerHTML = "--Choose--";
    select.appendChild(option);

    schema.data.forEach((data) => {
        const option = document.createElement("option");
        option.value = data.name;
        option.innerHTML = `${data.name
            .slice(0, 1)
            .toUpperCase()}${data.name.slice(1)}`;
        select.appendChild(option);
    });
};

const createRow = (data) => {
    const tableBody = document.getElementById("table-body");
    const tr = document.createElement("tr");
    tableBody.append(tr);

    let values = Object.entries(data);

    values.forEach((e, idx, arr) => {
        if (idx === 0) {
            const th = document.createElement("th");
            th.innerHTML = e[1];
            tr.append(th);
        } else {
            const td = document.createElement("td");
            td.innerHTML = e[1].toLocaleString("en-US");
            tr.append(td);
        }
    });
};
