const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const image = document.getElementById("image");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

function pokemonSearch (searchName) {
    const pokemonQuery = searchName.toLowerCase();
    let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
    const database = databasePull(url);
    database
        .then((data) => {
            let scan = 0;
            const list = data["results"];
            for (let i=0; i<=list.length; i++) {
                scan++;
                if (list[i].name === pokemonQuery || list[i].id === parseInt(pokemonQuery)){
                    url = list[i].url;
                    statLookup(url);
                    return;
                } if ((list[i].name != pokemonQuery || list[i].id != pokemonQuery) && (scan === list.length)){
                    window.alert("Pokémon not found");
                    return;
                }
            }
        });
}

async function databasePull (url) {
        const response = await fetch(url);
        if (!response.ok) {
            alert("Database unavailable");
            return;
        }else{
            const data = await response.json();
            return data;
        }
   }


function statLookup (url) {
    const statsData = databasePull(url);
    statsData
        .then((stats) => {
            pokemonName.innerText = stats.name;
            id.innerText = stats.id;
            const imageUrl = stats.sprites.front_default;
            
            if (image.hasChildNodes()){
                const sprite = document.getElementById("sprite");
                sprite.remove();
            };
            const sprite = document.createElement("img");
            sprite.src = imageUrl;
            sprite.alt = stats.name;
            sprite.id= "sprite";
            image.appendChild(sprite);

            weight.innerText = stats.weight;
            height.innerText = stats.height;

            while (types.firstChild){
                types.removeChild(types.firstChild);
            };
            for (let i=0; i<=stats.types.length - 1; i++){
                const type_i = document.createElement("span");
                type_i.class = "type";
                type_i.innerText = `${stats.types[i]["type"]["name"]} `; 
                types.appendChild(type_i);
            };

            for (let i=0; i<=stats["stats"].length - 1; i++){
                let { 
                    base_stat: value,
                    stat: {
                        name,
                    }
                     } = stats["stats"][i];
                if (name === "hp"){
                    hp.innerText = value;
                }else if (name === "attack"){
                    attack.innerText = value;
                }else if (name === "defense"){
                    defense.innerText = value;
                }else if (name === "special-attack"){
                    specialAttack.innerText = value;
                }else if (name === "special-defense"){
                    specialDefense.innerText = value;
                }else if (name === "speed"){
                    speed.innerText = value;
              }
            }
        })
}

searchButton.addEventListener("click", () => {
    const searchName = searchInput.value;

    if (searchName === ""){
        alert("Please enter a Pokemon to search for");
    }else {
        pokemonSearch(searchName);
    };
})

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        const searchName = searchInput.value;
        if (searchName === ""){
            alert("Please enter a Pokemon to search for");
        }else {
            pokemonSearch(searchName);
        };
    }
})