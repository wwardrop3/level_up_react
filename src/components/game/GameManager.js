import { host } from "../LevelUp"

export const getGames = () => {
    return fetch(`${host}/games`, {
        headers: {
            // authorization tells the server who is logged in
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(res => res.json())

}

export const getGame = (id) => {
    return fetch(`${host}/games/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}



export const createGame = (new_game) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_game)
    }
    return fetch(`${host}/games`, fetchOptions)
}


export const getGameTypes = () => {
    return fetch(`${host}/gametypes`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
    }})
    .then(res => res.json())
}

export const updateGame = (newGame) => {
    return fetch(`${host}/games/${newGame.id}`,
    {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGame)
    })
}

export const deleteGame = (id) => {
    return fetch(`${host}/games/${id}`,
    {method: "DELETE",
headers: {
    "Authorization": `Token ${localStorage.getItem("lu_token")}`
}})
}