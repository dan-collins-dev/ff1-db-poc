"using strict";
import { OnInputCallback } from "./eventHandlers.js";
import { createTableSection, createLabelSelect } from "./elementFactory.js";
import { fetchAllMonstersEvent, onTableSelectChange } from "./events.js";


const el = {
    main: document.querySelector("main"),
    header: document.querySelector("header"),
    querySect: document.getElementById("query-section"),
    body: document.querySelector("body"),
    // btn: document.querySelector("button")
};

// Drop down value changes and the existing section is removed
el.body.addEventListener("tabledChanged", (e) => {
    el.main.replaceChildren();
    createTableSection(e.target.value)
});

const getTables = async () => {
    const response = await fetch("http://localhost:7340/api/v1/schema");
    let tables = await response.json();

    console.log(tables.data);
    console.log(tables.data[1].columnNames);

    const tableSelect = document.getElementById("table-select");
    let options = Array.from(tableSelect.children);

    options.forEach((tableOption, index) => {
        tableOption.value = tables.data[index].name;
        tableOption.innerHTML = `${tables.data[index].name
            .slice(0, 1)
            .toUpperCase()}${tables.data[index].name.slice(1)}`;
    });
};

// el.searchBar.addEventListener("input", (e) => {
//     if (e.data !== null) {
//         searchTerm += e.data;
//     } else {
//         searchTerm = searchTerm.slice(0, searchTerm.length - 1);
//     }
//     el.tableBody.dispatchEvent(fetchAllMonstersEvent);
// });

// el.tableBody.addEventListener("searchAllByName", (e) => {
//     el.tableBody.replaceChildren();
//     getMonsterLike(searchTerm);
// });

// Testing defined events
/* const btnClicked = new Event("talk", {
    detail: {
        name: "Dan",
    },
});

el.testBtn.addEventListener("click", (e) => {
    // updateRows();
    console.log("I am clicked", e.target);
    el.c2.dispatchEvent(btnClicked);
    el.c1.dispatchEvent(btnClicked);
    el.parent.dispatchEvent(btnClicked);
});


el.c1.addEventListener("talk", (e) => console.log(e.detail, e.target));
el.c2.addEventListener("talk", (e) => console.log(e.detail, e.target));
el.parent.addEventListener("talk", (e) => console.log(e.detail, e.target)); */

const removeRows = () => {
    el.tableBody.replaceChildren();
};

const getAllMonsters = async () => {
    const response = await fetch("http://localhost:7340/api/v1/monster");
    let monsters = await response.json();
    console.log(monsters);
    monsters.data.forEach((element) => {
        createRow(element);
    });
};

// const getMonsterLike = async (term) => {
//     if (term !== "") {
//         const response = await fetch(
//             `http://localhost:7340/api/v1/monster?search=${term}`
//         );
//         let monsters = await response.json();
//         console.log("MONSTERS", monsters);
//         monsters.data.forEach((element) => {
//             createRow(element);
//         });
//     }
// };

// el.fetchBtn.addEventListener("click", () => {
//     getAllMonsters();
// });


// Create label and select
createLabelSelect()
