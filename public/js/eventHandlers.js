

// el.searchBar.addEventListener("input", (e) => {
//     if (e.data !== null) {
//         searchTerm += e.data;
//     } else {
//         searchTerm = searchTerm.slice(0, searchTerm.length - 1);
//     }
//     el.tableBody.dispatchEvent(fetchAllMonstersEvent);
// });

export const OnInputCallback = (e) => {
    console.log("BooP", e.target);
}