import React from 'react'
import '../css/UsersList.css';
import { v4 as uuidv4 } from 'uuid';

export default function UsersList(props) {
    const listItems = props.users.map(user => <div key={uuidv4()}><p>{user}</p><br></br></div>);
    return (
        <div id="users-list">
            <br></br>
            <h3>Users</h3>
            <br></br>
            {listItems}
        </div>
    )
}
