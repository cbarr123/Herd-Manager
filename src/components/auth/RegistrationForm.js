import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"

class RegistrationForm extends Component {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        activeUserId: 0
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    handleLogin = (user) => {
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.email,
                id: this.state.activeUserId
            })
        )

        
    }



    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
export default RegistrationForm