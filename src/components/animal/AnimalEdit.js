import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";
import { Link } from "react-router-dom";

class AnimalEdit extends Component {
    state = {
        id: "",
        herdId: "",
        status: "",
        statusOptions: [],
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
    updateExistingAnimal = event => {
        event.preventDefault();
        this.setState({loadingStatus: true});
        const editedAnimal = {
            id: this.props.match.params.animalId,
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
        };
        AnimalManager.update(editedAnimal)
        .then(() => {this.props.history.push(`/animals/${this.props.animalId}`)});
        // .then(() => {this.props.history.push(`/dashboard`)});
    };
    componentDidMount() {
        AnimalManager.get(this.props.match.params.animalId)
        .then(animal => {
            this.setState({
                herdId: animal.herdId,
                name: animal.name,
                number: animal.number,
                breed: animal.breed,
                sire: animal.sire,
                dam: animal.dam,
                description: animal.description,
                gender: animal.gender,
                dateOfBirth: animal.dateOfBirth,
                loadingStatus: false
            });
        });

        AnimalManager.getStatusOptions()
        .then(data => {
            let statusOptions = data.map(option => {return {value: option.status, display: option.status}})
            console.log(statusOptions)
            this.setState({ statusOptions: [{value: "", display: "Select Option"}].concat(statusOptions) });
            
        })      
    };
    
    render () {
        return (
            <React.Fragment>
                <form>
                    <fieldset>
                        <div className="AnimalEdit">
                            <label htmlFor="name">Name</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="name"
                            value={this.state.name}/>

                            <select value={this.state.status}
                                onChange={(event)=>this.setState({status: event.target.value})}>
                                {this.state.statusOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                            </select >

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
                            <label htmlFor="dateOfBirth">Date Of Birth</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="dateOfBirth"
                            value={this.state.dateOfBirth}/>
                        </div>
                        <div>
                            <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingAnimal}>
                            Submit Edit
                            </button>
                            <Link to={`/dashboard`}>
                                <button type="button"
                                className="DashboardButton"
                                >Dashboard</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    };
};
export default AnimalEdit