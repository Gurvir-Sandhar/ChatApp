import React from "react"
//import { Link } from "react-router-dom"
import Login from './Login.js'
import Header from './Header.js'
import Chat from './Chat.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            loggedIn: false
        }
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    isLoggedIn = () => {
        this.setState({
            loggedIn: !this.state.loggedIn
        })
    }

    setUserName = (username) => {
        this.setState({
            name: username
        })
    }

    /*componentDidMount() {
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
        const loggedIn = this.state.loggedIn;
        return (
            <div className="App">
                <Header />
                { loggedIn ? <Chat isLoggedIn={this.isLoggedIn}  username={this.state.name}/> : <Login isLoggedIn={this.isLoggedIn} setUserName={this.setUserName} /> }
            </div>
        )
    };
}

export default App;
