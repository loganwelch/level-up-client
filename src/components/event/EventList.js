import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useNavigate } from 'react-router-dom'

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Game</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title} by {event?.organizer?.full_name}</div>
                        <div className="event__date">Date & Time: {event.date_time}</div>
                        <div className="event__game">Game being played is {event?.game?.title}</div>
                        <div className="event__location">This event is in {event.location}</div>
                    </section>
                })
            }
        </article>
    )
}