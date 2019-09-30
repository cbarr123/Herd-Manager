import React, { Component } from 'react';
import "../../styles/Main.css"
import {Col, Card, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

class AnimalCard extends Component {
    
    
    render () {
        
        return (
            <Col sm="4">
                <Card className="animal-card" onClick={() => {this.props.history.push(`/animals/${this.props.animal.id}`)}}>
                    <CardBody>
                        {/* <CardImg></CardImg> */}
                        <CardTitle className="CardTitle"><span>{this.props.animal.name}</span></CardTitle>
                        <CardSubtitle>Breed: <span>{this.props.animal.breed}</span></CardSubtitle>
                        <CardSubtitle>DOB: <span>{this.props.animal.dateOfBirth}</span></CardSubtitle>
                        <CardSubtitle>Gender: <span>{this.props.animal.gender}</span></CardSubtitle>
                        <CardText>Status: <span>{this.props.animal.status}</span></CardText>
                        <Button className="Button-Input">View Detail</Button>
                    </CardBody>
                </Card>
            </Col>       
        )
    }
}

export default AnimalCard