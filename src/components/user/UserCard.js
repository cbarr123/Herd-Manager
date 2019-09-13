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
                
                <button
                    type="button"
                    onClick = {() => {this.props.history.push(`${this.props.userId}/edit`)}}>
                    Edit User
                </button>
                
                
            </div>
            </React.Fragment>            
        )
    }
}

export default UserCard