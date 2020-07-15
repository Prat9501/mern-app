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
        const user_id = response.data.user_id || false;
        const user = response.data.user || false;

        try {
            if(user && user_id){
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)
                history.push('/')
            } else {
                setError(true);
                setErrorMessage('Missing required fields');
                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                }, 2000)
            }
        } catch (error) {
            console.log(error);
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
                <FormGroup>
                    <Button>Login</Button>
                </FormGroup>
                <FormGroup>
                    <Button onClick={() => history.push('/register')}>Register Here</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className='event-validation' color='danger'>{errorMessage}</Alert>
            ): ''}
        </Container>
    )
}