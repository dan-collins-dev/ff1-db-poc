"using strict";
/* 
    All custom events are defined here
*/

export const fetchAllMonstersEvent = new CustomEvent("searchAllByName", {
    bubbles: true,
    detail: {
        term: "",
    },
});

export const onTableSelectChange = new CustomEvent("tabledChanged", {
    bubbles: true,
    detail: {
        value: "",
    },
});
