import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getSingleGame, deleteGame } from "../../managers/GameManager"


export const GameDetails = () => {
    const [game, setGame] = useState(null)
    const { gameId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleGame(gameId).then(data => setGame(data))
    }, [])

    if (!game) {
        return <div>😰Oopsie🐥poopsie💔 👁️👄👁️ that🫵game🍆🥵 doesn't💅exist 🤡</div>
    }

    const handleDelete = (gameId) => {
        if (window.confirm("Are you sure 🥺 you want to delete this game?")) {
            deleteGame(gameId)
                .then(() => {
                    navigate("/games")
                })
    }}

    return <section key={`game--${game.id}`} className="game">
        <div className="game__title">{game.title} by {game.maker}</div>
        <div className="game__players">{game.number_of_players} players needed</div>
        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
        <div className="footer__buttons">
            <Link className="game__editButton" to={`/game/${game.id}/edit`}>
            <button>Edit This Game</button>
            </Link>

            <button
                onClick={() => handleDelete(game.id)}
                className="btn btn-danger"
                >
                    Delete Game
            </button>
            
        </div>
    </section>
}