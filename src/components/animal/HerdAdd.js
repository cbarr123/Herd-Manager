import React, { Component } from 'react';
import AnimalManager from "../../modules/AnimalManager";
import { Link } from "react-router-dom";

class HerdAdd extends Component {
    state = {
        id: "",
        number: "",
        name: "",
        tattoo: "",
        loadingStatus: false
    };
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };
    
    // this is a local method for user input validation, setting loading status, and invoking the post method
    createNewHerd = evt => {
        evt.preventDefault();
        if (this.state.name === ""){
            window.alert("Herd Name is a required field")
        } else {
            this.setState({loadingStatus: true});
            const newHerd = {
                number: this.state.status,
                name: this.state.name,
                tattoo: this.state.number,
            }
            AnimalManager.post(newHerd) 

            .then(() => this.props.history.push(`/user/new/${this.state.herdId}`))
        }
    }
    
    componentDidMount() {
        

    }

        
    render () {
        return(
            <React.Fragment>
                <h3>Adding Herd</h3>
                <form>
                    <fieldset>
                        <div>
                            <label htmlFor="name">Herd Name</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="name"
                            value={this.state.name}/>
                           
                            <label htmlFor="number">Herd Number</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="number"
                            value={this.state.number}/>

                            <label htmlFor="tattoo">Herd Tattoo</label>
                            <input
                            type="text"
                            onChange={this.handleFieldChange}
                            id="tattoo"
                            value={this.state.tattoo}/>
                          
                        </div>
                        <div>
                            <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.createNewHerd}>
                            Create Herd
                            </button>
                            <Link to={"/user/new"}>
                                <button type="button"
                                className="HerdButton"
                                >Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}

export default HerdAdd