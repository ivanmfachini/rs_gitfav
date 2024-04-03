import { Favorites, FavoritesView } from "../assets/Favorites.js";

const favorites = new Favorites("#app");
const new_app = new FavoritesView("#app");
const username = document.querySelector("#username");

async function addNewUser(){
    new_app.addToTable(await favorites.addToDB(username.value));
    document.querySelector("#username").value = ""
};

document.querySelector("#fav-btn").onclick = async () => {
    await addNewUser()
};
document.addEventListener('keydown', async (event)=>{
    if(event.key == "Enter" && document.querySelector("#username").value != ""){
        await addNewUser()
    }
})

if(window.innerWidth < 600){
    document.querySelectorAll(".rmv-btn").forEach(btn=>btn.innerHTML = "X");
    document.querySelectorAll("th")[3].innerHTML = ""
}

window.onresize = reportWindowSize;
function reportWindowSize() {
    const acao_th = document.querySelectorAll("th")[3];
    if(window.innerWidth < 600){
        document.querySelectorAll(".rmv-btn").forEach(btn=>btn.innerHTML = "X");
        acao_th.innerHTML = ""

    } else{
        document.querySelectorAll(".rmv-btn").forEach(btn=>btn.innerHTML = "Remover");
        document.querySelectorAll("th")[3].innerHTML = "Ação"
    }
};