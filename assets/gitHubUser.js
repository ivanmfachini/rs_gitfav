export class gitHubUser{
    static fetchDataFrom(username){
        console.log("entered fetchDataFrom method");
        return fetch(`https://api.github.com/users/${username}`)
        .then(data=>data.json())
        .then(
            ( {login, name, public_repos, followers, html_url, avatar_url} ) =>
            ( {login, name, public_repos, followers, html_url, avatar_url} )
        )
    }
};