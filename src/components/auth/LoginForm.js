import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        activeUserId: 0
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    setSessionStorage = (user) => {
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                id: this.state.activeUserId
            })
        )
        // this.props.loadData(this.state.activeUserId);
        // this.props.history.push("/herdview");
    }
    componentDidMount() {
        console.log(this.state)
        // console.log("from componentDidMount at loginForm")
    }
    handleLogin = (event) => {
        event.preventDefault();
        if (this.state.email === "" || this.state.password === ""){
            window.alert("You have not completed both fields of the login form");
            this.setState({loadingStatus: false});
        } else {
            this.setState({loadingStatus: true});
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            UserManager.getAll()
            .then(users => {
                const currentUser = users.find(user => {
                    return user.email === this.state.email && user.password === this.state.password
                });
                console.log ("Current user",currentUser);
                if (currentUser !== undefined) {
                    this.setState({
                        activeUserId: currentUser.id,
                        herdId: currentUser.herdId
                    
                    });
                    this.setSessionStorage();
                    this.props.history.push(`/herdview/${currentUser.herdId}`);
                    console.log("State in UsrManagrGetAll",this.state)

                } else {
                    window.alert("something is wrong, please try again")
                }
            })
        }
    }
   
    render() {
        return(
            <React.Fragment>
                <form>
                    <fieldset>
                        <div className="loginForm">
                        <input
                            type="email"
                            required
                            onChange={this.handleFieldChange}
                            id="email"
                            placeholder="Email Address"
                        />
                        <input
                            type="password"
                            required
                            onChange={this.handleFieldChange}
                            id="password"
                            placeholder="Enter Password"
                        />
                        </div>
                        <div>
                        <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.handleLogin}
                        >Login</button>
                        </div>
                        <div>
                            <h4>Please register if you are not a current user</h4>
                            <Link className="nav-link"
                                to="/user/new">
                                <button type="button">User Registration</button>
                            </Link> 
                        </div>
                    </fieldset>
                </form>

            </React.Fragment>
        )
    }
}

export default LoginForm