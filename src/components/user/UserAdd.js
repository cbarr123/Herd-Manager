import React, { Component } from 'react';
import UserManager from "../../modules/UserManager";
import { Link } from "react-router-dom";

class UserAdd extends Component {
    state = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        herdId: "",
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
            .then(() => this.props.history.push("/herdview"))
        }
    };

    render () {        
        return (
            <React.Fragment>
                <form>
                    <fieldset>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="email"
                            value={this.state.email}/>

                            <label htmlFor="password">Password</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="password"
                            value={this.state.password}/>
                           
                            <label htmlFor="firstName">First Name</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="firstName"
                            value={this.state.firstName}/>

                            <label htmlFor="lastName">Last Name</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="lastName"
                            value={this.state.lastName}/>
                        </div>
                        <div>
                            <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.createNewUser}>
                            Create User
                            </button>
                            <Link to={`/herdview`}>
                                <button type="button"
                                className="HerdView"
                                >Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}
export default UserAdd