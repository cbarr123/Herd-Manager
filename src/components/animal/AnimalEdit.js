import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
    };
    
    render () {
        return (
            <React.Fragment>
                <Form>
                    <div className="AnimalEdit">
                        <Row form>
                            <Col md={12}>                    
                                <Label htmlFor="name">Name</Label>
                                <Input
                                type="text"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name}/>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                        <Label for="Current-Status">Select Current Status</Label>
                                        <Input  type={"select"} value={this.state.status} id={"Current-Status"}
                                            onChange={(event)=>this.setState({status: event.target.value})}>
                                            {this.state.statusOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                        </Input >
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <Label for="gender">Select Gender</Label>
                                <Input type={"select"} value={this.state.gender} id={"gender"}
                                    onChange={(event)=>this.setState({gender: event.target.value})}>
                                    {this.state.genderOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                </Input>
                            </Col>
                            <Col md={4}>
                                <Label htmlFor="number">Enter ADGA Identification</Label>
                                <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="number"
                                    value={this.state.number}>
                                </Input>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                    <Label htmlFor="breed">Breed</Label>    
                                    <Input type={"select"} value={this.state.breed} id={"breed"}
                                        onChange={(event)=>this.setState({breed: event.target.value})}>
                                        {this.state.breedOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                    </Input>
                            </Col>
                            <Col md={8}>
                                <label htmlFor="description">Description</label>
                                <Input
                                    type="textarea"
                                    onChange={this.handleFieldChange}
                                    id="description"
                                    value={this.state.description}>
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
                                        value={this.state.dateOfBirth}>
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
                                    value={this.state.sire}>
                                    </Input>
                            </Col>
                            <Col md={8}>
                                    <Label htmlFor="dam">Dam</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="dam"
                                    value={this.state.dam}>
                                    </Input>
                            </Col>
                        </Row>
                        </div>
                        <div>
                            <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingAnimal}>
                            Submit Edit
                            </Button>
                            <Link to={`/herdview/${this.state.herdId}`}>
                                <Button type="button"
                                className="HerdViewButton"
                                >Return</Button>
                            </Link>
                        </div>
                    
                </Form>
            </React.Fragment>
        )
    };
};
export default AnimalEdit