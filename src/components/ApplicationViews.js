import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>

            <Route exact path="/events/edit/:eventId(\d+)">
                <EventForm />
            </Route>

            <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm />
            </Route>

            <Route exact path="/events/new">
                <EventForm />
            </Route>
        </main>

    </>
}
