import React, { Component } from 'react';
import "./AnimalCard.css"
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

class AnimalCard extends Component {
    
    
    render () {
        
        return (
                <Card className="animal-card" onClick={() => {this.props.history.push(`/animals/${this.props.animal.id}`)}}>
                    <CardBody>
                        {/* <CardImg></CardImg> */}
                        <CardTitle>Name: <span>{this.props.animal.name}</span></CardTitle>
                        <CardSubtitle><span>{this.props.animal.breed}</span></CardSubtitle>
                        <CardText><span>{this.props.animal.dateOfBirth}</span></CardText>
                        <Button className="card-button">View Detail</Button>
                    </CardBody>
                </Card>       
        )
    }
}

export default AnimalCard