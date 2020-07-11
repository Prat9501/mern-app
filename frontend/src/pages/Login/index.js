import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';



export default function Login({ history }){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('false');

    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await api.post('/login', { email, password })
        const userId = response.data._id || false;

        try {
            if(userId){
                localStorage.setItem('user', userId)
                history.push('/dashboard')
            } else {
                const { message } = response.data
                setError(true);
                setErrorMessage(message);
                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                }, 2000)
            }
        } catch (error) {
            
        }
    }
    
    return (
        <Container>
            <h2>Login Form</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input 
                        type="email" 
                        name="email" 
                        id="exampleEmail" 
                        placeholder="something@idk.cool"
                        onChange={evt=> setEmail(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="don't tell!" 
                        onChange={evt=> setPassword(evt.target.value)}
                        />
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
            {error ? (
                <Alert className='event-validation' color='danger'>Missing required fields</Alert>
            ): ''}
        </Container>
    )
}