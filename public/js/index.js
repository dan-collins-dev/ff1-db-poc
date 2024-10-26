"using strict";
const el = {
    tableBody: document.getElementById("table__body"),
    fBtn: document.getElementById("fetch-all"),
    
};

const getAllMonsters = async () => {
    const response = await fetch("http://localhost:7340/api/v1/monster");
    let monsters = await response.json();
    console.log(monsters);
    monsters.data.forEach((element) => {
        createRow(element);
    });
};

el.fBtn.addEventListener(
    "click",
    () => {
        getAllMonsters();
    },
    { once: true }
);

const createRow = (data) => {
    const { id, name, hp, attack, defense, accuracy, agility, intellect, evasion, magic_defense, gil_drop, exp_drop } = data;
    const htmlString = `
    <tr>
        <th>${id}</th>
        <td>${name}</td>
        <td>${hp}</td>
        <td>${attack}</td>
        <td>${defense}</td>
        <td>${accuracy}</td>
        <td>${agility}</td>
        <td>${intellect}</td>
        <td>${evasion}</td>
        <td>${magic_defense}</td>
        <td>${gil_drop}</td>
        <td>${exp_drop}</td>
    </tr>
    `;
    el.tableBody.innerHTML += htmlString;
};
