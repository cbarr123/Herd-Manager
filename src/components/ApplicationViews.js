import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from "./home/Home"
import LoginForm from "./auth/LoginForm"
import RegistrationForm from "./auth/RegistrationForm"
import Dashboard from "./animal/Dashboard"
import AnimalDetail from "./animal/AnimalDetail"
import AnimalEdit from "./animal/AnimalEdit"
import AnimalAdd from "./animal/AnimalAdd"
import Manager from "./animal/Manager"
import UserAdd from "./user/UserAdd"
import UserEdit from "./user/UserEdit"


class ApplicationViews extends Component{
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    render() {
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
                <Route
                    exact
                    path="/dashboard"
                    render={props => {
                        return <Dashboard {...props} loadData={this.loadData} />;
                    }}
                />
                <Route
                    exact
                    path="/manager"
                    render={props => {
                        return <Manager {...props} loadData={this.loadData} />;
                    }}
                />
                

                {/* Animal Routes */}
                <Route
                    exact
                    path="/animals/:animalId(\d+)"
                    render={props => {
                        // Pass the animalId to the AnimalDetailComponent
                        return (
                        <AnimalDetail
                            animalId={parseInt(props.match.params.animalId)}
                            {...props}
                        />
                        );
                    }}
                />
                <Route
                    exact
                    path="/animals/:animalId(\d+)/edit"
                    render={props => {
                        // Pass the AnimalID to the AnimalEdit Component
                    return (
                    <AnimalEdit 
                        animalID={parseInt(props.match.params.animalId)}
                        {...props} 
                    />
                    )
                    }}
                />
                <Route
                    exact
                    path="/animals/new"
                    render={props => {
                        return <AnimalAdd {...props} loadData={this.loadData} />;
                    }}
                />
                {/* User Routes */}
                <Route
                    exact
                    path="/user/new"
                    render={props => {
                        return <UserAdd {...props} loadData={this.loadData} />;
                    }}
                />
                <Route
                    exact
                    path="/user/:userId(\d+)/edit"
                    render={props => {
                        // Pass the UserID to the UserEdit Component
                    return (
                    <UserEdit 
                        userID={parseInt(props.match.params.userId)}
                        {...props} 
                    />
                    )
                    }}
                />
            </React.Fragment>
        )
    }
}

export default ApplicationViews;