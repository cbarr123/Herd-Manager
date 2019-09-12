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
            <section className="DashboardButton">
                {/* <link to={`/manager`}> */}
                    <button type="button"
                    className="ManageButton">
                    Manage
                    </button>
                {/* </link> */}
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