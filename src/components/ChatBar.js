import React, { useState } from 'react';
import '../css/ChatBar.css';

export default function ChatBar({socket}) {
    const [chatText, setChatText] = useState('');

    function handleChange(event) {
        setChatText(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (chatText === '') return;

        socket.emit('message', chatText);
        setChatText('');
    }

    return (
        <div id="chat-form">
            <form onSubmit={handleSubmit}>
                <input id="chat-input" type="text" value={chatText} onChange={handleChange} autoComplete="off"></input>
                <input id="send-button" type="submit" value="Send"></input>
            </form>
        </div>
    );
}
