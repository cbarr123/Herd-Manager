import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager";
import AnimalCard from "./AnimalCard"
import "./HerdView.css"
import { Link } from "react-router-dom";
import { Container, CardDeck, Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';


class Dashboard extends Component {
    state = {
        animals: [],
        filterStatus: "Select Animal Status",
        filterGender: "",
        statusOptions: [],
        genderOptions: [],
        herdName: "",
        herdNumber: "",
        herdId: "",
        filteredAnimals: []
    };
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };
    
   
    componentDidMount() {
        AnimalManager.getAllByHerd(this.props.herdId)
        .then((animals) => {
            this.setState({
                animals: animals
            });
        })

        AnimalManager.getStatusOptions()
        .then(data => {
            let statusOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ statusOptions: [{value: "Select Animal Status", display: "Filter on Animal Status"}].concat(statusOptions) });
        })

        AnimalManager.getHerd(this.props.herdId)
        .then(herd => {
            this.setState({
                herdName: herd.name,
                herdNumber:  herd.number,
              
            })
        }) 
    }
   
    render () {
        return (
            <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <h2>{this.state.herdName}</h2>
                        <h4>ADGA#: {this.state.herdNumber}</h4>
                        <Link className="nav-link"
                        to="/"
                        onClick={this.handleLogout}>
                            <Button type="button"      
                                disabled={this.state.loadingStatus}>
                            Log Out</Button>
                        </Link>
                        <Link to={`/user/new`}>
                            <Button type="button"
                            className="AddUserButton"
                            disabled={this.state.loadingStatus}>
                            Add User</Button>
                        </Link>
                        <Button type="button"
                        className="newAnimal"
                        onClick={() => {this.props.history.push(`/animals/new/${this.props.herdId}`)}}>
                        Add Animal
                        </Button>
                    </Col>
                </Row>
            </Container> 
            <div>
            <FormGroup row>
                <Col sm="2"></Col>
                {/* <Label for="AnimalStatus" sm={2}>Animal Status</Label>  */}
                <Col sm={8}>
                    <Input type={"select"} value={this.state.filterStatus}
                        id={"AnimalStatus"}
                        onChange={(event)=>this.setState({filterStatus: event.target.value})}
                        className="HerdView-FormField">
                        {this.state.statusOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                    </Input>
                </Col>
            </FormGroup>
            </div>
            <Container>
                <CardDeck>
                <Row className="container-cards">
                        {this.state.animals.filter(animal => {
                            if(this.state.filterStatus === "Select Animal Status"){
                                return true
                            }
                            else if(animal.status === this.state.filterStatus) {
                                return true
                            }  
                            return false
                        }).map(animal => (
                            <AnimalCard
                            key={animal.id}
                            animal={animal}
                            {...this.props}/>
                            )  
                            )
                        }
                </Row>
                </CardDeck>
            </Container>
            </React.Fragment>
        )
    }
}
   
export default Dashboard