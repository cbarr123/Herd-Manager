import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import LoginForm from "./auth/LoginForm"
import RegistrationForm from "./auth/RegistrationForm"
import HerdView from "./animal/HerdView"
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
                          <LoginForm {...props} />
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
                {/* <Route
                    exact
                    path="/herdview"
                    render={props => {
                        return <HerdView {...props} loadData={this.loadData} />;
                    }}
                /> */}
                <Route
                exact
                path="/herdview/:herdId(\d+)"
                render={props => {
                    return (
                    <HerdView
                        herdId={parseInt(props.match.params.herdId)}
                        {...props}
                    />
                    )
                }}
                />
                {/* Animal Routes */}
                <Route
                    exact
                    path="/animals/:animalId(\d+)"
                    render={props => {
                        return (
                        <AnimalDetail
                            animalId={parseInt(props.match.params.animalId)}
                            {...props}
                        />
                        )   
                    }}
                />
                
                <Route
                    exact
                    path="/manager"
                    render={props => {
                        return <Manager {...props} loadData={this.loadData} />;
                    }}
                />
                
                
                
                
                <Route
                    exact
                    path="/animals/:animalId(\d+)/edit"
                    render={props => {
                        // Pass the AnimalId to the AnimalEdit Component
                    return (
                    <AnimalEdit 
                        animalId={parseInt(props.match.params.animalId)}
                        {...props} 
                    />
                    )
                    }}
                />
                {/* Animal Add with herdId */}
                <Route
                    exact
                    path="/animals/new/:herdId(\d+)"
                    render={props => {
                        // Pass the herdId to the AnimalAdd Component
                    return (
                    <AnimalAdd 
                        herdId={parseInt(props.match.params.herdId)}
                        {...props} 
                    />
                    )
                    }}
                />

                {/* <Route
                    exact
                    path="/animals/new"
                    render={props => {
                        return <AnimalAdd {...props} loadData={this.loadData} />;
                    }}
                /> */}
                {/* <Route
                    exact
                    path="/animals/animalfilter"
                    render={props => {
                        return <AnimalFilter {...props} loadData={this.loadData} />;
                    }}
                /> */}
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
                        // Pass the UserId to the UserEdit Component
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