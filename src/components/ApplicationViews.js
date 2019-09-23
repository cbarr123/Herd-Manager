import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import LoginForm from "./auth/LoginForm"
import RegistrationForm from "./auth/RegistrationForm"
import HerdView from "./animal/HerdView"
import HerdAdd from "./animal/HerdAdd"
import AnimalDetail from "./animal/AnimalDetail"
import AnimalEdit from "./animal/AnimalEdit"
import AnimalAdd from "./animal/AnimalAdd"
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
                <Route
                exact
                path="/herdview/:herdId(\d+)"
                render={props => {
                    return this.isAuthenticated() ? (
                    <HerdView
                        herdId={parseInt(props.match.params.herdId)}
                        {...props} />
                    ) : (
                        <Redirect to="/login" />
                    );                   
                }}
                />

                <Route
                    exact
                    path="/herd/new"
                    render={props => {
                        return this.isAuthenticated() ? (
                        <HerdAdd
                            herdId={parseInt(props.match.params.herdId)}
                            loadData={this.loadData}
                            {...props}  />
                        ) : (
                            <Redirect to="/login" />
                        );
                    }}
                />

                <Route
                    exact
                    path="/animals/:animalId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (  
                        <AnimalDetail
                            animalId={parseInt(props.match.params.animalId)}
                            {...props} />
                        ) : (
                            <Redirect to="/login" />
                        );  
                    }}
                />               
                <Route
                    exact
                    path="/animals/:animalId(\d+)/edit"
                    render={props => {
                        // Pass the AnimalId to the AnimalEdit Component
                        return this.isAuthenticated() ? (
                    <AnimalEdit 
                        animalId={parseInt(props.match.params.animalId)}
                        {...props} />
                        ) : (
                        <Redirect to="/login" />
                        );
                    }}
                />
                {/* Animal Add with herdId */}
                <Route
                    exact
                    path="/animals/new/:herdId(\d+)"
                    render={props => {
                        // Pass the herdId to the AnimalAdd Component
                    return this.isAuthenticated() ? (
                    <AnimalAdd 
                        herdId={parseInt(props.match.params.herdId)}
                        {...props}/>
                    ) : (    
                        <Redirect to="/login" />
                    );
                    }}
                />
                {/* User Routes */}
                {/* <Route
                    exact
                    path="/user/new"
                    render={props => {
                        return this.isAuthenticated() ? (
                        <UserAdd 
                            loadData={this.loadData}
                            {...props}  />
                        ) : (
                            <Redirect to="/login" />
                        );
                    }}
                /> */}


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
                    return this.isAuthenticated() ? (
                    <UserEdit 
                        userID={parseInt(props.match.params.userId)}
                        {...props}/>
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