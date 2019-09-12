import React, { Component } from 'react';
import UserManager from "../../user/UserManager";

class UserAdd extends Component {
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

    createNewUser = evt => {
        evt.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            window.alert("Email and Password are required fields");
        } else {
            this.setState({loadingStatus: true});
            const newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            UserManager.post(newUser)



        }

    }

    render () {
    
        
        
        
        return (
            <React.Fragment>
                <h2>inside add user</h2>


            </React.Fragment>
        )
    }
}
export default UserAdd