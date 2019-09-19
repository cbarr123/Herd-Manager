import React, { Component } from 'react';
import UserManager from "./../modules/UserManager";
import { Link } from "react-router-dom";


class HerdTopNav extends Component {
    state = {
        userid: "",
        firstName: "",
        lastName: "",
        email: ""
        
    }
    handleLogout() {
        // console.log("pre-clear sessionStore", sessionStorage);
        sessionStorage.clear();
        // console.log("post-clear sessionStore", sessionStorage);
    }

    componentDidMount() {
        UserManager.get(1)
        .then(user =>{
            this.setState({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
        })


    }



    render() {
        return (
            <React.Fragment>
            <div className="HerdTopNav">
                <h1>Herd Manager</h1>
            </div>
            <div>
                <h5>User: {this.state.firstName} {this.state.lastName} </h5> 
                
                <button type="button"
                    className="UserEditButton"
                    onClick={() => {this.props.history.push(`/users/${this.props.user.id}/edit`)}}
                >Edit User</button>
                
                <Link className="nav-link"
                to="/"
                onClick={this.handleLogout} >
                    <button type="button">Logout</button>
                </Link>              
            </div>
            </React.Fragment>
        );
    }
}



export default HerdTopNav;