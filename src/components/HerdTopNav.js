import React, { Component } from 'react';
import { Container, Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';


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
            <Container className="HerdTopNav">
                <Row>
                    <Col>
                    <div class="image"></div><nobr /><h1>Herd Manager</h1>
                    </Col>
                </Row>        
            </Container>
            </React.Fragment>
        );
    }
}



export default HerdTopNav;