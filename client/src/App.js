import React, { Component } from "react"
import { Link } from "react-router-dom"
import Login from './Login.js'
import Header from './Header.js'

class App extends React.Component {
    /*state = {
        data: null
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({data: res.express}))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if(response.status !== 200){
            throw Error(body.message)
        }
        return body;
    }*/

    render() {
        return (
            <div className="App">
                <Header />
                <Login />
            </div>
        )
    };
}

export default App;
