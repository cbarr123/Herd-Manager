import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from "./home/Home"


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

            </React.Fragment>
        )
    }
}

export default ApplicationViews;