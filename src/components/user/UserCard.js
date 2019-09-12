import React, { Component } from 'react';
import UserManager from  "../../modules/UserManager";
import { Link } from "react-router-dom";

class UserCard extends Component {
    handleDelete = () => {
        //invoke the delete function in UserManger.
        this.setState({loadingStatus: true})
        UserManager.delete(this.props.userId)
        .then(() => this.props.history.push("/manager"))
    } 
    
    
    
    render () {
        return (
            <React.Fragment>
            <div className="user-card">
                <h5>Name: {`${this.props.user.firstName} ${this.props.user.lastName} `}</h5>
                <button 
                    type="button" 
                    // disabled={this.state.loadingStatus} 
                    onClick={this.handleDelete}>
                    Delete User
                </button>
                <Link to={`/user/edit`}>
                    <button
                    type="button"
                    onClick={this.editUser}>
                    Edit User
                    </button>
                </Link>
                
            </div>
            </React.Fragment>            
        )
    }
}

export default UserCard