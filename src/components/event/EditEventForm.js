import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleEvent, editEvent } from "../../managers/EventManager.js"
import { getGames } from "../../managers/GameManager.js"

export const EditEventForm = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        title: "",
        date_time: "",
        location: "",
        game: 0
    })

    useEffect(() => {
        getSingleEvent(eventId).then(eventData => {
                setCurrentEvent(eventData)
            })
        getGames().then(data => {setGames(data)})
    }, [eventId])

    const changeEventState = (event) => {
        const {name, value} = event.target
        setCurrentEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        required autoFocus
                        className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateTime">Date and Time: </label>
                    <input
                        type="text"
                        name="dateTime"
                        required autoFocus
                        className="form-control"
                        value={currentEvent.date_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Event Location: </label>
                    <input
                        type="text"
                        name="location"
                        required autoFocus
                        className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game Being Played: </label>
                    <select
                        name="game"
                        required autoFocus
                        className="form-control"
                        value={currentEvent.game.id}
                        onChange={changeEventState}
                    >
                        <option value="0">Select Game</option>
                        {games.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>

                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedEvent = {
                        id: eventId,
                        title: currentEvent.title,
                        date_time: currentEvent.date_time,
                        location: currentEvent.location,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    editEvent(eventId, updatedEvent)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Finish</button>
        </form>
    )
}