import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "../../managers/GameManager.js"
import { useNavigate, Link } from 'react-router-dom'

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const handleDelete = (gameId) => {
        if (window.confirm("Are you sure 🥺 you want to delete this game?")) {
            deleteGame(gameId)
                .then(() => {
                    getGames().then(data => setGames(data))
                })
    }}

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="footer__buttons">
                            <Link className="game__detailsButton" to={`/games/${game.id}`}>
                                <button>View Game Details</button>
                            </Link>
                            <button
                                onClick={() => handleDelete(game.id)}
                                className="btn btn-danger"
                            >
                                Delete Game
                            </button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}