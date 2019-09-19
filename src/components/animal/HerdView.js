import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager";
import AnimalCard from "./AnimalCard"
import { Link } from "react-router-dom";

class Dashboard extends Component {
    state = {
        animals: [],
        filterStatus: "Select Animal Status",
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
            this.setState({ statusOptions: [{value: "Select Animal Status", display: "Select Animal Status"}].concat(statusOptions) });
        })
        AnimalManager.getHerd(1)
        .then(herd => {
            this.setState({
                herdName: herd.name,
                herdNumber:  herd.number
            })
        }) 
    }
   
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
            </div>

            <div className=".container-cards">                
                {this.state.animals.filter(animal => {
                    if(this.state.filterStatus === "Select Animal Status"){
                        return animal
                    }
                    else 
                        if(animal.status === this.state.filterStatus) {
                        console.log(animal.status, animal.id)
                        return animal
                    }               
                }).map(animal => (
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