import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {Button} from 'reactstrap';
import api from '../../services/api';
import './dashboard.css';

export default function Dashboard(){
    const user_id = localStorage.getItem('user');
    const [events, setEvents] = useState([]);

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
    )
}