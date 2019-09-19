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
        .then(() => {this.props.history.push(`/herdview`)});
    };
    componentDidMount() {
        UserManager.get(this.props.match.params.userId)
        .then(user =>{
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            })
        })


    }


    render () {
        return (
            <React.Fragment>
                <h4>User Edit</h4>
                <form>
                    <fieldset>
                        <div className="UserEdit">
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
                        </div>
                        <div>
                            <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingUser}>
                            Submit Edit
                            </button>
                            <Link to={`/herdview`}>
                                <button type="button"
                                className="Button"
                                >Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}

export default UserEdit