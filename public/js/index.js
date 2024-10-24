"using strict"
const getAllMonsters = async () => {
    const response = await fetch("http://localhost:7340/api/v1/bestiary")
    let monsters = await response.json();
    let realMonsters = monsters.map((m) => {
        return {name: m.name, hp: m.hp}
    })

    console.log(realMonsters)
}

getAllMonsters();