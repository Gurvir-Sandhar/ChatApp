import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.css"
const axios = require('axios');

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            username: e.target.name.value,
            password: e.target.password.value
        }
        this.setState(obj);

        /*fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(obj)
        })*/
        axios
            .post('http://localhost:5000/login', obj)
            .then(response => {
                console.log("this is the resposne")
                let myfunc = this.props.isLoggedIn;
                myfunc()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <Form className="login-form" onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="usernameID">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordID">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name='password' type="text" placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default Login;