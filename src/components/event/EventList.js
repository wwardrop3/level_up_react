//purpose of this module is to show all of the events returned from the server

import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager"


export const EventList = () => {
    const [events, setEvents] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { url } = useParams()
    const history = useHistory()


    useEffect(
        () => {
            getEvents()
            .then(
                (response) => {
                    setEvents(response)
                }
            )
        },[refresh, url]
    )

    const handleJoin = (eventId) => {

    }


    return(
        events ?
        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={
            () =>
                history.push({pathname: "/events/new"})
        }>Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    
                    return <section className="game" key={`${event.id}`}>
                        <div className="game_title">A game of {event.game.title} is being played on {event.date} {event.description}</div>
                        
                        <button className="btn btn-2 btn-sep icon-create"
                        onClick={
                            () => {
                            history.push(`/events/edit/${event.id}`)
                        }
                        }
                        >Edit</button>

                        <button className="btn btn-2 btn-sep icon-create"
                        onClick={
                            () => {
                            deleteEvent(event.id)
                            .then(
                                () => {
                                    setRefresh(!refresh)
                                }
                            )
                    }
                }
                >Delete</button>
                
                <button className="btn btn-2 btn-sep icon-create"
                onClick={
                    (evt) => {
                        event.joined ? leaveEvent(event.id).then(() => setRefresh(!refresh)) : joinEvent(event.id)
                        .then(
                            () => {
                                setRefresh(!refresh)
                            }
                        )
                }
            }
        
        

                        
                >{event.joined ? "Leave" : "Join"}</button>

                    </section>
                })

            }

            <div>
               
            </div>
        </article>


        </>
        :""
    )
    
}