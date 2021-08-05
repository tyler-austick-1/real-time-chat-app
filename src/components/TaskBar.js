import React from 'react';
import '../css/TaskBar.css';

export default function TaskBar(props) {

    const leaveRoom = () => {
        window.location.href = '/';
    }

    return (
        <div id="task-bar">
            <h2>{`${props.room.substring(0, 1).toUpperCase()}${props.room.substring(1)}`}</h2>
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    );
}
