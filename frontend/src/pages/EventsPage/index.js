import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import cameraIcon from '../../assets/camera.png';


export default function EventsPage(){
    const user_id = localStorage.getItem('user');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [date, setDate] = useState('');

    const submitHandler = () => {
        return ''
    }

    return (
        <Container>
            <h2>Create your Event</h2>
            <Form>
                <Label>Upload Image:  
                    <img src={cameraIcon} style={{maxWidth:'25px'}} alt='upload icon img' />
                </Label>
                <Input 
                    id='thumbnail' 
                    type='file'
                    onChange={(evt) => setThumbnail(evt.target.files[0])}
                    />
            </Form>
        </Container>
    )
}   