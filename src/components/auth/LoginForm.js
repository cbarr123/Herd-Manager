import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../../styles/Main.css"


class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        activeUserId: 0,
        loadingStatus: false,
        isHidden: false
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
    }
    componentDidMount() {
    }
    handleLogin = (event) => {
        event.preventDefault();
        if (this.state.email === "" || this.state.password === ""){
            window.alert("You have not completed both fields of the login form");
            this.setState({loadingStatus: false});
        } else {
            this.setState({loadingStatus: true});
            UserManager.getAll()
            .then(users => {
                const currentUser = users.find(user => {
                    return user.email === this.state.email && user.password === this.state.password
                });
                if (currentUser !== undefined) {
                    this.setState({
                        activeUserId: currentUser.id,
                        herdId: currentUser.herdId,
                        loadingStatus: false,
                        isHidden: false
                    
                    });
                    this.setSessionStorage();
                    this.props.history.push(`/herdview/${currentUser.herdId}`);
                } else {
                    window.Alert("something is wrong, please try again")
                }
            })
        }
    }
   
    render() {
        return(
            <React.Fragment>
                <Form>
                    <div className="loginForm">
                        <FormGroup>
                            <Label for="email" sm={2}>Email Address</Label>
                            <Col md={4}>
                                <Input
                                    type="email"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="email"
                                    className="Form-Field">
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" sm={1}>Password</Label>
                            <Col md={4}>
                                <Input
                                    type="password"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="password"
                                    className="Form-Field">
                                </Input>
                            </Col>
                            </FormGroup>
                        </div>
                        <div>
                        <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.handleLogin}
                            className="Button-Input login"
                        >Login</Button>
                        </div>
                        <div>
                            <h4>Please register if you are not a current user</h4>
                            <Link className="nav-link"
                                to="/user/new">
                                <Button type="button"
                                className="Button-Input">User Registration</Button>
                            </Link> 
                        </div>
                </Form>
            </React.Fragment>
        )
    }
}

export default LoginForm