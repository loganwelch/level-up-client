import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent, getGames } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        title: "",
        dateTime: "",
        location: "",
        gameId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then((data) => { setGames(data) })
    }, [])

    const changeEventState = (evt) => {
        // TODO: Complete the onChange function
        const { name, value } = evt.target;
        setCurrentEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Game</h2>
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
                        type="datetime-local"
                        name="dateTime"
                        required autoFocus
                        className="form-control"
                        value={currentEvent.dateTime}
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
                    <label htmlFor="gameId">Game Being Played: </label>
                    <select
                        name="gameId"
                        required autoFocus
                        className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}
                    >
                        <option value="">Select Game</option>
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

                    const event = {
                        title: currentEvent.title,
                        date_time: currentEvent.dateTime,
                        location: currentEvent.location,
                        game: parseInt(currentEvent.gameId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}