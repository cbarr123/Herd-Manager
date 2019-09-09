import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from "./home/Home"
import LoginForm from "./auth/LoginForm"
import RegistrationForm from "./auth/RegistrationForm"


class ApplicationViews extends Component{
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null


    render() {
        console.log("from ApplicationsViews")
        return (
            <React.Fragment>
                <Route
                    exact path="/"
                    render={props => {
                        return this.isAuthenticated() ? (
                          <Home {...props} />
                        ) : (
                            <Redirect to="/login" />
                          );
                      }}
                />
                <Route
                    exact
                    path="/login"
                    render={props => {
                        return <LoginForm {...props} loadData={this.loadData} />;
                    }}
                />
                <Route
                    exact
                    path="/register"
                    render={props => {
                        return <RegistrationForm {...props} loadData={this.loadData} />;
                    }}
                />

            </React.Fragment>
        )
    }
}

export default ApplicationViews;