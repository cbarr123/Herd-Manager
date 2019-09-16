import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager";
import AnimalCard from "./AnimalCard"
import { Link } from "react-router-dom";

class Dashboard extends Component {
    state = {
        animals: [],
    };
    componentDidMount() {
        AnimalManager.getAll()
        .then((animals) => {
            this.setState({
                animals: animals
            });
        });
    }
    
    render () {
        return (
            <React.Fragment>
            <h2>Animal Dashboard</h2>
            <div className=".container-cards">
                {this.state.animals.map(animal => (
                    <AnimalCard
                    key={animal.id}
                    animal={animal}
                    {...this.props}
                    />
                )                    
             )}
            </div>
            <div className="DashboardButton">
                <Link to={`/manager`}>
                    <button type="button"
                    className="ManagerButton"
                    >Manager</button>
                </Link>
                <Link to={`/animals/animalfilter`}>
                    <button type="button"
                    className="FilterButton"
                    >Filter
                    </button>
                </Link>
            </div>
            </React.Fragment>
        )
    }
}
   
export default Dashboard