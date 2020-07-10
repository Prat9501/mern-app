import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import './events.css';


export default function EventsPage(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [sport, setSport] = useState('');
    const [date, setDate] = useState('');

    const submitHandler = async (evt) => {
        const user_id = localStorage.getItem('user');
        
        const eventData = new FormData();
        eventData.append('thumbnail', thumbnail);
        eventData.append('title', title);
        eventData.append('description', description);
        eventData.append('price', price);
        eventData.append('sport', sport);
        eventData.append('date', date);
        
        if(
            title !== '' && 
            description !== '' &&
            price !== '' &&
            sport !== '' &&
            date !== '' &&
            thumbnail !== null
            ){
                try {
                    await api.post('/event', eventData, {headers: {user_id}} )
                } catch (error) {
                    console.log(error.message);
                }
            }
            
        evt.preventDefault();
        return ''
    }

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    return (
        <Container>
            <h2>Create your Event</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Upload Image:</Label>
                    <Label id='thumbnail' style={{backgroundImage: `url(${preview})`}} 
                        className={thumbnail ? 'has-thumbnail' : ''}
                    >
                    <Input 
                        id='thumbnail' 
                        type='file'
                        onChange={(evt) => setThumbnail(evt.target.files[0])}
                        />
                    <img src={cameraIcon} style={{maxWidth:'25px'}} alt='upload icon img' />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Sport: </Label>
                    <Input 
                        id='sport' 
                        type='text'
                        placeholder={'Enter sports name'}
                        value={sport}
                        onChange={(evt) => setSport(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label>Title: </Label>
                    <Input 
                        id='title' 
                        type='text'
                        placeholder={'Enter title'}
                        value={title}
                        onChange={(evt) => setTitle(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label>Description: </Label>
                    <Input 
                        id='description' 
                        type='text'
                        placeholder={'Enter description'}
                        value={description}
                        onChange={(evt) => setDescription(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label>Event Price: </Label>
                    <Input 
                        id='price' 
                        type='text'
                        placeholder={'Enter price in Rs'}
                        value={price}
                        onChange={(evt) => setPrice(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label>Event Date: </Label>
                    <Input 
                        id='date' 
                        type='date'
                        placeholder={'Enter date'}
                        value={date}
                        onChange={(evt) => setDate(evt.target.value)}
                        />
                </FormGroup>
                <Button type='submit'>Create Event</Button>
            </Form>
        </Container>
    )
}   