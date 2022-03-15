import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import GoogleLogin from 'react-google-login'
import "./Login.css"
const axios = require('axios');

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            username: e.target.name.value,
            password: e.target.password.value
        }
        this.setState(obj);
        //let setName = this.props.setUsername;
        this.props.setUserName(obj.username);
        axios
            .post('http://localhost:5000/login', obj)
            .then(response => {
                let myfunc = this.props.isLoggedIn;
                myfunc()
            })
            .catch(err => {
                console.log(err)
            })
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        return (
            <Form className="login-form" onSubmit={this.handleSubmit}>
                <h2>Guest Login</h2>
                <Form.Group className="mb-3" controlId="usernameID">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter Username" />
                </Form.Group>
                {/*<Form.Group className="mb-3" controlId="passwordID">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name='password' type="text" placeholder="Enter Password" />
                </Form.Group>*/}
                <Button variant="primary" type="submit">
                    Login as Guest
                </Button>
                <div>or</div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    isSignedIn={true}
                />
            </Form>
        )
    }
}

export default Login;