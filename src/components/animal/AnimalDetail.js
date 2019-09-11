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
            </React.Fragment>
        )






    }
}

export default AnimalDetail