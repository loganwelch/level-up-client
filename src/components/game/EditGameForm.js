import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleGame, editGame, getGameTypes } from "../../managers/GameManager.js"

export const EditGameForm = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        title: "",
        maker: "",
        numberOfPlayers: "",
        skillLevel: "",
        gameTypeId: ""
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
        getSingleGame(gameId).then(data=> {
            setCurrentGame({
                title: data.title,
                maker: data.maker,
                numberOfPlayers: data.number_of_players,
                skillLevel: data.skill_level,
                gameTypeId: data.game_type
            })
        })
    }, [gameId])

    const changeGameState = (evt) => {
        const { name, value } = evt.target;
        setCurrentGame((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        required autoFocus
                        className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input
                        type="text"
                        name="maker"
                        required autoFocus
                        className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input
                        type="number"
                        name="numberOfPlayers"
                        required autoFocus
                        className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input
                        type="number"
                        name="skillLevel"
                        required autoFocus
                        className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select
                        name="gameTypeId"
                        required autoFocus
                        className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}
                    >
                        <option value="0">Select Game Type</option>
                        {gameTypes.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.type}
                            </option>
                        ))}
                    </select>

                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        id: gameId,
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    editGame(updatedGame.id, updatedGame)
                        .then(() => navigate(`/games/${gameId}`))
                }}
                className="btn btn-primary">Finish</button>
        </form>
    )
}