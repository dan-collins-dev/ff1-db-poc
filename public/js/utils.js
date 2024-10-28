/* <section class="monster">
    <h2 class="monster-label">Monster Table</h2>
    <table id="monster-table" class="table">
        <thead class="table-head">
            <tr class="table-head__row">
                <th>ID</th>
                <th>Name</th>
                <th>HP</th>
                <th>Gil Drop</th>
                <th>Exp Drop</th>
            </tr>
        </thead>

        <tbody id="table__body"></tbody>
    </table>
</section> */

// Create section
// Give it a h2 name
// create table element
// create thead that have a tr with 1 th for id and ths for the rest of col names

export const createTableSection = (tableName, columnNames) => {
    const main = document.querySelector("main");
    const section = document.createElement("section")
    const h2 = document.createElement("h2")
    h2.innerHTML = tableName
    section.appendChild(h2)
    main.appendChild(section)

    const table = document.createElement("table");
    main.append(table)

    const thead = document.createElement("thead")
    table.appendChild(thead)

    const tr = document.createElement("tr")
    thead.appendChild(tr);

    columnNames.forEach(element => {
        let th = document.createElement("th")
        th.innerHTML = element
        tr.appendChild(th)
    });
}