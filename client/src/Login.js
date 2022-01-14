import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.css"

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'null',
            password: 'null'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            name: e.target.name.value,
            password: e.target.password.value
        }
        this.setState(obj) 
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