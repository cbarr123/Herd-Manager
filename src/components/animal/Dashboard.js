import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager";
import AnimalCard from "./AnimalCard"
import { Link } from "react-router-dom";

class Dashboard extends Component {
    state = {
        animals: [],
        filterStatus: "",
        filterGender: "",
        statusOptions: [],
        genderOptions: [],
        herdName: "",
        herdNumber: "",
        filteredAnimals: []
    };
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };
    
    filterAnimals() {
        let filteredAnimals = this.state.animals.filter(animal => {
            return animal.status === this.state.filterStatus && animal.gender === this.state.filterGender
        })
        this.setState({filteredAnimals: filteredAnimals})
        console.log("state.filteredAnimals", this.state.animals)
        console.log("const.filteredAnimals", filteredAnimals)
    };
    
    




    
    componentDidMount() {
        AnimalManager.getAll()
        .then((animals) => {
            this.setState({
                animals: animals
            });
        })
        AnimalManager.getStatusOptions()
        .then(data => {
            let statusOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ statusOptions: [{value: "", display: "Select Animal Status"}].concat(statusOptions) });
        })
        AnimalManager.getGenderOptions()
        .then(data => {
            let genderOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ genderOptions: [{value: "", display: "Select Animal Gender"}].concat(genderOptions) });
        })
        AnimalManager.getHerd(1)
        .then(herd => {
            this.setState({
                herdName: herd.name,
                herdNumber:  herd.number
            })
        })
        this.filterAnimals()
    }
    //* set state for filteredAnimals
    //* watch state for filterStatus and FilterGender
    //* if that state changes render the animals for animal.status === filterStatus and animal.gender === filterGender 


    
    render () {
        return (
            <React.Fragment>
            <div>
                <h2>{this.state.herdName}</h2>
                <h4>ADGA#: {this.state.herdNumber}</h4>
                <Link to={`/animals/new`}>
                <button type="button">Add Animal</button>
                </Link>
            </div> 
            <div>
                <select value={this.state.filterStatus}
                    onChange={(event)=>this.setState({filterStatus: event.target.value})}>
                    {this.state.statusOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                </select >
                
                <select value={this.state.filterGender}
                    onChange={(event)=>this.setState({filterGender: event.target.value})}>
                    {this.state.genderOptions.map((options) => <option key={options.value} value={options.value}>{options.display}</option>)}
                </select >
            </div>

            <div className=".container-cards">
                {this.state.filteredAnimals.map(animal => (
                    <AnimalCard
                    key={animal.id}
                    animal={animal}
                    {...this.props}
                    />
                )                    
             )}
            </div>
            </React.Fragment>
        )
    }
}
   
export default Dashboard