import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Manager extends Component {
    render () {
        return(
            <React.Fragment>
                <h3>Manage Herd</h3>
                <Link to={`/animals/new`}>    
                    <button
                    type="button">
                    Add Animal
                    </button>
                </Link>
                    <button
                    type="button"
                    onClick={this.editHerd}>
                    Edit Herd
                    </button>

                <h3>Manage User</h3>
                    <Link to={`/user/new`}>    
                        <button
                        type="button">
                        Add User
                        </button>
                    </Link>
                    <Link to={`/user/edit`}>
                        <button
                        type="button"
                        onClick={this.editUser}>
                        Edit User
                        </button>
                    </Link>
                    <button
                    type="button"
                    onClick={this.deleteUser}>
                    Delete User
                    </button>
                
                <h3>Return to Dashboard</h3>
                <Link to={`/dashboard`}>
                    <button type="button"
                    className="DashboardButton"
                    >Dashboard</button>
                </Link>

            </React.Fragment>
        )
    }
}
export default Manager