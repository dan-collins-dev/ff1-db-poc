"using strict";

// import e = require("express");

const el = {
    tableBody: document.getElementById("table__body"),
    fetchBtn: document.getElementById("fetch-all"),
    parent: document.getElementById("parent"),
    c1: document.getElementById("childOne"),
    c2: document.getElementById("childTwo"),
    testBtn: document.getElementById("testBtn"),
    searchBar: document.getElementById("search-bar"),
};

let searchTerm = "";

const fetchAllMonstersEvent = new CustomEvent("searchAllByName", {
    bubbles: true,
    detail: {
        term: "",
    },
});

const getTables = async () => {
    const response = await fetch("http://localhost:7340/api/v1/table");
    let tables = await response.json();
    console.log(tables);

    const tableSelect = document.getElementById("table-select")
    let options = Array.from(tableSelect.children);

    options.forEach((tableOption, index) => {
        tableOption.value = tables.data[index].name;
        tableOption.innerHTML = `${tables.data[index].name.slice(0, 1).toUpperCase()}${tables.data[index].name.slice(1)}`;
    })
    // monsters.data.forEach((element) => {
    //     createRow(element);
    // });
}

getTables();

el.searchBar.addEventListener("input", (e) => {
    if (e.data !== null) {
        searchTerm += e.data;
    } else {
        searchTerm = searchTerm.slice(0, searchTerm.length - 1);
    }
    el.tableBody.dispatchEvent(fetchAllMonstersEvent);
});

el.searchBar.addEventListener("searchAllByName", (e) => {
    console.log(searchTerm);
    console.log(e.target);
});

el.tableBody.addEventListener("searchAllByName", (e) => {
    console.log("table is hearing the event", searchTerm);
    el.tableBody.replaceChildren();
    // make request
    getMonsterLike(searchTerm);
    // make the rows based on response
});

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

const getMonsterLike = async (term) => {
    if (term !== "") {
        const response = await fetch(
            `http://localhost:7340/api/v1/monster?search=${term}`
        );
        let monsters = await response.json();
        console.log("MONSTERS", monsters);
        monsters.data.forEach((element) => {
            createRow(element);
        });
    }
};

el.fetchBtn.addEventListener("click", () => {
    getAllMonsters();
});

const createRow = (data) => {
    const {
        id,
        name,
        hp,
        attack,
        defense,
        accuracy,
        agility,
        intellect,
        evasion,
        magic_defense,
        gil_drop,
        exp_drop,
    } = data;
    const htmlString = `
    <tr>
        <th>${id}</th>
        <td>${name}</td>
        <td>${hp.toLocaleString("en-US")}</td>
        <td>${attack}</td>
        <td>${defense}</td>
        <td>${accuracy}</td>
        <td>${agility}</td>
        <td>${intellect}</td>
        <td>${evasion}</td>
        <td>${magic_defense}</td>
        <td>${gil_drop.toLocaleString("en-US")}</td>
        <td>${exp_drop.toLocaleString("en-US")}</td>
    </tr>
    `;
    el.tableBody.innerHTML += htmlString;
};
