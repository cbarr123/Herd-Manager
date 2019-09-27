import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./AnimalAdd.css"

class AnimalAdd extends Component {
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
    
    // this is a local method for user input validation, setting loading status, and invoking the post method
    createNewAnimal = evt => {
        evt.preventDefault();
        if (this.state.name === ""){
            window.alert("Animal Name is a required field")
        } else {
            this.setState({loadingStatus: true});
            const newAnimal = {
                herdId: this.props.match.params.herdId,
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
            .then(()=>{this.props.history.push(`/herdview/${this.props.match.params.herdId}`)});
        }
    }
    
    componentDidMount() {
        AnimalManager.getStatusOptions()
        .then(data => {
            let statusOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ statusOptions: [{value: "", display: "Select Status"}].concat(statusOptions) });  
        })
        AnimalManager.getGenderOptions()
        .then(data => {
            let genderOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ genderOptions: [{value: "", display: "Select Gender"}].concat(genderOptions) }); 
        })
        AnimalManager.getBreedOptions()
        .then(data => {
            let breedOptions = data.map(option => {return {value: option.breed, display: option.breed}})
            this.setState({ breedOptions: [{value: "", display: "Select Breed"}].concat(breedOptions) }); 
        }) 
    }

        
    render () {
        return(
            <React.Fragment>
                <Form>
                <Container>
                    <div className="AnimalAdd">
                        <h3>Adding Animal</h3>
                        <Row form>
                            <Col md={12}>                    
                                <Label htmlFor="name">Name</Label>
                                <Input
                                type="text"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name}
                                className="AnimalAdd-FormField"/>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                        <Label for="Current-Status">Select Current Status</Label>
                                        <Input  type={"select"} value={this.state.status} id={"Current-Status"}
                                            onChange={(event)=>this.setState({status: event.target.value})}
                                            className="AnimalAdd-FormField">
                                            {this.state.statusOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                        </Input >
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <Label for="gender">Select Gender</Label>
                                <Input type={"select"} value={this.state.gender} id={"gender"}
                                    onChange={(event)=>this.setState({gender: event.target.value})}
                                    className="AnimalAdd-FormField">
                                    {this.state.genderOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                </Input>
                            </Col>
                            <Col md={4}>
                                <Label htmlFor="number">Enter ADGA Identification</Label>
                                <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="number"
                                    value={this.state.number}
                                    className="AnimalAdd-FormField">
                                </Input>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                    <Label htmlFor="breed">Breed</Label>    
                                    <Input type={"select"} value={this.state.breed} id={"breed"}
                                        onChange={(event)=>this.setState({breed: event.target.value})}
                                        className="AnimalAdd-FormField">
                                        {this.state.breedOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                    </Input>
                            </Col>
                            <Col md={8}>
                                <label htmlFor="description">Description</label>
                                <Input
                                    type="textarea"
                                    onChange={this.handleFieldChange}
                                    id="description"
                                    value={this.state.description}
                                    className="AnimalAdd-FormField">
                                </Input>
                            </Col>    
                        </Row>
                            <Col md={8}>
                                <FormGroup>     
                                    <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                                    <Input
                                        type="date"
                                        onChange={this.handleFieldChange}
                                        id="dateOfBirth"
                                        value={this.state.dateOfBirth}
                                        className="AnimalAdd-FormField">
                                    </Input>
                                </FormGroup>
                            </Col>
                        <Row form>
                            <Col md={8}>
                                    <Label htmlFor="sire">Sire</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="sire"
                                    value={this.state.sire}
                                    className="AnimalAdd-FormField">
                                    </Input>
                            </Col>
                            <Col md={8}>
                                    <Label htmlFor="dam">Dam</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="dam"
                                    value={this.state.dam}
                                    className="AnimalAdd-FormField">
                                    </Input>
                            </Col>
                        </Row>
                        </div>


                        <div>
                            <Button
                            type="Button"
                            disabled={this.state.loadingStatus}
                            onClick={this.createNewAnimal}>
                            Create Animal
                            </Button>
                            <Link to={`/herdview/${this.props.match.params.herdId}`}>
                                <Button type="button"
                                className="ManagerButton"
                                >Cancel</Button>
                            </Link>
                        </div>
                    
                </Container>
                </Form>
            </React.Fragment>
        )
    }
}

export default AnimalAdd