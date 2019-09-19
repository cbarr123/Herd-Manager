import React, { Component } from 'react';
import UserManager from "./../modules/UserManager";


class HerdTopNav extends Component {
    state = {
        firstName: "",
        firstName: "",
        email: ""
        
    }

    componentDidMount() {
        UserManager.get(1)
        .then(user =>{
            this.setState({
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
            </div>
            </React.Fragment>
        );
    }
}



export default HerdTopNav;