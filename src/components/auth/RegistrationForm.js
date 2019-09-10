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
                password: this.state.password,
                id: this.state.activeUserId
            })
        )
        this.props.loadData(this.state.activeUserId);
        this.props.history.push("/");
    }
    //* this will be a method to check for empty fields, invoke the usewrmanager.getAll function, 
    //* iterate though the user information, and POST new user credentials and login
    handleRegistration = (event) => {
        event.preventDefault();
        if (this.state.email === "" || this.state.password ===""){
            window.alert("You have not yet completely filled out the registration form");
            this.setState({loadingStatus: false});
        } else {
            this.setState({loadingStatus: true});
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            UserManager.getAll()
            .then(users => {
                const existingUser = users.find(user => {
                    return user.email === this.state.email
                })
                if (existingUser === undefined) {
                    UserManager.post(user)
                    .then(user => {
                        this.setState({
                            activeUserId: user.id,
                            loadingStatus: false
                        })
                        console.log(user)
                        this.handleLogin(user)
                    })
                } else {
                    window.alert("User already exists");
                    this.setState({loadingStatus: false})
                }
            }
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <fieldset>
                        <div>
                            <input
                                type="email"
                                required
                                onChange={this.handleFieldChange}
                                id="email"
                                placeholder="Email Address"
                            />
                            {/* <label htmlFor="email">Email</label> */}
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="Enter Password"
                            />
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            {/* <label htmlFor="confirmPassword">Password</label> */}
                        </div>
                        <div>
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleRegistration}
                            >Register</button>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}
export default RegistrationForm