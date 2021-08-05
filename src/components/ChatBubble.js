import React from 'react';
import '../css/ChatBubble.css';

export default function ChatBubble(props) {
    return (
        <div className="chat-bubble">
            <p className="username-text"><b>{props.username}</b></p>
            <p className="message-text">{props.message}</p>
            <p className="date-time-text"><i>{props.dateTime}</i></p>
        </div>
    );
}
