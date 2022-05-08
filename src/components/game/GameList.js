// purpose of this module is to show all the games that are returned from the server

import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteGame, getGames } from "./GameManager"


export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()
    const [refresh, setRefresh] = useState(false)

    useEffect(
        () => {
            getGames()
            .then(
                (response) =>{
                    setGames(response)
                }
            )
        }, [refresh]
    )

    return (
        <>

        <button className="btn btn-2 btn-sep icon-create"
        onClick={
            () => [
                history.push({pathname: "/games/new"})
            ]
        }>Register New Game</button>

        <article className="games">
            {
                games.map(game => {
                    return <section key = {`game--${game.id}`} className='game'>
                                <Link to= {`/games/${game.id}`}><div className="game_title">{game.title} by {game.maker}</div></Link>
                                <button
                                onClick={
                                    () => {
                                        history.push(`/games/edit/${game.id}`)
                                    }
                                }>Edit Game</button>

                                <button
                                onClick={
                                    () => {
                                        deleteGame(game.id)
                                        setRefresh(!refresh)
                                    }
                                }>Delete Game</button>
                                {/* <div className="game_players">{game.number_of_players} players needed</div>
                                <div className="game_skill_level">Skill level is {game.skill_level}</div> */}
             
             
                            </section>       
                })
            }
        </article>

        </>
    )



}