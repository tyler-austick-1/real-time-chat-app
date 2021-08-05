import React from 'react';
import '../css/ChatWindow.css';
import ChatBar from './ChatBar';
import ChatBubble from './ChatBubble';

export default function ChatWindow(props) {
    // props.messages
    return (
        <div id="chat-window">
            <div id="message-window">
                <ChatBubble username="Tyler" message="Let's hope this shit works" dateTime="5/8/2021 15:28" />
                <ChatBubble username="Bob" message="Looks like it's working" dateTime="5/8/2021 18:25" />
                <ChatBubble username="Bob" message="Looks like it's working" dateTime="5/8/2021 18:25" />
                <ChatBubble username="Bob" message="Looks like it's working" dateTime="5/8/2021 18:25" />
                <ChatBubble username="Bob" message="Looks like it's working" dateTime="5/8/2021 18:25" />
                <ChatBubble username="Bob" message="Looks like it's working" dateTime="5/8/2021 18:25" />
                <ChatBubble username="Bob" message="Looks like it's working" dateTime="5/8/2021 18:25" />
            </div>
            <ChatBar />
        </div>
    )
}
