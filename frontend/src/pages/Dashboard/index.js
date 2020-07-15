import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {Button, ButtonGroup, Alert} from 'reactstrap';
import api from '../../services/api';
import './dashboard.css';

export default function Dashboard({history}){
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);

    const filterHandler = (query) => {
        setRSelected(query);
        getEvents(query);
    }

    const myEventsHandler = async () => {
        setRSelected('myEvents');
        const response = await api.get('/user/events', {headers: {user_id: user_id}})
        setEvents(response.data);
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`)
            setSuccess(true)
            setTimeout(() => {
                filterHandler(null)
                setSuccess(false)
            }, 2000)
        } catch (error) {
            setErrorMessage(true)
            setTimeout(() => {
                setErrorMessage(false)
            }, 2000)
        }
    }

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url, { headers: {user: user}})
        setEvents(response.data)
    }
    console.log(events);
    return (
        <>
        <div className='filter-panel'> 
            <ButtonGroup>
                <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All</Button>
                <Button color="primary" onClick={myEventsHandler} active={rSelected === 'myEvents'}>My Events</Button>
                <Button color="primary" onClick={() => filterHandler('Cricket')} active={rSelected === 'Cricket'}>Cricket</Button>
                <Button color="primary" onClick={() => filterHandler('Swimming')} active={rSelected === 'Swimming'}>Swimming</Button>
                <Button color="primary" onClick={() => filterHandler('Cycling')} active={rSelected === 'Cycling'}>Cycling</Button>
                <Button color="primary" onClick={() => filterHandler('wrestling')} active={rSelected === 'wrestling'}>Wrestling</Button>
            </ButtonGroup>
            <Button color='success' onClick={() => history.push('/events')}>Create Event</Button>
        </div>
        <ul className='events-list'>
            {
                events.map(event => (
                    <li key={event._id}>
                        <header style={{backgroundImage: `url(${event.thumbnail_url})`}}>
                            {event.user === user_id ? <div>
                                <Button color="danger" onClick={() => deleteEventHandler(event._id)}>Delete</Button></div> : ""}
                        </header>
                        <strong>{event.title}</strong>
                        <span>Event Date: {moment(event.date).format('l')}</span>
                        <span>Entry Price: Rs {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event Description: {event.description}</span>
                        <Button color='primary'>Subscribe</Button>
                    </li>
                ))
            }
        </ul>
            {errorMessage ? (
                <Alert className='event-validation' color='danger'>Error in deleting the event.</Alert>
            ): ''}
            {success ? (
                <Alert className='event-validation' color='success'>Event deleted successfully</Alert>
            ): ''}
        </>
    )
}