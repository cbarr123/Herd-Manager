import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";
import { Link } from "react-router-dom";

class AnimalEdit extends Component {
    state = {
        id: "",
        herdId: "",
        status: "",
        statusOptions: [],
        genderOptions: [],
        breedOptions: [],
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
                status: animal.status,
                dateOfBirth: animal.dateOfBirth,
                loadingStatus: false
            });
        });

        AnimalManager.getStatusOptions()
        .then(data => {
            let statusOptions = data.map(option => {return {value: option.status, display: option.status}})
            // console.log(statusOptions)
            this.setState({ statusOptions: [{value: "", display: "Select Status"}].concat(statusOptions) }); 
        })
        AnimalManager.getGenderOptions()
        .then(data => {
            let genderOptions = data.map(option => {return {value: option.status, display: option.status}})
            // console.log(genderOptions)
            this.setState({ genderOptions: [{value: "", display: "Select Gender"}].concat(genderOptions) }); 
        })
        AnimalManager.getBreedOptions()
        .then(data => {
            let breedOptions = data.map(option => {return {value: option.breed, display: option.breed}})
            // console.log(breedOptions)
            this.setState({ breedOptions: [{value: "", display: "Select Breed"}].concat(breedOptions) }); 
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
                            <select value={this.state.gender}
                                onChange={(event)=>this.setState({gender: event.target.value})}>
                                {this.state.genderOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                            </select >

                            <label htmlFor="number">Number</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="number"
                            value={this.state.number}/>

                            <select value={this.state.breed}
                                onChange={(event)=>this.setState({breed: event.target.value})}>
                                {this.state.breedOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                            </select >

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
                            <Link to={`/herdview/${this.state.herdId}`}>
                                <button type="button"
                                className="HerdViewButton"
                                >Return</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    };
};
export default AnimalEdit