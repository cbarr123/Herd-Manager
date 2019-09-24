import React, { Component } from 'react';
import UserManager from "../../modules/UserManager";
import AnimalManager from "../../modules/AnimalManager";
import HerdsManager from "../../modules/HerdsManager";
import { Link } from "react-router-dom";

class UserAdd extends Component {
    state = {
        id: "",
        activeUsrId: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        herdId: "",
        name: "",
        number: "",
        tattoo: "",
        herdOptions: [],
        loadingStatus: false
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };

    createNewUser = evt => {
        evt.preventDefault();
        if (this.state.email === "" || this.state.password === "" || this.state.herdId === "") {
            window.alert("Email, Password and Herd are required fields");
        } else {
            this.setState({loadingStatus: true});
            const newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                herdId: this.state.herdId
            }
            UserManager.post(newUser)
            .then(() => this.props.history.push(`/herdview/${this.state.herdId}`))
        }
    };
        
    mapHerd = (data) => {
        let herdOptions = data.map(option => {return {value: option.id, display: option.name}})
        this.setState({ herdOptions: [{value: " ", display: "Select An Existing Herd"}].concat(herdOptions) }); 
    }
   
    createNewHerd = evt => {
        evt.preventDefault();
        if (this.state.name === ""){
            window.alert("Herd Name is a required field")
        } else {
            this.setState({loadingStatus: true});
            const newHerd = {
                number: this.state.number,
                name: this.state.name,
                tattoo: this.state.tattoo,
            }
            HerdsManager.post(newHerd)
            .then(AnimalManager.getHerdOptions)
            .then(this.mapHerd)
            .then(() => this.setState({loadingStatus: false}))
        }
    };

    componentDidMount () {
        
        AnimalManager.getHerdOptions()
        .then(this.mapHerd)
    }

    render () {        
        return (
            <React.Fragment>
                <form>
                    <fieldset>
                        <div>
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
                        </div>
                        <div>
                            <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.createNewUser}>
                            Create User
                            </button>

                            <Link to={`/`}>
                                <button type="button"
                                className="Login"
                                >Cancel</button>
                            </Link>
                            
                            <select value={this.state.herdId}
                                onChange={(event)=>this.setState({herdId: event.target.value})}>
                                {this.state.herdOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                            </select >                           
                        </div>   
                        <div>
                            <p></p>
                        </div>
                                
                        <div className="newHerd">
                            
                            <label htmlFor="name">Herd Name</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="name"
                            value={this.state.herdName}/>
                        
                            <label htmlFor="number">Herd ADGA Number</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="number"
                            value={this.state.herdADGA}/>

                            <label htmlFor="tattoo">Herd Tattoo</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="tattoo"
                            value={this.state.herdTattoo}/>

                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.createNewHerd}>
                                Create Herd
                            </button>
                        </div>                       
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}
export default UserAdd