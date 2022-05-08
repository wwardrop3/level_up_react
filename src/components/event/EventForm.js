import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { createEvent, getEvent, getEvents, updateEvent } from "./EventManager"
import { useState } from "react/cjs/react.development"
import { getGames } from "../game/GameManager"
import { useParams } from "react-router-dom"



export const EventForm = () => {
    const [events, setEvents] = useState([])
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    const [currentEvent, setCurrentEvent] = useState({
        "description": "",
        "date": "",
        "time": "",
        "game": 1,
        "organizer": 1,
        "attendees": 1
    })
    const history = useHistory()


    useEffect(
        () => {
            getGames()
            .then(
                (gameResponse) => {
                            setGames(gameResponse)
            
                })},[eventId]
    )

    useEffect(
        () => {
            eventId ?
            getEvent(eventId)
            .then(
                (eventResponse) => {
                    eventId ?
                        setCurrentEvent(eventResponse)
                    :""
            
                })
            :""},[eventId]
    )

    

    const handleButton = (event) => {
        let button = ""
        eventId ? button="Update":button="Save"
        return button
    }

    const changeEventState = (event) => {
        let copy = {...currentEvent}
        copy[`${event.target.name}`] = event.target.name == "game" ? parseInt(event.target.value) : event.target.value
        setCurrentEvent(copy)
    }

        return(
        
        currentEvent ?
        <form className="gameForm">
            <h2 className = "gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name = "date" required autoFocus className = "form-control"
                    value = {currentEvent.date}
                    onChange = {changeEventState} />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className= "form-control"
                    value = {currentEvent.time}
                    onChange = {changeEventState} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className= "form-control"
                    value = {currentEvent.description}
                    onChange = {changeEventState} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                   
                    <select className="form-control" name="game"
                    onChange={changeEventState}
                    >
                         {eventId ? "" : <option value = "0">Select Game: </option>}
                        {games.map(game => {
                            return <option selected = {currentEvent.game == game.id ? "{true}" : ""} value = {`${game.id}`}>{game.title}</option>
                        })}
                    </select>

                </div>

                <div className="form-group">
                <button 
                type="submit"
                className="btn btn-2 btn-sep icon-create"
                onClick={
                    () => {
                        let check = handleButton()
                        console.log(currentEvent)
                        eventId ? updateEvent(currentEvent) : createEvent(currentEvent)
                        history.push("/events")

                    }
                    
                }
                >{`${handleButton()}`}</button>

                </div>
            </fieldset>

            
        </form>
        :""
    )

}