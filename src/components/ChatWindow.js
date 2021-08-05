import React from 'react';
import '../css/ChatWindow.css';
import ChatBar from './ChatBar';
import ChatBubble from './ChatBubble';

export default function ChatWindow() {
    return (
        <div id="chat-window">
            <div id="message-window">
                <ChatBubble username="Tyler" message="Let's hope this shit works" dateTime="5/8/2021 15:28" />
            </div>
            <ChatBar />
        </div>
    )
}
