import React, { useEffect, useRef, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./Chat.css"
import { io } from "socket.io-client";
import $ from "jquery";

function Chat (){
    const [random, setRandom] = useState("");

    const chatDiv = useRef(null);

    useEffect(
        () => {
            const socket = io("http://localhost:5000")
            socket.on("connect", () => {
                console.log(socket.id);
            })
            socket.on("connect_error", () => {
                setTimeout(() => socket.connect(), 5000);
            })
            socket.on("message", () => {
                //send message to server
            })
            socket.on("emit", () => {
                //receive and print messages from server
            })
        }
    )

    const submitMessage = (e) => {
        e.preventDefault();
        let elem = document.getElementById("chatDiv")
        elem.innerHTML +=`<div class="myMsg">${e.target.chat.value}</div>`;
        elem.scrollTop = elem.scrollHeight;
        $("#textarea").val("")
    }


    return(
            <div className="chat-parent">
                <div className="div-row">
                    <div className="chat-box" id="chatDiv" ref={chatDiv}></div>
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