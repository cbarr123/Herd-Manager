import React, { Component } from "react";
import ApplicationViews from "./ApplicationViews"
import HerdTopNav from "./HerdTopNav"


class Herd extends Component {
    render() {
        return (
            <React.Fragment>
            <HerdTopNav />
            <ApplicationViews />
            </React.Fragment>
        );
    }
}



export default Herd;