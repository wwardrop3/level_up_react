import { useHistory } from "react-router-dom"
import { createGame, getGame, getGameTypes, updateGame } from "./GameManager"
import { useEffect, useState } from "react/cjs/react.development"
import { useParams } from "react-router-dom"



export const GameForm = () => {
    const history=useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()

    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 1,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(
        () => {
            
            getGameTypes()
            .then(
                (response) => {
                    setGameTypes(response)
                })
                .then(
                    () => {
                        gameId ? getGame(gameId)
                        .then(
                            (response2) => {
                                setCurrentGame(response2)
                            }
                        )
                    :""}
                )
                
                },[gameId]
        )



    const getCurrentGameTypeLabel = () =>{
        const foundGameType = gameTypes.find(gtype => gtype.id == currentGame.gameType)
        // console.log(foundGameType)
        // console.log(foundGameType?.label)
        console.log(gameTypes)
        return foundGameType?.label
    }
    


    const changeGameState = (event) => {
        let copy = {...currentGame}
        copy[event.target.name] = event.target.name == "game_type" ? parseInt(event.target.value) : event.target.value
        setCurrentGame(copy)
    }

    const handleButton = (event) => {
        let button = ""
        gameId ? button="Update":button="Save"
        return button
    }





    return(
        currentGame ?
        <form className="gameForm">
            <h2 className = "gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name = "title" required autoFocus className = "form-control"
                    value = {currentGame.title}
                    onChange = {changeGameState} />
                </div>

                <div className="form-group">
                    <label htmlFor="maker">Game Maker: </label>
                    <input type="text" name="maker" required className= "form-control"
                    value = {currentGame.maker}
                    onChange = {changeGameState} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select className="form-control" name="game_type"
                    onChange={changeGameState}>
                        {gameId ?  "" : <option value="0" selected = "True">Select Game Type: </option>}
                        {gameTypes.map(GT => {
        
                            return <option selected = {currentGame.game_type == GT.id ? "True": ""} value = {`${GT.id}`}>{GT.label}</option>
                        })}
                            
                    </select>



                    {/*put ternary statement to update save button */}
                </div>
                
                <div className="form-group">
                <button 
                className="btn btn-2 btn-sep icon-create"
                onClick={
                    () => {
                        let check = handleButton()
                        gameId ? updateGame(currentGame) : createGame(currentGame)
                        history.push("/games")

                    }
                    
                }
                >{`${handleButton()}`}</button>

                </div>
            </fieldset>

            
        </form>
    :""
    )
}