//purpose of this module is to handle all of the event requests

import { host } from "../LevelUp"


export const getEvents = () => {
    return fetch(`${host}/events`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

export const getEvent = (id) => {
    return fetch(`${host}/events/${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
}})
    .then(res => res.json())
}

export const createEvent = (new_event) => {
    return fetch(`${host}/events`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_event)
    })

}

export const updateEvent = (newEvent) => {
    return fetch(`${host}/events/${newEvent.id}`,
    {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
    })
}

export const deleteEvent = (id) => {
    return fetch(`${host}/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
}

export const leaveEvent = (eventId) => {
    return fetch(`${host}/events/${eventId}/leave`,
    {method: "DELETE",
    headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    } 
}
    
    )
}

export const joinEvent = (eventId) => {
    return fetch(`${host}/events/${eventId}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        }
    })
}