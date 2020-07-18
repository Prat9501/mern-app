import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { 
    Container, Button, Form, FormGroup, 
    Label, Input, Alert, 
    DropdownItem, DropdownMenu, DropdownToggle, 
    ButtonDropdown} from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import './events.css';


export default function EventsPage({history}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sport, setSport] = useState('Sport');
    const [date, setDate] = useState('');
    const [dropdownOpen, setOpen] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        if(!user) history.push('/login');
    },[])

    const toggle = () => setOpen(!dropdownOpen);

    const submitHandler = async (evt) => {
        
        const eventData = new FormData();
        eventData.append('thumbnail', thumbnail);
        eventData.append('title', title);
        eventData.append('description', description);
        eventData.append('price', price);
        eventData.append('sport', sport);
        eventData.append('date', date);

        try {
            if(
                title !== '' && 
                description !== '' &&
                price !== '' &&
                sport !== 'Sport' &&
                date !== '' &&
                thumbnail !== null
            ){
                await api.post('/event', eventData, {headers: {user}} )
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    history.push('/')
                }, 2000)
            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000)
            }
        } catch (error) {
            console.log(error.message);
        }

        evt.preventDefault();
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
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <Button id='caret' value={sport} disabled>{sport}</Button>
                    <DropdownToggle caret />
                    <DropdownMenu>
                        <DropdownItem onClick={() => setSport('Cricket')}>Cricket</DropdownItem>
                        <DropdownItem onClick={() => setSport('Wrestling')}>Wrestling</DropdownItem>
                        <DropdownItem onClick={() => setSport('Cycling')}>Cycling</DropdownItem>
                        <DropdownItem onClick={() => setSport('Swimming')}>Swimming</DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
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
                <FormGroup>
                    <Button type='submit'>Create Event</Button>
                </FormGroup>
                <FormGroup>
                    <Button onClick={() => history.push('/')}>Cancel</Button>
                </FormGroup>
            </Form>
            {errorMessage ? (
                <Alert className='event-validation' color='danger'>Missing required fields</Alert>
            ): ''}
            {success ? (
                <Alert className='event-validation' color='success'>Event created successfully</Alert>
            ): ''}
        </Container>
    )
}   