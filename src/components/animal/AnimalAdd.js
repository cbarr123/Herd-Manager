import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";

class AnimalAdd extends Component {
    state = {
        id: "",
        herdId: 1,
        status: "",
        name: "",
        number: "",
        breed: "",
        sire: "",
        dam: "",
        description: "",
        gender: "",
        dateOfBirth: "",
        loadingStatus: false
    };
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };
    
    // this is a local method for user input validation, setting loading status, and invoking the post method
    createNewAnimal = evt => {
        evt.preventDefault();
        if (this.state.name === ""){
            window.alert("Animal Name is a required field")
        } else {
            this.setState({loadingStatus: true});
            const newAnimal = {
                herdId: this.state.herdId,
                status: this.state.status,
                name: this.state.name,
                number: this.state.number,
                breed: this.state.breed,
                sire: this.state.sire,
                dam: this.state.dam,
                description: this.state.description,
                gender: this.state.gender,
                dateOfBirth: this.state.dateOfBirth
            }
            AnimalManager.post(newAnimal)
            .then(()=>{this.props.history.push("/dashboard")});
        }
    }
        
    render () {
        return(
            <React.Fragment>
                <h3>Adding Animal</h3>
                <form>
                    <fieldset>
                        <div>
                        <label htmlFor="name">Name</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="name"
                            value={this.state.name}/>
                            <label htmlFor="number">Number</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="number"
                            value={this.state.number}/>
                            <label htmlFor="breed">Breed</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="breed"
                            value={this.state.breed}/>
                            <label htmlFor="sire">Sire</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="sire"
                            value={this.state.sire}/>
                            <label htmlFor="dam">Dam</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="dam"
                            value={this.state.dam}/>
                            <label htmlFor="description">Description</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="description"
                            value={this.state.description}/>
                            <label htmlFor="gender">Gender</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="gender"
                            value={this.state.gender}/>
                            <label htmlFor="dob">DOB</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="dob"
                            value={this.state.dateOfBirth}/>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}

export default AnimalAdd