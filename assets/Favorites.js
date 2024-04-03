import { gitHubUser } from "./gitHubUser.js";

export class Favorites{
    constructor(root){
        this.root = document.querySelector(root);
        this.load()
    };
    load(){
        this.users = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    };
    save(){
        localStorage.setItem('@github-favorites:',JSON.stringify(this.users))
    };
    async addToDB(username){
        try{
            const { login, name, public_repos, followers, html_url, avatar_url } = await gitHubUser.fetchDataFrom(username);
            if(login == undefined){
                throw new Error("Usuário não encontrado")
            };
            const exists = this.users.find(elm => elm.login == login)
            if(exists){
                throw new Error("Usuário já favoritado")
            };
            this.users = [
                {
                    login:          login,
                    name:           name,
                    public_repos:   public_repos,
                    followers:      followers,
                    html_url:       html_url,
                    avatar_url:     avatar_url
                },
                ...this.users
            ];
            this.save();
            return { login, name, public_repos, followers, html_url, avatar_url }

        } catch (err){
            alert(err.message)
        }
    };
    removeFromDB(user){
        const array_removal = this.users.filter(existing => existing.login != user.login);
        this.users = array_removal;
        this.save()
    }
};

export class FavoritesView extends Favorites{
    constructor(root){
        super(root);
        this.tbody = document.querySelector("tbody");
        this.populateTable()
    };
    populateTable(){
        this.users.forEach((user)=>{
            this.tbody.append(this.newRow(user))
        })
    };
    addToTable(new_user){
        if(new_user){
            this.tbody.prepend(this.newRow(new_user));
            this.load()
        }
    };
    removeFromTable(user){
        this.load();
        this.tbody.querySelector(`#${user.login}`).remove()
    };
    newRow(new_user){
        const {login, name, public_repos, followers, html_url, avatar_url} = new_user;
        const new_tr = document.createElement("tr");
        new_tr.innerHTML = `
            <td>
                <div class="profile">
                    <img src="${avatar_url}" alt="profile picture of ${name}" class="pic">
                    <div class="identification">
                        <p>${name}</p>
                        <a href="${html_url}">/${login}</a>
                    </div>
                </div>
            </td>
            <td>${public_repos}</td>
            <td>${followers}</td>
            <td>
                <button class="rmv-btn">Remover</button>
            </td>
        `;
        new_tr.querySelector(".rmv-btn").onclick = ()=>{
            if(confirm(`Remover ${new_user.login} da lista?`)){
                this.removeFromDB(new_user)
                this.removeFromTable(new_user)
            }
        };
        new_tr.setAttribute('id', login);
        return new_tr
    };
}