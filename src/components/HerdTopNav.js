import React, { Component } from 'react';


class HerdTopNav extends Component {
    state = {
        loadingStatus: false,
        // isHidden: false
        
    }
    handleLogout = () => {
        // console.log("pre-clear sessionStore", sessionStorage);
        sessionStorage.clear();
        // this.setState({isHidden: true});
        // this.setState({loadingStatus: true});
        // console.log("post-clear sessionStore", sessionStorage);    
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
            <div className="HerdTopNav">
                <h1>Herd Manager</h1>
            </div>
            <div>
                
            </div>
            </React.Fragment>
        );
    }
}



export default HerdTopNav;