import React, { Component } from 'react';
import "./AnimalCard.css"

class AnimalCard extends Component {
    render () {
        return (
            <div className="animal-card" onClick={() => {this.props.history.push(`/animals/${this.props.animal.id}`)}}>
                <h3>Name: <span>{this.props.animal.name}</span></h3>
                <h3>Breed: <span>{this.props.animal.breed}</span></h3>
                <h3>Age:<span>{this.props.animal.age}</span></h3>
                <button>View Detail</button>
            </div>            
        )
    }
}

export default AnimalCard