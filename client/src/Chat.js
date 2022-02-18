import React, { useEffect, useRef, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./Chat.css"
import { io } from "socket.io-client";
import $ from "jquery";

const socket = io("http://localhost:5000")

function Chat (props){
    const [Username, setUsername] = useState("");

    useEffect(() => {
            if(Username === ""){
                setUsername(props.username)
            }
            console.log(Username)
            socket.on("connection", () => {
                console.log(socket.id);
            })
            socket.on("connect_error", () => {
                setTimeout(() => socket.connect(), 5000);
            })
            socket.on("userMessage", (data) => {
                let elem = document.getElementById("chatDiv");
                elem.innerHTML += `<div class="userMsg">
                                    <div class="name">${data.name}</div>
                                    <div class="graymsg">${data.message}</div>
                                    </div>`;
                elem.scrollTop = elem.scrollHeight;
            })
        }, []
    )

    const submitMessage = (e) => {
        e.preventDefault();
        let msg = e.target.chat.value
        let elem = document.getElementById("chatDiv")
        elem.innerHTML +=`<div class="myMsg">
                            <div class="name">You</div>
                            <div class="msg">${msg}</div>
                            </div>`;
        elem.scrollTop = elem.scrollHeight;
        $("#textarea").val("")
        socket.emit("message", { name: Username, message: msg});
    }

    return(
            <div className="chat-parent">
                <div className="div-row">
                    <div className="chat-box" id="chatDiv"></div>
                    <div className="user-list"> user list</div>
                </div>
                <div className="user-input">
                    <Form className="form" onSubmit={submitMessage}>
                        <Form.Group controlID="chat-text-group">
                            <Form.Control  id="textarea" name="chat" type="textarea" rows="{2}"/>
                        </Form.Group>
                        <Button id="button" type="submit"  variant="primary send-btn" >Send</Button>
                    </Form>
                </div>
            </div>
    )
}

export default Chat;