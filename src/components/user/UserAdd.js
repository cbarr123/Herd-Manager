import React, { Component } from 'react';
import UserManager from "../../modules/UserManager";
import AnimalManager from "../../modules/AnimalManager";
import HerdsManager from "../../modules/HerdsManager";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./UserAdd.css"

class UserAdd extends Component {
    state = {
        id: "",
        activeUsrId: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        herdId: "",
        name: "",
        number: "",
        tattoo: "",
        herdOptions: [],
        loadingStatus: false
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };

    createNewUser = evt => {
        evt.preventDefault();
        if (this.state.email === "" || this.state.password === "" || this.state.herdId === "") {
            window.alert("Email, Password and Herd are required fields");
        } else {
            this.setState({loadingStatus: true});
            const newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                herdId: this.state.herdId
            }
            UserManager.post(newUser)
            .then(() => this.props.history.push(`/herdview/${this.state.herdId}`))
        }
    };
        
    mapHerd = (data) => {
        let herdOptions = data.map(option => {return {value: option.id, display: option.name}})
        this.setState({ herdOptions: [{value: " ", display: "Select An Existing Herd"}].concat(herdOptions) }); 
    }
   
    createNewHerd = evt => {
        evt.preventDefault();
        if (this.state.name === ""){
            window.alert("Herd Name is a required field")
        } else {
            this.setState({loadingStatus: true});
            const newHerd = {
                number: this.state.number,
                name: this.state.name,
                tattoo: this.state.tattoo,
            }
            HerdsManager.post(newHerd)
            .then(AnimalManager.getHerdOptions)
            .then(this.mapHerd)
            .then(() => this.setState({loadingStatus: false}))
        }
    };

    componentDidMount () {
        
        AnimalManager.getHerdOptions()
        .then(this.mapHerd)
    }

    render () {        
        return (
            <React.Fragment>
                <Form>
                    <div className="User-Add">
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="email"
                                    value={this.state.email}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="password"
                                    value={this.state.password}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form> 
                            <Col md={6}>
                                <FormGroup>                                 
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="firstName"
                                    value={this.state.firstName}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>      
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id="lastName"
                                    value={this.state.lastName}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>    
                        </div>

                        <div className="Create-User">
                            <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.createNewUser}>
                            Create User
                            </Button>

                            <Link to={`/`}>
                                <Button type="button"
                                className="Login"
                                >Cancel</Button>
                            </Link>
                        </div>
                </Form>
                                
                <Form>
                    <div className="Select-Herd">    
                    <FormGroup row> 
                            <Label for="herd" sm={1}>Herd</Label>  
                            <Col sm={10}>
                                <Input type={"select"} value={this.state.herdId}
                                id="herd"
                                onChange={(event)=>this.setState({herdId: event.target.value})}>
                                {this.state.herdOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                                </Input>
                            </Col>
                    </FormGroup>
                    </div>   
                       
                                
                    <div className="New-Herd">
                    <FormGroup row>    
                            <Label htmlFor="name" sm={3}>Herd Name</Label>
                            <Col sm={8}>
                                <Input
                                type="text"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.herdName}>
                                </Input>
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Label htmlFor="number" sm={3}>Herd ADGA Number</Label>
                            <Col sm={8}>
                                <Input
                                type="text"
                                onChange={this.handleFieldChange}
                                id="number"
                                value={this.state.herdADGA}>
                                </Input>
                                </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Label htmlFor="tattoo" sm={3}>Herd Tattoo</Label>
                            <Col sm={8}>
                                <Input
                                type="text"
                                onChange={this.handleFieldChange}
                                id="tattoo"
                                value={this.state.herdTattoo}>
                                </Input>
                                </Col>
                    </FormGroup>
                            <Button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.createNewHerd}>
                                Create Herd
                            </Button>
                    </div>                       
                    
                </Form>
            </React.Fragment>
        )
    }
}
export default UserAdd