import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getSingleEvent, deleteEvent } from "../../managers/EventManager"


export const EventDetails = () => {
    const [event, setEvent] = useState(null)
    const {eventId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleEvent(`${eventId}`).then(data => setEvent(data))
    }, [])

    if (!event) {
        return <div>😰Oopsie🐥poopsie💔 👁️👄👁️ that🫵event🍆🥵 doesn't💅exist 🤡</div>
    }

    const handleDelete = (eventId) => {
        if (window.confirm("Are you sure 🥺 you want to delete this event?")) {
            deleteEvent(eventId)
                .then(() => {
                    navigate("/events")
                })
        }
    }

    return <section key={`event--${event.id}`} className="event">
        <div className="event__title">{event.title} by {event?.organizer?.full_name}</div>
        <div className="event__date">Date & Time: {event.date_time}</div>
        <div className="event__game">Game being played is {event?.game?.title}</div>
        <div className="event__location">This event is in {event.location}</div>
        <div className="footer__buttons">
            <Link className="event__editButton" to={`/event/${event.id}/edit`}>
                <button>Edit This Event</button>
            </Link>
            <button
                onClick={() => handleDelete(event.id)}
                className="btn btn-danger"
            >
                Delete Event
            </button>
        </div>
    </section>
}