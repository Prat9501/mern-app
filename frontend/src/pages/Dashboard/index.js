import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import socketio from 'socket.io-client';
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
    const [messageHandler, setMessageHandler] = useState('');
    const[eventsRequest, setEventsRequest] = useState([]);

    useEffect(() => {
        getEvents();
    }, [])

    const socket =  useMemo(() => 
        socketio('http://localhost:8000', {query: {user: user_id}})
    , [user_id])

    useEffect(() => {
        socket.on('registration_request', data => setEventsRequest([...eventsRequest, data]));
    }, [eventsRequest, socket])

    const filterHandler = (query) => {
        setRSelected(query);
        getEvents(query);
    }

    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, {headers: {user}})
            setSuccess(true)
            setMessageHandler(`Registration request for event ${event.title} sent successfully!`)
            setTimeout(() => {
                filterHandler(null)
                setSuccess(false)
                setMessageHandler('')
            }, 2000)
        } catch (error) {
            setErrorMessage(true)
            setMessageHandler('Registration request failed.')
            setTimeout(() => {
                setErrorMessage(false)
                setMessageHandler('')
            }, 2000)
        }
    }

    const myEventsHandler = async () => {
        try {
            setRSelected('myEvents');
            const response = await api.get('/user/events', {headers: {user: user}})
            setEvents(response.data.events);
        } catch (error) {
            history.push('/login');
        }
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, {headers: {user: user}})
            setSuccess(true)
            setMessageHandler('Event deleted successfully')
            setTimeout(() => {
                filterHandler(null)
                setSuccess(false)
                setMessageHandler('')
            }, 2000)
        } catch (error) {
            setErrorMessage(true)
            setMessageHandler('Error in deleting the event.')
            setTimeout(() => {
                setErrorMessage(false)
                setMessageHandler('')
            }, 2000)
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
        history.push('/login');
    }

    const getEvents = async (filter) => {
        try {
            const url = filter ? `/dashboard/${filter}` : '/dashboard'
            const response = await api.get(url, { headers: {user: user}})
            setEvents(response.data.events)
        } catch (error) {
            history.push('/login');
        }
    }
    return (
        <>
        <ul className="notifications">
            {eventsRequest.map(request => {
                return(
                    <li key={request._id}>
                        <div>
                            <strong>{request.user.email}</strong> is requesting to register for an event.
                            <strong>{request.event.title}</strong>
                        </div>
                        <ButtonGroup>
                            <Button color='secondary' onClick={() => {}}>Accept</Button>
                            <Button color='danger' onClick={() => {}}>Cancel</Button>
                        </ButtonGroup>
                    </li>
                )
            })}
        </ul>
        <div className='filter-panel'> 
            <ButtonGroup>
                <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All</Button>
                <Button color="primary" onClick={myEventsHandler} active={rSelected === 'myEvents'}>My Events</Button>
                <Button color="primary" onClick={() => filterHandler('Cricket')} active={rSelected === 'Cricket'}>Cricket</Button>
                <Button color="primary" onClick={() => filterHandler('Swimming')} active={rSelected === 'Swimming'}>Swimming</Button>
                <Button color="primary" onClick={() => filterHandler('Cycling')} active={rSelected === 'Cycling'}>Cycling</Button>
                <Button color="primary" onClick={() => filterHandler('Wrestling')} active={rSelected === 'Wrestling'}>Wrestling</Button>
            </ButtonGroup>
            <Button color='success' onClick={() => history.push('/events')}>Create Event</Button>
            <Button color='success' onClick={logoutHandler}>Logout</Button>
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
                        <Button color='primary' onClick={() => registrationRequestHandler(event)}>Subscribe</Button>
                    </li>
                ))
            }
        </ul>
            {errorMessage ? (
                <Alert className='event-validation' color='danger'>{messageHandler}</Alert>
            ): ''}
            {success ? (
                <Alert className='event-validation' color='success'>{messageHandler}</Alert>
            ): ''}
        </>
    )
}