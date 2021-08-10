import React from 'react';
import '../css/TaskBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


export default function TaskBar(props) {
    
    const leaveRoom = () => {
        window.location.href = '/';
    }

    return (
        <div id="task-bar">
            <h2>{`${props.room.substring(0, 1).toUpperCase()}${props.room.substring(1)}`}</h2>
            <FontAwesomeIcon id="leave-room-icon" icon={faSignOutAlt} onClick={leaveRoom} size="lg" />
        </div>
    );
}
