"using strict"
const el = {
    tableBody: document.getElementById("table__body")
}

const getAllMonsters = async () => {
    const response = await fetch("http://localhost:7340/api/v1/monster")
    let monsters = await response.json();
    console.log(monsters)
    monsters.data.forEach(element => {
        createRow(element)
    });
}


const createRow = (data) => {
    const {id, name, hp, gil_drop, exp_drop} = data
    const htmlString = `
    <tr>
        <th>${id}</th>
        <td>${name}</td>
        <td>${hp}</td>
        <td>${gil_drop}</td>
        <td>${exp_drop}</td>
    </tr>
    `
    el.tableBody.innerHTML += htmlString;
    // console.log(name, hp)
}

getAllMonsters();