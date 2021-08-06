import React from 'react';
import '../css/ChatWindow.css';
import ChatBar from './ChatBar';
import ChatBubble from './ChatBubble';
import { v4 as uuidv4} from 'uuid';

export default function ChatWindow(props) {
    const mappedMessages = props.messages.map(message => <ChatBubble key={uuidv4()} username={message.username} message={message.text} dateTime={message.time}/>);
    return (
        <div id="chat-window">
            <div id="message-window">
                {mappedMessages}
            </div>
            <ChatBar />
        </div>
    )
}
