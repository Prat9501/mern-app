import React, { useState } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';


export default function Register({ history }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('false');
    
    const handleSubmit = async evt => {
        evt.preventDefault();

        if(email !== '' && password !== '' && firstName !== '' && lastName !== ''){
            const response = await api.post('/user/register', {email, password, firstName, lastName })
            const user = response.data.user || false;
            const user_id = response.data.user_id || false;
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
        } else {
            setError(true);
            setErrorMessage('Please fill all the inputs');
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 2000)
        }
    }
    
    return (
        <Container>
            <h2>Register Form</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleFirstName" className="mr-sm-2">FirstName</Label>
                    <Input 
                        type="text" 
                        name="firstName" 
                        id="exampleFirstName" 
                        onChange={evt=> setFirstName(evt.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleLastName" className="mr-sm-2">LastName</Label>
                    <Input 
                        type="text" 
                        name="lastName" 
                        id="exampleLastName" 
                        onChange={evt=> setLastName(evt.target.value)}
                        />
                </FormGroup>
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
                    <Button>Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button onClick={() => history.push('/login')}>Login instead</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className='event-validation' color='danger'>{errorMessage}</Alert>
            ): ''}
        </Container>
    )
}