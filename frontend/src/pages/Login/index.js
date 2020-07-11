import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';



export default function Login({ history }){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault();
        console.log(email, password);

        const response = await api.post('/login', { email, password })
        const userId = response.data._id || false;

        if(userId){
            localStorage.setItem('user', userId)
            history.push('/dashboard')
        } else {
            const { message } = response.data
            console.log(message);
        }
    }
    
    return (
        <Container>
            <h2>Login Form</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input 
                        type="email" 
                        name="email" 
                        id="exampleEmail" 
                        placeholder="something@idk.cool"
                        onChange={evt=> setEmail(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="don't tell!" 
                        onChange={evt=> setPassword(evt.target.value)}
                        />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}