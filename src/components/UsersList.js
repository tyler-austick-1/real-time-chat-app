import React from 'react'
import '../css/UsersList.css';

export default function UsersList(props) {
    //replace key with user id
    const listItems = props.users.map(user => <div key={user}><p>{user}</p><br></br></div>);
    return (
        <div id="users-list">
            <br></br>
            <h3>Users</h3>
            <br></br>
            {listItems}
        </div>
    )
}
