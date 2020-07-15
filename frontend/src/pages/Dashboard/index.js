import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {Button, ButtonGroup} from 'reactstrap';
import api from '../../services/api';
import './dashboard.css';

export default function Dashboard(){
    const user_id = localStorage.getItem('user');
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);

    const filterHandler = (query) => {
        setRSelected(query);
        getEvents(query);
    }

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url, { headers: {user_id}})
        setEvents(response.data)
    }
    console.log(events);
    return (
        <>
        <div>Filter: 
            <ButtonGroup>
                <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All</Button>
                <Button color="primary" onClick={() => filterHandler('Cricket')} active={rSelected === 'Cricket'}>Cricket</Button>
                <Button color="primary" onClick={() => filterHandler('Swimming')} active={rSelected === 'Swimming'}>Swimming</Button>
                <Button color="primary" onClick={() => filterHandler('Cycling')} active={rSelected === 'Cycling'}>Cycling</Button>
                <Button color="primary" onClick={() => filterHandler('wrestling')} active={rSelected === 'wrestling'}>Wrestling</Button>
            </ButtonGroup>
        </div>
        <ul className='events-list'>
            {
                events.map(event => (
                    <li key={event._id}>
                        <header style={{backgroundImage: `url(${event.thumbnail_url})`}} />
                        <strong>{event.title}</strong>
                        <span>Event Date: {moment(event.date).format('l')}</span>
                        <span>Entry Price: Rs {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event Description: {event.description}</span>
                        <Button color='primary'>Subscribe</Button>
                    </li>
                ))
            }
        </ul>
        </>
    )
}