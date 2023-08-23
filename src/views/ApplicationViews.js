import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { GameForm } from "../components/game/GameForm"
import { GameDetails } from "../components/game/GameDetails"
import { EditGameForm } from "../components/game/EditGameForm"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"
import { EventDetails } from "../components/event/EventDetails"
import { EditEventForm } from "../components/event/EditEventForm"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:gameId" element={<GameDetails />} />
                <Route path="/game/:gameId/edit" element={<EditGameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId" element={<EventDetails />} />
                <Route path="/event/:eventId/edit" element={<EditEventForm />} />
            </Route>
        </Routes>
    </>
}
