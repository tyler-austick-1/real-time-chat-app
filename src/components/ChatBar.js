import React, { useState } from 'react';
import '../css/ChatBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
                <input id="chat-input" className="text-field" type="text" value={chatText} onChange={handleChange} autoComplete="off"></input>
                <button id="send-button" type="submit">
                    <FontAwesomeIcon id="send-icon" icon={faPaperPlane} size="lg"/>
                </button>
            </form>
        </div>
    );
}
