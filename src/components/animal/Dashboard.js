import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager";
import AnimalCard from "./AnimalCard"

class Dashboard extends Component {
    state = {
        animals: [],
    };
    componentDidMount() {
        console.log("CDM in dashboard");
        console.log("prior to fetch", this.state)
        AnimalManager.getAll()
        .then((animals) => {
            this.setState({
                animals: animals
            });
            console.log(animals)
            console.log("from inside the loop",this.state)
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
            <section className="DashboardButton">
                <button type="button"
                className="ManageButton"
                onClick = {() => {}}>
                Manage
                </button>
                <button type="button"
                className="FilterButton"
                onClick = {() => {}}>
                Filter
                </button>
            </section>
            </React.Fragment>
        )
    }
}
    
    
export default Dashboard