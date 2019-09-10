import React, { Component } from 'react';

class AnimalCard extends Component {
    render () {
        return (
            <div>
                <h3>AnimalCard</h3>
                <h3>Name: <span>{this.props.animal.name}</span></h3>
                <h3>Breed: <span>{this.props.animal.breed}</span></h3>
                <h3>Age:<span>{this.props.animal.age}</span></h3>
            </div>
            
            
            
            
            
            
            
            )

    }








}

export default AnimalCard