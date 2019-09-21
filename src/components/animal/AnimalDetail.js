import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";
import { Link } from "react-router-dom";

class AnimalDetail extends Component {
    state = {
        id: "",
        herdId: "",
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
    }
    
    deleteAnimal = id => {
        AnimalManager.delete(id)
        .then(() => {this.props.history.push(`/herdview/${this.state.herdId}`)});
    }
    componentDidMount() {
        //retrieve animal information based upon animalId
        AnimalManager.get(this.props.animalId)
        .then((animal) => {
            this.setState({
                herdId: animal.herdId,
                status: animal.status,
                name: animal.name,
                number: animal.number,
                breed: animal.breed,
                sire: animal.sire,
                dam: animal.dam,
                description: animal.description,
                gender: animal.gender,
                dateOfBirth: animal.dateOfBirth
            })
        })
    }

    render () {
        return (
            <React.Fragment>
                <h2>Animal Detail</h2>
                <div>
                    <h3>Name: <span>{this.state.name}</span></h3>
                    <h3>Breed: <span>{this.state.breed}</span></h3>
                    <h3>Status: <span>{this.state.status}</span></h3>
                    <h3>ADGA Number: <span>{this.state.number}</span></h3>
                    <h3>Gender: <span>{this.state.gender}</span></h3>
                    <h3>DOB: <span>{this.state.dateOfBirth}</span></h3>
                    <h3>Description: <span>{this.state.description}</span></h3>
                    <h3>Sire: <span>{this.state.sire}</span></h3>
                    <h3>Dam: <span>{this.state.dam}</span></h3>
                </div>
                <section className="AnimalDetailButton">
                    <button type="button"
                        className="EditButton"
                        onClick = {() => {this.props.history.push(`${this.props.animalId}/edit`)}}
                        >
                        Edit
                    </button>
                    <button type="button"
                        className="DeleteButton"
                        onClick = {() => {this.deleteAnimal(this.props.animalId)}}>
                        Delete
                    </button>
                    <Link to={`/herdview/${this.state.herdId}`}>
                        <button type="button"
                        className="HerdViewButton"
                        >Return</button>
                    </Link>
                </section>
            </React.Fragment>
        )
    }

}

export default AnimalDetail