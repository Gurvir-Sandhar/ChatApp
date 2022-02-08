import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./Chat.css"
import { io } from "socket.io-client";

function Chat (){
    const [random, setRandom] = useState("");

    useEffect(
        () => {
            const socket = io("http://localhost:5000")
            socket.on("connect", () => {
                console.log(socket.id);
            })
        }
    )

    return(
            <div className="chat-parent">
                <div className="div-row">
                    <div className="chat-box">chat box</div>
                    <div className="user-list"> user list</div>
                </div>
                <div className="user-input">
                    <Form className="form">
                        <Form.Group controlID="chat-text-group">
                            <Form.Control as="textarea" rows="{2}"/>
                        </Form.Group>
                        <Button type="button"  className="primary send-btn">Send</Button>
                    </Form>
                </div>
            </div>
    )
}

export default Chat;