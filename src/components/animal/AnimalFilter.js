import React, { Component } from "react";
import { Link } from "react-router-dom";
import AnimalManager from "../../modules/AnimalManager";

class AnimalFilter extends Component {
    state = {
        animals: [],
        filterStatus: "",
        filterGender: "",
        statusOptions: [],
        genderOptions: [],
    };
    
    testing() {AnimalManager.getAnimalByStatus()
    .then((animals) => {
        this.setState({
            animals: animals
        });
    });
}



    // animalFilter = event => {
    //     if (this.state.filterGender !== "" && this.state.filterStatus !== "") {
    //         console.log("both populated")   
    //     } else if (this.state.filterGender === "" && this.state.filterStatus !== "") {
    //         console.log("status populated");
    //         this.testing()
    //     } else if (this.state.filterGender !== "" && this.state.filterStatus === "") {
    //         console.log("gender populated")    
    //     }
    // }


    componentDidMount() {
        AnimalManager.getStatusOptions()
        .then(data => {
            let statusOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ statusOptions: [{value: "", display: "Select Status Option"}].concat(statusOptions) });
        })

        AnimalManager.getGenderOptions()
        .then(data => {
            let genderOptions = data.map(option => {return {value: option.status, display: option.status}})
            this.setState({ genderOptions: [{value: "", display: "Select Gender Option"}].concat(genderOptions) });
        })
    }

    render () {
        if (this.state.filterGender !== "" && this.state.filterStatus !== "") {
            console.log("both populated")   
        } else if (this.state.filterGender === "" && this.state.filterStatus !== "") {
            console.log("status populated");
            this.testing()
        } else if (this.state.filterGender !== "" && this.state.filterStatus === "") {
            console.log("gender populated")    
        }

        return (
            <React.Fragment>
                <h1>Filter View</h1>
                <form>
                    <fieldset>
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
                    </fieldset>
                </form>

                <div>
                <button
                    type="button"
                    // disabled={this.state.loadingStatus}
                    onClick={this.animalFilter}>
                    Filter
                    </button>
                </div>
                <section>
                <Link to={`/dashboard`}>
                    <button type="button" className="DashboardButton">
                    Dashboard
                    </button>
                </Link>
                </section>
            </React.Fragment>
        )
    }

}

export default AnimalFilter