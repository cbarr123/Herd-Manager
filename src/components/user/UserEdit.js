import React, { Component } from 'react';
import UserManager from "../../modules/UserManager";
import { Link } from "react-router-dom";

class UserEdit extends Component {
    state = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        loadingStatus: false
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };

    updateExistingUser = evt => {
        evt.preventDefault();
        this.setState({loadingStatus: true});
        const editedUser = {
            id: this.props.match.params.userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        UserManager.update(editedUser)
        .then(() => {this.props.history.push(`/manager`)});
    }
   
    render () {
        return (
            <React.Fragment>
                <h4>User Edit</h4>
            </React.Fragment>
        )
    }
}

export default UserEdit