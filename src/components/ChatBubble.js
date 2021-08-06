import React from 'react';
import '../css/ChatBubble.css';

export default function ChatBubble({isUserMessage, username, message, dateTime}) {
    const userStyleClass = isUserMessage ? ' user-bubble' : '';
    return (
        <div className={`chat-bubble${userStyleClass}`}>
            <p className="username-text"><b>{username}</b></p>
            <p className="message-text">{message}</p>
            <p className="date-time-text"><i>{dateTime}</i></p>
        </div>
    );
}
