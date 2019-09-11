import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";

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
        dateOfBirth: ""
    }
    
    componentDidMount() {
        console.log("CDM in AnimalDetail");
        console.log(this.props);
        //retrieve animal information based upon animal.id using get     this.props.id
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
                <h3>Inside Animal Detail</h3>
                <div>
                    <h2>Name: <span>{this.state.name}</span></h2>
                    <h2>Breed: <span>{this.state.breed}</span></h2>
                    <h2>ADGA Number: <span>{this.state.number}</span></h2>
                    <h2>Gender: <span>{this.state.gender}</span></h2>
                    <h2>DOB: <span>{this.state.dateOfBirth}</span></h2>
                    <h2>Age: <span></span></h2>
                    <h2>Description: <span>{this.state.description}</span></h2>
                    <h2>Sire: <span>{this.state.sire}</span></h2>
                    <h2>Dam: <span>{this.state.dam}</span></h2>
                </div>
                <section className="AnimalDetailButton">
                    <button type="button"
                    className="EditButton"
                    onClick = {() => {}}>
                    Edit
                    </button>
                    <button type="button"
                    className="BackToDashboardButton"
                    onClick = {() => {}}>
                    Dashboard
                    </button>
                </section>
            </React.Fragment>
        )
    }
}

export default AnimalDetail