import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent } from "../../managers/EventManager.js"
import { useNavigate, Link } from 'react-router-dom'


export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleDelete = (eventId) => {
        if (window.confirm("Are you sure 🥺 you want to delete this game?")) {
            deleteEvent(eventId)
                .then(() => {
                    getEvents().then(data => setEvents(data))
                })
        }
    }

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title} by {event?.organizer?.full_name}</div>
                        <div className="event__date">Date & Time: {event.date_time}</div>
                        <div className="event__game">Game being played is {event?.game?.title}</div>
                        <div className="event__location">This event is in {event.location}</div>
                        <div className="footer__buttons">
                            <Link className="event__detailsButton" to={`/events/${event.id}`}>
                                <button>View Event Details</button>
                            </Link>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="btn btn-danger"
                            >
                                Delete Event
                            </button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}